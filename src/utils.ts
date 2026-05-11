import {Buffer} from 'node:buffer';

const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

export function isPngBuffer(buffer: Uint8Array): boolean {
	return Buffer.from(buffer.subarray(0, pngSignature.length)).equals(pngSignature);
}

export function isSvgBuffer(buffer: Uint8Array): boolean {
	const content = Buffer.from(buffer.subarray(0, 512)).toString('utf8').trimStart();
	return content.startsWith('<svg') || (content.startsWith('<?xml') && content.includes('<svg'));
}

function decodeDataUrl(content: string): Uint8Array | undefined {
	const match = /^data:image\/(?:png|svg\+xml);base64,([\s\S]+)$/iv.exec(content.trim());
	if (!match) {
		return undefined;
	}

	return Buffer.from(match[1]!.replaceAll(/\s/gv, ''), 'base64');
}

export async function parseInputFile(filePath: string): Promise<Uint8Array> {
	const fileBuffer = Buffer.from(await Bun.file(filePath).arrayBuffer());

	if (isPngBuffer(fileBuffer)) {
		return fileBuffer;
	}

	const textCandidate = fileBuffer.toString('utf8').trim();
	const dataUrlBuffer = decodeDataUrl(textCandidate);

	if (dataUrlBuffer) {
		return dataUrlBuffer;
	}

	if (isSvgBuffer(fileBuffer)) {
		return fileBuffer;
	}

	throw new Error(`Unsupported input format: ${filePath}`);
}

export async function ensureDir(dir: string) {
	await Bun.$`mkdir -p ${dir}`.quiet();
}
