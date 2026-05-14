import sharp from 'sharp';
import {wranngleColors} from '../../colors.js';

const transparent = {
	r: 0,
	g: 0,
	b: 0,
	alpha: 0,
};

export const bold = {
	name: 'bold',
	width: 1600,
	height: 840,
	async render(logo: Uint8Array): Promise<Uint8Array> {
		const hero = await sharp(logo)
			.resize(720, 720, {fit: 'contain', background: transparent})
			.toBuffer();

		const accent = await sharp({
			create: {
				width: 1600,
				height: 24,
				channels: 4,
				background: wranngleColors.sunset500,
			},
		}).png().toBuffer();

		return sharp({
			create: {
				width: 1600,
				height: 840,
				channels: 4,
				background: wranngleColors.night950,
			},
		})
			.composite([
				{input: hero, gravity: 'center'},
				{input: accent, top: 816, left: 0},
			])
			.png()
			.toBuffer();
	},
};
