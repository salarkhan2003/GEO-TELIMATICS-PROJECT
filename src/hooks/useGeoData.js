import { useState, useEffect, useMemo, useRef } from 'react';

const useGeoData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [debouncedFilterText, setDebouncedFilterText] = useState('');
  const [sortModel, setSortModel] = useState([]);
  const debounceRef = useRef(null);

  // Fetch data from json-server or serverless function
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try production API first, fallback to development
        const apiUrl = process.env.NODE_ENV === 'production' 
          ? '/api/projects' 
          : '/api/projects';
          
        console.log('Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Data received:', result.length || result.projects?.length || 'Unknown count');
        
        // Handle both direct array and object with projects property
        const projects = Array.isArray(result) ? result : result.projects || [];
        
        if (projects.length === 0) {
          throw new Error('No projects data received');
        }
        
        setData(projects);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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