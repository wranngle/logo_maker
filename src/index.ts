import path from 'node:path';
import process from 'node:process';
import {parseInputFile, ensureDir} from './utils.js';
import {generateManifest, generateSvgIcon, type ManifestOptions} from './manifest.js';
import {generateEssentialFavicons, generateSocialAssets} from './generator.js';
import {wranngleColors} from './colors.js';
import {extractPalette, paletteToCss, paletteToJson} from './palette.js';
import {runKit, type KitOptions} from './kit.js';
import {isOgTemplateName} from './og.js';

type CliOptions = ManifestOptions & {
	inputFilePath: string;
	outputDir: string;
};

const usage = `Usage:
  bun run generate -- <input-file> [options]
  bun run generate -- palette <input-file> [--output <dir>] [--count <n>]
  bun run generate -- kit "<name>" --color <hex> [--out <dir>] [--type <style>] [--og <template>]

Options:
  --output <dir>              Output directory. Defaults to ./output.
  --app-name <name>           Web manifest name. Defaults to "Wranngle".
  --short-name <name>         Web manifest short_name. Defaults to "Wranngle".
  --theme-color <hex>         Web manifest theme color. Defaults to #ff5f00.
  --background-color <hex>    Web manifest background color. Defaults to #12111a.
  --count <n>                 Palette size for the palette subcommand. Defaults to 5.
  --out <dir>                 Parent dir for kit subcommand. Defaults to ./out.
  --color <hex>               Seed color for kit subcommand (6-digit hex).
  --type <style>              serif | sans | display | mono. Defaults to sans.
  --og <template>             minimal | bold | gradient. Defaults to minimal.
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

type PaletteCliOptions = {
	inputFilePath: string;
	outputDir: string;
	count: number;
};

function parsePaletteArguments(args: string[]): PaletteCliOptions {
	const options: PaletteCliOptions = {
		inputFilePath: '',
		outputDir: path.join(process.cwd(), 'output'),
		count: 5,
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

			case '--count': {
				const raw = readOption(args, index, argument);
				const parsed = Number.parseInt(raw, 10);
				if (!Number.isFinite(parsed) || parsed < 1) {
					throw new Error(`--count requires a positive integer (got: ${raw})`);
				}

				options.count = parsed;
				index++;
				break;
			}

			default: {
				throw new Error(`Unknown palette option: ${argument}`);
			}
		}
	}

	if (!options.inputFilePath) {
		throw new Error('palette subcommand requires an input file.');
	}

	return options;
}

async function runPalette(args: string[]) {
	const options = parsePaletteArguments(args);
	const brandDir = path.join(options.outputDir, 'brand');
	await ensureDir(brandDir);

	console.log(`[INFO] Extracting palette from: ${options.inputFilePath}`);
	const palette = await extractPalette(options.inputFilePath, options.count);

	const cssPath = path.join(brandDir, 'palette.css');
	const jsonPath = path.join(brandDir, 'palette.json');
	await Bun.write(cssPath, paletteToCss(palette));
	await Bun.write(jsonPath, paletteToJson(palette));

	console.log(`[READY] Wrote ${cssPath}`);
	console.log(`[READY] Wrote ${jsonPath}`);
}

function parseKitArguments(args: string[]): KitOptions {
	let name = '';
	let color = '';
	let outDir = path.join(process.cwd(), 'out');
	let typeStyle: KitOptions['typeStyle'];
	let ogTemplate: string | undefined;

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

			case '--type': {
				const value = readOption(args, index, argument);
				if (!(value === 'serif' || value === 'sans' || value === 'display' || value === 'mono')) {
					throw new Error(`--type must be serif|sans|display|mono (got: ${value})`);
				}

				typeStyle = value;
				index++;
				break;
			}

			case '--og': {
				const value = readOption(args, index, argument);
				if (!isOgTemplateName(value)) {
					throw new Error(`--og must be a known og template (got: ${value})`);
				}

				ogTemplate = value;
				index++;
				break;
			}

			default: {
				throw new Error(`Unknown kit option: ${argument}`);
			}
		}
	}

	if (!name) {
		throw new Error('kit subcommand requires a brand name positional.');
	}

	if (!color) {
		throw new Error('kit subcommand requires --color <hex>.');
	}

	return {name, color, outDir, typeStyle, ogTemplate};
}

async function runKitCommand(args: string[]) {
	const options = parseKitArguments(args);
	console.log(`[INFO] Building identity kit for "${options.name}" (${options.color})`);
	const manifest = await runKit(options);
	const failed = manifest.steps.filter(s => s.status === 'failed');
	for (const step of manifest.steps) {
		const tag = step.status === 'ok' ? 'READY' : step.status === 'skipped' ? 'SKIP ' : 'FAIL ';
		console.log(`[${tag}] ${step.artifact}${step.note ? ` — ${step.note}` : ''}`);
	}

	console.log(`[DONE ] ${path.join(options.outDir, manifest.slug)} (${manifest.steps.length} steps, ${failed.length} failed)`);
}

async function main() {
	try {
		const argv = process.argv.slice(2);
		if (argv[0] === 'palette') {
			await runPalette(argv.slice(1));
			return;
		}

		if (argv[0] === 'kit') {
			await runKitCommand(argv.slice(1));
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
