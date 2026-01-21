import React, { useMemo } from 'react';
import {
  Box,
  Grid2 as Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Avatar,
  Chip,
} from '@mui/material';
import { 
  Brightness4, 
  Brightness7,
  Assessment,
  TrendingUp,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import DataTable from './DataTable';
import GeoMap from './GeoMap';

const StatsCard = ({ icon, title, value, color, subtitle }) => (
  <Card sx={{ 
    height: '100%',
    background: `linear-gradient(135deg, ${color}15, ${color}05)`,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 12px 40px ${color}20`,
    }
  }}>
    <CardContent sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar sx={{ 
          bgcolor: color, 
          mr: 1.5,
          width: 40,
          height: 40,
          background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            background: `linear-gradient(45deg, ${color}, #1976d2)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
          }}>
            {value.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            {title}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = ({
  data,
  loading,
  error,
  selectedId,
  highlightedMarker,
  onRowClick,
  onMarkerClick,
  filterText,
  onFilterChange,
  sortModel,
  onSortModelChange,
  totalCount,
  filteredCount,
  darkMode,
  onThemeToggle,
}) => {
  // Calculate stats with useMemo
  const stats = useMemo(() => {
    const statusCounts = data.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total: totalCount,
      active: statusCounts.Active || 0,
      completed: statusCounts.Completed || 0,
      pending: statusCounts.Pending || 0,
    };
  }, [data, totalCount]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Stats */}
      <AppBar position="static" elevation={0} sx={{
        background: 'linear-gradient(135deg, #1976d2, #1565c0)',
        backdropFilter: 'blur(10px)',
      }}>
        <Toolbar sx={{ py: 1 }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Vasundharaa Geo Dashboard
          </Typography>
          
          {/* Stats in Header */}
          <Box sx={{ display: 'flex', gap: 2, mr: 3 }}>
            <Chip 
              label={`${stats.total.toLocaleString()} Projects`} 
              color="primary" 
              variant="outlined"
              sx={{ fontWeight: 600, color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
            />
            <Chip 
              label={`Active: ${stats.active}`} 
              sx={{ 
                bgcolor: '#4ade80', 
                color: 'white', 
                fontWeight: 600,
                '& .MuiChip-label': { px: 1 }
              }}
            />
            <Chip 
              label={`Completed: ${stats.completed}`} 
              sx={{ 
                bgcolor: '#06b6d4', 
                color: 'white', 
                fontWeight: 600,
                '& .MuiChip-label': { px: 1 }
              }}
            />
            <Chip 
              label={`Pending: ${stats.pending}`} 
              sx={{ 
                bgcolor: '#f59e0b', 
                color: 'white', 
                fontWeight: 600,
                '& .MuiChip-label': { px: 1 }
              }}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={onThemeToggle}
                color="default"
              />
            }
            label={
              <IconButton color="inherit" size="small">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            }
          />
        </Toolbar>
      </AppBar>

      {/* Stats Cards Row */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Assessment />}
              title="Total Projects"
              value={stats.total}
              color="#1976d2"
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <StatsCard
              icon={<TrendingUp />}
              title="Active Projects"
              value={stats.active}
              color="#4ade80"
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <StatsCard
              icon={<CheckCircle />}
              title="Completed"
              value={stats.completed}
              color="#06b6d4"
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Schedule />}
              title="Pending"
              value={stats.pending}
              color="#f59e0b"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 2, pt: 1, overflow: 'hidden' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid xs={12} lg={6} sx={{ height: '100%' }}>
            <Paper sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              overflow: 'hidden',
            }}>
              <Box sx={{ 
                p: 2, 
                borderBottom: 1, 
                borderColor: 'divider',
                background: 'linear-gradient(135deg, rgba(25,118,210,0.1), rgba(25,118,210,0.05))',
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  📊 Project Data Table
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Interactive table with advanced filtering and export capabilities
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <DataTable
                  data={data}
                  loading={loading}
                  error={error}
                  onRowClick={onRowClick}
                  selectedId={selectedId}
                  filterText={filterText}
                  onFilterChange={onFilterChange}
                  sortModel={sortModel}
                  onSortModelChange={onSortModelChange}
                  totalCount={totalCount}
                  filteredCount={filteredCount}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid xs={12} lg={6} sx={{ height: '100%' }}>
            <Paper sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              overflow: 'hidden',
            }}>
              <Box sx={{ 
                p: 2, 
                borderBottom: 1, 
                borderColor: 'divider',
                background: 'linear-gradient(135deg, rgba(156,39,176,0.1), rgba(156,39,176,0.05))',
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  🗺️ Interactive Geo Map
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Real-time visualization with clustering and synchronized selection
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
                <GeoMap
                  data={data}
                  loading={loading}
                  error={error}
                  selectedId={selectedId}
                  highlightedMarker={highlightedMarker}
                  onMarkerClick={onMarkerClick}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;