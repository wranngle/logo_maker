import {Buffer} from 'node:buffer';
import fs from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import process from 'node:process';
import {expect, test} from 'bun:test';
import sharp from 'sharp';
import {parseInputFile} from '../src/utils.js';
import {
	ogTemplateNames,
	getOgTemplate,
	isOgTemplateName,
	renderOgTemplate,
	writeOgTemplate,
} from '../src/og.js';

const expectedTemplates = ['minimal', 'bold', 'gradient'];

async function loadFixtureLogo(): Promise<Uint8Array> {
	return parseInputFile(path.join(process.cwd(), 'raw', 'logo-data-url.txt'));
}

test('OG template registry exposes minimal, bold, gradient', () => {
	for (const name of expectedTemplates) {
		expect(isOgTemplateName(name)).toBe(true);
	}

	expect(new Set(ogTemplateNames)).toEqual(new Set(expectedTemplates));
});

test('OG template registry rejects unknown names', () => {
	expect(isOgTemplateName('mystery')).toBe(false);
	expect(() => getOgTemplate('mystery')).toThrow(/Unknown og template/v);
});

test('each OG template renders distinct dimensions', async () => {
	const logo = await loadFixtureLogo();
	const dimensions = new Map<string, string>();

	for (const name of expectedTemplates) {
		// eslint-disable-next-line no-await-in-loop
		const buffer = await renderOgTemplate(name, logo);
		// eslint-disable-next-line no-await-in-loop
		const meta = await sharp(buffer).metadata();
		const template = getOgTemplate(name);
		expect(meta.width).toBe(template.width);
		expect(meta.height).toBe(template.height);
		expect(meta.format).toBe('png');
		dimensions.set(name, `${meta.width}x${meta.height}`);
	}

	const uniqueShapes = new Set(dimensions.values());
	expect(uniqueShapes.size).toBe(expectedTemplates.length);
});

test('writeOgTemplate("bold") emits og-image-bold.png with non-trivial bytes', async () => {
	const logo = await loadFixtureLogo();
	const temporaryDirectory = await fs.mkdtemp(path.join(tmpdir(), 'logo-maker-og-'));

	const written = await writeOgTemplate('bold', logo, temporaryDirectory);
	expect(written).toBe(path.join(temporaryDirectory, 'og-image-bold.png'));

	const stat = await fs.stat(written);
	expect(stat.size).toBeGreaterThan(2048);

	const meta = await sharp(await fs.readFile(written)).metadata();
	expect(meta.format).toBe('png');
	expect(meta.width).toBe(1600);
	expect(meta.height).toBe(840);
});

test('rendered outputs differ byte-for-byte across templates', async () => {
	const logo = await loadFixtureLogo();
	const minimalBuffer = Buffer.from(await renderOgTemplate('minimal', logo));
	const boldBuffer = Buffer.from(await renderOgTemplate('bold', logo));
	const gradientBuffer = Buffer.from(await renderOgTemplate('gradient', logo));

	expect(minimalBuffer.equals(boldBuffer)).toBe(false);
	expect(minimalBuffer.equals(gradientBuffer)).toBe(false);
	expect(boldBuffer.equals(gradientBuffer)).toBe(false);
});
