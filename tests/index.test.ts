import {test, expect} from 'bun:test';
import fs from 'node:fs/promises';
import path from 'node:path';
import {parseInputFile} from '../src/utils.js';

test('parseInputFile with base64 PNG', async () => {
	const rawPath = path.join(process.cwd(), 'raw', 'orange_svg_code.txt');
	const buffer = await parseInputFile(rawPath);
	
	expect(buffer).toBeInstanceOf(Buffer);
	expect(buffer.length).toBeGreaterThan(0);
});

test('colors exist', async () => {
	const {wranngleColors} = await import('../src/colors.js');
	expect(wranngleColors.sunset500).toBe('#ff5f00');
});
