import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  /*   darkMode: 'media', // or 'media' or 'class' */
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },

      colors: {
        primary: `var(--primary)`,
        secondary: `var(--secondary)`,
        highlight: `var(--highligh)`,
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        'status': {
          paused: "var(--status-paused)",
          paused_foreground: "var(--status-paused-foreground)",
          pending: "var(--status-pending)",
          pending_foreground: "var(--status-pending-foreground)",
          in_progress: "var(--status-in_progress)",
          in_progress_foreground: "var(--status-in_progress-foreground)",
          completed: "var(--status-completed)",
          completed_foreground: "var(--status-completed-foreground)",
        },
        'criticality': {
          low: "var(--criticality-low)",
          low_foreground: "var(--criticality-low-foreground)",
          medium: "var(--criticality-medium)",
          medium_foreground: "var(--criticality-medium-foreground)",
          high: "var(--criticality-high)",
          high_foreground: "var(--criticality-high-foreground)",
          critical: "var(--criticality-critical)",
          critical_foreground: "var(--criticality-critical-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
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
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },

    plugins: [require('@tailwindcss/forms')],
  },
};

export default config;
