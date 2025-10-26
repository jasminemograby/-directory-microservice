/**
 * Authentication routes with rollback mechanism
 * @fileoverview REST API endpoints for authentication
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
 * POST /api/auth/login
 * User login with rollback to mock data
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    const result = await tryWithFallback('auth', '/auth/login', { email, password }, async () => {
      // Real API call would go here
      throw new Error('Real auth API not implemented yet');
    });

    // Mock successful login
    const mockUser = {
      id: 'user_001',
      email,
      name: 'John Doe',
      role: 'hr_manager',
      companyId: 'comp_001',
      permissions: ['view_employees', 'edit_employees', 'approve_training']
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: mockUser,
        token: mockToken,
        expiresIn: '7d'
      },
      fallback: true
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

/**
 * POST /api/auth/register
 * User registration with rollback to mock data
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, companyId, role } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      });
    }
    
    const result = await tryWithFallback('auth', '/auth/register', req.body, async () => {
      // Real API call would go here
      throw new Error('Real auth API not implemented yet');
    });

    // Mock successful registration
    const mockUser = {
      id: 'user_' + Date.now(),
      email,
      name,
      role: role || 'employee',
      companyId: companyId || null,
      permissions: role === 'hr_manager' ? ['view_employees', 'edit_employees', 'approve_training'] : ['view_profile']
    };

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        expiresIn: '7d'
      },
      fallback: true
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

/**
 * POST /api/auth/logout
 * User logout
 */
router.post('/logout', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logout successful',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get('/me', async (req, res) => {
  try {
    // Mock current user data
    const mockUser = {
      id: 'user_001',
      email: 'john.doe@techcorp.com',
      name: 'John Doe',
      role: 'hr_manager',
      companyId: 'comp_001',
      permissions: ['view_employees', 'edit_employees', 'approve_training', 'manage_instructors']
    };

    res.json({
      success: true,
      data: mockUser,
      fallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user info',
      error: error.message
    });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh authentication token
 */
router.post('/refresh', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }
    
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: 'mock-refreshed-token-' + Date.now(),
        expiresIn: '7d'
      },
      fallback: true
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token refresh failed',
      error: error.message
    });
  }
});

export default router;
