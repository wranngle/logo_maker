import path from 'node:path';
import {Buffer} from 'node:buffer';
import sharp from 'sharp';
import {wranngleColors} from './colors.js';

export async function generateEssentialFavicons(inputBuffer: Uint8Array, outputDir: string) {
	const image = sharp(inputBuffer);
	const meta = await image.metadata();
	const size = Math.max(meta.width ?? 0, meta.height ?? 0);

	// Make a square padded version of the input
	const paddedBuffer = await image.clone().resize(size, size, {
		fit: 'contain',
		background: {r: 0, g: 0, b: 0, alpha: 0},
	}).toBuffer();

	// 1. favicon.ico (Legacy Fallback - 32x32)
	// We'll generate a 32x32 PNG and save it as .ico. Most browsers accept this.
	await sharp(paddedBuffer)
		.resize(32, 32)
		.png()
		.toFile(path.join(outputDir, 'favicon.ico'));

	// 2. apple-touch-icon.png (180x180, strictly opaque)
	await sharp(paddedBuffer)
		.resize(180, 180, {
			fit: 'contain',
			background: wranngleColors.night950,
		})
		.flatten({background: wranngleColors.night950})
		.png()
		.toFile(path.join(outputDir, 'apple-touch-icon.png'));

	// 3. icon-192.png & icon-512.png (PWA with 80% safe zone padding)
	// 80% of 192 is ~153
	await sharp(paddedBuffer)
		.resize(153, 153, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}})
		.extend({
			top: 19, bottom: 20, left: 19, right: 20,
			background: {r: 0, g: 0, b: 0, alpha: 0},
		})
		.png()
		.toFile(path.join(outputDir, 'icon-192.png'));

	// 80% of 512 is 409
	await sharp(paddedBuffer)
		.resize(409, 409, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}})
		.extend({
			top: 51, bottom: 52, left: 51, right: 52,
			background: {r: 0, g: 0, b: 0, alpha: 0},
		})
		.png()
		.toFile(path.join(outputDir, 'icon-512.png'));
}

export async function generateSocialAssets(inputBuffer: Uint8Array, outputDir: string) {
	const image = sharp(inputBuffer);

	// 1. Universal OG Image (1200x630)
	// 1080x566 safe zone implies logo should fit within this area. Let's scale logo to max 500x500 for safety.
	const ogLogo = await image.clone().resize(500, 500, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}}).toBuffer();

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

	// 2. Profile Avatar (800x800, 20% safe padding for circular crops)
	// 20% padding on each side = 160px. So logo should be 480x480 max.
	const profileLogo = await image.clone().resize(480, 480, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}}).toBuffer();
	const profileCanvas = sharp({
		create: {
			width: 800,
			height: 800,
			channels: 4,
			background: wranngleColors.night950,
		},
	}).composite([{input: profileLogo, gravity: 'center'}]);

	await profileCanvas.clone().png().toFile(path.join(outputDir, 'profile.png'));

	// 3. Social Feed Post (1080x1350 - 4:5 ratio)
	const feedLogo = await image.clone().resize(700, 700, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}}).toBuffer();
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
