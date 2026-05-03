import fs from 'node:fs/promises';
import {Buffer} from 'node:buffer';

export async function parseInputFile(filePath: string): Promise<Uint8Array> {
	const content = await fs.readFile(filePath, 'utf8');

	if (content.startsWith('data:image/png;base64,')) {
		const base64Data = content.replace('data:image/png;base64,', '');
		return Buffer.from(base64Data, 'base64');
	}

	if (content.startsWith('data:image/svg+xml;base64,')) {
		const base64Data = content.replace('data:image/svg+xml;base64,', '');
		return Buffer.from(base64Data, 'base64');
	}

	if (content.startsWith('<svg') || content.includes('<svg')) {
		return Buffer.from(content, 'utf8');
	}

	// Assume it's already a raw buffer (e.g. a pure PNG or SVG file)
	return fs.readFile(filePath);
}

export async function ensureDir(dir: string) {
	await fs.mkdir(dir, {recursive: true});
}
