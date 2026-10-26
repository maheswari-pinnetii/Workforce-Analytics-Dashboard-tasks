import { createTheme, ThemeOptions } from '@mui/material/styles';

/**
 * Enterprise Emerald Green theme specification:
 * Light theme:
 * Primary: #047857, Hover: #065F46, Accent bg: #ECFDF5, Page bg: #F8FAFC, Card bg: #FFFFFF, Main text: #0F172A, Secondary text: #64748B, Border: #E2E8F0
 * Dark theme:
 * Primary: #34D399, Accent bg: #064E3B, Page bg: #0F172A, Card bg: #1E293B, Main text: #F8FAFC, Secondary text: #CBD5E1, Border: #334155
 */
export const getAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: isDark ? '#34D399' : '#047857',
        dark: isDark ? '#059669' : '#065F46',
        light: isDark ? '#6EE7B7' : '#10B981',
        contrastText: isDark ? '#064E3B' : '#FFFFFF'
      },
      secondary: {
        main: isDark ? '#38BDF8' : '#0284C7',
        light: '#7DD3FC',
        dark: '#0369A1'
      },
      success: {
        main: '#10B981',
        light: '#34D399',
        dark: '#059669'
      },
      warning: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706'
      },
      error: {
        main: '#EF4444',
        light: '#F87171',
        dark: '#DC2626'
      },
      background: {
        default: isDark ? '#0F172A' : '#F8FAFC',
        paper: isDark ? '#1E293B' : '#FFFFFF'
      },
      text: {
        primary: isDark ? '#F8FAFC' : '#0F172A',
        secondary: isDark ? '#CBD5E1' : '#64748B'
      },
      divider: isDark ? '#334155' : '#E2E8F0'
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.02em'
      },
      h5: {
        fontWeight: 700,
        letterSpacing: '-0.015em'
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-0.01em'
      },
      subtitle1: {
        fontWeight: 500
      },
      subtitle2: {
        fontWeight: 600
      },
      button: {
        textTransform: 'none',
        fontWeight: 600
      }
    },
    shape: {
      borderRadius: 10
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: 'none',
            border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
            boxShadow: isDark
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)'
              : '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '& fieldset': {
              borderColor: isDark ? '#334155' : '#E2E8F0'
            },
            '&:hover fieldset': {
              borderColor: isDark ? '#475569' : '#CBD5E1'
            }
          }
        }
      }
    }
  };

  return createTheme(themeOptions);
};
