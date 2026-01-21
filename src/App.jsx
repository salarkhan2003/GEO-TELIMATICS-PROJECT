import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Typography, CircularProgress } from '@mui/material';
import Dashboard from './components/Dashboard';
import useGeoData from './hooks/useGeoData';
import useMapSync from './hooks/useMapSync';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  const {
    data,
    loading,
    error,
    filterText,
    setFilterText,
    sortModel,
    setSortModel,
    totalCount,
    filteredCount
  } = useGeoData();

  const {
    selectedId,
    highlightedMarker,
    selectProject,
    clearSelection,
    highlightMarker
  } = useMapSync();

  // Simple MUI theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
      }),
    [darkMode]
  );

  const handleRowClick = (row) => {
    selectProject(row.id);
  };

  const handleMarkerClick = (project) => {
    selectProject(project.id);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  // Show loading state
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2
        }}>
          <CircularProgress size={60} />
          <Typography variant="h6">
            Loading Vasundharaa Geo Dashboard...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fetching 5000 geo projects
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  // Show error state
  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
          p: 3
        }}>
          <Typography variant="h4" color="error">
            Application Error
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {error}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please check the console for more details or try refreshing the page.
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard
        data={data}
        loading={loading}
        error={error}
        selectedId={selectedId}
        highlightedMarker={highlightedMarker}
        onRowClick={handleRowClick}
        onMarkerClick={handleMarkerClick}
        filterText={filterText}
        onFilterChange={handleFilterChange}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        totalCount={totalCount}
        filteredCount={filteredCount}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />
    </ThemeProvider>
  );
}

export default App;