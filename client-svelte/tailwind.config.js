/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			height: {
				screen: ['100vh', '100dvh']
			},
			screens: {
				xs: '320px'
			},
			boxShadow: {
				float: '0px 0px 4px 0px rgba(0,0,0,0.25)'
			},
			colors: {
				text: 'rgb(var(--color-text) / <alpha-value>)',
				background: 'rgb(var(--color-background) / <alpha-value>)',
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				'primary-content': 'rgb(var(--color-primary-content) / <alpha-value>)',
				'primary-focus': 'rgb(var(--color-primary-focus) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				'secondary-content': 'rgb(var(--color-secondary-content) / <alpha-value>)',
				accent: 'rgb(var(--color-accent) / <alpha-value>)',
				'accent-content': 'rgb(var(--color-accent-content) / <alpha-value>)',
				'accent-2': 'rgb(var(--color-accent-2) / <alpha-value>)',
				'accent-2-content': 'rgb(var(--color-accent-2-content) / <alpha-value>)',
				'accent-2-focus': 'rgb(var(--color-accent-2-focus) / <alpha-value>)',

				'background-1': 'rgb(var(--color-background-1) / <alpha-value>)',
				'background-1-content': 'rgb(var(--color-background-1-content) / <alpha-value>)',
				'background-2': 'rgb(var(--color-background-2) / <alpha-value>)',
				'background-2-content': 'rgb(var(--color-background-2-content) / <alpha-value>)',
				foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
				'foreground-content': 'rgb(var(--color-foreground-content) / <alpha-value>)',
				'foreground-2': 'rgb(var(--color-foreground-2) / <alpha-value>)',
				'foreground-2-content': 'rgb(var(--color-foreground-2-content) / <alpha-value>)',

				'dialog-bg-1': 'rgb(var(--color-dialog-bg-1) / <alpha-value>)',
				'dialog-bg-2': 'rgb(var(--color-dialog-bg-2) / <alpha-value>)',

				error: 'rgb(var(--color-error) / <alpha-value>)',
				'error-focus': 'rgb(var(--color-error-focus) / <alpha-value>)',
				warning: 'rgb(var(--color-warning) / <alpha-value>)',
				success: 'rgb(var(--color-success) / <alpha-value>)',

				'line-1': 'rgb(var(--color-line-1) / <alpha-value>)'
			},
			keyframes: {
				blink: {
					'0%': {
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': {
						opacity: '0'
					}
				}
			},
			animation: {
				blink: 'blink 1060ms steps(1) infinite'
			}
		}
	},
	plugins: []
};
