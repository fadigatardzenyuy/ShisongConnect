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
				// Bleen Core Green Palette - matching your CSS variables
				green: {
					50: '#F0FDF4',   // Mint cream - matches --background
					100: '#DCFCE7',  // Soft mint
					200: '#BBF7D0',  // Fresh mint - matches --input
					300: '#86EFAC',  // Light sage - matches --border
					400: '#4ADE80',  // Bright lime green - matches --color-secondary
					500: '#22C55E',  // Standard green - matches --color-primary
					600: '#16A34A',  // Forest green
					700: '#15803D',  // Deep forest
					800: '#166534',  // Dark evergreen
					900: '#14532D',  // Dark forest green - matches --foreground
					950: '#052E16',  // Near-black green
				},

				// Bleen Complementary Palette
				emerald: {
					50: '#ECFDF5',
					100: '#D1FAE5',
					200: '#A7F3D0',
					300: '#6EE7B7',
					400: '#34D399',  // Part of hero gradient
					500: '#10B981',  // Rich emerald - matches --color-accent
					600: '#059669',  // Deep emerald shadow - matches dark --card
					700: '#047857',
					800: '#065F46',  // Deep emerald shadow - matches dark theme
					900: '#064E3B',
					950: '#022C22',
				},

				// Bleen Teal Palette
				teal: {
					50: '#F0FDFA',
					100: '#CCFBF1',
					200: '#99F6E4',
					300: '#5EEAD4',
					400: '#2DD4BF',  // Light teal - matches --color-muted
					500: '#14B8A6',
					600: '#0D9488',  // Part of gradients
					700: '#0F766E',
					800: '#115E59',
					900: '#134E4A',  // Dark teal shadow - matches dark --muted and --input
					950: '#042F2E',
				},

				// Bleen Brand Colors - directly from your CSS
				'bleen-primary': '#22C55E',        // --color-primary
				'bleen-secondary': '#4ADE80',      // --color-secondary
				'bleen-accent': '#10B981',         // --color-accent
				'bleen-muted': '#2DD4BF',          // --color-muted
				'bleen-cream': '#F0FDF4',          // Mint cream background
				'bleen-forest': '#14532D',         // Dark forest foreground

				// Medical/Healthcare Semantic Colors
				'medical-success': '#16A34A',
				'medical-warning': '#EAB308',
				'medical-danger': '#EF4444',
				'medical-info': '#0EA5E9',
				'doctor-blue': '#0284C7',
				'nurse-teal': '#0D9488',
				'pharmacy-purple': '#7C3AED',
				'emergency-red': '#DC2626',
				'hygiene-white': '#F8FAFC',

				// UI System Colors - matching your CSS variables
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
			},

			// Background Images/Gradients - matching your CSS
			backgroundImage: {
				'bleen-primary-gradient': 'linear-gradient(135deg, #4ade80, #10b981, #0d9488)',
				'bleen-hero-gradient': 'linear-gradient(90deg, #4ade80, #34d399, #2dd4bf, #22c55e)',
				'bleen-overlay-primary': 'linear-gradient(135deg, rgba(20, 83, 45, 0.85), rgba(6, 95, 70, 0.75), rgba(19, 78, 74, 0.85))',
				'bleen-overlay-secondary': 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), transparent, rgba(20, 83, 45, 0.3))',
				'bleen-body-light': 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
				'bleen-body-dark': 'linear-gradient(135deg, #14532d 0%, #065f46 100%)',
				'btn-primary': 'linear-gradient(135deg, #22c55e, #059669, #0d9488)',
				'btn-primary-hover': 'linear-gradient(135deg, #16a34a, #047857, #0f766e)',
				'btn-accent': 'linear-gradient(135deg, #4ade80, #10b981)',
				'btn-accent-hover': 'linear-gradient(135deg, #22c55e, #059669)',
				'feature-card': 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), transparent, rgba(16, 185, 129, 0.1))',
				'feature-card-hover': 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(255, 255, 255, 0.05), rgba(16, 185, 129, 0.15))',
				'medical-alert': 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(255, 255, 255, 0.05))',
				'medical-alert-warning': 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(255, 255, 255, 0.05))',
				'medical-alert-danger': 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(255, 255, 255, 0.05))',
				'icon-green': 'linear-gradient(135deg, #4ade80, #059669)',
				'icon-emerald': 'linear-gradient(135deg, #34d399, #0d9488)',
				'icon-teal': 'linear-gradient(135deg, #2dd4bf, #22c55e)',
				'loading-screen': 'linear-gradient(135deg, #14532d, #065f46, #134e4a)',
			},

			// Box Shadows - matching your glow effects
			boxShadow: {
				'glow-green-subtle': '0 0 20px rgba(34, 197, 94, 0.25)',
				'glow-green-medium': '0 0 30px rgba(34, 197, 94, 0.5)',
				'glow-green-strong': '0 0 40px rgba(34, 197, 94, 0.75)',
				'btn-primary-hover': '0 10px 25px rgba(34, 197, 94, 0.5)',
				'btn-secondary-hover': '0 8px 20px rgba(74, 222, 128, 0.25)',
				'btn-accent-hover': '0 8px 20px rgba(16, 185, 129, 0.4)',
				'btn-danger': '0 4px 15px rgba(239, 68, 68, 0.3)',
				'glass-card-hover': '0 20px 40px rgba(74, 222, 128, 0.15)',
				'feature-card-hover': '0 25px 50px rgba(34, 197, 94, 0.2)',
				'medical-card-hover': '0 20px 40px rgba(34, 197, 94, 0.15)',
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