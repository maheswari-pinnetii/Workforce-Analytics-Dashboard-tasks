import React from 'react';
import { Box, Typography, Button, Tooltip, useTheme } from '@mui/material';
import { RefreshCw, Download, ChartNoAxesCombined } from 'lucide-react';

interface DashboardHeaderProps {
  lastUpdated: string;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  lastUpdated,
  onRefresh,
  isRefreshing
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: 3,
        gap: 1.5
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 34,
              height: 34,
              borderRadius: 1.5,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(52, 211, 153, 0.15)' : '#ECFDF5',
              color: theme.palette.mode === 'dark' ? '#34D399' : '#047857'
            }}
          >
            <ChartNoAxesCombined size={19} color="currentColor" />
          </Box>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.35rem', sm: '1.65rem' }, fontWeight: 700 }}>
            Workforce Overview
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Monitor workforce composition, attendance, and employee activity.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.74rem' }}>
          Last updated: <strong>{lastUpdated}</strong>
        </Typography>

        <Tooltip title="Synchronize latest attendance logs">
          <Button
            size="small"
            variant="outlined"
            onClick={onRefresh}
            disabled={isRefreshing}
            startIcon={<RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />}
            sx={{
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary,
              fontSize: '0.78rem'
            }}
          >
            Refresh
          </Button>
        </Tooltip>

        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => alert('Exporting Workforce Executive Summary Report (PDF/CSV)...')}
          startIcon={<Download size={14} />}
          sx={{ fontSize: '0.78rem' }}
        >
          Export Report
        </Button>
      </Box>
    </Box>
  );
};
