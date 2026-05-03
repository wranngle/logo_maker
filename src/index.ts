import fs from 'node:fs/promises';
import path from 'node:path';
import {Buffer} from 'node:buffer';
import process from 'node:process';
import sharp from 'sharp';

const rawDir = path.join(process.env.PWD ?? process.cwd(), 'raw');
const outputDir = path.join(process.env.PWD ?? process.cwd(), 'output');

// High-quality source assets
const srcWordmarkTrans = path.join(rawDir, 'logo.png');
const srcLogomarkTrans = path.join(rawDir, 'logomark_color_bg2.png');
const srcDarkBg = path.join(rawDir, 'wranngle_color_dark_bg.png');
const srcLightBg = path.join(rawDir, 'wranngle_color_bg.png');

const sizes = {
	favicon: [16, 32, 48, 180, 192, 512],
	square: [64, 128, 256, 512, 1024],
	wordmark: [512, 1024, 2048],
	social: {
		og: {width: 1200, height: 630},
		linkedin: {width: 1200, height: 627},
		twitter: {width: 1200, height: 600},
		profile: {width: 400, height: 400},
	},
};

async function ensureDir(dir: string) {
	await fs.mkdir(dir, {recursive: true});
}

console.log('Generating high-quality logo variants...');

// Ensure output dirs
const dirs = [
	'favicon',
	'square',
	'wordmark',
	'logomark',
	'background_dark',
	'background_light',
	'social',
	'monochrome/black_solid',
	'monochrome/white_solid',
	'monochrome/black_transparent',
	'monochrome/white_transparent',
];

const ensureDirPromises = dirs.map(async d => ensureDir(path.join(outputDir, d)));
await Promise.all(ensureDirPromises);

// 1. Favicons & Squares (Uses LOGOMARK)
const logomark = sharp(srcLogomarkTrans);

const lmMeta = await logomark.metadata();
const lmSize = Math.max(lmMeta.width ?? 0, lmMeta.height ?? 0);

const paddedLogomarkBuffer = await logomark.clone().resize(lmSize, lmSize, {
	fit: 'contain',
	background: {
		r: 255, g: 255, b: 255, alpha: 0,
	},
}).toBuffer();

const faviconPromises = sizes.favicon.map(async size => sharp(paddedLogomarkBuffer)
	.resize(size, size)
	.png()
	.toFile(path.join(outputDir, 'favicon', `wranngle_favicon_${size}.png`)));
await Promise.all(faviconPromises);

const squarePromises = sizes.square.map(async size => {
	const sqImage = sharp(paddedLogomarkBuffer).resize(size, size);
	await sqImage.clone().png().toFile(path.join(outputDir, 'square', `wranngle_square_${size}.png`));
	await sqImage.clone().webp().toFile(path.join(outputDir, 'square', `wranngle_square_${size}.webp`));
});
await Promise.all(squarePromises);

await sharp(paddedLogomarkBuffer).png().toFile(path.join(outputDir, 'logomark', 'wranngle_logomark_transparent.png'));

// 2. Wordmark Resizes
const wordmark = sharp(srcWordmarkTrans);
await wordmark.clone().png().toFile(path.join(outputDir, 'wordmark', 'wranngle_wordmark_original.png'));

const wordmarkPromises = sizes.wordmark.map(async width => {
	const wm = wordmark.clone().resize(width, null);
	await wm.clone().png().toFile(path.join(outputDir, 'wordmark', `wranngle_wordmark_${width}w.png`));
	await wm.clone().webp().toFile(path.join(outputDir, 'wordmark', `wranngle_wordmark_${width}w.webp`));
});
await Promise.all(wordmarkPromises);

// 3. Background Variants
const darkBg = sharp(srcDarkBg);
const darkBgPromises = sizes.wordmark.map(async width => {
	const d = darkBg.clone().resize(width, null);
	await d.clone().png().toFile(path.join(outputDir, 'background_dark', `wranngle_dark_${width}w.png`));
	await d.clone().webp().toFile(path.join(outputDir, 'background_dark', `wranngle_dark_${width}w.webp`));
});
await Promise.all(darkBgPromises);

