import path from 'node:path';
import {wranngleColors} from './colors.js';

export type AnimatedIntroOptions = {
	durationSeconds?: number;
	strokeColor?: string;
	fillColor?: string;
	size?: number;
};

const defaultOptions = {
	durationSeconds: 2,
	strokeColor: wranngleColors.sunset500,
	fillColor: wranngleColors.violet500,
	size: 256,
};

type ResolvedOptions = Required<AnimatedIntroOptions>;

function resolveOptions(options: AnimatedIntroOptions): ResolvedOptions {
	return {
		durationSeconds: options.durationSeconds ?? defaultOptions.durationSeconds,
		strokeColor: options.strokeColor ?? defaultOptions.strokeColor,
		fillColor: options.fillColor ?? defaultOptions.fillColor,
		size: options.size ?? defaultOptions.size,
	};
}

const wPath = 'M 40 80 L 70 180 L 100 100 L 130 180 L 160 80';
const rPath = 'M 180 80 L 180 180 M 180 80 Q 220 80 220 110 Q 220 140 180 140 L 215 180';

export function buildAnimatedIntroSvg(options: AnimatedIntroOptions = {}): string {
	const {durationSeconds, strokeColor, fillColor, size} = resolveOptions(options);
	const dashLength = 600;
	const fillDelay = durationSeconds * 0.6;
	const fillDuration = durationSeconds * 0.4;

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="${size}" height="${size}" role="img" aria-label="Wranngle animated intro">
	<title>Wranngle</title>
	<g fill="none" stroke="${strokeColor}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
		<path d="${wPath}" stroke-dasharray="${dashLength}" stroke-dashoffset="${dashLength}">
			<animate attributeName="stroke-dashoffset" from="${dashLength}" to="0" dur="${durationSeconds}s" fill="freeze" />
			<animate attributeName="fill" from="none" to="${fillColor}" begin="${fillDelay}s" dur="${fillDuration}s" fill="freeze" />
		</path>
		<path d="${rPath}" stroke-dasharray="${dashLength}" stroke-dashoffset="${dashLength}">
			<animate attributeName="stroke-dashoffset" from="${dashLength}" to="0" dur="${durationSeconds}s" begin="0.2s" fill="freeze" />
		</path>
	</g>
</svg>
`;
}

export async function generateAnimatedIntro(outputDir: string, options: AnimatedIntroOptions = {}): Promise<string> {
	const svg = buildAnimatedIntroSvg(options);
	const filePath = path.join(outputDir, 'intro.svg');
	await Bun.write(filePath, svg);
	return filePath;
}
