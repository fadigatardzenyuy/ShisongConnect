/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				// Core Green palette
				green: {
					50: '#F0FDF4',   // Mint cream
					100: '#DCFCE7',  // Soft mint
					200: '#BBF7D0',  // Fresh mint
					300: '#86EFAC',  // Light sage
					400: '#4ADE80',  // Spring green
					500: '#22C55E',  // Emerald
					600: '#16A34A',  // Forest green
					700: '#15803D',  // Deep forest
					800: '#166534',  // Dark evergreen
					900: '#14532D',  // Rich moss
					950: '#052E16',  // Near-black green
				},

				// Complementary colors
				harmony: {
					cream: '#F0FDF4',  // Mint cream
					sage: '#DCFCE7',   // Soft mint
					moss: '#BBF7D0',   // Fresh mint
					leaf: '#86EFAC',   // Light sage
					forest: '#16A34A', // Forest green
				},

				// Semantic colors
				success: '#16A34A',
				warning: '#EAB308',
				danger: '#EF4444',
				info: '#0EA5E9',

				// UI colors
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "var(--color-primary)",
					foreground: "var(--color-primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--color-secondary)",
					foreground: "var(--color-secondary-foreground)",
				},
				destructive: {
					DEFAULT: "var(--color-destructive)",
					foreground: "var(--color-destructive-foreground)",
				},
				muted: {
					DEFAULT: "var(--color-muted)",
					foreground: "var(--color-muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--color-accent)",
					foreground: "var(--color-accent-foreground)",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Medical-specific colors
				'doctor-blue': '#0284C7',
				'nurse-teal': '#0D9488',
				'pharmacy-purple': '#7C3AED',
				'emergency-red': '#DC2626',
				'hygiene-white': '#F8FAFC',
			},
			transitionDuration: {
				'250': '250ms',
				'300': '300ms',
				'400': '400ms',
				'500': '500ms',
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"slide-up": {
					"0%": { transform: "translateY(100%)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				"bounce-slow": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" },
				},
				"pulse-soft": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.7" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"slide-up": "slide-up 0.3s ease-out",
				"bounce-slow": "bounce-slow 2s infinite",
				"float": "float 3s ease-in-out infinite",
				"pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
}