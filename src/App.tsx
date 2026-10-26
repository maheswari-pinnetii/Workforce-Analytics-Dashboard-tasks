import React, { useState, useMemo, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box
} from '@mui/material';
import { getAppTheme } from './theme/theme';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { KpiGrid } from './components/dashboard/KpiGrid';
import { DashboardFilters } from './components/dashboard/DashboardFilters';
import { AttendanceTrendChart } from './components/dashboard/AttendanceTrendChart';
import { DepartmentDistributionChart } from './components/dashboard/DepartmentDistributionChart';
import { WorkforceCompositionChart } from './components/dashboard/WorkforceCompositionChart';
import { RecentActivity } from './components/dashboard/RecentActivity';
import { LoadingState, EmptyState, ErrorState } from './components/common/StateComponents';
import { MOCK_EMPLOYEES, MOCK_ACTIVITIES } from './data/mockWorkforceData';
import { ThemeMode } from './types/workforce';
import { useDashboardFilters } from './hooks/useDashboardFilters';
import {
  filterEmployees,
  calculateKPIs,
  calculateDepartmentDistribution,
  calculateWorkforceStatus,
  getAttendanceTrendByRange
} from './utils/workforceAnalytics';

export const App: React.FC = () => {
  // Theme state with localStorage persistence & system preference fallback
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('workforce_theme_preference');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const [activeNav, setActiveNav] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now (10:45 AM)');

  // Filter state managed via custom hook
  const { filters, updateFilters, resetFilters } = useDashboardFilters();

  useEffect(() => {
    localStorage.setItem('workforce_theme_preference', themeMode);
  }, [themeMode]);

  const theme = useMemo(() => getAppTheme(themeMode), [themeMode]);

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIsError(false);
    setTimeout(() => {
      setIsLoading(false);
      const now = new Date();
      setLastUpdated(
        `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      );
    }, 600);
  };

  // Metric derivations
  const filteredEmployees = useMemo(() => {
    return filterEmployees(MOCK_EMPLOYEES, filters);
  }, [filters]);

  const kpis = useMemo(() => {
    return calculateKPIs(filteredEmployees, MOCK_EMPLOYEES.length);
  }, [filteredEmployees]);

  const departmentData = useMemo(() => {
    return calculateDepartmentDistribution(filteredEmployees);
  }, [filteredEmployees]);

  const workforceComposition = useMemo(() => {
    return calculateWorkforceStatus(filteredEmployees);
  }, [filteredEmployees]);

  const attendanceHistory = useMemo(() => {
    return getAttendanceTrendByRange(filters.dateRange);
  }, [filters.dateRange]);

  const isEmpty = filteredEmployees.length === 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <DashboardLayout
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => updateFilters({ searchQuery: q })}
        activeNav={activeNav}
        onSelectNav={setActiveNav}
      >
        <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, sm: 3, md: 3.5 } }}>
          {/* Dashboard Heading */}
          <DashboardHeader
            lastUpdated={lastUpdated}
            onRefresh={handleRefresh}
            isRefreshing={isLoading}
          />

          {/* Filters Toolbar */}
          <DashboardFilters
            filters={filters}
            onFilterChange={updateFilters}
            onResetFilters={resetFilters}
            filteredCount={filteredEmployees.length}
          />

          {/* Loading / Error / Empty States */}
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState onRetry={handleRefresh} />
          ) : isEmpty ? (
            <EmptyState onResetFilters={resetFilters} />
          ) : (
            <>
              {/* 5 KPI Cards Grid */}
              <KpiGrid metrics={kpis} />

              {/* Charts Row 1: Attendance Trend & Department Distribution (Mobbin / SimpleKPI hierarchy) */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
                  gap: 2.5,
                  mb: 2.5
                }}
              >
                <AttendanceTrendChart data={attendanceHistory} />
                <DepartmentDistributionChart data={departmentData} />
              </Box>

              {/* Charts Row 2: Workforce Composition & Recent Employee Activity */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', lg: '5fr 7fr' },
                  gap: 2.5
                }}
              >
                <WorkforceCompositionChart data={workforceComposition} isLoading={isLoading} />
                <RecentActivity activities={MOCK_ACTIVITIES} />
              </Box>
            </>
          )}
        </Container>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default App;
