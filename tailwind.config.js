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
				// Main Green Palette
				green: {
					50: '#F0FDF4',   // Mint cream
					100: '#DCFCE7',  // Soft mint
					200: '#BBF7D0',  // Fresh mint
					300: '#86EFAC',  // Light sage
					400: '#4ADE80',  // Bright lime green
					500: '#22C55E',  // Standard green
					600: '#16A34A',  // Forest green
					700: '#15803D',  // Deep forest
					800: '#166534',  // Dark evergreen
					900: '#14532D',  // Dark forest green
					950: '#052E16',  // Near-black green
				},

				// Brand Colors
				'brand-primary': '#22C55E',        // Main brand green
				'brand-secondary': '#4ADE80',      // Light accent green
				'brand-accent': '#16A34A',         // Dark accent green
				'brand-muted': '#86EFAC',          // Muted green
				'brand-cream': '#F0FDF4',          // Light background
				'brand-forest': '#14532D',         // Dark foreground

				// Semantic Colors
				'success': '#16A34A',
				'warning': '#EAB308',
				'danger': '#EF4444',
				'info': '#22C55E',

				// UI System Colors
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "#22C55E",
					foreground: "#F0FDF4",
				},
				secondary: {
					DEFAULT: "#4ADE80",
					foreground: "#14532D",
				},
				destructive: {
					DEFAULT: "#EF4444",
					foreground: "#FFFFFF",
				},
				muted: {
					DEFAULT: "#86EFAC",
					foreground: "#14532D",
				},
				accent: {
					DEFAULT: "#16A34A",
					foreground: "#F0FDF4",
				},
				popover: {
					DEFAULT: "#FFFFFF",
					foreground: "#14532D",
				},
				card: {
					DEFAULT: "#FFFFFF",
					foreground: "#14532D",
				},
			},

			// Green-focused gradients
			backgroundImage: {
				'primary-gradient': 'linear-gradient(135deg, #4ade80, #22c55e, #16a34a)',
				'hero-gradient': 'linear-gradient(90deg, #4ade80, #22c55e, #16a34a)',
				'overlay-gradient': 'linear-gradient(135deg, rgba(20, 83, 45, 0.85), rgba(22, 163, 74, 0.75))',
				'body-light': 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
				'body-dark': 'linear-gradient(135deg, #14532d 0%, #166534 100%)',
				'btn-primary': 'linear-gradient(135deg, #22c55e, #16a34a)',
				'btn-primary-hover': 'linear-gradient(135deg, #16a34a, #15803d)',
				'btn-secondary': 'linear-gradient(135deg, #4ade80, #22c55e)',
				'btn-secondary-hover': 'linear-gradient(135deg, #22c55e, #16a34a)',
				'card-gradient': 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), transparent)',
				'card-hover': 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(255, 255, 255, 0.05))',
			},

			// Green-themed shadows
			boxShadow: {
				'glow-subtle': '0 0 20px rgba(34, 197, 94, 0.25)',
				'glow-medium': '0 0 30px rgba(34, 197, 94, 0.5)',
				'glow-strong': '0 0 40px rgba(34, 197, 94, 0.75)',
				'btn-hover': '0 10px 25px rgba(34, 197, 94, 0.5)',
				'card-hover': '0 20px 40px rgba(74, 222, 128, 0.15)',
			},

			// Backdrop Blur
			backdropBlur: {
				'glass': '16px',
				'glass-strong': '20px',
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