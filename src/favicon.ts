import path from 'node:path';
import {Buffer} from 'node:buffer';
import {ensureDir} from './utils.js';
import {wranngleColors} from './colors.js';

export type FaviconOptions = {
	name: string;
	shortName?: string;
	themeColor?: string;
	backgroundColor?: string;
	outDir: string;
};

export type FaviconArtifact = {
	file: string;
	kind: 'svg' | 'png' | 'ico' | 'webmanifest';
	size?: number;
};

export const faviconSizes: readonly number[] = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];

const hexRegex = /^#?([\da-f]{6})$/iv;

export function normalizeHex(value: string): string {
	const match = hexRegex.exec(value.trim());
	if (!match) {
		throw new Error(`Invalid hex color: ${value}`);
	}

	return `#${match[1]!.toLowerCase()}`;
}

export function deriveMonogram(name: string): string {
	const tokens = name.trim().split(/\s+/v).filter(Boolean);
	if (tokens.length === 0) {
		return 'W';
	}

	if (tokens.length === 1) {
		return tokens[0]!.slice(0, 2).toUpperCase();
	}

	return (tokens[0]![0]! + tokens[1]![0]!).toUpperCase();
}

function escapeXml(value: string): string {
	return value.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll('\'', '&apos;');
}

export function renderFaviconSvg(name: string, size: number, options: {background: string; ink: string}): string {
	const mark = escapeXml(deriveMonogram(name));
	const radius = Math.round(size * 0.18);
	const fontSize = Math.round(size * 0.56);
	const baseline = Math.round(size * 0.54);
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${options.background}"/>
  <text x="${size / 2}" y="${baseline}" text-anchor="middle" dominant-baseline="central"
        font-family="Inter, system-ui, -apple-system, sans-serif" font-weight="800"
        font-size="${fontSize}" fill="${options.ink}">${mark}</text>
</svg>
`;
}

function buildIco(svg: string, size: number): Uint8Array {
	const svgBuffer = Buffer.from(svg, 'utf8');
	const headerSize = 6;
	const directorySize = 16;
	const imageOffset = headerSize + directorySize;
	const ico = Buffer.alloc(imageOffset + svgBuffer.length);
	ico.writeUInt16LE(0, 0);
	ico.writeUInt16LE(1, 2);
	ico.writeUInt16LE(1, 4);
	ico.writeUInt8(size >= 256 ? 0 : size, 6);
	ico.writeUInt8(size >= 256 ? 0 : size, 7);
	ico.writeUInt8(0, 8);
	ico.writeUInt8(0, 9);
	ico.writeUInt16LE(1, 10);
	ico.writeUInt16LE(32, 12);
	ico.writeUInt32LE(svgBuffer.length, 14);
	ico.writeUInt32LE(imageOffset, 18);
	svgBuffer.copy(ico, imageOffset);
	return ico;
}

type WebManifest = {
	name: string;
	short_name: string;
	icons: Array<{src: string; sizes: string; type: string; purpose: string}>;
	theme_color: string;
	background_color: string;
	display: 'standalone';
	start_url: string;
};

export function buildWebManifest(options: Required<Omit<FaviconOptions, 'outDir'>>): WebManifest {
	const manifest: WebManifest = {
		name: options.name,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		short_name: options.shortName,
		icons: [
			{
				src: 'icon-192.svg',
				sizes: '192x192',
				type: 'image/svg+xml',
				purpose: 'any maskable',
			},
			{
				src: 'icon-512.svg',
				sizes: '512x512',
				type: 'image/svg+xml',
				purpose: 'any maskable',
			},
			{
				src: 'icon-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any maskable',
			},
			{
				src: 'icon-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any maskable',
			},
		],
		// eslint-disable-next-line @typescript-eslint/naming-convention
		theme_color: options.themeColor,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		background_color: options.backgroundColor,
		display: 'standalone',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		start_url: '/',
	};
	return manifest;
}

export async function generateFaviconPack(options: FaviconOptions): Promise<FaviconArtifact[]> {
	const themeColor = normalizeHex(options.themeColor ?? wranngleColors.sunset500);
	const backgroundColor = normalizeHex(options.backgroundColor ?? wranngleColors.night950);
	const shortName = options.shortName ?? options.name;
	await ensureDir(options.outDir);

	const frame = {background: backgroundColor, ink: themeColor};
	const sizedPlan = faviconSizes.flatMap(size => {
		const svg = renderFaviconSvg(options.name, size, frame);
		return [
			{
				file: path.join(options.outDir, `icon-${size}.svg`),
				kind: 'svg' as const,
				size,
				svg,
			},
			{
				file: path.join(options.outDir, `icon-${size}.png`),
				kind: 'png' as const,
				size,
				svg,
			},
		];
	});
	await Promise.all(sizedPlan.map(async entry => Bun.write(entry.file, entry.svg)));
	const artifacts: FaviconArtifact[] = sizedPlan.map(({file, kind, size}) => ({file, kind, size}));

	const mainSvg = renderFaviconSvg(options.name, 512, frame);
	const mainPath = path.join(options.outDir, 'icon.svg');
	await Bun.write(mainPath, mainSvg);
	artifacts.push({file: mainPath, kind: 'svg', size: 512});

	const appleSvg = renderFaviconSvg(options.name, 180, frame);
	const applePath = path.join(options.outDir, 'apple-touch-icon.png');
	await Bun.write(applePath, appleSvg);
	artifacts.push({file: applePath, kind: 'png', size: 180});

	const icoBuffer = buildIco(renderFaviconSvg(options.name, 32, frame), 32);
	const icoPath = path.join(options.outDir, 'favicon.ico');
	await Bun.write(icoPath, icoBuffer);
	artifacts.push({file: icoPath, kind: 'ico', size: 32});

	const manifest = buildWebManifest({
		name: options.name,
		shortName,
		themeColor,
		backgroundColor,
	});
	const manifestPath = path.join(options.outDir, 'site.webmanifest');
	await Bun.write(manifestPath, JSON.stringify(manifest, undefined, '\t'));
	artifacts.push({file: manifestPath, kind: 'webmanifest'});

	return artifacts;
}
