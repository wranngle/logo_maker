export type TypeStyle = 'serif' | 'sans' | 'display' | 'mono';

export type FontPairing = {
	heading: string;
	body: string;
};

const pairings: Record<TypeStyle, FontPairing> = {
	serif: {heading: 'Playfair Display', body: 'Source Serif Pro'},
	sans: {heading: 'Inter', body: 'Inter'},
	display: {heading: 'Bebas Neue', body: 'Inter'},
	mono: {heading: 'JetBrains Mono', body: 'Inter'},
};

export function recommendPairing(style: TypeStyle): FontPairing {
	return pairings[style];
}
