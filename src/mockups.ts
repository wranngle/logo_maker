import path from 'node:path';
import {Buffer} from 'node:buffer';
import {ensureDir} from './utils.js';
import {wranngleColors} from './colors.js';

const hexRe = /^#([\da-fA-F]{6})$/v;

export function slugify(value: string): string {
	const lowered = value.toLowerCase();
	const collapsed = lowered.replaceAll(/[^a-z0-9]+/gv, '-');
	const trimmed = collapsed.replaceAll(/^-+|-+$/gv, '');
	return trimmed || 'brand';
}

export function normalizeHex(input: string): string {
	const trimmed = input.trim();
	const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
	if (!hexRe.test(withHash)) {
		throw new Error(`--color requires a 6-digit hex (got: ${input})`);
	}

	return withHash.toLowerCase();
}

export function deriveMonogram(name: string): string {
	const cleaned = name.replaceAll(/[^A-Za-z0-9 ]+/gv, ' ').trim();
	if (!cleaned) {
		return '?';
	}

	const parts = cleaned.split(/\s+/v).filter(Boolean);
	if (parts.length >= 2) {
		return `${parts[0]![0]!}${parts[1]![0]!}`.toUpperCase();
	}

	const single = parts[0]!;
	if (single.length >= 2) {
		return single.slice(0, 2).toUpperCase();
	}

	return single.toUpperCase();
}

export type MockupKind = 'business-card' | 'mug' | 't-shirt' | 'social-header';

export type MockupOptions = {
	name: string;
	color: string;
	outDir: string;
};

export type MockupArtifact = {
	kind: MockupKind;
	file: string;
	width: number;
	height: number;
};

export type MockupsManifest = {
	name: string;
	slug: string;
	color: string;
	artifacts: MockupArtifact[];
};

type Surface = {
	background: string;
	accent: string;
	width: number;
	height: number;
};

/* eslint-disable no-bitwise -- canonical CRC-32 reference algorithm (IEEE 802.3 polynomial). */
const crcTable = (() => {
	const table = new Uint32Array(256);
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) {
			c = (c & 1) ? (0xED_B8_83_20 ^ (c >>> 1)) : (c >>> 1);
		}

		table[n] = c >>> 0;
	}

	return table;
})();

function crc32(bytes: Uint8Array): number {
	let c = 0xFF_FF_FF_FF;
	for (const byte of bytes) {
		c = (crcTable[(c ^ byte) & 0xFF]! ^ (c >>> 8)) >>> 0;
	}

	return (c ^ 0xFF_FF_FF_FF) >>> 0;
}
/* eslint-enable no-bitwise */

function chunk(type: string, data: Uint8Array): Uint8Array {
	const length = Buffer.alloc(4);
	length.writeUInt32BE(data.length, 0);
	const typeBytes = Buffer.from(type, 'ascii');
	const body = Buffer.concat([typeBytes, data]);
	const crc = Buffer.alloc(4);
	crc.writeUInt32BE(crc32(body), 0);
	return Buffer.concat([length, body, crc]);
}

function hexToRgb(hex: string): [number, number, number] {
	const v = hex.startsWith('#') ? hex.slice(1) : hex;
	return [
		Number.parseInt(v.slice(0, 2), 16),
		Number.parseInt(v.slice(2, 4), 16),
		Number.parseInt(v.slice(4, 6), 16),
	];
}

export function encodeSolidPng(width: number, height: number, hex: string): Uint8Array {
	const [r, g, b] = hexToRgb(hex);
	const stride = (width * 3) + 1;
	const raw = new Uint8Array(stride * height);
	for (let y = 0; y < height; y++) {
		const rowStart = y * stride;
		raw[rowStart] = 0;
		for (let x = 0; x < width; x++) {
			const p = rowStart + 1 + (x * 3);
			raw[p] = r;
			raw[p + 1] = g;
			raw[p + 2] = b;
		}
	}

	const compressed = Bun.deflateSync(raw);
	const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(width, 0);
	ihdr.writeUInt32BE(height, 4);
	ihdr.writeUInt8(8, 8);
	ihdr.writeUInt8(2, 9);
	ihdr.writeUInt8(0, 10);
	ihdr.writeUInt8(0, 11);
	ihdr.writeUInt8(0, 12);
	return Buffer.concat([
		signature,
		chunk('IHDR', ihdr),
		chunk('IDAT', compressed),
		chunk('IEND', new Uint8Array(0)),
	]);
}

export function isPngSignature(buffer: Uint8Array): boolean {
	const sig = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
	return sig.every((value, index) => buffer[index] === value);
}

export function readPngDimensions(buffer: Uint8Array): {width: number; height: number} {
	const view = Buffer.from(buffer);
	return {
		width: view.readUInt32BE(16),
		height: view.readUInt32BE(20),
	};
}

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll('\'', '&apos;');
}

function relativeLuminance(hex: string): number {
	const [r, g, b] = hexToRgb(hex);
	return ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;
}

function inkFor(background: string): string {
	return relativeLuminance(background) > 0.55 ? wranngleColors.night950 : wranngleColors.sand50;
}

const surfaces: Record<MockupKind, Surface> = {
	'business-card': {
		background: wranngleColors.sand50, accent: wranngleColors.night950, width: 1050, height: 600,
	},
	mug: {
		background: wranngleColors.white, accent: wranngleColors.night950, width: 1200, height: 1024,
	},
	't-shirt': {
		background: wranngleColors.night950, accent: wranngleColors.sand50, width: 1280, height: 1280,
	},
	'social-header': {
		background: wranngleColors.night950, accent: wranngleColors.sunset500, width: 1500, height: 500,
	},
};

