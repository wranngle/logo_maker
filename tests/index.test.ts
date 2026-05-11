import {Buffer} from 'node:buffer';
import fs from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import process from 'node:process';
import {expect, test} from 'bun:test';
import {generateEssentialFavicons} from '../src/generator.js';
import {generateManifest} from '../src/manifest.js';
import {isPngBuffer, parseInputFile} from '../src/utils.js';

type ManifestIcon = {
	src: string;
};

function isManifestIcon(value: unknown): value is ManifestIcon {
	return typeof value === 'object'
		&& value !== null
		&& 'src' in value
		&& typeof value.src === 'string';
}

function getManifestIcons(value: unknown): ManifestIcon[] {
	if (typeof value !== 'object' || value === null || !('icons' in value)) {
		throw new TypeError('Manifest does not contain icons.');
	}

	const {icons} = value;
	if (!Array.isArray(icons) || !icons.every(icon => isManifestIcon(icon))) {
		throw new TypeError('Manifest icons are invalid.');
	}

	return icons;
}

test('parseInputFile decodes PNG data URLs', async () => {
	const rawPath = path.join(process.cwd(), 'raw', 'logo-data-url.txt');
	const buffer = await parseInputFile(rawPath);

	expect(buffer).toBeInstanceOf(Buffer);
	expect(buffer.length).toBeGreaterThan(0);
	expect(isPngBuffer(buffer)).toBe(true);
});

test('colors exist', async () => {
	const {wranngleColors} = await import('../src/colors.js');
	expect(wranngleColors.sunset500).toBe('#ff5f00');
});

test('favicon.ico is an ICO container, not a mislabeled PNG', async () => {
	const temporaryDirectory = await fs.mkdtemp(path.join(tmpdir(), 'logo-maker-favicons-'));
	const input = await parseInputFile(path.join(process.cwd(), 'raw', 'logo-data-url.txt'));

	await generateEssentialFavicons(input, temporaryDirectory);

	const favicon = await fs.readFile(path.join(temporaryDirectory, 'favicon.ico'));
	expect(favicon.readUInt16LE(0)).toBe(0);
	expect(favicon.readUInt16LE(2)).toBe(1);
	expect(favicon.readUInt16LE(4)).toBe(1);
	expect(favicon.subarray(22, 30).equals(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]))).toBe(true);
});

test('manifest points to generated sibling icon files', async () => {
	const temporaryDirectory = await fs.mkdtemp(path.join(tmpdir(), 'logo-maker-manifest-'));

	await generateManifest(temporaryDirectory, {
		name: 'Wranngle',
		shortName: 'Wranngle',
		themeColor: '#ff5f00',
		backgroundColor: '#12111a',
	});

	const manifest = JSON.parse(await fs.readFile(path.join(temporaryDirectory, 'site.webmanifest'), 'utf8')) as unknown;
	const icons = getManifestIcons(manifest);

	expect(icons.map(icon => icon.src)).toEqual(['icon-192.png', 'icon-512.png']);
});
