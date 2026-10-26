import React from 'react';
import {
  Card,
  CardContent,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Chip,
  ButtonGroup,
  useTheme
} from '@mui/material';
import { Search, RotateCcw, Building2, MapPin, CheckCircle2, Calendar } from 'lucide-react';
import { FilterState } from '../../types/workforce';
import { DEPARTMENTS, LOCATIONS, STATUSES } from '../../data/mockWorkforceData';

interface DashboardFiltersProps {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  filteredCount: number;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  filteredCount
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const rangeButtons: { id: FilterState['dateRange']; label: string }[] = [
    { id: '7d', label: '7 Days' },
    { id: '14d', label: '14 Days' },
    { id: '30d', label: '30 Days' },
    { id: 'quarter', label: 'Quarter' }
  ];

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.department !== 'All Departments' ||
    filters.location !== 'All Locations' ||
    filters.status !== 'All Statuses' ||
    filters.dateRange !== '14d';

  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        bgcolor: isDark ? '#1E293B' : '#FFFFFF',
        borderColor: isDark ? '#334155' : '#E2E8F0'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr) auto'
          },
          gap: 1.5,
          alignItems: 'center'
        }}
      >
        {/* Date Range ButtonGroup */}
        <Box sx={{ gridColumn: { xs: '1', sm: 'span 2', md: 'span 1' } }}>
          <ButtonGroup size="small" fullWidth sx={{ height: 38 }}>
            {rangeButtons.map((btn) => {
              const active = filters.dateRange === btn.id;
              return (
                <Button
                  key={btn.id}
                  onClick={() => onFilterChange({ dateRange: btn.id })}
                  variant={active ? 'contained' : 'outlined'}
                  color={active ? 'primary' : 'inherit'}
                  sx={{
                    fontSize: '0.74rem',
                    fontWeight: active ? 600 : 500,
                    px: 1,
                    borderColor: theme.palette.divider
                  }}
                >
                  {btn.label}
                </Button>
              );
            })}
          </ButtonGroup>
        </Box>

        {/* Department Filter */}
        {/* Department Filter */}
        <TextField
          select
          size="small"
          label="Department"
          value={filters.department}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange({ department: e.target.value })}
          sx={{ minWidth: 150 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Building2 size={15} color={theme.palette.text.secondary} />
                </InputAdornment>
              )
            } as any
          }}
        >
          {DEPARTMENTS.map((dept) => (
            <MenuItem key={dept} value={dept} sx={{ fontSize: '0.82rem' }}>
              {dept}
            </MenuItem>
          ))}
        </TextField>

        {/* Location Filter */}
        <TextField
          select
          size="small"
          label="Location"
          value={filters.location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange({ location: e.target.value })}
          sx={{ minWidth: 150 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MapPin size={15} color={theme.palette.text.secondary} />
                </InputAdornment>
              )
            } as any
          }}
        >
          {LOCATIONS.map((loc) => (
            <MenuItem key={loc} value={loc} sx={{ fontSize: '0.82rem' }}>
              {loc}
            </MenuItem>
          ))}
        </TextField>

        {/* Status Filter */}
        <TextField
          select
          size="small"
          label="Status"
          value={filters.status}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange({ status: e.target.value })}
          sx={{ minWidth: 140 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CheckCircle2 size={15} color={theme.palette.text.secondary} />
                </InputAdornment>
              )
            } as any
          }}
        >
          {STATUSES.map((st) => (
            <MenuItem key={st} value={st} sx={{ fontSize: '0.82rem' }}>
              {st}
            </MenuItem>
          ))}
        </TextField>

        {/* Reset / Badge Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Chip
            label={`${filteredCount} staff`}
            size="small"
            sx={{
              height: 28,
              fontSize: '0.74rem',
              fontWeight: 600,
              bgcolor: isDark ? '#064E3B' : '#ECFDF5',
              color: isDark ? '#34D399' : '#047857'
            }}
          />

          {isFiltered && (
            <Button
              size="small"
              onClick={onResetFilters}
              color="inherit"
              startIcon={<RotateCcw size={13} />}
              sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary }}
            >
              Reset
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
};
