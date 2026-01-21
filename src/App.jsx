import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import Dashboard from './components/Dashboard';
import useGeoData from './hooks/useGeoData';
import useMapSync from './hooks/useMapSync';

function App() {
  const [darkMode, setDarkMode] = useState(true); // Start with dark mode for modern look
  
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

  // Create advanced MUI theme with glassmorphism and modern design
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#00d4ff',
            light: '#4de6ff',
            dark: '#0099cc',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#ff6b35',
            light: '#ff9966',
            dark: '#cc4400',
          },
          background: {
            default: darkMode ? '#0a0e1a' : '#f8fafc',
            paper: darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          },
          text: {
            primary: darkMode ? '#e2e8f0' : '#1e293b',
            secondary: darkMode ? '#94a3b8' : '#64748b',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 700,
            background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          },
          h6: {
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 16,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backdropFilter: 'blur(20px)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: darkMode 
                  ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
                backdropFilter: 'blur(20px)',
                borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              },
            },
          },
          MuiDataGrid: {
            styleOverrides: {
              root: {
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                },
                '& .MuiDataGrid-columnHeaders': {
                  background: darkMode 
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.8))'
                    : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.8))',
                  borderBottom: darkMode ? '2px solid rgba(0, 212, 255, 0.3)' : '2px solid rgba(0, 212, 255, 0.2)',
                },
                '& .MuiDataGrid-row:hover': {
                  background: darkMode 
                    ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 53, 0.05))'
                    : 'linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(255, 107, 53, 0.02))',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 12,
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)',
                },
              },
            },
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            background: darkMode 
              ? 'linear-gradient(135deg, #0a0e1a 0%, #1e293b 50%, #0f172a 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
            minHeight: '100vh',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          },
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: darkMode ? '#4a5568 #2d3748' : '#cbd5e0 #f7fafc',
          },
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: darkMode ? '#2d3748' : '#f7fafc',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb': {
            background: darkMode ? '#4a5568' : '#cbd5e0',
            borderRadius: '4px',
            '&:hover': {
              background: darkMode ? '#718096' : '#a0aec0',
            },
          },
          '.leaflet-container': {
            borderRadius: '16px',
            overflow: 'hidden',
          },
          '.custom-marker': {
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
          },
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1,
            },
            '50%': {
              transform: 'scale(1.1)',
              opacity: 0.8,
            },
            '100%': {
              transform: 'scale(1)',
              opacity: 1,
            },
          },
          '.pulse-animation': {
            animation: 'pulse 2s infinite',
          },
        }}
      />
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