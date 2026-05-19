import {spawnSync} from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import {describe, expect, test} from 'bun:test';
import {
	generateTaglines,
	normalizeAdjective,
	normalizeName,
} from '../src/tagline.js';

const entry = path.resolve(import.meta.dir, '..', 'src', 'tagline.ts');
const bunBin = process.env.BUN_INSTALL ? `${process.env.BUN_INSTALL}/bin/bun` : `${process.env.HOME}/.bun/bin/bun`;

describe('tagline normalization', () => {
	test('normalizeAdjective lowercases and trims', () => {
		expect(normalizeAdjective('  Bold  ')).toBe('bold');
	});

	test('normalizeAdjective rejects empty', () => {
		expect(() => normalizeAdjective('')).toThrow();
	});

	test('normalizeAdjective rejects symbols', () => {
		expect(() => normalizeAdjective('bold!')).toThrow();
	});

	test('normalizeName trims and allows mixed case', () => {
		expect(normalizeName('  Wranngle  ')).toBe('Wranngle');
	});

	test('normalizeName rejects empty', () => {
		expect(() => normalizeName('   ')).toThrow();
	});
});

describe('generateTaglines (mock)', () => {
	test('returns 5 taglines, each with text + rationale', async () => {
		const result = await generateTaglines({name: 'Wranngle', adjective: 'bold', mock: true});
		expect(result.taglines).toHaveLength(5);
		for (const tagline of result.taglines) {
			expect(typeof tagline.text).toBe('string');
			expect(tagline.text.length).toBeGreaterThan(0);
			expect(typeof tagline.rationale).toBe('string');
			expect(tagline.rationale.length).toBeGreaterThan(0);
		}
	});

	test('preserves name + adjective on the result', async () => {
		const result = await generateTaglines({name: 'Logo Maker', adjective: 'precise', mock: true});
		expect(result.name).toBe('Logo Maker');
		expect(result.adjective).toBe('precise');
	});

	test('every tagline mentions the brand name OR adjective', async () => {
		const result = await generateTaglines({name: 'Wranngle', adjective: 'bold', mock: true});
		for (const tagline of result.taglines) {
			const lower = tagline.text.toLowerCase();
			expect(lower.includes('wranngle') || lower.includes('bold')).toBe(true);
		}
	});

	test('rationale references the adjective', async () => {
		const result = await generateTaglines({name: 'Wranngle', adjective: 'bold', mock: true});
		for (const tagline of result.taglines) {
			expect(tagline.rationale.toLowerCase()).toContain('bold');
		}
	});

	test('deterministic: same input yields byte-identical output', async () => {
		const a = await generateTaglines({name: 'Wranngle', adjective: 'bold', mock: true});
		const b = await generateTaglines({name: 'Wranngle', adjective: 'bold', mock: true});
		expect(JSON.stringify(a)).toBe(JSON.stringify(b));
	});
});

describe('tagline CLI --mock', () => {
	test('stdout is parseable JSON matching {taglines: string[5]} contract', () => {
		const result = spawnSync(bunBin, [entry, 'Wranngle', 'bold', '--mock'], {encoding: 'utf8'});
		expect(result.status).toBe(0);
		const raw: unknown = JSON.parse(result.stdout);
		if (!raw || typeof raw !== 'object') {
			throw new Error('tagline stdout not an object');
		}

		const parsed: Record<string, unknown> = {...raw};
		const taglines: unknown[] = Array.isArray(parsed.taglines) ? parsed.taglines : [];
		expect(taglines).toHaveLength(5);
		for (const tagline of taglines) {
			if (!tagline || typeof tagline !== 'object') {
				throw new Error('tagline entry not an object');
			}

			const t: Record<string, unknown> = {...tagline};
			expect(typeof t.text).toBe('string');
			expect(typeof t.rationale).toBe('string');
			expect(String(t.rationale).length).toBeGreaterThan(0);
		}
	});

	test('exits non-zero on missing args', () => {
		const result = spawnSync(bunBin, [entry], {encoding: 'utf8'});
		expect(result.status).not.toBe(0);
	});

	test('accepts --name/--adjective flag form', () => {
		const result = spawnSync(
			bunBin,
			[entry, '--name', 'Wranngle', '--adjective', 'bold', '--mock'],
			{encoding: 'utf8'},
		);
		expect(result.status).toBe(0);
		const raw: unknown = JSON.parse(result.stdout);
		if (!raw || typeof raw !== 'object') {
			throw new Error('tagline stdout not an object');
		}

		const parsed: Record<string, unknown> = {...raw};
		expect(parsed.name).toBe('Wranngle');
		expect(parsed.adjective).toBe('bold');
	});
});
