import path from 'node:path';
import {Buffer} from 'node:buffer';
import {isSvgBuffer} from './utils.js';

export type ManifestOptions = {
	name: string;
	shortName: string;
	themeColor: string;
	backgroundColor: string;
};

type WebManifest = {
	name: string;
	short_name: string;
	icons: Array<{
		src: string;
		type: string;
		sizes: string;
		purpose: string;
	}>;
	theme_color: string;
	background_color: string;
	display: 'standalone';
};

const shortNameKey = 'short_name';
const themeColorKey = 'theme_color';
const backgroundColorKey = 'background_color';

export async function generateManifest(outputDir: string, options: ManifestOptions) {
	const manifest: WebManifest = {
		name: options.name,
		[shortNameKey]: options.shortName,
		icons: [
			{
				src: 'icon-192.png',
				type: 'image/png',
				sizes: '192x192',
				purpose: 'any maskable',
			},
			{
				src: 'icon-512.png',
				type: 'image/png',
				sizes: '512x512',
				purpose: 'any maskable',
			},
		],
		[themeColorKey]: options.themeColor,
		[backgroundColorKey]: options.backgroundColor,
		display: 'standalone',
	};

	await Bun.write(
		path.join(outputDir, 'site.webmanifest'),
		JSON.stringify(manifest, null, '\t'),
	);
}

export async function generateSvgIcon(outputDir: string, svgContent: Uint8Array | string) {
	const contentBuffer = typeof svgContent === 'string' ? Buffer.from(svgContent) : Buffer.from(svgContent);

	if (isSvgBuffer(contentBuffer)) {
		await Bun.write(path.join(outputDir, 'icon.svg'), contentBuffer);
	}
}
