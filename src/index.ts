import path from 'node:path';
import process from 'node:process';
import {parseInputFile, ensureDir} from './utils.js';
import {generateManifest, generateSvgIcon, type ManifestOptions} from './manifest.js';
import {generateEssentialFavicons, generateSocialAssets} from './generator.js';
import {wranngleColors} from './colors.js';

type CliOptions = ManifestOptions & {
	inputFilePath: string;
	outputDir: string;
};

const usage = `Usage: bun run generate -- <input-file> [options]

Options:
  --output <dir>              Output directory. Defaults to ./output.
  --app-name <name>           Web manifest name. Defaults to "Wranngle".
  --short-name <name>         Web manifest short_name. Defaults to "Wranngle".
  --theme-color <hex>         Web manifest theme color. Defaults to #ff5f00.
  --background-color <hex>    Web manifest background color. Defaults to #12111a.
  --help                      Show this help.
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

async function main() {
	try {
		const options = parseArguments(process.argv.slice(2));
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
