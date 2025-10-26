/**
 * Employee routes with rollback mechanism
 * @fileoverview REST API endpoints for employee management
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
 * GET /api/employees
 * Get all employees with rollback to mock data
 */
router.get('/', async (req, res) => {
  try {
    const { companyId, status, department } = req.query;
    
    const employees = await tryWithFallback('employees', '/employees', null, async () => {
      // Real API call would go here
      throw new Error('Real employee API not implemented yet');
    });

    // Filter mock data based on query parameters
    let filteredEmployees = employees;
    if (companyId) {
      filteredEmployees = filteredEmployees.filter(emp => emp.companyId === companyId);
    }
    if (status) {
      filteredEmployees = filteredEmployees.filter(emp => emp.status === status);
    }
    if (department) {
      filteredEmployees = filteredEmployees.filter(emp => emp.personalInfo.department === department);
    }

    res.json({
      success: true,
      data: filteredEmployees,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch employees',
      error: error.message
    });
  }
});

/**
 * GET /api/employees/:id
 * Get employee by ID with rollback to mock data
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const employee = await tryWithFallback('employees', `/employees/${id}`, null, async () => {
      // Real API call would go here
      throw new Error('Real employee API not implemented yet');
    });

    // Find specific employee in mock data
    const mockData = await tryWithFallback('employees', '/employees', null);
    const foundEmployee = mockData.find(emp => emp.id === id);
    
    if (!foundEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      data: foundEmployee,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch employee',
      error: error.message
    });
  }
});

/**
 * POST /api/employees
 * Create new employee with rollback to mock data
 */
router.post('/', async (req, res) => {
  try {
    const employeeData = req.body;
    
    // Validate employee data
    if (!employeeData.personalInfo?.email || !employeeData.personalInfo?.firstName || !employeeData.personalInfo?.lastName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: personalInfo.email, firstName, and lastName'
      });
    }
    
    const result = await tryWithFallback('employees', '/employees', employeeData, async () => {
      // Real API call would go here
      throw new Error('Real employee API not implemented yet');
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: { ...employeeData, id: `emp_${Date.now()}` },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create employee',
      error: error.message
    });
  }
});

/**
 * PUT /api/employees/:id
 * Update employee with rollback to mock data
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const result = await tryWithFallback('employees', `/employees/${id}`, updates, async () => {
      // Real API call would go here
      throw new Error('Real employee API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: { id, ...updates },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update employee',
      error: error.message
    });
  }
});

/**
 * POST /api/employees/:id/enrich
 * Enrich employee profile with external data
 */
router.post('/:id/enrich', async (req, res) => {
  try {
    const { id } = req.params;
    const { sources = ['linkedin', 'github'] } = req.body;
    
    const result = await tryWithFallback('employees', `/employees/${id}/enrich`, { sources }, async () => {
      // Real API call would go here
      throw new Error('Real employee enrichment API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Employee profile enrichment initiated',
      data: { id, sources, enrichedAt: new Date().toISOString() },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to enrich employee profile',
      error: error.message
    });
  }
});

/**
 * POST /api/employees/:id/skills
 * Add skills to employee profile
 */
router.post('/:id/skills', async (req, res) => {
  try {
    const { id } = req.params;
    const { skills } = req.body;
    
    if (!Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Skills must be an array'
      });
    }
    
    const result = await tryWithFallback('employees', `/employees/${id}/skills`, { skills }, async () => {
      // Real API call would go here
      throw new Error('Real employee skills API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Skills added successfully',
      data: { id, skillsAdded: skills },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add skills',
      error: error.message
    });
  }
});

/**
 * DELETE /api/employees/:id
 * Delete employee with rollback to mock data
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await tryWithFallback('employees', `/employees/${id}`, null, async () => {
      // Real API call would go here
      throw new Error('Real employee API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Employee deleted successfully',
      data: { id },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete employee',
      error: error.message
    });
  }
});

export default router;
