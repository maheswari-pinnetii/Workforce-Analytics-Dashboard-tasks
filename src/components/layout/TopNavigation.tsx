import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Badge,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Home,
  ChevronRight,
  Layers,
  LayoutDashboard
} from 'lucide-react';
import { ThemeMode } from '../../types/workforce';

interface TopNavigationProps {
  onToggleSidebar: () => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  onToggleSidebar,
  themeMode,
  onToggleTheme,
  searchQuery,
  onSearchChange
}) => {
  const theme = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: isDark ? '#1E293B' : '#FFFFFF',
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        {/* Left: Mobile Toggle & Page Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation drawer"
            size="small"
            sx={{ p: 0.8 }}
          >
            <Menu size={20} />
          </IconButton>

          {/* Drill-down Breadcrumb Navigation with Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.6,
                color: theme.palette.text.secondary,
                cursor: 'pointer',
                '&:hover': { color: theme.palette.primary.main }
              }}
            >
              <Home size={15} color="currentColor" />
              <Typography
                variant="caption"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  color: 'inherit'
                }}
              >
                Workforce
              </Typography>
            </Box>

            <ChevronRight size={13} color={theme.palette.text.secondary} />

            <Box
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                alignItems: 'center',
                gap: 0.6,
                color: theme.palette.text.secondary
              }}
            >
              <Layers size={14} color="currentColor" />
              <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.8rem', color: 'inherit' }}>
                Analytics
              </Typography>
              <ChevronRight size={13} color={theme.palette.text.secondary} />
            </Box>

            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                bgcolor: isDark ? 'rgba(52, 211, 153, 0.12)' : '#ECFDF5',
                color: isDark ? '#34D399' : '#047857',
                px: 1,
                py: 0.3,
                borderRadius: 1
              }}
            >
              <LayoutDashboard size={13} color="currentColor" />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  color: 'inherit',
                  lineHeight: 1.2
                }}
              >
                Overview
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Center: Global Search Input */}
        <Box sx={{ flexGrow: 1, maxWidth: 380, mx: 3, display: { xs: 'none', md: 'block' } }}>
          <TextField
            placeholder="Search employee, role, department or ID..."
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color={theme.palette.text.secondary} />
                  </InputAdornment>
                )
              } as any
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: isDark ? '#0F172A' : '#F8FAFC',
                fontSize: '0.82rem'
              }
            }}
          />
        </Box>

        {/* Right: Theme Switcher, Notifications, Demo toggles, User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>


          {/* Theme Toggle */}
          <Tooltip title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}>
            <IconButton
              onClick={onToggleTheme}
              aria-label="Toggle light or dark theme"
              size="small"
              sx={{ border: `1px solid ${theme.palette.divider}`, p: 0.8 }}
            >
              {isDark ? <Sun size={17} color="#F59E0B" /> : <Moon size={17} color="#047857" />}
            </IconButton>
          </Tooltip>

          {/* Notifications Icon with Accessible Label */}
          <Tooltip title="Workforce alerts (2 notifications)">
            <IconButton
              aria-label="2 unread workforce alerts"
              size="small"
              sx={{ border: `1px solid ${theme.palette.divider}`, p: 0.8 }}
            >
              <Badge badgeContent={2} color="primary" variant="dot">
                <Bell size={17} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User Profile Info with Initials Avatar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              pl: 1,
              ml: 0.5,
              borderLeft: `1px solid ${theme.palette.divider}`
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              MP
            </Avatar>
            <Box sx={{ display: { xs: 'none', xl: 'block' }, textAlign: 'left' }}>
              <Typography variant="subtitle2" sx={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.1 }}>
                Maheswari P.
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }}>
                VP of People Operations
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
