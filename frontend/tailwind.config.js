/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      sm:  "640px",
      md:  "768px",
      lg:  "1024px",
      xl:  "1280px",
      "2xl": "1536px",
      "3xl": "1728px",
    },
    extend: {
      colors: {
        // ─────────────────────────────────────────────────────────────
        // Brand palette: Orange #FF8A00 · Blue #1976D2 · White #FFFFFF
        //   - charcoal  → neutral / dark text + light backgrounds
        //   - navy      → blue scale (primary brand color)
        //   - smsorange → orange scale (accent / CTA color)
        //   - smsgold   → soft orange / cream tints (secondary accents)
        // ─────────────────────────────────────────────────────────────
        charcoal: {
          50:  "#F8FAFC",
          100: "#EEF2F7",
          200: "#D7DEE8",
          300: "#B7C0CE",
          400: "#8A95A8",
          500: "#5C6678",
          600: "#3F4856",
          700: "#2D3540",
          800: "#222831",
          900: "#1F2937",
          950: "#0F172A",
        },
        navy: {
          50:  "#EAF4FF",
          100: "#D2E7FB",
          200: "#A6CFF6",
          300: "#6FB0EE",
          400: "#3D92E3",
          500: "#1976D2",
          600: "#155FA8",
          700: "#114A85",
          800: "#0E3B6A",
          900: "#0B2E54",
          950: "#07203D",
        },
        smsorange: {
          50:  "#FFF3E0",
          100: "#FFE2B8",
          200: "#FFCB80",
          300: "#FFB04D",
          400: "#FF9A28",
          500: "#FF8A00",
          600: "#E07700",
          700: "#B86000",
          800: "#8F4A00",
          900: "#6B3700",
          950: "#3F1F00",
        },
        smsgold: {
          50:  "#FFF8EC",
          100: "#FFEED1",
          200: "#FFE0AC",
          300: "#FFCE7A",
          400: "#FFBA50",
          500: "#F2A338",
          600: "#D88824",
          700: "#B36C18",
          800: "#8A5410",
          900: "#5F3A0A",
          950: "#3A2306",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'sms-soft': '0 4px 24px -8px rgba(25, 118, 210, 0.18)',
        'sms-strong': '0 20px 60px -20px rgba(25, 118, 210, 0.30)',
      },
      backgroundImage: {
        'sms-gradient': 'linear-gradient(135deg, #1976D2 0%, #0E3B6A 60%, #07203D 100%)',
        'sms-warm':     'linear-gradient(135deg, #FF8A00 0%, #1976D2 100%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        sms: {
          'primary':         '#1976D2',
          'primary-content': '#ffffff',
          'secondary':       '#FF8A00',
          'secondary-content':'#ffffff',
          'accent':          '#EAF4FF',
          'accent-content':  '#1F2937',
          'neutral':         '#1F2937',
          'neutral-content': '#ffffff',
          'base-100':        '#ffffff',
          'base-200':        '#F8FAFC',
          'base-300':        '#EEF2F7',
          'base-content':    '#1F2937',
          'info':            '#1976D2',
          'success':         '#16a34a',
          'warning':         '#FF8A00',
          'error':           '#dc2626',
        },
      },
    ],
  },
}
