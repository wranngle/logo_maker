import path from 'node:path';
import process from 'node:process';
import {parseInputFile, ensureDir} from './utils.js';
import {generateManifest, generateSvgIcon} from './manifest.js';
import {generateEssentialFavicons, generateSocialAssets} from './generator.js';

async function main() {
	const args = process.argv.slice(2);
	if (args.length === 0) {
		console.error('Usage: bun run src/index.ts <path-to-svg-or-base64>');
		return;
	}

	const inputFilePath = path.resolve(process.cwd(), args[0]!);
	console.log(`[INFO] Processing input: ${inputFilePath}`);

	try {
		const inputBuffer = await parseInputFile(inputFilePath);
		const outputDir = path.join(process.cwd(), 'output');
		const faviconsDir = path.join(outputDir, 'favicons');
		const socialDir = path.join(outputDir, 'social');

		await ensureDir(faviconsDir);
		await ensureDir(socialDir);

		console.log('[INFO] Generating Essential 5 Favicons...');
		await generateEssentialFavicons(inputBuffer, faviconsDir);

		console.log('[INFO] Generating Web Manifest & SVG...');
		await generateManifest(faviconsDir);
		await generateSvgIcon(faviconsDir, inputBuffer);

		console.log('[INFO] Generating Modern Social Assets...');
		await generateSocialAssets(inputBuffer, socialDir);

		console.log('[READY] All assets generated successfully in ./output/');
	} catch (error) {
		console.error('[ERROR] Pipeline failed:', error);
	}
}

await main();
