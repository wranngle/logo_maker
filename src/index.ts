import fs from 'node:fs/promises';
import path from 'node:path';
import {Buffer} from 'node:buffer';
import process from 'node:process';
import sharp from 'sharp';

const inputImage = path.join(process.env.PWD ?? process.cwd(), 'raw', 'logo.png');
const outputDir = path.join(process.env.PWD ?? process.cwd(), 'output');

const sizes = {
	social: {width: 1200, height: 630},
	square: {width: 1024, height: 1024},
	favicon: [16, 32, 48, 192, 512],
};

async function ensureDir(dir: string) {
	await fs.mkdir(dir, {recursive: true});
}

console.log('Generating logo variants...');

const image = sharp(inputImage);
const metadata = await image.metadata();

if (!metadata.width || !metadata.height) {
	throw new Error('Could not read image metadata');
}

// 1. Social (1200x630)
const socialDir = path.join(outputDir, 'social');
await ensureDir(socialDir);
await sharp({
	create: {
		width: sizes.social.width,
		height: sizes.social.height,
		channels: 4,
		background: {
			r: 255, g: 255, b: 255, alpha: 1,
		},
	},
})
	.composite([{input: inputImage}])
	.png()
	.toFile(path.join(socialDir, 'social_card.png'));

// 2. Square (1024x1024)
const squareDir = path.join(outputDir, 'square');
await ensureDir(squareDir);
const maxDim = Math.max(metadata.width, metadata.height);
const pad = Math.floor(maxDim * 0.2); // 20% padding
await image
	.clone()
	.resize({
		width: maxDim + pad,
		height: maxDim + pad,
		fit: 'contain',
		background: {
			r: 255, g: 255, b: 255, alpha: 0,
		},
	})
	.resize(sizes.square.width, sizes.square.height)
	.png()
	.toFile(path.join(squareDir, 'square.png'));

// 3. Favicons
const favDir = path.join(outputDir, 'favicon');
await ensureDir(favDir);
const faviconPromises = sizes.favicon.map(async size => image
	.clone()
	.resize(size, size, {
		fit: 'contain', background: {
			r: 255, g: 255, b: 255, alpha: 0,
		},
	})
	.png()
	.toFile(path.join(favDir, `favicon-${size}x${size}.png`)));
await Promise.all(faviconPromises);

// 4. Background Dark / Light
const bgDarkDir = path.join(outputDir, 'background_dark');
await ensureDir(bgDarkDir);
await image
	.clone()
	.flatten({background: '#1a1a1a'})
	.png()
	.toFile(path.join(bgDarkDir, 'logo_dark_bg.png'));

const bgLightDir = path.join(outputDir, 'background_light');
await ensureDir(bgLightDir);
await image
	.clone()
	.flatten({background: '#ffffff'})
	.png()
	.toFile(path.join(bgLightDir, 'logo_light_bg.png'));

// 5. Monochrome
const monoDir = path.join(outputDir, 'monochrome');
const bSolid = path.join(monoDir, 'black_solid');
const bTrans = path.join(monoDir, 'black_transparent');
const wSolid = path.join(monoDir, 'white_solid');
const wTrans = path.join(monoDir, 'white_transparent');
await ensureDir(bSolid);
await ensureDir(bTrans);
await ensureDir(wSolid);
await ensureDir(wTrans);

// Get raw buffer to manipulate pixels for monochrome
const {data, info} = await image.clone().ensureAlpha().raw().toBuffer({
	resolveWithObject: true,
});

const blackTransData = Buffer.from(data);
const whiteTransData = Buffer.from(data);
const blackSolidData = Buffer.from(data);
const whiteSolidData = Buffer.from(data);

for (let i = 0; i < data.length; i += 4) {
	// If pixel is somewhat opaque
	if (data[i + 3] > 0) {
		// Black Transparent: turn RGB to black, keep alpha
		blackTransData[i] = 0;
		blackTransData[i + 1] = 0;
		blackTransData[i + 2] = 0;

		// White Transparent: turn RGB to white, keep alpha
		whiteTransData[i] = 255;
		whiteTransData[i + 1] = 255;
		whiteTransData[i + 2] = 255;

		// Black Solid: turn RGB to black, make fully opaque
		blackSolidData[i] = 0;
		blackSolidData[i + 1] = 0;
		blackSolidData[i + 2] = 0;
		blackSolidData[i + 3] = 255;

		// White Solid: turn RGB to white, make fully opaque
		whiteSolidData[i] = 255;
		whiteSolidData[i + 1] = 255;
		whiteSolidData[i + 2] = 255;
		whiteSolidData[i + 3] = 255;
	} else {
		// Transparent background for solid -> turn to white for black solid, turn to black for white solid
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
}).png();

