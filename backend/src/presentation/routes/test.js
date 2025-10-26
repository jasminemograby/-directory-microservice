import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Test route to debug mock data loading
router.get('/test', async (req, res) => {
  try {
    const mockFilePath = path.join(__dirname, '..', '..', 'mock-data.json');
    console.log('Mock file path:', mockFilePath);
    
    const mockData = await fs.readFile(mockFilePath, 'utf8');
    const parsedData = JSON.parse(mockData);
    
    res.json({
      success: true,
      path: mockFilePath,
      fileExists: true,
      data: parsedData.companies || 'No companies found'
    });
  } catch (error) {
    console.error('Error loading mock data:', error);
    res.json({
      success: false,
      error: error.message,
      path: path.join(__dirname, '..', '..', 'mock-data.json')
    });
  }
});

export default router;
