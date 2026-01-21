// Script to generate 5000 mock geo projects for India bounds
import fs from 'fs';

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

const data = {
  projects: generateProjects(5000)
};

fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
console.log('Generated db.json with 5000 projects');