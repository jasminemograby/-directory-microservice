/**
 * Rollback utility for handling API failures with mock data fallback
 * @fileoverview Provides tryWithFallback function for graceful degradation
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Loads mock data from JSON files
 * @param {string} serviceName - Name of the service (e.g., 'companies', 'employees')
 * @param {string} endpoint - API endpoint path
 * @returns {Promise<Object>} Mock data object
 */
async function loadMockData(serviceName, endpoint) {
  try {
    const mockFilePath = path.join(__dirname, '..', 'database', 'mocks', 'sample-data.json');
    const mockData = await fs.readFile(mockFilePath, 'utf8');
    const parsedData = JSON.parse(mockData);
    
    // Return specific service data or all data
    return parsedData[serviceName] || parsedData;
  } catch (error) {
    console.error(`Failed to load mock data for ${serviceName}:`, error);
    return { error: 'Mock data not available' };
  }
}

/**
 * Logs fallback usage for debugging
 * @param {string} serviceName - Name of the service
 * @param {string} endpoint - API endpoint
 * @param {string} operation - Operation type (GET, POST, PUT, DELETE)
 * @param {Error} error - Original error that triggered fallback
 */
function logFallbackUsage(serviceName, endpoint, operation, error) {
  const timestamp = new Date().toISOString();
  console.log(`[FALLBACK] ${timestamp} - Service: ${serviceName}, Endpoint: ${endpoint}, Operation: ${operation}`);
  console.log(`[FALLBACK] Error: ${error.message}`);
  console.log(`[FALLBACK] Using mock data instead`);
}

/**
 * Main rollback function that tries real API call first, falls back to mock data
 * @param {string} serviceName - Name of the service
 * @param {string} endpoint - API endpoint path
 * @param {Object} payload - Request payload (for POST/PUT operations)
 * @param {Function} realApiCall - Function that makes the real API call
 * @returns {Promise<Object>} Response data (real or mock)
 */
export async function tryWithFallback(serviceName, endpoint, payload = null, realApiCall = null) {
  try {
    // If no real API call provided, go straight to mock
    if (!realApiCall) {
      console.log(`[MOCK] ${serviceName} - ${endpoint} - No real API available, using mock data`);
      return await loadMockData(serviceName, endpoint);
    }

    // Try real API call first
    const result = await realApiCall(payload);
    console.log(`[SUCCESS] ${serviceName} - ${endpoint} - Real API call succeeded`);
    return result;
  } catch (error) {
    // Log fallback usage
    const operation = payload ? 'POST' : 'GET';
    logFallbackUsage(serviceName, endpoint, operation, error);
    
    // Load and return mock data
    const mockData = await loadMockData(serviceName, endpoint);
    
    // For POST/PUT operations, simulate success response
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

/**
 * Creates a mock adapter for external services
 * @param {string} serviceName - Name of the service
 * @returns {Function} Adapter function
 */
export function createMockAdapter(serviceName) {
  return async function callService(endpoint, payload) {
    return tryWithFallback(serviceName, endpoint, payload);
  };
}

/**
 * Validates mock data structure
 * @param {Object} data - Data to validate
 * @param {string} expectedType - Expected data type (e.g., 'array', 'object')
 * @returns {boolean} Whether data is valid
 */
export function validateMockData(data, expectedType = 'object') {
  if (expectedType === 'array') {
    return Array.isArray(data);
  }
  return typeof data === 'object' && data !== null;
}

export default {
  tryWithFallback,
  createMockAdapter,
  validateMockData,
  loadMockData
};
