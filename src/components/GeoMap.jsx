import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Box, Skeleton, Alert, Typography } from '@mui/material';

// Custom SVG markers for different statuses
const createCustomMarker = (status, isSelected = false) => {
  const colors = {
    Active: '#4ade80',
    Completed: '#06b6d4', 
    Pending: '#f59e0b'
  };
  
  const color = colors[status] || '#6b7280';
  const size = isSelected ? 35 : 25;
  const scale = isSelected ? 1.3 : 1;
  
  const svgIcon = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
            fill="${color}" 
            stroke="white" 
            stroke-width="2"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"/>
      <circle cx="12" cy="9" r="3" fill="white"/>
    </svg>
  `;
  
  return L.divIcon({
    className: 'custom-svg-marker',
    html: `<div style="
      transform: scale(${scale});
      transition: all 0.3s ease;
      filter: ${isSelected ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'};
    ">${svgIcon}</div>`,
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size],
  });
};

// Custom hook to handle map updates and clustering
const MapController = ({ selectedId, data, onMarkerClick }) => {
  const map = useMap();
  const markersRef = useRef(null);
  const markerInstancesRef = useRef(new Map());

  // Force map to resize when container changes
  useEffect(() => {
    const resizeMap = () => {
      if (map) {
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      }
    };

    resizeMap();
    window.addEventListener('resize', resizeMap);
    
    return () => {
      window.removeEventListener('resize', resizeMap);
    };
  }, [map]);

  useEffect(() => {
    if (selectedId && data.length > 0) {
      const selectedProject = data.find(p => p.id === selectedId);
      if (selectedProject) {
        map.setView([selectedProject.latitude, selectedProject.longitude], 12, {
          animate: true,
          duration: 1
        });
      }
    }
  }, [selectedId, data, map]);

  // Initialize marker clustering
  useEffect(() => {
    if (!markersRef.current && window.L && window.L.markerClusterGroup) {
      markersRef.current = window.L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: function(cluster) {
          const count = cluster.getChildCount();
          let size = 'small';
          if (count > 100) size = 'large';
          else if (count > 10) size = 'medium';
          
          return L.divIcon({
            html: `<div style="
              background: linear-gradient(135deg, #1976d2, #1565c0);
              color: white;
              border-radius: 50%;
              width: ${size === 'large' ? '50px' : size === 'medium' ? '40px' : '30px'};
              height: ${size === 'large' ? '50px' : size === 'medium' ? '40px' : '30px'};
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: ${size === 'large' ? '16px' : size === 'medium' ? '14px' : '12px'};
              box-shadow: 0 4px 12px rgba(25,118,210,0.4);
              border: 3px solid white;
              backdrop-filter: blur(10px);
            ">${count}</div>`,
            className: 'custom-cluster-icon',
            iconSize: L.point(40, 40)
          });
        }
      });
      map.addLayer(markersRef.current);
    }

    return () => {
      if (markersRef.current) {
        map.removeLayer(markersRef.current);
        markersRef.current = null;
      }
    };
  }, [map]);

  // Update markers when data changes
  useEffect(() => {
    if (markersRef.current && data.length > 0) {
      markersRef.current.clearLayers();
      markerInstancesRef.current.clear();
      
      data.forEach((project) => {
        const isSelected = selectedId === project.id;
        
        const marker = L.marker([project.latitude, project.longitude], {
          icon: createCustomMarker(project.status, isSelected)
        });

        // Enhanced popup with glassmorphism
        const popupContent = `
          <div style="
            min-width: 250px;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border: 1px solid rgba(255,255,255,0.2);
          ">
            <h3 style="
              margin: 0 0 12px 0; 
              font-size: 18px; 
              color: #1976d2;
              font-weight: 600;
            ">${project.projectName}</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="
                  background: ${project.status === 'Active' ? '#4ade80' : project.status === 'Completed' ? '#06b6d4' : '#f59e0b'};
                  color: white;
                  padding: 4px 8px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: 600;
                ">${project.status}</span>
              </div>
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>📍 Location:</strong> ${project.latitude.toFixed(6)}, ${project.longitude.toFixed(6)}
              </p>
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>📅 Last Updated:</strong> ${new Date(project.lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        });

        marker.on('click', () => onMarkerClick(project));
        
        // Add CSS class for selected marker
        if (isSelected) {
          marker.getElement()?.classList.add('selected-marker');
        }
        
        markersRef.current.addLayer(marker);
        markerInstancesRef.current.set(project.id, marker);
      });
    }
  }, [data, selectedId, onMarkerClick]);

  return null;
};

const GeoMap = ({ 
  data, 
  loading, 
  error, 
  selectedId, 
  highlightedMarker, 
  onMarkerClick 
}) => {
  if (loading) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(25,118,210,0.1), rgba(156,39,176,0.1))',
      }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          sx={{ borderRadius: 2 }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Map Loading Error
        </Typography>
        Error loading map: {error}
      </Alert>
    );
  }

  // India bounds
  const indiaBounds = [[6, 68], [37, 98]];

  return (
    <Box sx={{ 
      height: '100%', 
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      '& .leaflet-container': {
        height: '100% !important',
        width: '100% !important',
        borderRadius: '0 0 8px 8px',
        flex: 1,
      },
      '& .custom-popup .leaflet-popup-content-wrapper': {
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
      },
      '& .custom-popup .leaflet-popup-content': {
        margin: 0,
      },
      '& .selected-marker': {
        zIndex: 1000,
        animation: 'pulse 2s infinite',
      },
      '@keyframes pulse': {
        '0%': {
          transform: 'scale(1)',
        },
        '50%': {
          transform: 'scale(1.1)',
        },
        '100%': {
          transform: 'scale(1)',
        },
      }
    }}>
      <MapContainer
        bounds={indiaBounds}
        style={{ 
          height: '100%', 
          width: '100%',
          flex: 1,
          minHeight: '400px',
        }}
        maxBounds={indiaBounds}
        maxBoundsViscosity={1.0}
        zoomControl={true}
        scrollWheelZoom={true}
        whenCreated={(mapInstance) => {
          // Force resize after creation
          setTimeout(() => {
            mapInstance.invalidateSize();
          }, 100);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.9}
        />

        <MapController
          selectedId={selectedId}
          data={data}
          onMarkerClick={onMarkerClick}
        />
      </MapContainer>
    </Box>
  );
};

export default GeoMap;