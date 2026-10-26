import React from 'react';
import { Card, CardContent, Typography, Box, useTheme, Chip } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { DepartmentMetric } from '../../types/workforce';

interface DepartmentDistributionChartProps {
  data: DepartmentMetric[];
}

export const DepartmentDistributionChart: React.FC<DepartmentDistributionChartProps> = ({ data }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: '0.98rem', fontWeight: 700 }}>
              Department-wise Distribution
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              Employee headcount versus department capacity targets
            </Typography>
          </Box>
          <Chip
            label={`${data.length} Depts`}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.68rem',
              fontWeight: 600,
              bgcolor: isDark ? '#334155' : '#F1F5F9',
              color: theme.palette.text.secondary
            }}
          />
        </Box>

        {/* Horizontal Bar Chart */}
        <Box sx={{ width: '100%', height: 280, flexGrow: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 20, left: 20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? '#334155' : '#E2E8F0'}
              />
              <XAxis
                type="number"
                stroke={theme.palette.text.secondary}
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="department"
                stroke={theme.palette.text.secondary}
                fontSize={11}
                tickLine={false}
                width={100}
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
              />
              <Legend verticalAlign="top" height={32} iconType="circle" />
              <Bar
                dataKey="employeeCount"
                name="Headcount"
                fill={isDark ? '#34D399' : '#047857'}
                radius={[0, 4, 4, 0]}
                barSize={12}
              />
              <Bar
                dataKey="capacityTarget"
                name="Target Plan"
                fill={isDark ? '#475569' : '#94A3B8'}
                radius={[0, 4, 4, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
