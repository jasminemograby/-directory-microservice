/**
 * Instructor routes with rollback mechanism
 * @fileoverview REST API endpoints for instructor management
 */

import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple rollback utility
async function tryWithFallback(serviceName, endpoint, payload = null, realApiCall = null) {
  try {
    if (!realApiCall) {
      console.log(`[MOCK] ${serviceName} - ${endpoint} - No real API available, using mock data`);
      return await loadMockData(serviceName, endpoint);
    }
    const result = await realApiCall(payload);
    console.log(`[SUCCESS] ${serviceName} - ${endpoint} - Real API call succeeded`);
    return result;
  } catch (error) {
    console.log(`[FALLBACK] ${serviceName} - ${endpoint} - Error: ${error.message}`);
    const mockData = await loadMockData(serviceName, endpoint);
    if (payload) {
      return {
        success: true,
        message: 'Operation completed using mock data',
        data: mockData,
        fallback: true
      };
    }
    return mockData;
  }
}

async function loadMockData(serviceName, endpoint) {
  try {
    const mockFilePath = path.join(__dirname, '..', '..', 'mock-data.json');
    const mockData = await fs.readFile(mockFilePath, 'utf8');
    const parsedData = JSON.parse(mockData);
    return parsedData[serviceName] || parsedData;
  } catch (error) {
    console.error(`Failed to load mock data for ${serviceName}:`, error);
    return { error: 'Mock data not available' };
  }
}

const router = express.Router();

/**
 * GET /api/instructors
 * Get all instructors with rollback to mock data
 */
router.get('/', async (req, res) => {
  try {
    const { status, specialty } = req.query;
    
    const instructors = await tryWithFallback('instructors', '/instructors', null, async () => {
      // Real API call would go here
      throw new Error('Real instructor API not implemented yet');
    });

    // Filter mock data based on query parameters
    let filteredInstructors = instructors;
    if (status) {
      filteredInstructors = filteredInstructors.filter(inst => inst.status === status);
    }
    if (specialty) {
      filteredInstructors = filteredInstructors.filter(inst => 
        inst.specialties.includes(specialty)
      );
    }

    res.json({
      success: true,
      data: filteredInstructors,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch instructors',
      error: error.message
    });
  }
});

/**
 * GET /api/instructors/:id
 * Get instructor by ID with rollback to mock data
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const instructor = await tryWithFallback('instructors', `/instructors/${id}`, null, async () => {
      // Real API call would go here
      throw new Error('Real instructor API not implemented yet');
    });

    // Find specific instructor in mock data
    const mockData = await tryWithFallback('instructors', '/instructors', null);
    const foundInstructor = mockData.find(inst => inst.id === id);
    
    if (!foundInstructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found'
      });
    }

    res.json({
      success: true,
      data: foundInstructor,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch instructor',
      error: error.message
    });
  }
});

/**
 * POST /api/instructors
 * Create new instructor with rollback to mock data
 */
router.post('/', async (req, res) => {
  try {
    const instructorData = req.body;
    
    const result = await tryWithFallback('instructors', '/instructors', instructorData, async () => {
      // Real API call would go here
      throw new Error('Real instructor API not implemented yet');
    });

    res.status(201).json({
      success: true,
      message: 'Instructor created successfully',
      data: { ...instructorData, id: `inst_${Date.now()}` },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create instructor',
      error: error.message
    });
  }
});

/**
 * PUT /api/instructors/:id
 * Update instructor with rollback to mock data
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const result = await tryWithFallback('instructors', `/instructors/${id}`, updates, async () => {
      // Real API call would go here
      throw new Error('Real instructor API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Instructor updated successfully',
      data: { id, ...updates },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update instructor',
      error: error.message
    });
  }
});

export default router;
