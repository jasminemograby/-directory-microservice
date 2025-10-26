import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, RefreshCw, Wifi, WifiOff, Database, 
  ArrowLeft, Home, Settings, CheckCircle, XCircle
} from 'lucide-react';

const ErrorRollbackPage = () => {
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [mockDataStatus, setMockDataStatus] = useState('available');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Simulate connection check
    const checkConnection = async () => {
      setConnectionStatus('checking');
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Randomly determine if connection is available
        const isConnected = Math.random() > 0.3; // 70% chance of connection
        
        if (isConnected) {
          setConnectionStatus('connected');
          setLastSyncTime(new Date().toISOString());
          setRetryCount(0);
        } else {
          setConnectionStatus('disconnected');
          setMockDataStatus('active');
        }
      } catch (error) {
        setConnectionStatus('error');
        setMockDataStatus('active');
      }
    };

    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRetryConnection = async () => {
    setRetryCount(prev => prev + 1);
    setConnectionStatus('checking');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const isConnected = Math.random() > 0.4; // 60% chance on retry
      
      if (isConnected) {
        setConnectionStatus('connected');
        setLastSyncTime(new Date().toISOString());
        setMockDataStatus('standby');
        setRetryCount(0);
      } else {
        setConnectionStatus('disconnected');
        setMockDataStatus('active');
      }
    } catch (error) {
      setConnectionStatus('error');
      setMockDataStatus('active');
    }
  };

  const handleGoHome = () => {
    navigate('/directory');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-6 w-6" style={{ color: 'var(--success-green)' }} />
      case 'disconnected':
        return <WifiOff className="h-6 w-6" style={{ color: 'var(--error-red)' }} />
      case 'checking':
        return <RefreshCw className="h-6 w-6 animate-spin" style={{ color: 'var(--accent-orange)' }} />
      case 'error':
        return <AlertTriangle className="h-6 w-6" style={{ color: 'var(--error-red)' }} />
      default:
        return <WifiOff className="h-6 w-6" style={{ color: 'var(--text-muted)' }} />
    }
  };

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connection restored! All services are online.'
      case 'disconnected':
        return 'Network connection lost. Using offline mode with mock data.'
      case 'checking':
        return 'Checking network connection...'
      case 'error':
        return 'Connection error. Please check your network settings.'
      default:
        return 'Unknown connection status.'
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'var(--success-green)'
      case 'disconnected':
        return 'var(--error-red)'
      case 'checking':
        return 'var(--accent-orange)'
      case 'error':
        return 'var(--error-red)'
      default:
        return 'var(--text-muted)'
    }
  };

  return (
    <div className="error-rollback-page">
      <div className="error-container">
        {/* Header */}
        <div className="error-header">
          <div className="header-actions">
            <button 
              className="back-btn"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>
            <button 
              className="home-btn"
              onClick={handleGoHome}
            >
              <Home className="h-5 w-5" />
              Home
            </button>
          </div>
          
          <div className="header-content">
            <div className="header-icon">
              <AlertTriangle className="h-8 w-8" style={{ color: 'var(--accent-orange)' }} />
            </div>
            <div className="header-text">
              <h1>Service Status</h1>
              <p>Network and data service monitoring</p>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="status-cards">
          {/* Connection Status */}
          <div className="status-card">
            <div className="status-header">
              <div className="status-icon">
                {getStatusIcon()}
              </div>
              <div className="status-info">
                <h2>Network Connection</h2>
                <p style={{ color: getStatusColor() }}>{getStatusMessage()}</p>
              </div>
            </div>
            
            <div className="status-details">
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value" style={{ color: getStatusColor() }}>
                  {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
                </span>
              </div>
              {lastSyncTime && (
                <div className="detail-item">
                  <span className="detail-label">Last Sync:</span>
                  <span className="detail-value">
                    {new Date(lastSyncTime).toLocaleString()}
                  </span>
                </div>
              )}
              {retryCount > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Retry Attempts:</span>
                  <span className="detail-value">{retryCount}</span>
                </div>
              )}
            </div>
            
            {connectionStatus !== 'connected' && (
              <div className="status-actions">
                <button 
                  className="retry-btn"
                  onClick={handleRetryConnection}
                  disabled={connectionStatus === 'checking'}
                >
                  <RefreshCw className={`h-4 w-4 ${connectionStatus === 'checking' ? 'animate-spin' : ''}`} />
                  {connectionStatus === 'checking' ? 'Checking...' : 'Retry Connection'}
                </button>
              </div>
            )}
          </div>

          {/* Mock Data Status */}
          <div className="status-card">
            <div className="status-header">
              <div className="status-icon">
                <Database className="h-6 w-6" style={{ 
                  color: mockDataStatus === 'active' ? 'var(--accent-orange)' : 'var(--success-green)' 
                }} />
              </div>
              <div className="status-info">
                <h2>Mock Data Service</h2>
                <p style={{ 
                  color: mockDataStatus === 'active' ? 'var(--accent-orange)' : 'var(--success-green)' 
                }}>
                  {mockDataStatus === 'active' 
                    ? 'Currently serving offline data' 
                    : 'Standby mode - live data available'
                  }
                </p>
              </div>
            </div>
            
            <div className="status-details">
              <div className="detail-item">
                <span className="detail-label">Mode:</span>
                <span className="detail-value" style={{ 
                  color: mockDataStatus === 'active' ? 'var(--accent-orange)' : 'var(--success-green)' 
                }}>
                  {mockDataStatus === 'active' ? 'Offline' : 'Standby'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Data Source:</span>
                <span className="detail-value">
                  {mockDataStatus === 'active' ? 'Local Mock Data' : 'Live API'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">
                  {mockDataStatus === 'active' ? 'Static Data' : 'Real-time'}
                </span>
              </div>
            </div>
          </div>

          {/* Service Status */}
          <div className="status-card">
            <div className="status-header">
              <div className="status-icon">
                <Settings className="h-6 w-6" style={{ color: 'var(--primary-blue)' }} />
              </div>
              <div className="status-info">
                <h2>Service Health</h2>
                <p>All core services are operational</p>
              </div>
            </div>
            
            <div className="service-list">
              <div className="service-item">
                <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                <span>Directory Service</span>
                <span className="service-status">Online</span>
              </div>
              <div className="service-item">
                <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                <span>Employee Management</span>
                <span className="service-status">Online</span>
              </div>
              <div className="service-item">
                <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                <span>Training System</span>
                <span className="service-status">Online</span>
              </div>
              <div className="service-item">
                <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                <span>Authentication</span>
                <span className="service-status">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offline Notice */}
        {mockDataStatus === 'active' && (
          <div className="offline-notice">
            <div className="notice-header">
              <AlertTriangle className="h-6 w-6" style={{ color: 'var(--accent-orange)' }} />
              <h3>Offline Mode Active</h3>
            </div>
            <div className="notice-content">
              <p>
                You're currently viewing cached data due to network connectivity issues. 
                Some features may be limited, and data may not be up-to-date.
              </p>
              <div className="notice-features">
                <div className="feature-item">
                  <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                  <span>View existing data</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                  <span>Navigate between pages</span>
                </div>
                <div className="feature-item">
                  <XCircle className="h-4 w-4" style={{ color: 'var(--error-red)' }} />
                  <span>Save new data</span>
                </div>
                <div className="feature-item">
                  <XCircle className="h-4 w-4" style={{ color: 'var(--error-red)' }} />
                  <span>Real-time updates</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="error-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleGoHome}
          >
            <Home className="h-4 w-4" />
            Go to Home
          </button>
          {connectionStatus !== 'connected' && (
            <button 
              className="btn btn-accent"
              onClick={handleRetryConnection}
              disabled={connectionStatus === 'checking'}
            >
              <RefreshCw className={`h-4 w-4 ${connectionStatus === 'checking' ? 'animate-spin' : ''}`} />
              {connectionStatus === 'checking' ? 'Checking...' : 'Retry Connection'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorRollbackPage;
