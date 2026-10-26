import type { Employee, AttendanceRecord, ActivityEvent } from '../types/workforce.ts';

export const DEPARTMENTS = [
  'All Departments',
  'Engineering',
  'Human Resources',
  'Sales',
  'Operations',
  'Finance',
  'Customer Support'
];

export const LOCATIONS = [
  'All Locations',
  'Bengaluru',
  'Chennai',
  'Salem',
  'Kochi',
  'Hyderabad',
  'Vizag'
];

export const STATUSES = [
  'All Statuses',
  'Active',
  'On Leave',
  'Absent',
  'Terminated'
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 'EMP-101', name: 'Eleanor Vance', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', role: 'Staff Systems Architect', department: 'Engineering', location: 'Bengaluru', status: 'Active', workModel: 'Hybrid', joinDate: '2021-03-15' },
  { id: 'EMP-102', name: 'Marcus Bennett', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', role: 'Senior Financial Analyst', department: 'Finance', location: 'Hyderabad', status: 'Active', workModel: 'Onsite', joinDate: '2022-01-10' },
  { id: 'EMP-103', name: 'Sophia Chen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', role: 'Enterprise Account Executive', department: 'Sales', location: 'Chennai', status: 'Active', workModel: 'Hybrid', joinDate: '2020-08-01' },
  { id: 'EMP-104', name: 'Liam Davies', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', role: 'Operations Logistics Lead', department: 'Operations', location: 'Kochi', status: 'On Leave', workModel: 'Onsite', joinDate: '2021-11-20' },
  { id: 'EMP-105', name: 'Amara Okafor', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', role: 'People Operations Manager', department: 'Human Resources', location: 'Bengaluru', status: 'Active', workModel: 'Hybrid', joinDate: '2019-06-12' },
  { id: 'EMP-106', name: 'Julian Richter', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80', role: 'DevOps Engineer', department: 'Engineering', location: 'Vizag', status: 'Active', workModel: 'Remote', joinDate: '2023-02-01' },
  { id: 'EMP-107', name: 'Mei Lin Zhou', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', role: 'Customer Success Principal', department: 'Customer Support', location: 'Salem', status: 'Active', workModel: 'Hybrid', joinDate: '2022-05-18' },
  { id: 'EMP-108', name: 'David Miller', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', role: 'Frontend Engineer', department: 'Engineering', location: 'Bengaluru', status: 'Active', workModel: 'Hybrid', joinDate: '2023-04-10' },
  { id: 'EMP-109', name: 'Rachel Green', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', role: 'Recruiter', department: 'Human Resources', location: 'Hyderabad', status: 'On Leave', workModel: 'Remote', joinDate: '2022-09-01' },
  { id: 'EMP-110', name: 'Carlos Gomez', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80', role: 'Sales Development Rep', department: 'Sales', location: 'Chennai', status: 'Absent', workModel: 'Onsite', joinDate: '2023-08-15' },
  { id: 'EMP-111', name: 'Aiden Patel', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', role: 'Security Compliance Engineer', department: 'Engineering', location: 'Vizag', status: 'Active', workModel: 'Remote', joinDate: '2021-10-05' },
  { id: 'EMP-112', name: 'Hannah Schmidt', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', role: 'Treasury Analyst', department: 'Finance', location: 'Salem', status: 'Active', workModel: 'Hybrid', joinDate: '2022-11-12' },
  { id: 'EMP-113', name: 'Tariq Al-Mansoor', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80', role: 'Support Team Lead', department: 'Customer Support', location: 'Kochi', status: 'Active', workModel: 'Onsite', joinDate: '2020-04-20' },
  { id: 'EMP-114', name: 'Claire Dubois', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=100&auto=format&fit=crop&q=80', role: 'Operations Specialist', department: 'Operations', location: 'Hyderabad', status: 'Active', workModel: 'Hybrid', joinDate: '2023-01-09' },
  { id: 'EMP-115', name: 'Siddharth Rao', avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=100&auto=format&fit=crop&q=80', role: 'Backend Platform Engineer', department: 'Engineering', location: 'Bengaluru', status: 'Active', workModel: 'Onsite', joinDate: '2020-02-14' },
  { id: 'EMP-116', name: 'Vikram Malhotra', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', role: 'Staff Infrastructure Architect', department: 'Engineering', location: 'Bengaluru', status: 'Terminated', workModel: 'Onsite', joinDate: '2019-01-10' }
];

export const MOCK_ATTENDANCE_HISTORY: AttendanceRecord[] = [
  { date: 'Oct 12', totalEmployees: 1480, presentCount: 1395, onLeaveCount: 52, absentCount: 33, attendanceRate: 94.3 },
  { date: 'Oct 13', totalEmployees: 1480, presentCount: 1405, onLeaveCount: 48, absentCount: 27, attendanceRate: 94.9 },
  { date: 'Oct 14', totalEmployees: 1485, presentCount: 1412, onLeaveCount: 46, absentCount: 27, attendanceRate: 95.1 },
  { date: 'Oct 15', totalEmployees: 1485, presentCount: 1388, onLeaveCount: 58, absentCount: 39, attendanceRate: 93.5 },
  { date: 'Oct 16', totalEmployees: 1490, presentCount: 1418, onLeaveCount: 44, absentCount: 28, attendanceRate: 95.2 },
  { date: 'Oct 17', totalEmployees: 1490, presentCount: 1426, onLeaveCount: 42, absentCount: 22, attendanceRate: 95.7 },
  { date: 'Oct 18', totalEmployees: 1492, presentCount: 1410, onLeaveCount: 50, absentCount: 32, attendanceRate: 94.5 },
  { date: 'Oct 19', totalEmployees: 1492, presentCount: 1432, onLeaveCount: 40, absentCount: 20, attendanceRate: 96.0 },
  { date: 'Oct 20', totalEmployees: 1495, presentCount: 1428, onLeaveCount: 45, absentCount: 22, attendanceRate: 95.5 },
  { date: 'Oct 21', totalEmployees: 1495, presentCount: 1435, onLeaveCount: 41, absentCount: 19, attendanceRate: 96.0 },
  { date: 'Oct 22', totalEmployees: 1498, presentCount: 1420, onLeaveCount: 51, absentCount: 27, attendanceRate: 94.8 },
  { date: 'Oct 23', totalEmployees: 1498, presentCount: 1442, onLeaveCount: 38, absentCount: 18, attendanceRate: 96.3 },
  { date: 'Oct 24', totalEmployees: 1500, presentCount: 1448, onLeaveCount: 36, absentCount: 16, attendanceRate: 96.5 },
  { date: 'Oct 25', totalEmployees: 1502, presentCount: 1439, onLeaveCount: 43, absentCount: 20, attendanceRate: 95.8 }
];

export const MOCK_DEPARTMENT_TARGETS: Record<string, number> = {
  'Engineering': 520,
  'Sales': 320,
  'Operations': 240,
  'Customer Support': 190,
  'Finance': 140,
  'Human Resources': 90
};

export const MOCK_OPEN_POSITIONS = 42;

export const MOCK_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'ACT-1',
    employeeName: 'Julian Richter',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    department: 'Engineering',
    type: 'onboarded',
    title: 'Completed Senior DevOps Onboarding (Vizag Tech Center)',
    timestamp: '2026-10-26T08:15:00',
    relativeTime: '15 mins ago',
    status: 'success'
  },
  {
    id: 'ACT-2',
    employeeName: 'Eleanor Vance',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    department: 'Engineering',
    type: 'attendance',
    title: 'Checked in at Bengaluru Tech Park (Badge #8401)',
    timestamp: '2026-10-26T08:02:00',
    relativeTime: '28 mins ago',
    status: 'info'
  },
  {
    id: 'ACT-3',
    employeeName: 'Liam Davies',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    department: 'Operations',
    type: 'leave_applied',
    title: 'Submitted Medical Leave Request (Kochi Hub)',
    timestamp: '2026-10-26T07:30:00',
    relativeTime: '1 hour ago',
    status: 'warning'
  },
  {
    id: 'ACT-4',
    employeeName: 'Marcus Bennett',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    department: 'Finance',
    type: 'profile_updated',
    title: 'Updated Direct Deposit records (Hyderabad Financial District)',
    timestamp: '2026-10-26T06:45:00',
    relativeTime: '2 hours ago',
    status: 'neutral'
  },
  {
    id: 'ACT-5',
    employeeName: 'Claire Dubois',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=100&auto=format&fit=crop&q=80',
    department: 'Operations',
    type: 'department_updated',
    title: 'Promoted to Operations Logistics Lead (Chennai Facility)',
    timestamp: '2026-10-26T05:20:00',
    relativeTime: '3 hours ago',
    status: 'success'
  }
];
