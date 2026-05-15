import path from 'node:path';
import process from 'node:process';
import {parseInputFile, ensureDir} from './utils.js';
import {generateManifest, generateSvgIcon, type ManifestOptions} from './manifest.js';
import {generateEssentialFavicons, generateSocialAssets} from './generator.js';
import {wranngleColors} from './colors.js';
import {generateVariations, type VariationsOptions} from './variations.js';

type CliOptions = ManifestOptions & {
	inputFilePath: string;
	outputDir: string;
};

const usage = `Usage: bun run generate -- <input-file> [options]
       bun run start -- variations "<name>" --color <hex> [--out <dir>]

Options:
  --output <dir>              Output directory. Defaults to ./output.
  --app-name <name>           Web manifest name. Defaults to "Wranngle".
  --short-name <name>         Web manifest short_name. Defaults to "Wranngle".
  --theme-color <hex>         Web manifest theme color. Defaults to #ff5f00.
  --background-color <hex>    Web manifest background color. Defaults to #12111a.
  --help                      Show this help.

Subcommands:
  variations <name> --color <hex> [--out <dir>]
      Emit 5 logo variation SVGs (wordmark, monogram, icon, dark, light)
      into <out>/<slug>/ plus a variations.json manifest.
`;

function readOption(args: string[], index: number, flag: string): string {
	const value = args[index + 1];
	if (!value || value.startsWith('--')) {
		throw new Error(`${flag} requires a value.`);
	}

	return value;
}

function parseArguments(args: string[]): CliOptions | undefined {
	if (args.includes('--help') || args.includes('-h')) {
		console.log(usage);
		return undefined;
	}

	const options: CliOptions = {
		inputFilePath: '',
		outputDir: path.join(process.cwd(), 'output'),
		name: 'Wranngle',
		shortName: 'Wranngle',
		themeColor: wranngleColors.sunset500,
		backgroundColor: wranngleColors.night950,
	};

	for (let index = 0; index < args.length; index++) {
		const argument = args[index]!;
		if (!argument.startsWith('--')) {
			if (options.inputFilePath) {
				throw new Error(`Unexpected extra input: ${argument}`);
			}

			options.inputFilePath = path.resolve(process.cwd(), argument);
			continue;
		}

		switch (argument) {
			case '--output': {
				options.outputDir = path.resolve(process.cwd(), readOption(args, index, argument));
				index++;
				break;
			}

			case '--app-name': {
				options.name = readOption(args, index, argument);
				index++;
				break;
			}

			case '--short-name': {
				options.shortName = readOption(args, index, argument);
				index++;
				break;
			}

			case '--theme-color': {
				options.themeColor = readOption(args, index, argument);
				index++;
				break;
			}

			case '--background-color': {
				options.backgroundColor = readOption(args, index, argument);
				index++;
				break;
			}

			default: {
				throw new Error(`Unknown option: ${argument}`);
			}
		}
	}

	if (!options.inputFilePath) {
		throw new Error('Missing input file.');
	}

	return options;
}

function parseVariationsArguments(args: string[]): VariationsOptions {
	let name = '';
	let color = '';
	let outDir = path.join(process.cwd(), 'output', 'variations');

	for (let index = 0; index < args.length; index++) {
		const argument = args[index]!;
		if (!argument.startsWith('--')) {
			if (name) {
				throw new Error(`Unexpected extra positional: ${argument}`);
			}

			name = argument;
			continue;
		}

		switch (argument) {
			case '--color': {
				color = readOption(args, index, argument);
				index++;
				break;
			}

			case '--out': {
				outDir = path.resolve(process.cwd(), readOption(args, index, argument));
				index++;
				break;
			}

			default: {
				throw new Error(`Unknown variations option: ${argument}`);
			}
		}
	}

	if (!name) {
		throw new Error('variations subcommand requires a brand name positional.');
	}

	if (!color) {
		throw new Error('variations subcommand requires --color <hex>.');
	}

	return {name, color, outDir};
}

async function runVariationsCommand(args: string[]) {
	const options = parseVariationsArguments(args);
	console.log(`[INFO] Rendering variations for "${options.name}" (${options.color})`);
	const manifest = await generateVariations(options);
	for (const artifact of manifest.artifacts) {
		console.log(`[READY] ${path.basename(artifact.file)}`);
	}

	console.log(`[DONE ] ${path.join(options.outDir, manifest.slug)} (${manifest.artifacts.length} variations)`);
}

async function main() {
	try {
		const argv = process.argv.slice(2);
		if (argv[0] === 'variations') {
			await runVariationsCommand(argv.slice(1));
			return;
		}

		const options = parseArguments(argv);
		if (!options) {
			return;
		}

		console.log(`[INFO] Processing input: ${options.inputFilePath}`);
		const inputBuffer = await parseInputFile(options.inputFilePath);
		const faviconsDir = path.join(options.outputDir, 'favicons');
		const socialDir = path.join(options.outputDir, 'social');

		await ensureDir(faviconsDir);
		await ensureDir(socialDir);

		console.log('[INFO] Generating favicons...');
		await generateEssentialFavicons(inputBuffer, faviconsDir);

		console.log('[INFO] Generating web manifest and SVG icon...');
		await generateManifest(faviconsDir, options);
		await generateSvgIcon(faviconsDir, inputBuffer);

		console.log('[INFO] Generating social assets...');
		await generateSocialAssets(inputBuffer, socialDir);

		console.log(`[READY] Assets generated in ${options.outputDir}`);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`[ERROR] ${message}`);
		console.error(usage);
		process.exitCode = 1;
	}
}

await main();
