import { useState, useCallback } from 'react';
import { FilterState } from '../types/workforce';

const INITIAL_FILTERS: FilterState = {
  dateRange: '14d',
  department: 'All Departments',
  location: 'All Locations',
  status: 'All Statuses',
  searchQuery: ''
};

export const useDashboardFilters = () => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.department !== 'All Departments' ||
    filters.location !== 'All Locations' ||
    filters.status !== 'All Statuses' ||
    filters.dateRange !== '14d';

  return {
    filters,
    updateFilters,
    resetFilters,
    isFiltered
  };
};
