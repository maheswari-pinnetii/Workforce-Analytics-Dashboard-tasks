import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Building2,
  MapPin,
  UserPlus,
  FileText,
  Settings,
  X
} from 'lucide-react';

interface AppSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  activeItem: string;
  onSelectItem: (item: string) => void;
}

const NAVIGATION_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, implemented: true },
  { id: 'employees', label: 'Employees', icon: Users, implemented: false, badge: 'Soon' },
  { id: 'attendance', label: 'Attendance', icon: CalendarClock, implemented: false, badge: 'Soon' },
  { id: 'departments', label: 'Departments', icon: Building2, implemented: false, badge: 'Soon' },
  { id: 'locations', label: 'Locations', icon: MapPin, implemented: false, badge: 'Soon' },
  { id: 'recruitment', label: 'Recruitment', icon: UserPlus, implemented: false, badge: 'Soon' },
  { id: 'reports', label: 'Reports', icon: FileText, implemented: false, badge: 'Soon' },
  { id: 'settings', label: 'Settings', icon: Settings, implemented: false, badge: 'Soon' }
];

export const AppSidebar: React.FC<AppSidebarProps> = ({
  mobileOpen,
  onClose,
  collapsed,
  activeItem,
  onSelectItem
}) => {
  const theme = useTheme<any>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const drawerWidth = collapsed ? 76 : 250;

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: isDark ? '#1E293B' : '#FFFFFF',
        borderRight: `1px solid ${theme.palette.divider}`,
        py: 2.5,
        px: collapsed ? 1.5 : 2
      }}
    >
      {/* Product Title / Logo Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          mb: 3.5,
          px: collapsed ? 0 : 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              bgcolor: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <LayoutDashboard size={20} />
          </Box>
          {!collapsed && (
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.2 }}>
                Workforce Analytics
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.72rem' }}>
                Enterprise Platform
              </Typography>
            </Box>
          )}
        </Box>

        {isMobile && (
          <IconButton onClick={onClose} size="small" aria-label="Close sidebar">
            <X size={18} />
          </IconButton>
        )}
      </Box>

      {/* Navigation List */}
      <List sx={{ flexGrow: 1, p: 0 }}>
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isSelected = activeItem === item.id;

          const buttonContent = (
            <ListItemButton
              onClick={() => {
                onSelectItem(item.id);
                if (isMobile) onClose();
              }}
              selected={isSelected}
              disabled={!item.implemented}
              sx={{
                borderRadius: 2,
                py: 1.1,
                px: collapsed ? 1.5 : 1.75,
                mb: 0.6,
                justifyContent: collapsed ? 'center' : 'flex-start',
                bgcolor: isSelected
                  ? isDark
                    ? '#064E3B'
                    : '#ECFDF5'
                  : 'transparent',
                color: isSelected
                  ? isDark
                    ? '#34D399'
                    : '#047857'
                  : theme.palette.text.secondary,
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                  color: theme.palette.text.primary
                },
                '&.Mui-disabled': {
                  opacity: 0.55
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 'auto' : 34,
                  color: isSelected ? 'inherit' : theme.palette.text.secondary,
                  justifyContent: 'center'
                }}
              >
                <Icon size={19} />
              </ListItemIcon>
              {!collapsed && (
                <>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '0.86rem', fontWeight: isSelected ? 600 : 500 }}>
                        {item.label}
                      </Typography>
                    }
                  />
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        bgcolor: isDark ? '#334155' : '#F1F5F9',
                        color: theme.palette.text.secondary
                      }}
                    />
                  )}
                </>
              )}
            </ListItemButton>
          );

          return (
            <ListItem key={item.id} disablePadding>
              {collapsed ? (
                <Tooltip title={item.label} placement="right" arrow>
                  {buttonContent}
                </Tooltip>
              ) : (
                buttonContent
              )}
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Environment Status */}
      {!collapsed && (
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: isDark ? '#0F172A' : '#F8FAFC'
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.2 }}>
            Connected Cluster
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.72rem' }}>
            HRIS Production v2.4 (US-West)
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Desktop Persistent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            transition: 'width 0.2s ease-in-out'
          }
        }}
        open
      >
        {content}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box'
          }
        }}
      >
        {content}
      </Drawer>
    </>
  );
};
