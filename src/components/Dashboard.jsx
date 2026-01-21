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
  Chip,
} from '@mui/material';
import { 
  Brightness4, 
  Brightness7,
} from '@mui/icons-material';
import DataTable from './DataTable';
import GeoMap from './GeoMap';

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
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Compact Header with Stats */}
      <AppBar position="static" elevation={0} sx={{
        background: 'linear-gradient(135deg, #1976d2, #1565c0)',
        backdropFilter: 'blur(10px)',
        minHeight: '64px',
      }}>
        <Toolbar sx={{ py: 0.5, minHeight: '64px !important' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Vasundharaa Geo Dashboard
          </Typography>
          
          {/* Compact Stats in Header */}
          <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
            <Chip 
              label={`${stats.total.toLocaleString()}`} 
              size="small"
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            />
            <Chip 
              label={`A:${stats.active}`} 
              size="small"
              sx={{ 
                bgcolor: '#4ade80', 
                color: 'white', 
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            />
            <Chip 
              label={`C:${stats.completed}`} 
              size="small"
              sx={{ 
                bgcolor: '#06b6d4', 
                color: 'white', 
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            />
            <Chip 
              label={`P:${stats.pending}`} 
              size="small"
              sx={{ 
                bgcolor: '#f59e0b', 
                color: 'white', 
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={onThemeToggle}
                color="default"
                size="small"
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

      {/* Full Screen Main Content */}
      <Box sx={{ flexGrow: 1, p: 1, overflow: 'hidden' }}>
        <Grid container spacing={1} sx={{ height: '100%' }}>
          {/* Data Table - Fixed width */}
          <Grid xs={12} lg={6} sx={{ height: '100%', minWidth: '600px' }}>
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
                p: 1, 
                borderBottom: 1, 
                borderColor: 'divider',
                background: 'linear-gradient(135deg, rgba(25,118,210,0.1), rgba(25,118,210,0.05))',
                minHeight: '48px',
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  📊 Project Data Table ({filteredCount.toLocaleString()} projects)
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

          {/* Interactive Map - Expanded to fill remaining space */}
          <Grid xs={12} lg={6} sx={{ height: '100%', flexGrow: 1 }}>
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
                p: 1, 
                borderBottom: 1, 
                borderColor: 'divider',
                background: 'linear-gradient(135deg, rgba(156,39,176,0.1), rgba(156,39,176,0.05))',
                minHeight: '48px',
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  🗺️ Interactive Map (India - {data.length.toLocaleString()} markers)
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflow: 'hidden', position: 'relative', width: '100%', height: '100%' }}>
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