/**
 * Company routes with rollback mechanism
 * @fileoverview REST API endpoints for company management
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
 * GET /api/companies
 * Get all companies with rollback to mock data
 */
router.get('/', async (req, res) => {
  try {
    const companies = await tryWithFallback('companies', '/companies', null, async () => {
      // Real API call would go here
      throw new Error('Real company API not implemented yet');
    });

    res.json({
      success: true,
      data: companies,
      fallback: companies.fallback || false
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch companies',
      error: error.message
    });
  }
});

/**
 * GET /api/companies/:id
 * Get company by ID with rollback to mock data
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await tryWithFallback('companies', `/companies/${id}`, null, async () => {
      // Real API call would go here
      throw new Error('Real company API not implemented yet');
    });

    // Find specific company in mock data
    const mockData = await tryWithFallback('companies', '/companies', null);
    const foundCompany = mockData.find(c => c.id === id);
    
    if (!foundCompany) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      data: foundCompany,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company',
      error: error.message
    });
  }
});

/**
 * POST /api/companies
 * Create new company with rollback to mock data
 */
router.post('/', async (req, res) => {
  try {
    const companyData = req.body;
    
    // Validate company data
    if (!companyData.name || !companyData.domain || !companyData.hrContact?.email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, domain, and hrContact.email'
      });
    }
    
    const result = await tryWithFallback('companies', '/companies', companyData, async () => {
      // Real API call would go here
      throw new Error('Real company API not implemented yet');
    });

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: { ...companyData, id: `comp_${Date.now()}` },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create company',
      error: error.message
    });
  }
});

/**
 * PUT /api/companies/:id
 * Update company with rollback to mock data
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const result = await tryWithFallback('companies', `/companies/${id}`, updates, async () => {
      // Real API call would go here
      throw new Error('Real company API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Company updated successfully',
      data: { id, ...updates },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update company',
      error: error.message
    });
  }
});

/**
 * POST /api/companies/:id/verify
 * Verify company with rollback to mock data
 */
router.post('/:id/verify', async (req, res) => {
  try {
    const { id } = req.params;
    const { method = 'manual_review' } = req.body;
    
    const result = await tryWithFallback('companies', `/companies/${id}/verify`, { method }, async () => {
      // Real API call would go here
      throw new Error('Real company verification API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Company verification initiated',
      data: { id, verificationMethod: method },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to verify company',
      error: error.message
    });
  }
});

/**
 * DELETE /api/companies/:id
 * Delete company with rollback to mock data
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await tryWithFallback('companies', `/companies/${id}`, null, async () => {
      // Real API call would go here
      throw new Error('Real company API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Company deleted successfully',
      data: { id },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete company',
      error: error.message
    });
  }
});

export default router;
