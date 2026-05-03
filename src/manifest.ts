import fs from 'node:fs/promises';
import path from 'node:path';
import {Buffer} from 'node:buffer';

export async function generateManifest(outputDir: string) {
	const manifest = {
		name: 'Wranngle App',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		short_name: 'Wranngle',
		icons: [
			{
				src: '/icon-192.png',
				type: 'image/png',
				sizes: '192x192',
				purpose: 'any maskable',
			},
			{
				src: '/icon-512.png',
				type: 'image/png',
				sizes: '512x512',
				purpose: 'any maskable',
			},
		],
		// eslint-disable-next-line @typescript-eslint/naming-convention
		theme_color: '#ff5f00',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		background_color: '#12111a',
		display: 'standalone',
	};

	await fs.writeFile(
		path.join(outputDir, 'site.webmanifest'),
		JSON.stringify(manifest, null, '\t'),
	);
}

export async function generateSvgIcon(outputDir: string, svgContent: Uint8Array | string) {
	// If the input was an SVG, we write it as icon.svg
	// Since we might be given a PNG, we'll gracefully skip if it's not SVG
	const contentStr = typeof svgContent === 'string' ? svgContent : Buffer.from(svgContent).toString('utf8');
	if (contentStr.includes('<svg')) {
		// In a real scenario we could inject the prefers-color-scheme media query
		// For now we just save the master SVG
		await fs.writeFile(path.join(outputDir, 'icon.svg'), contentStr);
	}
}