export const mockupOrder: readonly MockupKind[] = [
	'business-card',
	'mug',
	't-shirt',
	'social-header',
];

function renderSvg(kind: MockupKind, name: string, color: string): string {
	const surface = surfaces[kind];
	const safe = escapeXml(name);
	const mark = escapeXml(deriveMonogram(name));
	const ink = inkFor(surface.background);
	const cx = surface.width / 2;
	const cy = surface.height / 2;

	switch (kind) {
		case 'business-card': {
			return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${surface.width} ${surface.height}" width="${surface.width}" height="${surface.height}">
  <rect width="${surface.width}" height="${surface.height}" fill="${surface.background}"/>
  <rect x="40" y="40" width="${surface.width - 80}" height="${surface.height - 80}" fill="none" stroke="${color}" stroke-width="8"/>
  <circle cx="160" cy="${cy}" r="80" fill="${color}"/>
  <text x="160" y="${cy + 16}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="72" fill="${inkFor(color)}">${mark}</text>
  <text x="280" y="${cy - 16}" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="56" fill="${ink}">${safe}</text>
  <text x="280" y="${cy + 48}" font-family="Inter, system-ui, sans-serif" font-weight="400" font-size="28" fill="${ink}" opacity="0.7">hello@${slugify(name)}.com</text>
</svg>
`;
		}

		case 'mug': {
			const bodyX = 200;
			const bodyW = surface.width - 600;
			const bodyH = surface.height - 240;
			const bodyY = 120;
			return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${surface.width} ${surface.height}" width="${surface.width}" height="${surface.height}">
  <rect width="${surface.width}" height="${surface.height}" fill="${surface.background}"/>
  <rect x="${bodyX}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="40" fill="${surface.accent}"/>
  <ellipse cx="${bodyX + bodyW + 100}" cy="${cy}" rx="100" ry="160" fill="none" stroke="${surface.accent}" stroke-width="40"/>
  <circle cx="${bodyX + (bodyW / 2)}" cy="${cy}" r="160" fill="${color}"/>
  <text x="${bodyX + (bodyW / 2)}" y="${cy + 56}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="160" fill="${inkFor(color)}">${mark}</text>
  <text x="${bodyX + (bodyW / 2)}" y="${bodyY + bodyH + 60}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="600" font-size="44" fill="${surface.accent}">${safe}</text>
</svg>
`;
		}

		case 't-shirt': {
			return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${surface.width} ${surface.height}" width="${surface.width}" height="${surface.height}">
  <rect width="${surface.width}" height="${surface.height}" fill="${surface.background}"/>
  <path d="M 240 280 L 480 160 L 560 240 L 720 240 L 800 160 L 1040 280 L 960 480 L 880 440 L 880 1120 L 400 1120 L 400 440 L 320 480 Z" fill="${surface.accent}"/>
  <circle cx="${cx}" cy="${cy + 40}" r="220" fill="${color}"/>
  <text x="${cx}" y="${cy + 110}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="220" fill="${inkFor(color)}">${mark}</text>
  <text x="${cx}" y="${cy + 360}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="64" fill="${surface.accent}">${safe}</text>
</svg>
`;
		}

		case 'social-header': {
			return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${surface.width} ${surface.height}" width="${surface.width}" height="${surface.height}">
  <rect width="${surface.width}" height="${surface.height}" fill="${surface.background}"/>
  <rect x="0" y="${surface.height - 24}" width="${surface.width}" height="24" fill="${color}"/>
  <circle cx="200" cy="${cy}" r="140" fill="${color}"/>
  <text x="200" y="${cy + 32}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="140" fill="${inkFor(color)}">${mark}</text>
  <text x="400" y="${cy - 20}" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="96" fill="${surface.accent}">${safe}</text>
  <text x="400" y="${cy + 60}" font-family="Inter, system-ui, sans-serif" font-weight="400" font-size="40" fill="${surface.accent}" opacity="0.7">${slugify(name)}.com</text>
</svg>
`;
		}
	}
}

export function renderMockupSvg(kind: MockupKind, name: string, color: string): string {
	return renderSvg(kind, name, color);
}

export function surfaceFor(kind: MockupKind): Surface {
	return surfaces[kind];
}

export async function generateMockups(options: MockupOptions): Promise<MockupsManifest> {
	const slug = slugify(options.name);
	const color = normalizeHex(options.color);
	const targetDir = path.join(options.outDir, slug);
	await ensureDir(targetDir);

	const plans = mockupOrder.map(kind => {
		const surface = surfaces[kind];
		return {
			kind,
			svgFile: path.join(targetDir, `mockup.${kind}.svg`),
			pngFile: path.join(targetDir, `mockup.${kind}.png`),
			svg: renderMockupSvg(kind, options.name, color),
			png: encodeSolidPng(surface.width, surface.height, surface.background),
			width: surface.width,
			height: surface.height,
		};
	});

	await Promise.all(plans.flatMap(plan => [
		Bun.write(plan.svgFile, plan.svg),
		Bun.write(plan.pngFile, plan.png),
	]));

	const artifacts: MockupArtifact[] = plans.map(plan => ({
		kind: plan.kind,
		file: plan.pngFile,
		width: plan.width,
		height: plan.height,
	}));

	const manifest: MockupsManifest = {
		name: options.name, slug, color, artifacts,
	};

	await Bun.write(
		path.join(targetDir, 'mockups.json'),
		JSON.stringify(
			{
				name: manifest.name,
				slug: manifest.slug,
				color: manifest.color,
				artifacts: manifest.artifacts.map(({kind, file, width, height}) => ({
					kind,
					file: path.basename(file),
					width,
					height,
				})),
			},
			undefined,
			'\t',
		),
	);

	return manifest;
}
