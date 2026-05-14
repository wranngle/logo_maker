import {Buffer} from 'node:buffer';
import sharp from 'sharp';
import {parseInputFile} from './utils.js';

export type PaletteColor = {
	hex: string;
	rgb: [number, number, number];
	name: string;
};

const sampleSize = 50;

function toHex(value: number): string {
	return value.toString(16).padStart(2, '0');
}

function rgbToHex(r: number, g: number, b: number): string {
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function squaredDistance(a: [number, number, number], b: [number, number, number]): number {
	const dr = a[0] - b[0];
	const dg = a[1] - b[1];
	const db = a[2] - b[2];
	return (dr * dr) + (dg * dg) + (db * db);
}

function pickInitialCentroids(pixels: Array<[number, number, number]>, k: number): Array<[number, number, number]> {
	const centroids: Array<[number, number, number]> = [];
	const step = Math.max(1, Math.floor(pixels.length / k));
	for (let index = 0; index < k; index++) {
		const source = pixels[Math.min(pixels.length - 1, index * step)]!;
		centroids.push([source[0], source[1], source[2]]);
	}

	return centroids;
}

function runKMeans(pixels: Array<[number, number, number]>, k: number, maxIterations = 20): Array<[number, number, number]> {
	if (pixels.length === 0) {
		throw new Error('Cannot extract palette from empty pixel set.');
	}

	const centroids = pickInitialCentroids(pixels, k);
	const assignments = new Array<number>(pixels.length).fill(0);

	for (let iteration = 0; iteration < maxIterations; iteration++) {
		let changed = false;

		for (let index = 0; index < pixels.length; index++) {
			const pixel = pixels[index]!;
			let bestCluster = 0;
			let bestDistance = squaredDistance(pixel, centroids[0]!);
			for (let c = 1; c < k; c++) {
				const distance = squaredDistance(pixel, centroids[c]!);
				if (distance < bestDistance) {
					bestDistance = distance;
					bestCluster = c;
				}
			}

			if (assignments[index] !== bestCluster) {
				assignments[index] = bestCluster;
				changed = true;
			}
		}

		const sums = Array.from({length: k}, () => [0, 0, 0, 0] as [number, number, number, number]);
		for (let index = 0; index < pixels.length; index++) {
			const cluster = assignments[index]!;
			const pixel = pixels[index]!;
			const bucket = sums[cluster]!;
			bucket[0] += pixel[0];
			bucket[1] += pixel[1];
			bucket[2] += pixel[2];
			bucket[3] += 1;
		}

		for (let c = 0; c < k; c++) {
			const bucket = sums[c]!;
			if (bucket[3] > 0) {
				centroids[c] = [
					Math.round(bucket[0] / bucket[3]),
					Math.round(bucket[1] / bucket[3]),
					Math.round(bucket[2] / bucket[3]),
				];
			}
		}

		if (!changed) {
			break;
		}
	}

	return centroids;
}

function clampByte(value: number): number {
	if (value < 0) {
		return 0;
	}

	if (value > 255) {
		return 255;
	}

	return Math.round(value);
}

export async function extractPalette(imagePath: string, count = 5): Promise<PaletteColor[]> {
	if (count < 1) {
		throw new Error('Palette count must be >= 1.');
	}

	const decoded = await parseInputFile(imagePath);
	const fileBuffer = Buffer.from(decoded);
	const {data, info} = await sharp(fileBuffer)
		.resize(sampleSize, sampleSize, {fit: 'inside'})
		.ensureAlpha()
		.raw()
		.toBuffer({resolveWithObject: true});

	const pixels: Array<[number, number, number]> = [];
	const channels = info.channels;
	for (let index = 0; index < data.length; index += channels) {
		const alpha = channels >= 4 ? data[index + 3]! : 255;
		if (alpha < 16) {
			continue;
		}

		pixels.push([data[index]!, data[index + 1]!, data[index + 2]!]);
	}

	if (pixels.length === 0) {
		throw new Error('Image has no opaque pixels to sample.');
	}

	const centroids = runKMeans(pixels, count);

	return centroids.map((centroid, index) => {
		const r = clampByte(centroid[0]);
		const g = clampByte(centroid[1]);
		const b = clampByte(centroid[2]);
		return {
			hex: rgbToHex(r, g, b),
			rgb: [r, g, b],
			name: `brand-${index + 1}`,
		};
	});
}

export function paletteToCss(palette: PaletteColor[]): string {
	const declarations = palette
		.map((color, index) => `\t--brand-${index + 1}: ${color.hex};`)
		.join('\n');
	return `:root {\n${declarations}\n}\n`;
}

export function paletteToJson(palette: PaletteColor[]): string {
	return `${JSON.stringify({colors: palette}, undefined, 2)}\n`;
}
