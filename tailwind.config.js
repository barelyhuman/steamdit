// eslint-disable-next-line unicorn/prefer-module
const {fontFamily} = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			maxWidth: {
				content: '48rem',
			},
			fontSize: {
				sm: '13px',
				md: '15px',
			},
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
			},
			colors: {
				base: 'var(--base)',
				surface: 'var(--surface)',
				overlay: 'var(--overlay)',
				muted: 'var(--muted)',
				subtle: 'var(--subtle)',
				text: 'var(--text)',
				accent: 'var(--accent)',
				'on-accent': 'var(--on-accent)',
			},
			borderColor: (theme) => ({
				DEFAULT: theme('colors.overlay', 'currentColor'),
			}),
		},
	},
	plugins: [],
}
