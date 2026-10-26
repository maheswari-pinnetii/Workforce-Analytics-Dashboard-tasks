import React from 'react';
import { Card, CardContent, Typography, Box, useTheme, Chip } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { AttendanceRecord } from '../../types/workforce';

interface AttendanceTrendChartProps {
  data: AttendanceRecord[];
}

export const AttendanceTrendChart: React.FC<AttendanceTrendChartProps> = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const avgRate = data.length > 0 
    ? (data.reduce((acc, curr) => acc + curr.attendanceRate, 0) / data.length).toFixed(1)
    : '0';

  return (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title and Summary Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: '0.98rem', fontWeight: 700 }}>
              Attendance Trend
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              Daily attendance percentage across the active period
            </Typography>
          </Box>
          <Chip
            label={`Avg: ${avgRate}%`}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.68rem',
              fontWeight: 600,
              bgcolor: isDark ? '#064E3B' : '#ECFDF5',
              color: isDark ? '#34D399' : '#047857'
            }}
          />
        </Box>

        {/* Responsive Line Chart */}
        <Box sx={{ width: '100%', height: 300, flexGrow: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? '#334155' : '#E2E8F0'}
              />
              <XAxis
                dataKey="date"
                stroke={theme.palette.text.secondary}
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                domain={[85, 100]}
                stroke={theme.palette.text.secondary}
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                  borderColor: isDark ? '#334155' : '#E2E8F0',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  color: isDark ? '#F8FAFC' : '#0F172A'
                }}
                formatter={(value: any) => [`${value}%`, 'Attendance Rate']}
              />
              <Legend verticalAlign="top" height={32} iconType="plainline" />
              <Line
                type="monotone"
                dataKey="attendanceRate"
                name="Attendance Rate"
                stroke={isDark ? '#34D399' : '#047857'}
                strokeWidth={2.5}
                dot={{ r: 3, fill: isDark ? '#34D399' : '#047857' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
