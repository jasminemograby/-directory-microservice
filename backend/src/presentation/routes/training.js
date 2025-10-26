/**
 * Training routes with rollback mechanism
 * @fileoverview REST API endpoints for training request management
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
 * GET /api/training/requests
 * Get all training requests with rollback to mock data
 */
router.get('/requests', async (req, res) => {
  try {
    const { companyId, employeeId, status, type } = req.query;
    
    const requests = await tryWithFallback('trainingRequests', '/training/requests', null, async () => {
      // Real API call would go here
      throw new Error('Real training API not implemented yet');
    });

    // Filter mock data based on query parameters
    let filteredRequests = requests;
    if (companyId) {
      filteredRequests = filteredRequests.filter(req => req.companyId === companyId);
    }
    if (employeeId) {
      filteredRequests = filteredRequests.filter(req => req.employeeId === employeeId);
    }
    if (status) {
      filteredRequests = filteredRequests.filter(req => req.status === status);
    }
    if (type) {
      filteredRequests = filteredRequests.filter(req => req.type === type);
    }

    res.json({
      success: true,
      data: filteredRequests,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training requests',
      error: error.message
    });
  }
});

/**
 * GET /api/training/requests/:id
 * Get training request by ID with rollback to mock data
 */
router.get('/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await tryWithFallback('trainingRequests', `/training/requests/${id}`, null, async () => {
      // Real API call would go here
      throw new Error('Real training API not implemented yet');
    });

    // Find specific request in mock data
    const mockData = await tryWithFallback('trainingRequests', '/training/requests', null);
    const foundRequest = mockData.find(req => req.id === id);
    
    if (!foundRequest) {
      return res.status(404).json({
        success: false,
        message: 'Training request not found'
      });
    }

    res.json({
      success: true,
      data: foundRequest,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training request',
      error: error.message
    });
  }
});

/**
 * POST /api/training/requests
 * Create new training request with rollback to mock data
 */
router.post('/requests', async (req, res) => {
  try {
    const requestData = req.body;
    
    // Validate training request data
    if (!requestData.title || !requestData.description || !requestData.type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, description, and type'
      });
    }
    
    const result = await tryWithFallback('trainingRequests', '/training/requests', requestData, async () => {
      // Real API call would go here
      throw new Error('Real training API not implemented yet');
    });

    res.status(201).json({
      success: true,
      message: 'Training request created successfully',
      data: { ...requestData, id: `tr_${Date.now()}` },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create training request',
      error: error.message
    });
  }
});

/**
 * PUT /api/training/requests/:id
 * Update training request with rollback to mock data
 */
router.put('/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const result = await tryWithFallback('trainingRequests', `/training/requests/${id}`, updates, async () => {
      // Real API call would go here
      throw new Error('Real training API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Training request updated successfully',
      data: { id, ...updates },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update training request',
      error: error.message
    });
  }
});

/**
 * POST /api/training/requests/:id/approve
 * Approve training request
 */
router.post('/requests/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { approvedBy, instructor, scheduledFor } = req.body;
    
    const result = await tryWithFallback('trainingRequests', `/training/requests/${id}/approve`, { approvedBy, instructor, scheduledFor }, async () => {
      // Real API call would go here
      throw new Error('Real training approval API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Training request approved successfully',
      data: { id, approvedBy, approvedAt: new Date().toISOString() },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to approve training request',
      error: error.message
    });
  }
});

/**
 * POST /api/training/requests/:id/reject
 * Reject training request
 */
router.post('/requests/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectedBy, reason } = req.body;
    
    const result = await tryWithFallback('trainingRequests', `/training/requests/${id}/reject`, { rejectedBy, reason }, async () => {
      // Real API call would go here
      throw new Error('Real training rejection API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Training request rejected',
      data: { id, rejectedBy, reason, rejectedAt: new Date().toISOString() },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to reject training request',
      error: error.message
    });
  }
});

/**
 * POST /api/training/requests/:id/schedule
 * Schedule training
 */
router.post('/requests/:id/schedule', async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduledFor, instructor } = req.body;
    
    const result = await tryWithFallback('trainingRequests', `/training/requests/${id}/schedule`, { scheduledFor, instructor }, async () => {
      // Real API call would go here
      throw new Error('Real training scheduling API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Training scheduled successfully',
      data: { id, scheduledFor, instructor },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to schedule training',
      error: error.message
    });
  }
});

/**
 * POST /api/training/requests/:id/complete
 * Mark training as completed
 */
router.post('/requests/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await tryWithFallback('trainingRequests', `/training/requests/${id}/complete`, null, async () => {
      // Real API call would go here
      throw new Error('Real training completion API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Training marked as completed',
      data: { id, completedAt: new Date().toISOString() },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to complete training',
      error: error.message
    });
  }
});

/**
 * DELETE /api/training/requests/:id
 * Delete training request with rollback to mock data
 */
router.delete('/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await tryWithFallback('trainingRequests', `/training/requests/${id}`, null, async () => {
      // Real API call would go here
      throw new Error('Real training API not implemented yet');
    });

    res.json({
      success: true,
      message: 'Training request deleted successfully',
      data: { id },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete training request',
      error: error.message
    });
  }
});

export default router;
