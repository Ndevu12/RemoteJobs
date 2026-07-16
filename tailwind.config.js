/** @type {import('tailwindcss').Config} */
export default {
    content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          // Primary blue colors - for core actions (trust, confidence)
          'blue-50': '#E6F0FF',
          'blue-100': '#CCE0FF',
          'blue-200': '#99C2FF',
          'blue-300': '#66A3FF',
          'blue-400': '#3385FF',
          'blue-500': '#0066FF', // Base blue
          'blue-600': '#0052CC',
          'blue-700': '#003D99',
          'blue-800': '#002966',
          'blue-900': '#001433',
          
          // Purple colors - for exploration/discovery actions
          'purple-50': '#F3F0FF',
          'purple-100': '#E9E5FF',
          'purple-200': '#D4CCFF',
          'purple-300': '#B8A3FF',
          'purple-400': '#9B7AFF',
          'purple-500': '#7C3AED', // Base purple
          'purple-600': '#6D28D9',
          'purple-700': '#5B21B6',
          'purple-800': '#4C1D95',
          'purple-900': '#3B0764',
          
          // Success green colors - for positive actions
          'green-50': '#ECFDF5',
          'green-100': '#D1FAE5',
          'green-200': '#A7F3D0',
          'green-300': '#6EE7B7',
          'green-400': '#34D399',
          'green-500': '#10B981', // Base green
          'green-600': '#059669',
          'green-700': '#047857',
          'green-800': '#065F46',
          'green-900': '#064E3B',
          
          // Danger red colors - for destructive actions only
          'red-50': '#FEF2F2',
          'red-100': '#FEE2E2',
          'red-200': '#FECACA',
          'red-300': '#FCA5A5',
          'red-400': '#F87171',
          'red-500': '#EF4444', // Base red
          'red-600': '#DC2626',
          'red-700': '#B91C1C',
          'red-800': '#991B1B',
          'red-900': '#7F1D1D',
          
          // Neutral colors
          'neutral-50': '#F9FAFB',
          'neutral-100': '#F3F4F6',
          'neutral-200': '#E5E7EB',
          'neutral-300': '#D1D5DB',
          'neutral-400': '#9CA3AF',
          'neutral-500': '#6B7280',
          'neutral-600': '#4B5563',
          'neutral-700': '#374151',
          'neutral-800': '#1F2937',
          'neutral-900': '#111827',
          
          // Semantic colors
          'primary': '#0066FF', // Blue for primary actions
          'secondary': '#7C3AED', // Purple for exploration
          'success': '#10B981', // Green for positive actions
          'danger': '#EF4444', // Red for destructive actions
          'warning': '#F59E0B', // Amber for warnings
          
          // Background colors
          'bg-primary': '#FFFFFF',
          'bg-secondary': '#F9FAFB',
          'bg-tertiary': '#F3F4F6',
        },
        
        fontFamily: {
          sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
        },
        
        boxShadow: {
          'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          'navbar': '0px 1px 3px -2px rgba(0, 0, 0, 0.1)',
          'card': '0 0 10px rgba(0, 0, 0, 0.05)',
          'hover': '0 4px 12px rgba(0, 102, 255, 0.15)',
          'red-hover': '0 4px 12px rgba(255, 51, 51, 0.15)',
        },
        
        borderRadius: {
          'none': '0',
          'sm': '0.125rem',
          'DEFAULT': '0.25rem',
          'md': '0.375rem',
          'lg': '0.5rem',
          'xl': '0.75rem',
          '2xl': '1rem',
          '3xl': '1.5rem',
          'full': '9999px',
        },
        
        animation: {
          'spin-slow': 'spin 1.5s linear infinite',
          'slideInToLeft': 'slideInToLeft 0.5s ease-out forwards',
          'slideInFromTop': 'slideInFromTop 0.5s ease-out forwards',
          'slideOutFromBottom': 'slideOutFromBottom 0.5s ease-out forwards',
          'fadeIn': 'fadeIn 0.3s ease-out forwards',
          'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-subtle': 'bounce-subtle 1s infinite',
        },
        
        keyframes: {
          slideInToLeft: {
            '0%': { transform: 'translateX(100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' }
          },
          slideInFromTop: {
            '0%': { transform: 'translateY(-10%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          },
          slideOutFromBottom: {
            '0%': { transform: 'translateY(0)', opacity: '1' },
            '100%': { transform: 'translateY(-10%)', opacity: '0' }
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          'pulse-subtle': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
          },
          'bounce-subtle': {
            '0%, 100%': { transform: 'translateY(-3%)' },
            '50%': { transform: 'translateY(0)' },
          },
        },
        
        screens: {
          'xs': '480px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
          // Keep your custom breakpoints
          'xsm': '450px',
          'xmd': '700px',
          'xlg': '1210px'
        },
        
        // Adding gradients
        backgroundImage: {
          'gradient-primary': 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)', // Blue gradient for primary actions
          'gradient-secondary': 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', // Purple gradient for exploration
          'gradient-success': 'linear-gradient(135deg, #10B981 0%, #059669 100%)', // Green gradient for positive actions
          'gradient-danger': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', // Red gradient for destructive actions
          'gradient-blue-light': 'linear-gradient(135deg, #E6F0FF 0%, #CCE0FF 100%)',
          'gradient-purple-light': 'linear-gradient(135deg, #F3F0FF 0%, #E9E5FF 100%)',
          'gradient-green-light': 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          'gradient-neutral': 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
        },
      }
    },
    plugins: []
  };
