import fs from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {expect, test} from 'bun:test';
import {buildAnimatedIntroSvg, generateAnimatedIntro} from '../src/animated.js';

test('buildAnimatedIntroSvg emits SVG with animation primitives', () => {
	const svg = buildAnimatedIntroSvg();

	expect(svg).toContain('<svg');
	expect(svg).toContain('</svg>');
	expect(svg.includes('<animate') || svg.includes('stroke-dasharray')).toBe(true);
	expect(svg).toContain('<animate');
	expect(svg).toContain('stroke-dasharray');
});

test('buildAnimatedIntroSvg honours custom duration and colors', () => {
	const svg = buildAnimatedIntroSvg({
		durationSeconds: 3.5,
		strokeColor: '#abcdef',
		fillColor: '#123456',
	});

	expect(svg).toContain('dur="3.5s"');
	expect(svg).toContain('#abcdef');
	expect(svg).toContain('#123456');
});

test('generateAnimatedIntro writes intro.svg under 50KB', async () => {
	const temporaryDirectory = await fs.mkdtemp(path.join(tmpdir(), 'logo-maker-animated-'));
	const filePath = await generateAnimatedIntro(temporaryDirectory);

	expect(filePath.endsWith('intro.svg')).toBe(true);

	const written = await fs.readFile(filePath, 'utf8');
	expect(written).toContain('<svg');
	expect(written.includes('<animate') || written.includes('stroke-dasharray')).toBe(true);

	const {size} = await fs.stat(filePath);
	expect(size).toBeLessThan(50 * 1024);
});
