import {Buffer} from 'node:buffer';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import process from 'node:process';
import {describe, expect, test} from 'bun:test';
import {normalizeHex, runKit, slugify} from '../src/kit.js';

async function makeTempDir(prefix: string): Promise<string> {
	return fs.mkdtemp(path.join(tmpdir(), `logo-maker-kit-${prefix}-`));
}

async function md5(filePath: string): Promise<string> {
	const data = await fs.readFile(filePath);
	return crypto.createHash('md5').update(data).digest('hex');
}

const expectedArtifacts = [
	'logo.svg',
	'logo.png',
	'favicon.ico',
	'palette.json',
	'type-pairing.json',
	'og.png',
	'brand-book.pdf',
	'README.md',
];

describe('logo-maker kit', () => {
	test('happy path produces all 8 expected artifacts in out/<slug>/', async () => {
		const out = await makeTempDir('happy');
		const manifest = await runKit({name: 'Wranngle', color: '#00aa00', outDir: out});
		expect(manifest.slug).toBe('wranngle');

		const slugDir = path.join(out, 'wranngle');
		for (const file of expectedArtifacts) {
			const fullPath = path.join(slugDir, file);
			const stat = await fs.stat(fullPath);
			expect(stat.size).toBeGreaterThan(0);
		}

		const failed = manifest.steps.filter(s => s.status === 'failed');
		expect(failed).toEqual([]);
	});

	test('CLI: missing name exits non-zero', async () => {
		const proc = Bun.spawn([process.execPath, 'run', 'src/index.ts', 'kit', '--color', '#00aa00'], {
			cwd: process.cwd(),
			stdout: 'pipe',
			stderr: 'pipe',
		});
		const exit = await proc.exited;
		expect(exit).not.toBe(0);
	});

	test('CLI: missing --color exits non-zero', async () => {
		const proc = Bun.spawn([process.execPath, 'run', 'src/index.ts', 'kit', 'Wranngle'], {
			cwd: process.cwd(),
			stdout: 'pipe',
			stderr: 'pipe',
		});
		const exit = await proc.exited;
		expect(exit).not.toBe(0);
	});

	test('determinism: same name + color produces identical palette.json', async () => {
		const outA = await makeTempDir('det-a');
		const outB = await makeTempDir('det-b');
		const m1 = await runKit({name: 'Wranngle', color: '#00aa00', outDir: outA});
		const m2 = await runKit({name: 'Wranngle', color: '#00aa00', outDir: outB});
		expect(m1.slug).toBe(m2.slug);

		const hashA = await md5(path.join(outA, m1.slug, 'palette.json'));
		const hashB = await md5(path.join(outB, m2.slug, 'palette.json'));
		expect(hashA).toBe(hashB);

		const svgA = await md5(path.join(outA, m1.slug, 'logo.svg'));
		const svgB = await md5(path.join(outB, m2.slug, 'logo.svg'));
		expect(svgA).toBe(svgB);
	});

	test('manifest steps include ok statuses for each round-1 dependency', async () => {
		const out = await makeTempDir('deps');
		const manifest = await runKit({name: 'Acme Inc', color: '#cf3c69', outDir: out});
		const stepsByArtifact = new Map(manifest.steps.map(s => [s.artifact, s.status]));
		expect(stepsByArtifact.get('logo.svg')).toBe('ok');
		expect(stepsByArtifact.get('palette.json')).toBe('ok');
		expect(stepsByArtifact.get('type-pairing.json')).toBe('ok');
		expect(stepsByArtifact.get('og.png')).toBe('ok');
		expect(stepsByArtifact.get('brand-book.pdf')).toBe('ok');
	});

	test('slugify collapses non-alphanumerics', () => {
		expect(slugify('Wranngle')).toBe('wranngle');
		expect(slugify('Acme Inc.')).toBe('acme-inc');
		expect(slugify('  ')).toBe('kit');
		expect(slugify('Foo--Bar!!')).toBe('foo-bar');
	});

	test('normalizeHex enforces 6-digit hex and adds leading hash', () => {
		expect(normalizeHex('#ABCDEF')).toBe('#abcdef');
		expect(normalizeHex('ABCDEF')).toBe('#abcdef');
		expect(() => normalizeHex('#abc')).toThrow();
		expect(() => normalizeHex('zzzzzz')).toThrow();
	});

	test('kit.json is a valid manifest pointing at the steps', async () => {
		const out = await makeTempDir('manifest');
		const m = await runKit({name: 'Wranngle', color: '#00aa00', outDir: out});
		const kitJson = JSON.parse(await fs.readFile(path.join(out, m.slug, 'kit.json'), 'utf8')) as {name: string; slug: string; steps: unknown[]};
		expect(kitJson.name).toBe('Wranngle');
		expect(kitJson.slug).toBe('wranngle');
		expect(kitJson.steps.length).toBeGreaterThanOrEqual(8);
	});

	test('README.md links every expected artifact', async () => {
		const out = await makeTempDir('readme');
		const m = await runKit({name: 'Wranngle', color: '#00aa00', outDir: out});
		const readme = await fs.readFile(path.join(out, m.slug, 'README.md'), 'utf8');
		for (const file of expectedArtifacts) {
			if (file === 'README.md') continue;
			expect(readme).toContain(file);
		}
	});

	test('logo.png decodes as a real PNG (signature)', async () => {
		const out = await makeTempDir('png');
		const m = await runKit({name: 'Wranngle', color: '#00aa00', outDir: out});
		const buffer = await fs.readFile(path.join(out, m.slug, 'logo.png'));
		const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
		expect(buffer.subarray(0, signature.length).equals(signature)).toBe(true);
	});
});
