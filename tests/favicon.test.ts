import fs from 'node:fs/promises';
import {Buffer} from 'node:buffer';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {expect, test} from 'bun:test';
import {
	buildWebManifest,
	deriveMonogram,
	faviconSizes,
	generateFaviconPack,
	normalizeHex,
	renderFaviconSvg,
} from '../src/favicon.js';

async function makeTemporaryOut(prefix: string): Promise<string> {
	return fs.mkdtemp(path.join(tmpdir(), prefix));
}

test('deriveMonogram picks first two initials, falls back to W', () => {
	expect(deriveMonogram('Wranngle Labs')).toBe('WL');
	expect(deriveMonogram('Wranngle')).toBe('WR');
	expect(deriveMonogram('   ')).toBe('W');
	expect(deriveMonogram('foo bar baz')).toBe('FB');
});

test('normalizeHex accepts hex with or without leading hash', () => {
	expect(normalizeHex('#ff5f00')).toBe('#ff5f00');
	expect(normalizeHex('FF5F00')).toBe('#ff5f00');
	expect(() => normalizeHex('notahex')).toThrow();
});

test('renderFaviconSvg embeds the monogram, declared size, and frame colors', () => {
	const svg = renderFaviconSvg('Wranngle', 64, {background: '#12111a', ink: '#ff5f00'});
	expect(svg).toContain('viewBox="0 0 64 64"');
	expect(svg).toContain('width="64"');
	expect(svg).toContain('>WR<');
	expect(svg).toContain('fill="#12111a"');
	expect(svg).toContain('fill="#ff5f00"');
});

test('renderFaviconSvg XML-escapes monogram characters', () => {
	const svg = renderFaviconSvg('<weird>', 32, {background: '#000000', ink: '#ffffff'});
	expect(svg).toContain('&lt;W');
	expect(svg).not.toMatch(/>[\s]*<weird>/v);
});

test('generateFaviconPack writes >=9 sized icons plus webmanifest', async () => {
	const out = await makeTemporaryOut('logo-maker-favicon-');
	const artifacts = await generateFaviconPack({name: 'Wranngle Labs', outDir: out});

	const svgFiles = artifacts.filter(a => a.kind === 'svg');
	expect(svgFiles.length).toBeGreaterThanOrEqual(faviconSizes.length);

	const manifestArtifact = artifacts.find(a => a.kind === 'webmanifest');
	expect(manifestArtifact).toBeDefined();

	const totalFileCount = artifacts.length;
	expect(totalFileCount).toBeGreaterThanOrEqual(9);

	const manifestRaw = await fs.readFile(path.join(out, 'site.webmanifest'), 'utf8');
	const parsed: unknown = JSON.parse(manifestRaw);
	if (typeof parsed !== 'object' || parsed === null || !('name' in parsed) || !('icons' in parsed)) {
		throw new TypeError('Manifest missing expected keys');
	}

	expect(parsed.name).toBe('Wranngle Labs');
	const {icons} = parsed;
	if (!Array.isArray(icons)) {
		throw new TypeError('icons not array');
	}

	function pickSrc(icon: unknown): string | undefined {
		if (typeof icon !== 'object' || icon === null || !('src' in icon)) {
			return undefined;
		}

		const {src} = icon;
		return typeof src === 'string' ? src : undefined;
	}

	const srcs = icons.map(icon => pickSrc(icon)).filter((src): src is string => typeof src === 'string');
	expect(srcs).toContain('icon-512.png');
});

test('generateFaviconPack writes exact sized SVGs and apple-touch-icon', async () => {
	const out = await makeTemporaryOut('logo-maker-favicon-sizes-');
	await generateFaviconPack({name: 'Wranngle', outDir: out});

	const svgs = await Promise.all(faviconSizes.map(async size => ({size, svg: await fs.readFile(path.join(out, `icon-${size}.svg`), 'utf8')})));
	for (const {size, svg} of svgs) {
		expect(svg).toContain(`viewBox="0 0 ${size} ${size}"`);
	}

	const apple = await fs.readFile(path.join(out, 'apple-touch-icon.png'), 'utf8');
	expect(apple).toContain('viewBox="0 0 180 180"');
});

test('favicon.ico is a real ICO container header', async () => {
	const out = await makeTemporaryOut('logo-maker-favicon-ico-');
	await generateFaviconPack({name: 'Wranngle', outDir: out});

	const ico = await fs.readFile(path.join(out, 'favicon.ico'));
	const buf = Buffer.from(ico);
	expect(buf.readUInt16LE(0)).toBe(0);
	expect(buf.readUInt16LE(2)).toBe(1);
	expect(buf.readUInt16LE(4)).toBe(1);
});

test('buildWebManifest emits standalone display and theme/background colors', () => {
	const manifest = buildWebManifest({
		name: 'Wranngle',
		shortName: 'Wrn',
		themeColor: '#ff5f00',
		backgroundColor: '#12111a',
	});
	expect(manifest.display).toBe('standalone');
	expect(manifest.theme_color).toBe('#ff5f00');
	expect(manifest.background_color).toBe('#12111a');
	expect(manifest.short_name).toBe('Wrn');
	expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
});

test('generateFaviconPack respects theme + background overrides', async () => {
	const out = await makeTemporaryOut('logo-maker-favicon-colors-');
	await generateFaviconPack({
		name: 'Wranngle',
		outDir: out,
		themeColor: '#abcdef',
		backgroundColor: '#101010',
	});
	const svg = await fs.readFile(path.join(out, 'icon-32.svg'), 'utf8');
	expect(svg).toContain('fill="#abcdef"');
	expect(svg).toContain('fill="#101010"');
});
