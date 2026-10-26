import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  UsersIcon,
  UserCheckIcon,
  MetricTrendIcon,
  CalendarClockIcon,
  BriefcaseIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon
} from '../common/MetricIcons';
import { DashboardMetrics } from '../../types/workforce';

interface KpiGridProps {
  metrics: DashboardMetrics;
}

export const KpiGrid: React.FC<KpiGridProps> = ({ metrics }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const cards = [
    {
      id: 'total-employees',
      label: 'Total Employees',
      value: metrics.totalEmployees.toLocaleString(),
      subtext: metrics.totalEmployeesDelta,
      icon: UsersIcon,
      accentColor: '#047857', // Emerald 700
      accentBgLight: '#ECFDF5', // Emerald 50
      accentBgDark: 'rgba(52, 211, 153, 0.12)', // Emerald 400 alpha
      trend: 'up',
      tooltip: 'Active and contracted personnel enrolled in company directory'
    },
    {
      id: 'present-today',
      label: 'Present Today',
      value: metrics.presentToday.toLocaleString(),
      subtext: metrics.presentDelta,
      icon: UserCheckIcon,
      accentColor: '#059669', // Emerald 600
      accentBgLight: '#ECFDF5',
      accentBgDark: 'rgba(52, 211, 153, 0.12)',
      trend: 'up',
      tooltip: 'Verified check-ins through badge sensors and SSO portal'
    },
    {
      id: 'attendance-rate',
      label: 'Attendance Rate',
      value: `${metrics.attendanceRate}%`,
      subtext: metrics.attendanceRateDelta,
      icon: MetricTrendIcon,
      accentColor: '#10B981', // Emerald 500
      accentBgLight: '#ECFDF5',
      accentBgDark: 'rgba(52, 211, 153, 0.12)',
      trend: 'up',
      tooltip: 'Ratio of present employees to total active workforce'
    },
    {
      id: 'on-leave',
      label: 'Employees on Leave',
      value: metrics.onLeaveCount.toLocaleString(),
      subtext: metrics.leaveDelta,
      icon: CalendarClockIcon,
      accentColor: '#059669', // Restrained emerald
      accentBgLight: '#ECFDF5',
      accentBgDark: 'rgba(52, 211, 153, 0.12)',
      trend: 'down',
      tooltip: 'Approved annual, parental, and medical leave requests'
    },
    {
      id: 'open-positions',
      label: 'Open Positions',
      value: metrics.openPositions.toLocaleString(),
      subtext: metrics.openPositionsDelta,
      icon: BriefcaseIcon,
      accentColor: '#047857', // Primary emerald
      accentBgLight: '#ECFDF5',
      accentBgDark: 'rgba(52, 211, 153, 0.12)',
      trend: 'up',
      tooltip: 'Active approved requisitions in talent acquisition pipeline'
    }
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)'
        },
        gap: 2,
        mb: 3
      }}
    >
      {cards.map((card) => {
        const IconComponent = card.icon;
        const iconBg = isDark ? card.accentBgDark : card.accentBgLight;

        return (
          <Card
            key={card.id}
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              bgcolor: isDark ? '#1E293B' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#E2E8F0',
              borderTop: `3px solid ${card.accentColor}`,
              borderRadius: '10px',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: isDark
                  ? '0 6px 16px -2px rgba(0, 0, 0, 0.4)'
                  : '0 6px 16px -2px rgba(15, 23, 42, 0.08)'
              }
            }}
          >
            <CardContent sx={{ p: 2.2, '&:last-child': { pb: 2.2 } }}>
              {/* Header Label and Human-generated SVG Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    color: theme.palette.text.secondary
                  }}
                >
                  {card.label}
                </Typography>

                <Tooltip title={card.tooltip} arrow>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: iconBg,
                      color: card.accentColor
                    }}
                  >
                    <IconComponent size={18} color="currentColor" strokeWidth={1.8} />
                  </Box>
                </Tooltip>
              </Box>

              {/* Large Metric Value */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.6rem', lg: '1.8rem' },
                  color: theme.palette.text.primary,
                  lineHeight: 1.1,
                  mb: 1
                }}
              >
                {card.value}
              </Typography>

              {/* Subtext with Trend indicator */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: card.trend === 'up' ? '#10B981' : '#F59E0B'
                  }}
                >
                  {card.trend === 'up' ? (
                    <ArrowUpRightIcon size={14} color="currentColor" strokeWidth={2} />
                  ) : (
                    <ArrowDownRightIcon size={14} color="currentColor" strokeWidth={2} />
                  )}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.74rem',
                    color: theme.palette.text.secondary,
                    fontWeight: 500
                  }}
                >
                  {card.subtext}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
