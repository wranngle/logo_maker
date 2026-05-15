import {Buffer} from 'node:buffer';
import fs from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import process from 'node:process';
import {expect, test} from 'bun:test';
import {
	deriveMonogram,
	encodeSolidPng,
	generateMockups,
	isPngSignature,
	mockupOrder,
	normalizeHex,
	readPngDimensions,
	renderMockupSvg,
	slugify,
	surfaceFor,
} from '../src/mockups.js';

type ManifestShape = {
	artifacts: unknown[];
};

function asManifestShape(value: unknown): ManifestShape {
	if (typeof value !== 'object' || value === null || !('artifacts' in value)) {
		throw new TypeError('manifest missing artifacts');
	}

	const {artifacts} = value;
	if (!Array.isArray(artifacts)) {
		throw new TypeError('manifest.artifacts must be an array');
	}

	return {artifacts: artifacts as unknown[]};
}

test('mockupOrder ships exactly the 4 promised kinds', () => {
	expect([...mockupOrder]).toEqual(['business-card', 'mug', 't-shirt', 'social-header']);
});

test('encodeSolidPng emits a valid PNG signature and recoverable dimensions', () => {
	const png = encodeSolidPng(1024, 768, '#ff5f00');
	expect(isPngSignature(png)).toBe(true);
	const {width, height} = readPngDimensions(png);
	expect(width).toBe(1024);
	expect(height).toBe(768);
});

test('every surface is at least 1024px wide (covers the PR contract)', () => {
	for (const kind of mockupOrder) {
		const surface = surfaceFor(kind);
		expect(surface.width).toBeGreaterThanOrEqual(1024);
		expect(surface.height).toBeGreaterThanOrEqual(500);
	}
});

test('generateMockups writes 4 PNGs + 4 SVGs + manifest into <out>/<slug>', async () => {
	const temporaryDirectory = await fs.mkdtemp(path.join(tmpdir(), 'logo-maker-mockups-'));
	const manifest = await generateMockups({
		name: 'Acme Robotics',
		color: '#0066ff',
		outDir: temporaryDirectory,
	});

	expect(manifest.slug).toBe('acme-robotics');
	expect(manifest.color).toBe('#0066ff');
	expect(manifest.artifacts).toHaveLength(4);

	const brandDirectory = path.join(temporaryDirectory, 'acme-robotics');
	const pngs = await Promise.all(mockupOrder.map(async kind => fs.readFile(path.join(brandDirectory, `mockup.${kind}.png`))));
	const svgs = await Promise.all(mockupOrder.map(async kind => fs.readFile(path.join(brandDirectory, `mockup.${kind}.svg`), 'utf8')));

	for (const png of pngs) {
		expect(isPngSignature(png)).toBe(true);
		expect(readPngDimensions(png).width).toBeGreaterThanOrEqual(1024);
	}

	for (const svg of svgs) {
		expect(svg.startsWith('<?xml version="1.0"')).toBe(true);
		expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
	}

	const manifestJson = JSON.parse(await fs.readFile(path.join(brandDirectory, 'mockups.json'), 'utf8')) as unknown;
	expect(asManifestShape(manifestJson).artifacts).toHaveLength(4);
});

test('renderMockupSvg embeds the brand name and monogram', () => {
	const svg = renderMockupSvg('business-card', 'Acme Robotics', '#0066ff');
	expect(svg).toContain('Acme Robotics');
	expect(svg).toContain('AR');
});

test('renderMockupSvg escapes XML-hostile characters in the brand name', () => {
	const svg = renderMockupSvg('social-header', 'A & B <inc>', '#0066ff');
	expect(svg).toContain('A &amp; B &lt;inc&gt;');
	expect(svg).not.toContain('A & B <inc>');
});

test('slugify trims edge garbage and collapses non-alphanumerics', () => {
	expect(slugify('  Wranngle Co.  ')).toBe('wranngle-co');
	expect(slugify('@@@!!!')).toBe('brand');
});

test('normalizeHex accepts both #-prefixed and bare hex, rejects junk', () => {
	expect(normalizeHex('FF5F00')).toBe('#ff5f00');
	expect(normalizeHex('#ff5f00')).toBe('#ff5f00');
	expect(() => normalizeHex('not-a-color')).toThrow(/6-digit hex/v);
});

test('deriveMonogram handles single-word and multi-word names', () => {
	expect(deriveMonogram('Wranngle')).toBe('WR');
	expect(deriveMonogram('Acme Robotics')).toBe('AR');
	expect(deriveMonogram('X')).toBe('X');
});

test('generateMockups is deterministic for the same inputs (PR contract sibling to #14 variations)', async () => {
	const [dirA, dirB] = await Promise.all([
		fs.mkdtemp(path.join(tmpdir(), 'logo-maker-mockups-a-')),
		fs.mkdtemp(path.join(tmpdir(), 'logo-maker-mockups-b-')),
	]);
	await Promise.all([
		generateMockups({name: 'Wranngle', color: '#ff5f00', outDir: dirA}),
		generateMockups({name: 'Wranngle', color: '#ff5f00', outDir: dirB}),
	]);

	const pairs = await Promise.all(mockupOrder.flatMap(kind => [
		Promise.all([
			fs.readFile(path.join(dirA, 'wranngle', `mockup.${kind}.svg`)),
			fs.readFile(path.join(dirB, 'wranngle', `mockup.${kind}.svg`)),
		]),
		Promise.all([
			fs.readFile(path.join(dirA, 'wranngle', `mockup.${kind}.png`)),
			fs.readFile(path.join(dirB, 'wranngle', `mockup.${kind}.png`)),
		]),
	]));

	for (const [left, right] of pairs) {
		expect(Buffer.compare(left, right)).toBe(0);
	}
});

test('shipped templates/mockups/*.png placeholders are all ≥1024px wide and valid PNGs', async () => {
	const root = path.join(process.cwd(), 'templates', 'mockups');
	const buffers = await Promise.all(mockupOrder.map(async kind => fs.readFile(path.join(root, `${kind}.png`))));
	for (const buffer of buffers) {
		expect(isPngSignature(buffer)).toBe(true);
		expect(readPngDimensions(buffer).width).toBeGreaterThanOrEqual(1024);
	}
});
