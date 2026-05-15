import {expect, test} from 'bun:test';
import {recommendPairing, type TypeStyle} from '../src/types.js';

const allowedGoogleFonts = new Set<string>([
	'Inter',
	'Playfair Display',
	'Source Serif Pro',
	'Bebas Neue',
	'JetBrains Mono',
]);

const styles: TypeStyle[] = ['serif', 'sans', 'display', 'mono'];

test('recommendPairing returns heading + body fonts for every supported style', () => {
	for (const style of styles) {
		const pairing = recommendPairing(style);
		expect(typeof pairing.heading).toBe('string');
		expect(typeof pairing.body).toBe('string');
		expect(pairing.heading.length).toBeGreaterThan(0);
		expect(pairing.body.length).toBeGreaterThan(0);
	}
});

test('recommendPairing("sans") returns fonts drawn from the allowed Google Fonts list', () => {
	const pairing = recommendPairing('sans');
	expect(allowedGoogleFonts.has(pairing.heading)).toBe(true);
	expect(allowedGoogleFonts.has(pairing.body)).toBe(true);
});

test('every style pairing is sourced from the allowed Google Fonts list', () => {
	for (const style of styles) {
		const pairing = recommendPairing(style);
		expect(allowedGoogleFonts.has(pairing.heading)).toBe(true);
		expect(allowedGoogleFonts.has(pairing.body)).toBe(true);
	}
});

test('recommendPairing is deterministic across repeated calls', () => {
	const first = recommendPairing('display');
	const second = recommendPairing('display');
	expect(first).toEqual(second);
});
