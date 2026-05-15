import fs from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {expect, test} from 'bun:test';
import {
	deriveMonogram,
	generateVariations,
	normalizeHex,
	renderVariation,
	slugify,
	variationOrder,
} from '../src/variations.js';

const seedName = 'Wranngle Labs';
const seedColor = '#0a0aff';

async function makeTemporaryOut(prefix: string): Promise<string> {
	return fs.mkdtemp(path.join(tmpdir(), prefix));
}

test('slugify lowercases, collapses, and trims separators', () => {
	expect(slugify('Wranngle Labs')).toBe('wranngle-labs');
	expect(slugify('  --FOO__bar!! ')).toBe('foo-bar');
	expect(slugify('')).toBe('brand');
});

test('normalizeHex accepts 6-digit hex with or without leading hash', () => {
	expect(normalizeHex('#FF5F00')).toBe('#ff5f00');
	expect(normalizeHex('ff5f00')).toBe('#ff5f00');
});

test('normalizeHex rejects malformed input', () => {
	expect(() => normalizeHex('not-a-hex')).toThrow(/6-digit hex/v);
	expect(() => normalizeHex('#abc')).toThrow(/6-digit hex/v);
});

test('deriveMonogram picks the first two word initials', () => {
	expect(deriveMonogram('Wranngle Labs')).toBe('WL');
	expect(deriveMonogram('acme')).toBe('AC');
	expect(deriveMonogram('A')).toBe('A');
	expect(deriveMonogram('!!')).toBe('?');
});

test('renderVariation returns SVG for each variation', () => {
	for (const variation of variationOrder) {
		const svg = renderVariation(variation, seedName, seedColor);
		expect(svg).toMatch(/^<\?xml/v);
		expect(svg).toContain('<svg');
		expect(svg).toContain('</svg>');
	}
});

test('generateVariations emits 5 SVGs with the documented filenames', async () => {
	const outDir = await makeTemporaryOut('logo-maker-variations-');
	const manifest = await generateVariations({
		name: seedName,
		color: seedColor,
		outDir,
	});

	expect(manifest.slug).toBe('wranngle-labs');
	expect(manifest.color).toBe('#0a0aff');
	expect(manifest.artifacts).toHaveLength(5);

	const expectedNames = [
		'logo.wordmark.svg',
		'logo.monogram.svg',
		'logo.icon.svg',
		'logo.dark.svg',
		'logo.light.svg',
	];
	const actualNames = manifest.artifacts.map(a => path.basename(a.file));
	expect(actualNames).toEqual(expectedNames);

	const contents = await Promise.all(expectedNames.map(async expected => fs.readFile(path.join(outDir, manifest.slug, expected), 'utf8')));
	for (const content of contents) {
		expect(content).toMatch(/^<\?xml/v);
		expect(content).toContain('<svg');
	}
});

test('generateVariations bakes the brand name into the wordmark SVG', async () => {
	const outDir = await makeTemporaryOut('logo-maker-variations-name-');
	await generateVariations({name: seedName, color: seedColor, outDir});
	const wordmark = await fs.readFile(
		path.join(outDir, 'wranngle-labs', 'logo.wordmark.svg'),
		'utf8',
	);
	expect(wordmark).toContain('Wranngle Labs');
});

type ManifestArtifact = {variation: string; file: string};
type Manifest = {name: string; slug: string; color: string; artifacts: ManifestArtifact[]};

function isManifestArtifact(value: unknown): value is ManifestArtifact {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate: Record<string, unknown> = {...value};
	return typeof candidate.variation === 'string' && typeof candidate.file === 'string';
}

function asManifest(value: unknown): Manifest {
	if (typeof value !== 'object' || value === null) {
		throw new TypeError('Invalid variations manifest shape.');
	}

	const candidate: Record<string, unknown> = {...value};
	if (
		typeof candidate.slug !== 'string'
		|| typeof candidate.name !== 'string'
		|| typeof candidate.color !== 'string'
		|| !Array.isArray(candidate.artifacts)
		|| !candidate.artifacts.every(artifact => isManifestArtifact(artifact))
	) {
		throw new TypeError('Invalid variations manifest shape.');
	}

	return {
		name: candidate.name,
		slug: candidate.slug,
		color: candidate.color,
		artifacts: candidate.artifacts,
	};
}

test('generateVariations writes a variations.json manifest', async () => {
	const outDir = await makeTemporaryOut('logo-maker-variations-manifest-');
	await generateVariations({name: seedName, color: seedColor, outDir});
	const manifestPath = path.join(outDir, 'wranngle-labs', 'variations.json');
	const manifest = asManifest(JSON.parse(await fs.readFile(manifestPath, 'utf8')));
	expect(manifest.slug).toBe('wranngle-labs');
	expect(manifest.color).toBe('#0a0aff');
	expect(manifest.artifacts.map(a => a.variation)).toEqual([
		'wordmark',
		'monogram',
		'icon',
		'dark',
		'light',
	]);
});

test('dark and light variations invert ink against the brand color', async () => {
	const outDir = await makeTemporaryOut('logo-maker-variations-darklight-');
	await generateVariations({name: seedName, color: seedColor, outDir});
	const dark = await fs.readFile(path.join(outDir, 'wranngle-labs', 'logo.dark.svg'), 'utf8');
	const light = await fs.readFile(path.join(outDir, 'wranngle-labs', 'logo.light.svg'), 'utf8');
	expect(dark).toContain('#12111a');
	expect(light).toContain('#fcfaf5');
});

test('generateVariations is deterministic for identical seed input', async () => {
	const outA = await makeTemporaryOut('logo-maker-variations-detA-');
	const outB = await makeTemporaryOut('logo-maker-variations-detB-');
	const manifestA = await generateVariations({name: seedName, color: seedColor, outDir: outA});
	const manifestB = await generateVariations({name: seedName, color: seedColor, outDir: outB});

	expect(manifestA.artifacts.map(a => a.svg)).toEqual(manifestB.artifacts.map(a => a.svg));
});