const lightBg = sharp(srcLightBg);
const lightBgPromises = sizes.wordmark.map(async width => {
	const l = lightBg.clone().resize(width, null);
	await l.clone().png().toFile(path.join(outputDir, 'background_light', `wranngle_light_${width}w.png`));
	await l.clone().webp().toFile(path.join(outputDir, 'background_light', `wranngle_light_${width}w.webp`));
});
await Promise.all(lightBgPromises);

// 4. Social Cards (OG, Twitter, LinkedIn)
const socialPromises = Object.entries(sizes.social).map(async ([platform, dims]) => {
	if (platform === 'profile') {
		await sharp(paddedLogomarkBuffer)
			.resize(dims.width, dims.height, {
				fit: 'contain',
				background: {
					r: 255, g: 255, b: 255, alpha: 1,
				},
			})
			.png()
			.toFile(path.join(outputDir, 'social', `wranngle_social_${platform}.png`));
		return;
	}

	const targetWmWidth = Math.floor(dims.width * 0.6);
	const scaledWmBuffer = await wordmark.clone().resize(targetWmWidth, null).toBuffer();

	const card = sharp({
		create: {
			width: dims.width,
			height: dims.height,
			channels: 4,
			background: {
				r: 255, g: 255, b: 255, alpha: 1,
			},
		},
	}).composite([{input: scaledWmBuffer, gravity: 'center'}]);

	await card.clone().png().toFile(path.join(outputDir, 'social', `wranngle_social_${platform}.png`));
	await card.clone().webp().toFile(path.join(outputDir, 'social', `wranngle_social_${platform}.webp`));
});
await Promise.all(socialPromises);

// 5. Monochrome Versions (Wordmark)
const {data, info} = await wordmark.clone().ensureAlpha().raw().toBuffer({
	resolveWithObject: true,
});

const blackTransData = Buffer.from(data);
const whiteTransData = Buffer.from(data);
const blackSolidData = Buffer.from(data);
const whiteSolidData = Buffer.from(data);

for (let i = 0; i < data.length; i += 4) {
	if (data[i + 3] > 0) {
		blackTransData[i] = 0;
		blackTransData[i + 1] = 0;
		blackTransData[i + 2] = 0;

		whiteTransData[i] = 255;
		whiteTransData[i + 1] = 255;
		whiteTransData[i + 2] = 255;

		blackSolidData[i] = 0;
		blackSolidData[i + 1] = 0;
		blackSolidData[i + 2] = 0;
		blackSolidData[i + 3] = 255;

		whiteSolidData[i] = 255;
		whiteSolidData[i + 1] = 255;
		whiteSolidData[i + 2] = 255;
		whiteSolidData[i + 3] = 255;
	} else {
		blackSolidData[i] = 255;
		blackSolidData[i + 1] = 255;
		blackSolidData[i + 2] = 255;
		blackSolidData[i + 3] = 255;

		whiteSolidData[i] = 0;
		whiteSolidData[i + 1] = 0;
		whiteSolidData[i + 2] = 0;
		whiteSolidData[i + 3] = 255;
	}
}

const toImage = (buffer: Uint8Array) => sharp(buffer, {
	raw: {
		width: info.width,
		height: info.height,
		channels: 4,
	},
});

const monoMap = {
	monochromeBlackTransparent: {dir: 'monochrome/black_transparent', buf: blackTransData, name: 'wranngle_black_trans'},
	monochromeWhiteTransparent: {dir: 'monochrome/white_transparent', buf: whiteTransData, name: 'wranngle_white_trans'},
	monochromeBlackSolid: {dir: 'monochrome/black_solid', buf: blackSolidData, name: 'wranngle_black_solid'},
	monochromeWhiteSolid: {dir: 'monochrome/white_solid', buf: whiteSolidData, name: 'wranngle_white_solid'},
};

const monoPromises = Object.values(monoMap).map(async ({dir, buf, name}) => {
	const outPath = path.join(outputDir, dir);
	await toImage(buf).png().toFile(path.join(outPath, `${name}_original.png`));

	const scaledPromises = sizes.wordmark.map(async width => {
		const scaled = toImage(buf).resize(width, null);
		await scaled.clone().png().toFile(path.join(outPath, `${name}_${width}w.png`));
	});
	await Promise.all(scaledPromises);
});
await Promise.all(monoPromises);

console.log('Done!');
