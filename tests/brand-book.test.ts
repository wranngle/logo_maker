import {Buffer} from 'node:buffer';
import fs from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import process from 'node:process';
import {expect, test} from 'bun:test';
import {
	generateBrandBook,
	defaultPalette,
	defaultTypePairing,
} from '../src/brand-book.js';

test('generateBrandBook writes a PDF that is at least 10KB', async () => {
	const temporaryDirectory = await fs.mkdtemp(path.join(tmpdir(), 'logo-maker-brand-book-'));
	const outputPath = path.join(temporaryDirectory, 'brand-book.pdf');

	await generateBrandBook({
		inputFilePath: path.join(process.cwd(), 'raw', 'logo-data-url.txt'),
		outputPath,
		brandName: 'Wranngle',
		tagline: 'Brand-In-A-Box',
		palette: defaultPalette,
		typePairing: defaultTypePairing,
	});

	const stat = await fs.stat(outputPath);
	expect(stat.size).toBeGreaterThanOrEqual(10 * 1024);

	const head = await fs.readFile(outputPath);
	expect(Buffer.from(head.subarray(0, 5)).toString('binary')).toBe('%PDF-');
	expect(Buffer.from(head.subarray(-6)).toString('binary').includes('%%EOF')).toBe(true);
});

test('generateBrandBook still writes a PDF when the logo input is missing', async () => {
	const temporaryDirectory = await fs.mkdtemp(path.join(tmpdir(), 'logo-maker-brand-book-missing-'));
	const outputPath = path.join(temporaryDirectory, 'brand-book.pdf');

	await generateBrandBook({
		inputFilePath: path.join(temporaryDirectory, 'does-not-exist.png'),
		outputPath,
		brandName: 'Wranngle',
		tagline: 'No-logo fallback',
		palette: defaultPalette,
		typePairing: defaultTypePairing,
	});

	const buffer = await fs.readFile(outputPath);
	expect(Buffer.from(buffer.subarray(0, 5)).toString('binary')).toBe('%PDF-');
	expect(buffer.length).toBeGreaterThan(0);
});
