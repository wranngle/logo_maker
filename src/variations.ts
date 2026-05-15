import path from 'node:path';
import {ensureDir} from './utils.js';
import {wranngleColors} from './colors.js';

export type VariationName = 'wordmark' | 'monogram' | 'icon' | 'dark' | 'light';

export type VariationsOptions = {
	name: string;
	color: string;
	outDir: string;
};

export type VariationArtifact = {
	variation: VariationName;
	file: string;
	svg: string;
};

export type VariationsManifest = {
	name: string;
	slug: string;
	color: string;
	artifacts: VariationArtifact[];
};

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

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll('\'', '&apos;');
}

function hexToRgb(hex: string): [number, number, number] {
	const value = hex.startsWith('#') ? hex.slice(1) : hex;
	return [
		Number.parseInt(value.slice(0, 2), 16),
		Number.parseInt(value.slice(2, 4), 16),
		Number.parseInt(value.slice(4, 6), 16),
	];
}

function relativeLuminance(hex: string): number {
	const [r, g, b] = hexToRgb(hex);
	return ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;
}

function pickInkFor(background: string): string {
	return relativeLuminance(background) > 0.55 ? wranngleColors.night950 : wranngleColors.sand50;
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

type SvgFrame = {
	background: string;
	ink: string;
};

function frameFor(variation: VariationName, color: string): SvgFrame {
	switch (variation) {
		case 'dark': {
			return {background: wranngleColors.night950, ink: wranngleColors.sand50};
		}

		case 'light': {
			return {background: wranngleColors.sand50, ink: wranngleColors.night950};
		}

		case 'wordmark':
		case 'monogram':
		case 'icon': {
			return {background: color, ink: pickInkFor(color)};
		}
	}
}

function renderWordmark(name: string, frame: SvgFrame): string {
	const safe = escapeXml(name);
	const fontSize = Math.max(96, Math.min(220, Math.floor((900 * 1.8) / Math.max(name.length, 1))));
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 384" width="1024" height="384">
  <rect width="1024" height="384" fill="${frame.background}"/>
  <text x="512" y="192" text-anchor="middle" dominant-baseline="central"
        font-family="Inter, system-ui, sans-serif" font-weight="700"
        font-size="${fontSize}" fill="${frame.ink}">${safe}</text>
</svg>
`;
}

function renderMonogram(name: string, frame: SvgFrame): string {
	const mark = escapeXml(deriveMonogram(name));
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="${frame.background}"/>
  <text x="512" y="540" text-anchor="middle" dominant-baseline="central"
        font-family="Inter, system-ui, sans-serif" font-weight="800"
        font-size="560" fill="${frame.ink}">${mark}</text>
</svg>
`;
}

function renderIcon(frame: SvgFrame): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="${frame.background}"/>
  <circle cx="512" cy="512" r="320" fill="none" stroke="${frame.ink}" stroke-width="64"/>
  <circle cx="512" cy="512" r="120" fill="${frame.ink}"/>
</svg>
`;
}

export function renderVariation(variation: VariationName, name: string, color: string): string {
	const frame = frameFor(variation, color);
	switch (variation) {
		case 'wordmark':
		case 'dark':
		case 'light': {
			return renderWordmark(name, frame);
		}

		case 'monogram': {
			return renderMonogram(name, frame);
		}

		case 'icon': {
			return renderIcon(frame);
		}
	}
}

export const variationOrder: readonly VariationName[] = [
	'wordmark',
	'monogram',
	'icon',
	'dark',
	'light',
];

export async function generateVariations(options: VariationsOptions): Promise<VariationsManifest> {
	const slug = slugify(options.name);
	const color = normalizeHex(options.color);
	const targetDir = path.join(options.outDir, slug);
	await ensureDir(targetDir);

	const artifacts: VariationArtifact[] = variationOrder.map(variation => ({
		variation,
		file: path.join(targetDir, `logo.${variation}.svg`),
		svg: renderVariation(variation, options.name, color),
	}));

	await Promise.all(artifacts.map(async artifact => Bun.write(artifact.file, artifact.svg)));

	const manifest: VariationsManifest = {
		name: options.name,
		slug,
		color,
		artifacts,
	};

	await Bun.write(
		path.join(targetDir, 'variations.json'),
		JSON.stringify(
			{
				name: manifest.name,
				slug: manifest.slug,
				color: manifest.color,
				artifacts: manifest.artifacts.map(({variation, file}) => ({
					variation,
					file: path.basename(file),
				})),
			},
			undefined,
			'\t',
		),
	);

	return manifest;
}
