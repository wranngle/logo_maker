import {Buffer} from 'node:buffer';
import sharp from 'sharp';
import {wranngleColors} from '../../colors.js';

const transparent = {
	r: 0,
	g: 0,
	b: 0,
	alpha: 0,
};

const gradientWidth = 1400;
const gradientHeight = 735;

function buildGradientSvg(): Uint8Array {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${gradientWidth}" height="${gradientHeight}">
		<defs>
			<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stop-color="${wranngleColors.violet500}"/>
				<stop offset="100%" stop-color="${wranngleColors.sunset500}"/>
			</linearGradient>
		</defs>
		<rect width="${gradientWidth}" height="${gradientHeight}" fill="url(#g)"/>
	</svg>`;
	return Buffer.from(svg);
}

export const gradient = {
	name: 'gradient',
	width: gradientWidth,
	height: gradientHeight,
	async render(logo: Uint8Array): Promise<Uint8Array> {
		const background = await sharp(buildGradientSvg()).png().toBuffer();
		const inset = await sharp(logo)
			.resize(540, 540, {fit: 'contain', background: transparent})
			.toBuffer();

		return sharp(background)
			.composite([{input: inset, gravity: 'center'}])
			.png()
			.toBuffer();
	},
};
