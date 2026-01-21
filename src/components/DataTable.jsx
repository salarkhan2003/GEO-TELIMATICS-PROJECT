import React, { useState, useRef } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  useGridApiRef,
} from '@mui/x-data-grid';
import {
  Box,
  TextField,
  InputAdornment,
  Skeleton,
  Alert,
  Typography,
  Paper,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Search as SearchIcon,
  FileDownload as ExportIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

const CustomToolbar = ({ 
  onFilterChange, 
  filterText, 
  totalCount, 
  filteredCount, 
  onExport,
  activeFilters,
  onClearFilter 
}) => {
  return (
    <GridToolbarContainer>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 1, 
        p: 2, 
        width: '100%',
        background: 'linear-gradient(135deg, rgba(25,118,210,0.08), rgba(25,118,210,0.04))',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        {/* Search and Export Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
          <TextField
            size="small"
            placeholder="🔍 Search across all columns..."
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ 
              minWidth: 350,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 20px rgba(25,118,210,0.2)',
                },
                '&.Mui-focused': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 20px rgba(25,118,210,0.3)',
                }
              }
            }}
          />
          
          <Button
            variant="contained"
            startIcon={<ExportIcon />}
            onClick={onExport}
            sx={{
              borderRadius: 3,
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              '&:hover': {
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 20px rgba(34,197,94,0.3)',
              }
            }}
          >
            Export CSV
          </Button>
          
          <Chip 
            icon={<SearchIcon />}
            label={`${filteredCount} of ${totalCount} projects`}
            color="primary"
            variant="outlined"
            sx={{ 
              fontWeight: 600,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
            }}
          />
          
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <Tooltip title="Advanced Filters">
              <IconButton size="small" sx={{ 
                background: 'rgba(25,118,210,0.15)',
                '&:hover': { 
                  background: 'rgba(25,118,210,0.25)',
                  transform: 'scale(1.1)',
                }
              }}>
                <GridToolbarFilterButton />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="View Options">
              <IconButton size="small" sx={{ 
                background: 'rgba(156,39,176,0.15)',
                '&:hover': { 
                  background: 'rgba(156,39,176,0.25)',
                  transform: 'scale(1.1)',
                }
              }}>
                <GridToolbarDensitySelector />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Filter Chips Row */}
        {activeFilters.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Active Filters:
            </Typography>
            {activeFilters.map((filter, index) => (
              <Chip
                key={index}
                label={filter.label}
                onDelete={() => onClearFilter(filter.field)}
                deleteIcon={<ClearIcon />}
                size="small"
                color="primary"
                variant="outlined"
                sx={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </GridToolbarContainer>
  );
};

const DataTable = ({ 
  data, 
  loading, 
  error, 
  onRowClick, 
  selectedId,
  filterText,
  onFilterChange,
  sortModel,
  onSortModelChange,
  totalCount,
  filteredCount
}) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const apiRef = useGridApiRef();

  const handleExport = () => {
    if (apiRef.current) {
      apiRef.current.exportDataAsCsv({
        fileName: `vasundharaa-geo-projects-${new Date().toISOString().split('T')[0]}`,
      });
    }
  };

  const handleClearFilter = (field) => {
    setActiveFilters(prev => prev.filter(f => f.field !== field));
    // Additional logic to clear specific filters would go here
  };

  const columns = [
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'latitude',
      headerName: 'Latitude',
      width: 120,
      type: 'number',
      valueFormatter: (value) => `${value?.toFixed(6)}°`,
      renderCell: (params) => (
        <Chip 
          label={`${params.value?.toFixed(4)}°`}
          size="small"
          variant="outlined"
          color="primary"
          sx={{ fontSize: '0.75rem' }}
        />
      ),
    },
    {
      field: 'longitude',
      headerName: 'Longitude',
      width: 120,
      type: 'number',
      valueFormatter: (value) => `${value?.toFixed(6)}°`,
      renderCell: (params) => (
        <Chip 
          label={`${params.value?.toFixed(4)}°`}
          size="small"
          variant="outlined"
          color="secondary"
          sx={{ fontSize: '0.75rem' }}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const getStatusColor = (status) => {
          switch (status) {
            case 'Active': return '#4ade80';
            case 'Completed': return '#06b6d4';
            case 'Pending': return '#f59e0b';
            default: return '#6b7280';
          }
        };

        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              backgroundColor: `${getStatusColor(params.value)}20`,
              color: getStatusColor(params.value),
              border: `1px solid ${getStatusColor(params.value)}40`,
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
        );
      },
    },
    {
      field: 'lastUpdated',
      headerName: 'Last Updated',
      width: 150,
      type: 'date',
      valueGetter: (value) => new Date(value),
      valueFormatter: (value) => value?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      renderCell: (params) => (
        <Typography variant="body2" sx={{ 
          color: 'text.secondary',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
        }}>
          {params.value?.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Typography>
      ),
    },
  ];

  if (loading) {
    return (
      <Paper sx={{ height: '100%', p: 3 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 2 }} />
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={52} sx={{ mb: 1, borderRadius: 1 }} />
        ))}
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Oops! Something went wrong
        </Typography>
        Error loading data: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        apiRef={apiRef}
        rows={data}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[25, 50, 100]}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        onRowClick={(params) => onRowClick(params.row)}
        rowSelectionModel={selectedId ? [selectedId] : []}
        disableRowSelectionOnClick={false}
        slots={{
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            onFilterChange,
            filterText,
            totalCount,
            filteredCount,
            onExport: handleExport,
            activeFilters,
            onClearFilter: handleClearFilter,
          },
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: 'rgba(224, 224, 224, 0.5)',
            '&:focus': {
              outline: '2px solid rgba(25,118,210,0.4)',
              outlineOffset: '-2px',
            }
          },
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(25,118,210,0.08)',
              transform: 'translateX(4px)',
              boxShadow: '4px 0 12px rgba(25,118,210,0.2)',
            },
            '&.highlighted-row': {
              backgroundColor: 'rgba(25,118,210,0.12)',
              transform: 'translateX(6px)',
              boxShadow: '6px 0 16px rgba(25,118,210,0.25)',
              transition: 'all 0.3s ease',
            }
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgba(25,118,210,0.15)',
            borderLeft: '4px solid #1976d2',
            '&:hover': {
              backgroundColor: 'rgba(25,118,210,0.2)',
            },
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: 'rgba(248, 250, 252, 0.8)',
            backdropFilter: 'blur(10px)',
            fontWeight: 700,
            fontSize: '0.9rem',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid rgba(224, 224, 224, 0.5)',
            backgroundColor: 'rgba(248, 250, 252, 0.8)',
            backdropFilter: 'blur(10px)',
          }
        }}
      />
    </Box>
  );
};

export default DataTable;