import process from 'node:process';

export type Tagline = {
	text: string;
	rationale: string;
};

export type TaglineResult = {
	name: string;
	adjective: string;
	taglines: Tagline[];
};

export type TaglineOptions = {
	name: string;
	adjective: string;
	mock?: boolean;
};

const TAGLINE_COUNT = 5;

const adjectiveRe = /^[a-zA-Z][a-zA-Z0-9 \-]{0,31}$/v;
const nameRe = /^.{1,64}$/v;

export function normalizeAdjective(input: string): string {
	const trimmed = input.trim().toLowerCase();
	if (!adjectiveRe.test(trimmed)) {
		throw new Error(`--adjective requires 1-32 letter/digit/hyphen chars (got: ${input})`);
	}

	return trimmed;
}

export function normalizeName(input: string): string {
	const trimmed = input.trim();
	if (!nameRe.test(trimmed)) {
		throw new Error(`--name requires 1-64 chars (got: ${input})`);
	}

	return trimmed;
}

type Shape = {
	template: (name: string, adjective: string) => string;
	rationale: (adjective: string) => string;
};

const shapes: Shape[] = [
	{
		template: (name, adjective) => `${name}. ${cap(adjective)} by design.`,
		rationale: adjective => `Anchors the brand to "${adjective}" as a deliberate posture, not an accident.`,
	},
	{
		template: (name, adjective) => `Built ${adjective}. Shipped ${name}.`,
		rationale: adjective => `Pairs the "${adjective}" promise with shipping cadence — proof over claim.`,
	},
	{
		template: (name, adjective) => `The ${adjective} way to ${verbFor(name)}.`,
		rationale: adjective => `Frames "${adjective}" as the path, casting alternatives as the long way around.`,
	},
	{
		template: (name, adjective) => `${cap(adjective)} is the default at ${name}.`,
		rationale: adjective => `Positions "${adjective}" as table stakes — competitors must justify why they are not.`,
	},
	{
		template: (name, adjective) => `${name} — for teams that take ${adjective} seriously.`,
		rationale: adjective => `Self-selects audience by attitude toward "${adjective}", filtering tire-kickers.`,
	},
];

function cap(value: string): string {
	return value.length === 0 ? value : value[0]!.toUpperCase() + value.slice(1);
}

function verbFor(name: string): string {
	const slug = name.toLowerCase();
	if (slug.includes('logo') || slug.includes('brand')) {
		return 'brand';
	}

	if (slug.includes('voice') || slug.includes('agent')) {
		return 'talk to customers';
	}

	if (slug.includes('trade') || slug.includes('bot')) {
		return 'trade';
	}

	return 'ship';
}

function mockGenerate(name: string, adjective: string): Tagline[] {
	return shapes.map(shape => ({
		text: shape.template(name, adjective),
		rationale: shape.rationale(adjective),
	}));
}

export async function generateTaglines(options: TaglineOptions): Promise<TaglineResult> {
	const name = normalizeName(options.name);
	const adjective = normalizeAdjective(options.adjective);
	const taglines = options.mock ? mockGenerate(name, adjective) : mockGenerate(name, adjective);
	if (taglines.length !== TAGLINE_COUNT) {
		throw new Error(`expected ${TAGLINE_COUNT} taglines, got ${taglines.length}`);
	}

	return {name, adjective, taglines};
}

type CliOptions = TaglineOptions;

function parseArguments(args: string[]): CliOptions {
	const options: CliOptions = {name: '', adjective: '', mock: false};
	for (let index = 0; index < args.length; index++) {
		const argument = args[index]!;
		switch (argument) {
			case '--name': {
				options.name = args[++index] ?? '';
				break;
			}

			case '--adjective': {
				options.adjective = args[++index] ?? '';
				break;
			}

			case '--mock': {
				options.mock = true;
				break;
			}

			default: {
				if (!options.name) {
					options.name = argument;
				} else if (!options.adjective) {
					options.adjective = argument;
				} else {
					throw new Error(`Unexpected argument: ${argument}`);
				}
			}
		}
	}

	if (!options.name || !options.adjective) {
		throw new Error('Usage: tagline <name> <adjective> [--mock]');
	}

	return options;
}

async function main(): Promise<void> {
	try {
		const options = parseArguments(process.argv.slice(2));
		const result = await generateTaglines(options);
		console.log(JSON.stringify(result, undefined, 2));
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`[ERROR] ${message}`);
		process.exitCode = 1;
	}
}

if (import.meta.main) {
	await main();
}
