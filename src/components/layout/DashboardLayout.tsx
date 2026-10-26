import React from 'react';
import { Box } from '@mui/material';
import { AppSidebar } from './AppSidebar';
import { TopNavigation } from './TopNavigation';
import { ThemeMode } from '../../types/workforce';

interface DashboardLayoutProps {
  children: React.ReactNode;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  themeMode,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  activeNav,
  onSelectNav
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar Navigation */}
      <AppSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        activeItem={activeNav}
        onSelectItem={onSelectNav}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { md: `calc(100% - ${sidebarCollapsed ? '76px' : '250px'})` },
          minWidth: 0,
          transition: 'width 0.2s ease-in-out'
        }}
      >
        {/* Top Navigation */}
        <TopNavigation
          onToggleSidebar={() => {
            if (window.innerWidth < 900) {
              setMobileSidebarOpen(!mobileSidebarOpen);
            } else {
              setSidebarCollapsed(!sidebarCollapsed);
            }
          }}
          themeMode={themeMode}
          onToggleTheme={onToggleTheme}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />

        {children}
      </Box>
    </Box>
  );
};
