import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme, Chip, Skeleton } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Sector
} from 'recharts';
import { WorkforceStatusComposition } from '../../types/workforce';

interface WorkforceCompositionChartProps {
  data: WorkforceStatusComposition[];
  isLoading?: boolean;
}

// Render active sector with elegant evilcharts pop-out expansion & outline
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: '0.85rem', fontWeight: 700 }}
      >
        {payload.status}
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fill="#64748B"
        style={{ fontSize: '0.74rem', fontWeight: 500 }}
      >
        {`${value.toLocaleString()} (${(percent * 100).toFixed(1)}%)`}
      </text>
      {/* Expanded outer sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* Outer subtle glow ring */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 11}
        outerRadius={outerRadius + 13}
        fill={fill}
        opacity={0.4}
      />
    </g>
  );
};

export const WorkforceCompositionChart: React.FC<WorkforceCompositionChartProps> = ({
  data,
  isLoading = false
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const totalPersonnel = data.reduce((acc, curr) => acc + curr.count, 0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: '0.98rem', fontWeight: 700 }}>
              Workforce Composition
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              Distribution by active presence, leaves, and absence
            </Typography>
          </Box>
          <Chip
            label={isLoading ? 'Updating...' : 'Live Breakdown'}
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

        {isLoading ? (
          /* Loading State Skeleton inspired by evilcharts shimmer/skeleton */
          <Box
            sx={{
              width: '100%',
              height: 280,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              py: 2
            }}
          >
            <Skeleton
              variant="circular"
              width={190}
              height={190}
              animation="wave"
              sx={{ bgcolor: isDark ? '#334155' : '#E2E8F0' }}
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={60}
                  height={14}
                  animation="wave"
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </Box>
          </Box>
        ) : (
          /* Solid Pie Chart with Sector Pop-out & Custom Tooltips */
          <Box sx={{ position: 'relative', width: '100%', height: 280, flexGrow: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                    borderColor: isDark ? '#334155' : '#E2E8F0',
                    borderRadius: 8,
                    fontSize: '0.78rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    color: isDark ? '#F8FAFC' : '#0F172A'
                  }}
                  formatter={(val: any) => [
                    `${Number(val).toLocaleString()} (${((Number(val) / totalPersonnel) * 100).toFixed(1)}%)`,
                    'Headcount'
                  ]}
                />
                {React.createElement(Pie as any, {
                  activeIndex,
                  activeShape: renderActiveShape,
                  data,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 0,
                  outerRadius: 95,
                  paddingAngle: 1.5,
                  dataKey: "count",
                  onMouseEnter: onPieEnter,
                  onMouseLeave: onPieLeave,
                  cursor: "pointer"
                }, data.map((entry, index) => (
                  <Cell
                    key={`pie-cell-${index}`}
                    fill={entry.color}
                    stroke={isDark ? '#1E293B' : '#FFFFFF'}
                    strokeWidth={2}
                  />
                )))}
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ color: theme.palette.text.primary, fontSize: '0.76rem', fontWeight: 500 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
