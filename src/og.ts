import path from 'node:path';
import {minimal} from './templates/og/minimal.js';
import {bold} from './templates/og/bold.js';
import {gradient} from './templates/og/gradient.js';

export type OgTemplate = {
	name: string;
	width: number;
	height: number;
	render(logo: Uint8Array): Promise<Uint8Array>;
};

const registry: Record<string, OgTemplate> = {
	minimal,
	bold,
	gradient,
};

export const ogTemplateNames: readonly string[] = Object.keys(registry);

export function isOgTemplateName(value: string): boolean {
	return Object.hasOwn(registry, value);
}

export function getOgTemplate(name: string): OgTemplate {
	const template = registry[name];
	if (!template) {
		throw new Error(`Unknown og template: ${name}. Valid: ${ogTemplateNames.join(', ')}`);
	}

	return template;
}

export async function renderOgTemplate(name: string, logo: Uint8Array): Promise<Uint8Array> {
	return getOgTemplate(name).render(logo);
}

export async function writeOgTemplate(name: string, logo: Uint8Array, outputDir: string): Promise<string> {
	const buffer = await renderOgTemplate(name, logo);
	const filePath = path.join(outputDir, `og-image-${name}.png`);
	await Bun.write(filePath, buffer);
	return filePath;
}
