import fs from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import process from 'node:process';
import {expect, test} from 'bun:test';
import {extractPalette, paletteToCss, paletteToJson} from '../src/palette.js';

const fixturePath = path.join(process.cwd(), 'raw', 'logo-data-url.txt');

test('extractPalette returns exactly 5 colors with hex, rgb, and name', async () => {
	const palette = await extractPalette(fixturePath, 5);

	expect(palette).toHaveLength(5);
	for (const color of palette) {
		expect(color.hex).toMatch(/^#[\da-f]{6}$/v);
		expect(color.rgb).toHaveLength(3);
		for (const channel of color.rgb) {
			expect(channel).toBeGreaterThanOrEqual(0);
			expect(channel).toBeLessThanOrEqual(255);
			expect(Number.isInteger(channel)).toBe(true);
		}

		expect(color.name).toMatch(/^brand-[1-5]$/v);
	}
});

test('paletteToCss emits 5 --brand-N variables under :root', async () => {
	const palette = await extractPalette(fixturePath, 5);
	const css = paletteToCss(palette);

	expect(css).toContain(':root {');
	const matches = css.match(/--brand-\d:\s*#[\da-f]{6};/gv) ?? [];
	expect(matches).toHaveLength(5);
	for (let index = 1; index <= 5; index++) {
		expect(css).toContain(`--brand-${index}:`);
	}
});

type ParsedColor = {hex: string; rgb: [number, number, number]; name: string};
type ParsedPalette = {colors: ParsedColor[]};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function isParsedColor(value: unknown): value is ParsedColor {
	if (!isRecord(value)) {
		return false;
	}

	return typeof value.hex === 'string'
		&& Array.isArray(value.rgb)
		&& value.rgb.length === 3
		&& value.rgb.every(channel => typeof channel === 'number')
		&& typeof value.name === 'string';
}

function asParsedPalette(value: unknown): ParsedPalette {
	if (!isRecord(value) || !Array.isArray(value.colors) || !value.colors.every(entry => isParsedColor(entry))) {
		throw new TypeError('Parsed palette JSON is malformed.');
	}

	return {colors: value.colors};
}

test('paletteToJson is parseable and has 5 entries with required fields', async () => {
	const palette = await extractPalette(fixturePath, 5);
	const json = paletteToJson(palette);
	const parsed = asParsedPalette(JSON.parse(json));

	expect(parsed.colors).toHaveLength(5);
	for (const color of parsed.colors) {
		expect(typeof color.hex).toBe('string');
		expect(Array.isArray(color.rgb)).toBe(true);
		expect(color.rgb).toHaveLength(3);
		expect(typeof color.name).toBe('string');
	}
});

test('palette files land in output/brand/ when written to a tmp dir', async () => {
	const temporaryDirectory = await fs.mkdtemp(path.join(tmpdir(), 'logo-maker-palette-'));
	const brandDir = path.join(temporaryDirectory, 'brand');
	await fs.mkdir(brandDir, {recursive: true});

	const palette = await extractPalette(fixturePath, 5);
	const cssPath = path.join(brandDir, 'palette.css');
	const jsonPath = path.join(brandDir, 'palette.json');
	await Bun.write(cssPath, paletteToCss(palette));
	await Bun.write(jsonPath, paletteToJson(palette));

	const cssContents = await fs.readFile(cssPath, 'utf8');
	const jsonContents = await fs.readFile(jsonPath, 'utf8');
	expect(cssContents).toContain('--brand-1:');
	const parsed = asParsedPalette(JSON.parse(jsonContents));
	expect(parsed.colors).toHaveLength(5);
});
