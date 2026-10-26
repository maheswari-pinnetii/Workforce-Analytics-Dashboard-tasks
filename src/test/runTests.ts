import {
  filterEmployees,
  calculateKPIs,
  calculateDepartmentDistribution,
  calculateWorkforceStatus,
  getAttendanceTrendByRange
} from '../utils/workforceAnalytics.ts';
import { MOCK_EMPLOYEES } from '../data/mockWorkforceData.ts';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('--- Running Workforce Analytics Automated Test Suite ---');

// Test 1: KPI Calculations
const kpis = calculateKPIs(MOCK_EMPLOYEES, MOCK_EMPLOYEES.length);
assert(kpis.totalEmployees === 1502, 'Total employees calculation matches 1,502');
assert(kpis.presentToday === 1439, 'Present count matches 1,439');
assert(kpis.attendanceRate === 95.8, 'Attendance rate matches 95.8%');
assert(kpis.onLeaveCount === 43, 'Employees on leave matches 43');
assert(kpis.openPositions === 42, 'Open positions count matches 42');

// Test 2: Department Filter
const engFiltered = filterEmployees(MOCK_EMPLOYEES, {
  dateRange: '14d',
  department: 'Engineering',
  location: 'All Locations',
  status: 'All Statuses',
  searchQuery: ''
});
assert(engFiltered.length > 0, 'Engineering department has active records');
assert(engFiltered.every(e => e.department === 'Engineering'), 'All filtered records belong to Engineering');

// Test 3: Location Filter
const blrFiltered = filterEmployees(MOCK_EMPLOYEES, {
  dateRange: '14d',
  department: 'All Departments',
  location: 'Bengaluru',
  status: 'All Statuses',
  searchQuery: ''
});
assert(blrFiltered.length > 0 && blrFiltered.every(e => e.location.includes('Bengaluru')), 'Location filter Bengaluru verified');

// Test 4: All Status Filters (Active, On Leave, Absent, Terminated)
const activeFiltered = filterEmployees(MOCK_EMPLOYEES, {
  dateRange: '14d',
  department: 'All Departments',
  location: 'All Locations',
  status: 'Active',
  searchQuery: ''
});
assert(activeFiltered.length > 0 && activeFiltered.every(e => e.status === 'Active'), 'Status filter Active verified');

const leaveFiltered = filterEmployees(MOCK_EMPLOYEES, {
  dateRange: '14d',
  department: 'All Departments',
  location: 'All Locations',
  status: 'On Leave',
  searchQuery: ''
});
assert(leaveFiltered.length > 0 && leaveFiltered.every(e => e.status === 'On Leave'), 'Status filter On Leave verified');

const absentFiltered = filterEmployees(MOCK_EMPLOYEES, {
  dateRange: '14d',
  department: 'All Departments',
  location: 'All Locations',
  status: 'Absent',
  searchQuery: ''
});
assert(absentFiltered.length > 0 && absentFiltered.every(e => e.status === 'Absent'), 'Status filter Absent verified');

const termFiltered = filterEmployees(MOCK_EMPLOYEES, {
  dateRange: '14d',
  department: 'All Departments',
  location: 'All Locations',
  status: 'Terminated',
  searchQuery: ''
});
assert(termFiltered.length > 0 && termFiltered.every(e => e.status === 'Terminated'), 'Status filter Terminated verified');

// Test 5: Search Query
const searchFiltered = filterEmployees(MOCK_EMPLOYEES, {
  dateRange: '14d',
  department: 'All Departments',
  location: 'All Locations',
  status: 'All Statuses',
  searchQuery: 'DevOps'
});
assert(searchFiltered.length > 0 && searchFiltered[0].role.includes('DevOps'), 'Search query matches employee role');

// Test 6: Empty Results
const emptyFiltered = filterEmployees(MOCK_EMPLOYEES, {
  dateRange: '14d',
  department: 'All Departments',
  location: 'All Locations',
  status: 'All Statuses',
  searchQuery: 'NonExistentXYZ'
});
const emptyKPIs = calculateKPIs(emptyFiltered, MOCK_EMPLOYEES.length);
assert(emptyFiltered.length === 0, 'Non-existent search returns 0 records');
assert(emptyKPIs.totalEmployees === 0 && emptyKPIs.presentToday === 0, 'Empty state produces 0 metrics');

// Test 7: Department Distribution Sort Order
const depts = calculateDepartmentDistribution(MOCK_EMPLOYEES);
let sorted = true;
for (let i = 0; i < depts.length - 1; i++) {
  if (depts[i].employeeCount < depts[i + 1].employeeCount) sorted = false;
}
assert(sorted, 'Department distribution sorted descending by headcount');

// Test 8: Workforce Composition Categories
const comp = calculateWorkforceStatus(MOCK_EMPLOYEES);
assert(comp.some(c => c.name === 'Active Personnel' && c.percentage > 50), 'Workforce composition active category verified');

// Test 9: Date range slicing
assert(getAttendanceTrendByRange('7d').length === 7, '7-day trend returns 7 data points');
assert(getAttendanceTrendByRange('14d').length === 14, '14-day trend returns 14 data points');

console.log('--- All 9/9 Automated Tests Passed Successfully ---');
