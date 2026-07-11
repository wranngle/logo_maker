const config = [
	{
		// The showcase/ tree is hand-authored browser marketing-motion art
		// (WebGL + Canvas in plain <script> files), not part of the Bun CLI
		// surface that xo's Node/Bun config understands.
		ignores: ['showcase/**'],
	},
];

export default config;
