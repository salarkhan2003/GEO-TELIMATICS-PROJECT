// Quick test to verify data generation
import { mockProjects, projectCount } from './src/data/mockData.js';

console.log('Project count:', projectCount);
console.log('Array length:', mockProjects.length);
console.log('First project:', mockProjects[0]);
console.log('Last project:', mockProjects[mockProjects.length - 1]);

if (mockProjects.length === 5000) {
  console.log('✅ SUCCESS: 5000 projects generated correctly');
} else {
  console.log('❌ ERROR: Expected 5000, got', mockProjects.length);
}