await toImage(blackTransData).toFile(path.join(bTrans, 'logo.png'));
await toImage(whiteTransData).toFile(path.join(wTrans, 'logo.png'));
await toImage(blackSolidData).toFile(path.join(bSolid, 'logo.png'));
await toImage(whiteSolidData).toFile(path.join(wSolid, 'logo.png'));

// 6. Wordmark & Logomark
const wordmarkDir = path.join(outputDir, 'wordmark');
await ensureDir(wordmarkDir);
await image.clone().png().toFile(path.join(wordmarkDir, 'wordmark.png'));

const logomarkDir = path.join(outputDir, 'logomark');
await ensureDir(logomarkDir);
const markSize = Math.min(metadata.height, metadata.width);
await image.clone().extract({
	left: 0,
	top: 0,
	width: markSize,
	height: markSize,
}).png().toFile(path.join(logomarkDir, 'logomark.png'));

const lmFavicon = path.join(logomarkDir, 'favicon');
await ensureDir(lmFavicon);
const markImage = sharp(path.join(logomarkDir, 'logomark.png'));

const markFaviconPromises = sizes.favicon.map(async size => markImage.clone().resize(size, size, {
	fit: 'contain',
}).png().toFile(path.join(lmFavicon, `favicon-${size}x${size}.png`)));
await Promise.all(markFaviconPromises);

const lmSocial = path.join(logomarkDir, 'social');
await ensureDir(lmSocial);
await sharp({
	create: {
		width: sizes.social.width,
		height: sizes.social.height,
		channels: 4,
		background: {
			r: 255, g: 255, b: 255, alpha: 1,
		},
	},
}).composite([{input: path.join(logomarkDir, 'logomark.png')}]).png().toFile(path.join(lmSocial, 'social_card.png'));

const lmSquare = path.join(logomarkDir, 'square');
await ensureDir(lmSquare);
await markImage.clone().resize(sizes.square.width, sizes.square.height, {
	fit: 'contain', background: {
		r: 255, g: 255, b: 255, alpha: 0,
	},
}).png().toFile(path.join(lmSquare, 'square.png'));

const logomarkBlackTransparent = path.join(logomarkDir, 'monochrome', 'black_transparent');
const logomarkWhiteTransparent = path.join(logomarkDir, 'monochrome', 'white_transparent');
const logomarkBlackSolid = path.join(logomarkDir, 'monochrome', 'black_solid');
const logomarkWhiteSolid = path.join(logomarkDir, 'monochrome', 'white_solid');
await ensureDir(logomarkBlackTransparent);
await ensureDir(logomarkWhiteTransparent);
await ensureDir(logomarkBlackSolid);
await ensureDir(logomarkWhiteSolid);

const markBufInfo = await markImage.clone().ensureAlpha().raw().toBuffer({resolveWithObject: true});
const mData = markBufInfo.data;

const mbTransData = Buffer.from(mData);
const mwTransData = Buffer.from(mData);
const mbSolidData = Buffer.from(mData);
const mwSolidData = Buffer.from(mData);

for (let i = 0; i < mData.length; i += 4) {
	if (mData[i + 3] > 0) {
		mbTransData[i] = 0;
		mbTransData[i + 1] = 0;
		mbTransData[i + 2] = 0;

		mwTransData[i] = 255;
		mwTransData[i + 1] = 255;
		mwTransData[i + 2] = 255;

		mbSolidData[i] = 0;
		mbSolidData[i + 1] = 0;
		mbSolidData[i + 2] = 0;
		mbSolidData[i + 3] = 255;

		mwSolidData[i] = 255;
		mwSolidData[i + 1] = 255;
		mwSolidData[i + 2] = 255;
		mwSolidData[i + 3] = 255;
	} else {
		mbSolidData[i] = 255;
		mbSolidData[i + 1] = 255;
		mbSolidData[i + 2] = 255;
		mbSolidData[i + 3] = 255;

		mwSolidData[i] = 0;
		mwSolidData[i + 1] = 0;
		mwSolidData[i + 2] = 0;
		mwSolidData[i + 3] = 255;
	}
}

const toMarkImage = (buffer: Uint8Array) => sharp(buffer, {
	raw: {
		width: markBufInfo.info.width,
		height: markBufInfo.info.height,
		channels: 4,
	},
}).png();

await toMarkImage(mbTransData).toFile(path.join(logomarkBlackTransparent, 'logomark.png'));
await toMarkImage(mwTransData).toFile(path.join(logomarkWhiteTransparent, 'logomark.png'));
await toMarkImage(mbSolidData).toFile(path.join(logomarkBlackSolid, 'logomark.png'));
await toMarkImage(mwSolidData).toFile(path.join(logomarkWhiteSolid, 'logomark.png'));

console.log('Done!');
