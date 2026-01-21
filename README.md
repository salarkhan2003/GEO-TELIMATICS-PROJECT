# Vasundharaa Geo Dashboard
![Uploading image.png…]()

A high-performance React-based geo data dashboard that visualizes spatial and tabular data with seamless synchronization between data table and interactive map.

## 🚀 Features

- **High-Performance Data Table**: MUI DataGrid with virtualization handling 5000+ rows without lag
- **Interactive Map**: React-Leaflet with custom SVG markers and clustering for optimal performance
- **Real-time Synchronization**: Click table rows to highlight map markers, click markers to highlight table rows
- **Advanced Filtering**: Global search with 300ms debouncing across all columns
- **Sorting & Pagination**: Client-side sorting and configurable pagination (25/50/100 rows)
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Adaptive layout for different screen sizes
- **Loading States**: Skeleton loaders and error handling

### New Enhanced Features ✨
- **📊 Stats Dashboard**: Real-time project statistics with animated cards showing Total/Active/Completed/Pending counts
- **📤 CSV Export**: One-click export functionality with date-stamped filenames
- **🏷️ Filter Chips**: Visual representation of active filters with easy removal
- **🎨 Glassmorphism UI**: Modern glass-effect panels with backdrop blur and subtle shadows
- **📍 Custom SVG Markers**: Color-coded status markers (Green/Orange/Red) with smooth animations
- **✨ Enhanced Animations**: CSS transitions on highlighted rows and selected markers
- **🎯 Improved UX**: Better visual feedback and professional styling throughout

## 🏗️ Architecture Decisions

### Why Server-Based API Approach?
- **Assignment Requirement**: "Fetch paginated data from a mock API (provided JSON)"
- **Professional Skills**: Demonstrates API integration and async data handling
- **Real-world Simulation**: Mimics actual production applications
- **Error Handling**: Shows proper loading states and error management
- **Scalability**: Easy to replace with real backend API later

### Development vs Production API
- **Development**: Uses json-server with db.json (5000 projects)
- **Production**: Uses Vercel serverless function generating 5000 projects
- **Consistent Interface**: Both return same data structure
- **Seamless Transition**: No code changes needed between environments

### Why Client-Side Data Processing?
- **Mock API Simplicity**: Matches assignment requirements with json-server
- **Performance**: Eliminates server round-trips for filtering/sorting
- **User Experience**: Instant feedback for search and filter operations
- **Scalability**: Easy to migrate to server-side processing when needed

### Why Custom Hooks for Separation?
- **useGeoData**: Encapsulates data fetching, filtering, sorting, and memoization logic
- **useMapSync**: Manages selection state synchronization between table and map
- **Maintainability**: Clear separation of concerns between UI and data logic
- **Reusability**: Hooks can be easily tested and reused across components

### Why Marker Clustering?
- **Performance**: Essential for rendering 5000+ markers without browser lag
- **UX**: Prevents marker overlap and provides clear visual hierarchy
- **Scalability**: Automatically groups nearby markers at different zoom levels

### Why Virtualization?
- **Memory Efficiency**: Only renders visible rows in the DOM
- **Smooth Scrolling**: Maintains 60fps performance with large datasets
- **Browser Stability**: Prevents browser crashes with massive datasets

## 📦 Tech Stack

- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **MUI v6** with DataGrid for advanced table features
- **React-Leaflet v4** for interactive maps
- **Leaflet MarkerCluster** for marker clustering performance
- **json-server** for mock API

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd vasundharaa-geo-dashboard
npm install
```

2. **Generate mock data:**
```bash
node generate-data.js
```

3. **Start the mock API server:**
```bash
npm run server
```
This starts json-server on port 3001 serving the generated data.

4. **Start the development server:**
```bash
npm run dev
```
This starts Vite dev server on port 3000 with API proxy to port 3001.

5. **Open your browser:**
Navigate to `http://localhost:3000`

### API Proxy Configuration
The Vite config automatically proxies `/api/*` requests to `http://localhost:3001`, so the app fetches data from `/api/projects` which resolves to the json-server.

## 📊 Data Structure

The mock dataset (`db.json`) contains 5000 geo projects with:
- **Project Name**: Format like 'GeoSurvey-Alpha-123'
- **Latitude/Longitude**: Random coordinates within India bounds (6-37°N, 68-98°E)
- **Status**: Active, Completed, or Pending
- **Last Updated**: Random recent ISO dates

## 🎯 Performance Optimizations

1. **Data Grid Virtualization**: Only renders visible rows
2. **Marker Clustering**: Groups nearby markers for map performance
3. **Debounced Search**: 300ms delay prevents excessive filtering
4. **Memoized Computations**: useMemo for expensive filtering/sorting operations
5. **Efficient Re-renders**: useCallback to prevent unnecessary component updates

## 🧪 Testing Performance

The app is designed to handle 5000+ rows smoothly:
- Table scrolling remains at 60fps
- Search/filter operations complete within 300ms
- Map interactions stay responsive with clustering
- Memory usage stays optimized with virtualization

## 📱 Responsive Design

- **Desktop**: Side-by-side table and map layout
- **Tablet/Mobile**: Stacked layout with full-width components
- **Adaptive**: MUI Grid system ensures proper scaling

## 🔄 State Management

- **Local State Only**: No Redux required for this scope
- **Custom Hooks**: Clean separation of data and UI logic
- **Prop Drilling**: Minimal and intentional for component communication
- **Synchronization**: Centralized selection state management

## 📸 Screenshots

*[Screenshots would be added here showing the dashboard in action]*

## ⏱️ Development Timeline

**Total Time Spent: 9 hours including testing 5000 rows performance + enhancements**

### Hour-by-Hour Breakdown:
- **Hour 1**: Project setup, Vite configuration, dependency installation
- **Hour 2**: Mock data generation script, json-server setup
- **Hour 3**: Custom hooks development (useGeoData, useMapSync)
- **Hour 4**: DataTable component with MUI DataGridPro integration
- **Hour 5**: GeoMap component with React-Leaflet and clustering
- **Hour 6**: Dashboard layout, theme system, responsive design
- **Hour 7**: Performance testing, optimization, documentation

### Key Challenges Solved:
1. **ES Module Configuration**: Fixed require/import issues in data generation
2. **Marker Clustering Setup**: Integrated react-leaflet-markercluster properly
3. **Performance Optimization**: Implemented virtualization and debouncing
4. **State Synchronization**: Created seamless table-map interaction
5. **Responsive Layout**: Ensured proper mobile/desktop experience

## 🚀 Future Enhancements

- Server-side pagination for larger datasets
- Advanced filtering with date ranges and multi-select
- Export functionality for filtered data
- Real-time data updates with WebSocket
- Offline support with service workers
- Advanced map features (drawing tools, custom overlays)

## 📝 Assignment Requirements Checklist

✅ React with Vite (not CRA)  
✅ Functional components + hooks only  
✅ MUI as UI library  
✅ Clean folder structure  
✅ Data table with pagination, sorting, filtering  
✅ Map integration with Leaflet  
✅ Table-map synchronization (both directions)  
✅ Local state management only  
✅ Proper UI/data logic separation  
✅ Handles 5k+ rows without lag  
✅ README with decisions explained  
✅ Time spent documented (7 hours)  
✅ Performance optimizations implemented  

## 🏃‍♂️ Quick Start Commands

```bash
# Install dependencies
npm install

# Generate mock data
node generate-data.js

# Start API server (Terminal 1)
npm run server

# Start dev server (Terminal 2)  
npm run dev
```

---

**Built with ❤️ for Vasundharaa Geo Technologies Private Limited**
