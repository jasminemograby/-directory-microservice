/**
 * HR routes with rollback mechanism
 * @fileoverview REST API endpoints for HR management
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
 * GET /api/hr/dashboard
 * Get HR dashboard data with rollback to mock data
 */
router.get('/dashboard', async (req, res) => {
  try {
    const { companyId } = req.query;
    
    const dashboardData = await tryWithFallback('hrUsers', '/hr/dashboard', null, async () => {
      // Real API call would go here
      throw new Error('Real HR dashboard API not implemented yet');
    });

    // Generate mock dashboard data
    const mockDashboard = {
      companyId: companyId || 'comp_001',
      totalEmployees: 150,
      activeTrainingRequests: 12,
      pendingApprovals: 5,
      upcomingTrainings: 8,
      recentActivity: [
        {
          id: 'act_001',
          type: 'employee_created',
          description: 'New employee John Smith added',
          timestamp: new Date().toISOString()
        },
        {
          id: 'act_002',
          type: 'training_approved',
          description: 'Training request for React Advanced approved',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ],
      metrics: {
        employeeSatisfaction: 4.2,
        trainingCompletionRate: 0.85,
        skillGapReduction: 0.12
      }
    };

    res.json({
      success: true,
      data: mockDashboard,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch HR dashboard',
      error: error.message
    });
  }
});

/**
 * GET /api/hr/employees
 * Get employees for HR management with rollback to mock data
 */
router.get('/employees', async (req, res) => {
  try {
    const { companyId, department, status } = req.query;
    
    const employees = await tryWithFallback('employees', '/hr/employees', null, async () => {
      // Real API call would go here
      throw new Error('Real HR employee API not implemented yet');
    });

    // Filter mock data based on query parameters
    let filteredEmployees = employees;
    if (companyId) {
      filteredEmployees = filteredEmployees.filter(emp => emp.companyId === companyId);
    }
    if (department) {
      filteredEmployees = filteredEmployees.filter(emp => emp.personalInfo.department === department);
    }
    if (status) {
      filteredEmployees = filteredEmployees.filter(emp => emp.status === status);
    }

    res.json({
      success: true,
      data: filteredEmployees,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch employees for HR',
      error: error.message
    });
  }
});

/**
 * GET /api/hr/training-requests
 * Get training requests for HR approval with rollback to mock data
 */
router.get('/training-requests', async (req, res) => {
  try {
    const { companyId, status } = req.query;
    
    const requests = await tryWithFallback('trainingRequests', '/hr/training-requests', null, async () => {
      // Real API call would go here
      throw new Error('Real HR training API not implemented yet');
    });

    // Filter mock data based on query parameters
    let filteredRequests = requests;
    if (companyId) {
      filteredRequests = filteredRequests.filter(req => req.companyId === companyId);
    }
    if (status) {
      filteredRequests = filteredRequests.filter(req => req.status === status);
    }

    res.json({
      success: true,
      data: filteredRequests,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training requests for HR',
      error: error.message
    });
  }
});

/**
 * GET /api/hr/analytics
 * Get HR analytics data with rollback to mock data
 */
router.get('/analytics', async (req, res) => {
  try {
    const { companyId, period = '30d' } = req.query;
    
    const analytics = await tryWithFallback('hrUsers', '/hr/analytics', null, async () => {
      // Real API call would go here
      throw new Error('Real HR analytics API not implemented yet');
    });

    // Generate mock analytics data
    const mockAnalytics = {
      companyId: companyId || 'comp_001',
      period,
      employeeGrowth: {
        current: 150,
        previous: 142,
        growthRate: 0.056
      },
      trainingMetrics: {
        totalRequests: 45,
        approvedRequests: 38,
        completedTrainings: 32,
        averageCompletionTime: 14 // days
      },
      skillDistribution: {
        'JavaScript': 45,
        'Python': 32,
        'React': 28,
        'AWS': 25,
        'Node.js': 22
      },
      departmentBreakdown: {
        'Engineering': 65,
        'Product': 25,
        'Marketing': 20,
        'Sales': 18,
        'HR': 12,
        'Finance': 10
      }
    };

    res.json({
      success: true,
      data: mockAnalytics,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch HR analytics',
      error: error.message
    });
  }
});

export default router;
