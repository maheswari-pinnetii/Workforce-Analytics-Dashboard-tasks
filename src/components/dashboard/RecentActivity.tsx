import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme
} from '@mui/material';
import {
  UserPlus,
  UserCheck,
  CalendarClock,
  Building2,
  Clock
} from 'lucide-react';
import { ActivityEvent } from '../../types/workforce';

interface RecentActivityProps {
  activities: ActivityEvent[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const getEventBadge = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'onboarded':
        return {
          icon: <UserPlus size={13} />,
          label: 'Onboarded',
          color: isDark ? '#34D399' : '#047857',
          bg: isDark ? '#064E3B' : '#ECFDF5'
        };
      case 'attendance':
        return {
          icon: <UserCheck size={13} />,
          label: 'Presence',
          color: isDark ? '#38BDF8' : '#0284C7',
          bg: isDark ? '#082F49' : '#F0F9FF'
        };
      case 'leave_applied':
        return {
          icon: <CalendarClock size={13} />,
          label: 'Leave Request',
          color: '#F59E0B',
          bg: isDark ? 'rgba(245, 158, 11, 0.15)' : '#FFFBEB'
        };
      case 'department_updated':
        return {
          icon: <Building2 size={13} />,
          label: 'Transfer / Promo',
          color: '#8B5CF6',
          bg: isDark ? 'rgba(139, 92, 246, 0.15)' : '#F5F3FF'
        };
      case 'profile_updated':
      default:
        return {
          icon: <Clock size={13} />,
          label: 'Profile Sync',
          color: theme.palette.text.secondary,
          bg: isDark ? '#334155' : '#F1F5F9'
        };
    }
  };

  return (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: '0.98rem', fontWeight: 700 }}>
              Recent Employee Activity
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              Live workforce events, status updates, and onboarding logs
            </Typography>
          </Box>
        </Box>

        <List sx={{ p: 0, flexGrow: 1, overflowY: 'auto' }}>
          {activities.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                No recent activity records found.
              </Typography>
            </Box>
          ) : (
            activities.map((act, index) => {
              const badge = getEventBadge(act.type);
              const isLast = index === activities.length - 1;

              return (
                <ListItem
                  key={act.id}
                  disableGutters
                  sx={{
                    py: 1.25,
                    borderBottom: isLast ? 'none' : `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar
                      src={act.avatar}
                      alt={act.employeeName}
                      sx={{ width: 38, height: 38, borderRadius: '8px' }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.84rem' }}>
                          {act.employeeName}
                        </Typography>
                        <Chip
                          icon={badge.icon}
                          label={badge.label}
                          size="small"
                          sx={{
                            height: 19,
                            fontSize: '0.64rem',
                            fontWeight: 600,
                            bgcolor: badge.bg,
                            color: badge.color,
                            '& .MuiChip-icon': { color: 'inherit', ml: 0.4 }
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.2 }}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', fontSize: '0.74rem' }}>
                          {act.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }}>
                          {act.department} • {act.relativeTime}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })
          )}
        </List>
      </CardContent>
    </Card>
  );
};
