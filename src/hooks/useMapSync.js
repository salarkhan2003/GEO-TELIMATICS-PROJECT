import { useState, useCallback } from 'react';

const useMapSync = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [highlightedMarker, setHighlightedMarker] = useState(null);

  const selectProject = useCallback((projectId) => {
    setSelectedId(projectId);
    setHighlightedMarker(projectId);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedId(null);
    setHighlightedMarker(null);
  }, []);

  const highlightMarker = useCallback((projectId) => {
    setHighlightedMarker(projectId);
  }, []);

  return {
    selectedId,
    highlightedMarker,
    selectProject,
    clearSelection,
    highlightMarker
  };
};

export default useMapSync;