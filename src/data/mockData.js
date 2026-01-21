// Simple static mock data for reliable deployment
export const mockProjects = [
  {
    id: 1,
    projectName: "GeoSurvey-Alpha-0001",
    latitude: 28.6139,
    longitude: 77.2090,
    status: "Active",
    lastUpdated: "2024-01-15T10:30:00.000Z"
  },
  {
    id: 2,
    projectName: "Mining-Beta-0002",
    latitude: 19.0760,
    longitude: 72.8777,
    status: "Completed",
    lastUpdated: "2024-01-14T14:20:00.000Z"
  },
  {
    id: 3,
    projectName: "Construction-Gamma-0003",
    latitude: 13.0827,
    longitude: 80.2707,
    status: "Pending",
    lastUpdated: "2024-01-13T09:15:00.000Z"
  },
  {
    id: 4,
    projectName: "Infrastructure-Delta-0004",
    latitude: 22.5726,
    longitude: 88.3639,
    status: "Active",
    lastUpdated: "2024-01-12T16:45:00.000Z"
  },
  {
    id: 5,
    projectName: "Environmental-Prime-0005",
    latitude: 12.9716,
    longitude: 77.5946,
    status: "Completed",
    lastUpdated: "2024-01-11T11:30:00.000Z"
  }
];

// Generate additional projects programmatically for demo
const statuses = ['Active', 'Completed', 'Pending'];
const projectTypes = ['GeoSurvey', 'Mining', 'Construction', 'Infrastructure', 'Environmental'];
const suffixes = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Prime'];

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

// Generate additional projects to reach 100 total (manageable size)
for (let i = 6; i <= 100; i++) {
  const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  mockProjects.push({
    id: i,
    projectName: `${projectType}-${suffix}-${i.toString().padStart(4, '0')}`,
    latitude: parseFloat(getRandomInRange(6, 37).toFixed(6)),
    longitude: parseFloat(getRandomInRange(68, 98).toFixed(6)),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastUpdated: getRandomDate()
  });
}

export const generateMockData = (count = 100) => {
  return mockProjects.slice(0, Math.min(count, mockProjects.length));
};