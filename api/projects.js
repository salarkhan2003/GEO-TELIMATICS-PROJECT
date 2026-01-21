// Serverless function to serve mock geo projects data for Vercel deployment
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Generate mock data (same as generate-data.js but for serverless)
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
    
    for (let i = 1; i <= count; i++) {
      const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const randomNum = Math.floor(Math.random() * 999) + 1;
      
      projects.push({
        id: i,
        projectName: `${projectType}-${suffix}-${randomNum.toString().padStart(3, '0')}`,
        latitude: parseFloat(getRandomInRange(6, 37).toFixed(6)),
        longitude: parseFloat(getRandomInRange(68, 98).toFixed(6)),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        lastUpdated: getRandomDate()
      });
    }
    
    return projects;
  }

  try {
    const projects = generateProjects(5000);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate projects data' });
  }
}