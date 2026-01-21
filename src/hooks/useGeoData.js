import { useState, useEffect, useMemo, useRef } from 'react';
import { mockProjects } from '../data/mockData';

const useGeoData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [debouncedFilterText, setDebouncedFilterText] = useState('');
  const [sortModel, setSortModel] = useState([]);
  const debounceRef = useRef(null);

  // Load data (try API first, fallback to mock data)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try API first (for development with json-server)
        try {
          console.log('Attempting to fetch from API...');
          const response = await fetch('/api/projects');
          
          if (response.ok) {
            const result = await response.json();
            const projects = Array.isArray(result) ? result : result.projects || [];
            
            if (projects.length > 0) {
              console.log(`Successfully loaded ${projects.length} projects from API`);
              setData(projects);
              return;
            }
          }
        } catch (apiError) {
          console.log('API not available, using mock data');
        }
        
        // Fallback to pre-generated mock data (for production deployment)
        console.log('Loading pre-generated mock data...');
        console.log(`Loaded ${mockProjects.length} mock projects`);
        setData(mockProjects);
        
      } catch (err) {
        console.error('Data loading error:', err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Debounce filter text
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedFilterText(filterText);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [filterText]);

  // Memoized filtered and sorted data
  const processedData = useMemo(() => {
    let filtered = data;

    // Apply global filter
    if (debouncedFilterText) {
      const searchTerm = debouncedFilterText.toLowerCase();
      filtered = data.filter(item =>
        item.projectName.toLowerCase().includes(searchTerm) ||
        item.status.toLowerCase().includes(searchTerm) ||
        item.latitude.toString().includes(searchTerm) ||
        item.longitude.toString().includes(searchTerm) ||
        new Date(item.lastUpdated).toLocaleDateString().includes(searchTerm)
      );
    }

    // Apply sorting
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];

        // Handle date sorting
        if (field === 'lastUpdated') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }

        // Handle numeric sorting
        if (field === 'latitude' || field === 'longitude') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }

        if (aVal < bVal) return sort === 'asc' ? -1 : 1;
        if (aVal > bVal) return sort === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, debouncedFilterText, sortModel]);

  return {
    data: processedData,
    loading,
    error,
    filterText,
    setFilterText,
    sortModel,
    setSortModel,
    totalCount: data.length,
    filteredCount: processedData.length
  };
};

export default useGeoData;