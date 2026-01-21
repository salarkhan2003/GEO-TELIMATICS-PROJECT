// Static mock data for production deployment - Guaranteed 5000 projects
const statuses = ['Active', 'Completed', 'Pending'];
const projectTypes = ['GeoSurvey', 'Mining', 'Construction', 'Infrastructure', 'Environmental', 'Urban', 'Rural'];
const suffixes = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Prime', 'Pro', 'Max', 'Plus', 'Advanced', 'Standard'];

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function generateProjects(count) {
  const projects = [];
  
  console.log(`Generating ${count} projects...`);
  
  for (let i = 1; i <= count; i++) {
    const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomNum = Math.floor(Math.random() * 9999) + 1; // Increased range to avoid duplicates
    
    projects.push({
      id: i,
      projectName: `${projectType}-${suffix}-${randomNum.toString().padStart(4, '0')}`,
      latitude: parseFloat(getRandomInRange(6, 37).toFixed(6)),
      longitude: parseFloat(getRandomInRange(68, 98).toFixed(6)),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastUpdated: getRandomDate()
    });
    
    // Log progress every 1000 projects
    if (i % 1000 === 0) {
      console.log(`Generated ${i} projects...`);
    }
  }
  
  console.log(`Successfully generated ${projects.length} projects`);
  return projects;
}

// Export the generator function for dynamic use
export const generateMockData = generateProjects;

// Generate exactly 5000 projects
export const mockProjects = generateProjects(5000);

// Verify the count
console.log(`Mock data exported with ${mockProjects.length} projects`);

// Export count for verification
export const projectCount = mockProjects.length;