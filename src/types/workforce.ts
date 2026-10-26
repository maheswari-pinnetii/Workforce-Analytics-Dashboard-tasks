export type ThemeMode = 'light' | 'dark';

export type EmploymentStatus = 'Active' | 'On Leave' | 'Terminated' | 'Absent';

export type WorkModel = 'Onsite' | 'Hybrid' | 'Remote';

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  status: EmploymentStatus;
  workModel: WorkModel;
  joinDate: string;
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD or Day
  totalEmployees: number;
  presentCount: number;
  onLeaveCount: number;
  absentCount: number;
  attendanceRate: number; // percentage
}

export interface ActivityEvent {
  id: string;
  employeeName: string;
  avatar: string;
  department: string;
  type: 'onboarded' | 'attendance' | 'leave_applied' | 'department_updated' | 'profile_updated';
  title: string;
  timestamp: string;
  relativeTime: string;
  status: 'info' | 'success' | 'warning' | 'neutral';
}

export interface FilterState {
  dateRange: '7d' | '14d' | '30d' | 'quarter';
  department: string;
  location: string;
  status: string;
  searchQuery: string;
}

export interface DashboardMetrics {
  totalEmployees: number;
  presentToday: number;
  attendanceRate: number;
  onLeaveCount: number;
  openPositions: number;
  // Dynamic comparisons
  totalEmployeesDelta: string;
  presentDelta: string;
  attendanceRateDelta: string;
  leaveDelta: string;
  openPositionsDelta: string;
}

export interface DepartmentMetric {
  department: string;
  employeeCount: number;
  capacityTarget: number;
}

export interface WorkforceStatusComposition {
  name: string;
  count: number;
  percentage: number;
  color: string;
}
