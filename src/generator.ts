import path from 'node:path';
import {Buffer} from 'node:buffer';
import sharp from 'sharp';
import {wranngleColors} from './colors.js';

const transparent = {
	r: 0,
	g: 0,
	b: 0,
	alpha: 0,
};

function makeIco(pngBuffer: Uint8Array, width: number, height: number): Uint8Array {
	const png = Buffer.from(pngBuffer);
	const headerSize = 6;
	const directorySize = 16;
	const imageOffset = headerSize + directorySize;
	const icoBuffer = Buffer.alloc(imageOffset + png.length);

	icoBuffer.writeUInt16LE(0, 0);
	icoBuffer.writeUInt16LE(1, 2);
	icoBuffer.writeUInt16LE(1, 4);
	icoBuffer.writeUInt8(width >= 256 ? 0 : width, 6);
	icoBuffer.writeUInt8(height >= 256 ? 0 : height, 7);
	icoBuffer.writeUInt8(0, 8);
	icoBuffer.writeUInt8(0, 9);
	icoBuffer.writeUInt16LE(1, 10);
	icoBuffer.writeUInt16LE(32, 12);
	icoBuffer.writeUInt32LE(png.length, 14);
	icoBuffer.writeUInt32LE(imageOffset, 18);
	png.copy(icoBuffer, imageOffset);

	return icoBuffer;
}

async function loadSourceImage(inputBuffer: Uint8Array) {
	const image = sharp(inputBuffer);
	const metadata = await image.metadata();
	const width = metadata.width ?? 0;
	const height = metadata.height ?? 0;

	if (width <= 0 || height <= 0) {
		throw new Error('Input image has no readable dimensions.');
	}

	return {
		image,
		size: Math.max(width, height),
	};
}

export async function generateEssentialFavicons(inputBuffer: Uint8Array, outputDir: string) {
	const {image, size} = await loadSourceImage(inputBuffer);

	const paddedBuffer = await image.clone().resize(size, size, {
		fit: 'contain',
		background: transparent,
	}).toBuffer();

	const faviconPng = await sharp(paddedBuffer)
		.resize(32, 32)
		.png()
		.toBuffer();

	await Bun.write(path.join(outputDir, 'favicon.ico'), makeIco(faviconPng, 32, 32));

	await sharp(paddedBuffer)
		.resize(180, 180, {
			fit: 'contain',
			background: wranngleColors.night950,
		})
		.flatten({background: wranngleColors.night950})
		.png()
		.toFile(path.join(outputDir, 'apple-touch-icon.png'));

	await sharp(paddedBuffer)
		.resize(153, 153, {
			fit: 'contain',
			background: transparent,
		})
		.extend({
			top: 19, bottom: 20, left: 19, right: 20,
			background: transparent,
		})
		.png()
		.toFile(path.join(outputDir, 'icon-192.png'));

	await sharp(paddedBuffer)
		.resize(409, 409, {
			fit: 'contain',
			background: transparent,
		})
		.extend({
			top: 51, bottom: 52, left: 51, right: 52,
			background: transparent,
		})
		.png()
		.toFile(path.join(outputDir, 'icon-512.png'));
}

export async function generateSocialAssets(inputBuffer: Uint8Array, outputDir: string) {
	const image = sharp(inputBuffer);

	const ogLogo = await image.clone().resize(500, 500, {
		fit: 'contain',
		background: transparent,
	}).toBuffer();

	const ogCanvas = sharp({
		create: {
			width: 1200,
			height: 630,
			channels: 4,
			background: wranngleColors.night950,
		},
	}).composite([{input: ogLogo, gravity: 'center'}]);

	await ogCanvas.clone().png().toFile(path.join(outputDir, 'og-image.png'));
	await ogCanvas.clone().webp().toFile(path.join(outputDir, 'og-image.webp'));

	const profileLogo = await image.clone().resize(480, 480, {
		fit: 'contain',
		background: transparent,
	}).toBuffer();
	const profileCanvas = sharp({
		create: {
			width: 800,
			height: 800,
			channels: 4,
			background: wranngleColors.night950,
		},
	}).composite([{input: profileLogo, gravity: 'center'}]);

	await profileCanvas.clone().png().toFile(path.join(outputDir, 'profile.png'));

	const feedLogo = await image.clone().resize(700, 700, {
		fit: 'contain',
		background: transparent,
	}).toBuffer();
	const feedCanvas = sharp({
		create: {
			width: 1080,
			height: 1350,
			channels: 4,
			background: wranngleColors.sunset500,
		},
	}).composite([{input: feedLogo, gravity: 'center'}]);

	await feedCanvas.clone().png().toFile(path.join(outputDir, 'social-feed.png'));
	await feedCanvas.clone().webp().toFile(path.join(outputDir, 'social-feed.webp'));
}
