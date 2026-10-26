import React from 'react';
import { Box, Card, Typography, Button, Skeleton, useTheme } from '@mui/material';
import { AlertTriangle, SearchX, RefreshCw } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <Box sx={{ width: '100%', py: 1 }}>
      {/* KPI Skeletons */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' },
          gap: 2,
          mb: 3
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} variant="rounded" height={118} sx={{ borderRadius: 2 }} />
        ))}
      </Box>

      {/* Chart Skeletons */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
          gap: 2.5,
          mb: 3
        }}
      >
        <Skeleton variant="rounded" height={360} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rounded" height={360} sx={{ borderRadius: 2 }} />
      </Box>

      {/* Lower Row Skeletons */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
          gap: 2.5
        }}
      >
        <Skeleton variant="rounded" height={340} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rounded" height={340} sx={{ borderRadius: 2 }} />
      </Box>
    </Box>
  );
};

interface EmptyStateProps {
  onResetFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onResetFilters }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        p: 5,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: theme.palette.mode === 'dark' ? '#064E3B' : '#ECFDF5',
          color: theme.palette.mode === 'dark' ? '#34D399' : '#047857',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        <SearchX size={28} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.8 }}>
        No workforce records found
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: 420,
          mb: 2.5,
          fontSize: '0.84rem'
        }}
      >
        Your selected filter combination returned zero matching employees.
        Try resetting your department, location, or status selections.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onResetFilters}
        startIcon={<RefreshCw size={14} />}
        sx={{ borderRadius: 2, px: 2.5, py: 0.8 }}
      >
        Reset Filters
      </Button>
    </Card>
  );
};

interface ErrorStateProps {
  onRetry: () => void;
  message?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry, message }) => {
  return (
    <Card
      elevation={0}
      sx={{
        p: 5,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderColor: 'rgba(239, 68, 68, 0.3)',
        bgcolor: 'rgba(239, 68, 68, 0.03)'
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: 'rgba(239, 68, 68, 0.1)',
          color: '#EF4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        <AlertTriangle size={28} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.8, color: '#EF4444' }}>
        Unable to load workforce telemetry
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          maxWidth: 450,
          mb: 2.5,
          fontSize: '0.84rem'
        }}
      >
        {message ||
          'A simulated connection failure occurred while contacting the enterprise HRIS telemetry service. Please retry.'}
      </Typography>

      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={onRetry}
        startIcon={<RefreshCw size={14} />}
        sx={{ borderRadius: 2, px: 2.5, py: 0.8 }}
      >
        Retry Connection
      </Button>
    </Card>
  );
};
