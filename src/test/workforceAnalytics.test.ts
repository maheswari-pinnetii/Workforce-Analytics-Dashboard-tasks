import { describe, it, expect } from 'vitest';
import {
  filterEmployees,
  calculateKPIs,
  calculateDepartmentDistribution,
  calculateWorkforceStatus,
  getAttendanceTrendByRange
} from '../utils/workforceAnalytics';
import { MOCK_EMPLOYEES } from '../data/mockWorkforceData';
import { FilterState } from '../types/workforce';

describe('Workforce Analytics Engine & Metric Derivations', () => {
  const initialFilters: FilterState = {
    dateRange: '14d',
    department: 'All Departments',
    location: 'All Locations',
    status: 'All Statuses',
    searchQuery: ''
  };

  it('1. Calculates baseline 5 KPIs accurately without filters', () => {
    const kpis = calculateKPIs(MOCK_EMPLOYEES, MOCK_EMPLOYEES.length);
    expect(kpis.totalEmployees).toBe(1502);
    expect(kpis.onLeaveCount).toBe(43);
    expect(kpis.presentToday).toBe(1439); // 1502 - 43 - 20
    expect(kpis.attendanceRate).toBe(95.8);
    expect(kpis.openPositions).toBe(42);
  });

  it('2. Filters employees by department correctly', () => {
    const engFilters: FilterState = { ...initialFilters, department: 'Engineering' };
    const filtered = filterEmployees(MOCK_EMPLOYEES, engFilters);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every(e => e.department === 'Engineering')).toBe(true);

    const kpis = calculateKPIs(filtered, MOCK_EMPLOYEES.length);
    expect(kpis.totalEmployees).toBe(filtered.length);
  });

  it('3. Filters employees by location correctly', () => {
    const locFilters: FilterState = { ...initialFilters, location: 'London, UK' };
    const filtered = filterEmployees(MOCK_EMPLOYEES, locFilters);
    expect(filtered.every(e => e.location.includes('London, UK'))).toBe(true);
  });

  it('4. Filters employees by status (On Leave)', () => {
    const statusFilters: FilterState = { ...initialFilters, status: 'On Leave' };
    const filtered = filterEmployees(MOCK_EMPLOYEES, statusFilters);
    expect(filtered.every(e => e.status === 'On Leave')).toBe(true);
  });

  it('5. Handles search queries across name, role, department or ID', () => {
    const searchFilters: FilterState = { ...initialFilters, searchQuery: 'DevOps' };
    const filtered = filterEmployees(MOCK_EMPLOYEES, searchFilters);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.some(e => e.role.includes('DevOps'))).toBe(true);
  });

  it('6. Handles empty filter results gracefully with 0 KPI metrics', () => {
    const noMatchFilters: FilterState = { ...initialFilters, searchQuery: 'NonExistentPersonXYZ' };
    const filtered = filterEmployees(MOCK_EMPLOYEES, noMatchFilters);
    expect(filtered.length).toBe(0);

    const kpis = calculateKPIs(filtered, MOCK_EMPLOYEES.length);
    expect(kpis.totalEmployees).toBe(0);
    expect(kpis.presentToday).toBe(0);
    expect(kpis.attendanceRate).toBe(0);
  });

  it('7. Computes department distribution sorted descending by headcount', () => {
    const deptDistribution = calculateDepartmentDistribution(MOCK_EMPLOYEES);
    expect(deptDistribution.length).toBeGreaterThan(0);
    for (let i = 0; i < deptDistribution.length - 1; i++) {
      expect(deptDistribution[i].employeeCount).toBeGreaterThanOrEqual(deptDistribution[i + 1].employeeCount);
    }
  });

  it('8. Computes workforce composition categories accurately', () => {
    const composition = calculateWorkforceStatus(MOCK_EMPLOYEES);
    expect(composition.length).toBeGreaterThan(0);
    const active = composition.find(c => c.name === 'Active Personnel');
    expect(active).toBeDefined();
    expect(active?.percentage).toBeGreaterThan(50);
  });

  it('9. Returns 7 or 14 days of attendance trend data according to date range selection', () => {
    const trend7 = getAttendanceTrendByRange('7d');
    expect(trend7.length).toBe(7);

    const trend14 = getAttendanceTrendByRange('14d');
    expect(trend14.length).toBe(14);
  });
});
