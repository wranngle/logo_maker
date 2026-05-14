import sharp from 'sharp';
import {wranngleColors} from '../../colors.js';

const transparent = {
	r: 0,
	g: 0,
	b: 0,
	alpha: 0,
};

export const minimal = {
	name: 'minimal',
	width: 1200,
	height: 630,
	async render(logo: Uint8Array): Promise<Uint8Array> {
		const inset = await sharp(logo)
			.resize(420, 420, {fit: 'contain', background: transparent})
			.toBuffer();

		return sharp({
			create: {
				width: 1200,
				height: 630,
				channels: 4,
				background: wranngleColors.sand50,
			},
		})
			.composite([{input: inset, gravity: 'center'}])
			.png()
			.toBuffer();
	},
};
