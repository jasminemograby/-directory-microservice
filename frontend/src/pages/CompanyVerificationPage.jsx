import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Clock, Building2, ArrowRight, ArrowLeft, Loader } from 'lucide-react';

const CompanyVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationStep, setVerificationStep] = useState('verifying'); // 'verifying' or 'verified'
  const [progress, setProgress] = useState(0);
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    // Get company data from navigation state
    if (location.state?.companyData) {
      setCompanyData(location.state.companyData);
    }

    // Simulate verification process
    if (location.state?.step === 'verifying') {
      simulateVerification();
    } else if (location.state?.step === 'verified') {
      setVerificationStep('verified');
    }
  }, [location.state]);

  const simulateVerification = () => {
    const steps = [
      { progress: 20, message: 'Validating company information...' },
      { progress: 40, message: 'Checking domain ownership...' },
      { progress: 60, message: 'Verifying HR contact details...' },
      { progress: 80, message: 'Running background checks...' },
      { progress: 100, message: 'Verification complete!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        // Move to verified state after completion
        setTimeout(() => {
          setVerificationStep('verified');
        }, 1000);
      }
    }, 2000);
  };

  const handleContinueToSetup = () => {
    navigate('/company-setup', { 
      state: { 
        companyData: companyData,
        step: 'setup'
      }
    });
  };

  const handleBackToDirectory = () => {
    navigate('/directory');
  };

  if (verificationStep === 'verifying') {
    return (
      <div className="company-verification-page">
        <div className="verification-container">
          <div className="verification-content">
            {/* Header */}
            <div className="verification-header">
              <div className="verification-icon">
                <Building2 className="h-16 w-16" style={{ color: 'var(--primary-blue)' }} />
              </div>
              <h1 className="verification-title">Verifying Your Company</h1>
              <p className="verification-subtitle">
                We're validating your company information to ensure everything is accurate
              </p>
            </div>

            {/* Progress Section */}
            <div className="progress-section">
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="progress-text">{progress}% Complete</div>
              </div>

              {/* Verification Steps */}
              <div className="verification-steps">
                <div className={`step ${progress >= 20 ? 'completed' : progress >= 0 ? 'active' : ''}`}>
                  <div className="step-icon">
                    {progress >= 20 ? (
                      <CheckCircle className="h-5 w-5" style={{ color: 'var(--success-green)' }} />
                    ) : (
                      <Clock className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <div className="step-content">
                    <div className="step-title">Company Information</div>
                    <div className="step-description">Validating company details</div>
                  </div>
                </div>

                <div className={`step ${progress >= 40 ? 'completed' : progress >= 20 ? 'active' : ''}`}>
                  <div className="step-icon">
                    {progress >= 40 ? (
                      <CheckCircle className="h-5 w-5" style={{ color: 'var(--success-green)' }} />
                    ) : (
                      <Clock className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <div className="step-content">
                    <div className="step-title">Domain Verification</div>
                    <div className="step-description">Checking domain ownership</div>
                  </div>
                </div>

                <div className={`step ${progress >= 60 ? 'completed' : progress >= 40 ? 'active' : ''}`}>
                  <div className="step-icon">
                    {progress >= 60 ? (
                      <CheckCircle className="h-5 w-5" style={{ color: 'var(--success-green)' }} />
                    ) : (
                      <Clock className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <div className="step-content">
                    <div className="step-title">HR Contact</div>
                    <div className="step-description">Verifying contact details</div>
                  </div>
                </div>

                <div className={`step ${progress >= 80 ? 'completed' : progress >= 60 ? 'active' : ''}`}>
                  <div className="step-icon">
                    {progress >= 80 ? (
                      <CheckCircle className="h-5 w-5" style={{ color: 'var(--success-green)' }} />
                    ) : (
                      <Clock className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <div className="step-content">
                    <div className="step-title">Background Check</div>
                    <div className="step-description">Running security checks</div>
                  </div>
                </div>

                <div className={`step ${progress >= 100 ? 'completed' : progress >= 80 ? 'active' : ''}`}>
                  <div className="step-icon">
                    {progress >= 100 ? (
                      <CheckCircle className="h-5 w-5" style={{ color: 'var(--success-green)' }} />
                    ) : (
                      <Clock className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <div className="step-content">
                    <div className="step-title">Final Review</div>
                    <div className="step-description">Completing verification</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info Preview */}
            {companyData && (
              <div className="company-preview">
                <h3 className="preview-title">Company Information</h3>
                <div className="preview-grid">
                  <div className="preview-item">
                    <span className="preview-label">Company:</span>
                    <span className="preview-value">{companyData.companyName}</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-label">Domain:</span>
                    <span className="preview-value">{companyData.domain}</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-label">Industry:</span>
                    <span className="preview-value">{companyData.industry}</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-label">HR Contact:</span>
                    <span className="preview-value">{companyData.hrName}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Loading Message */}
            <div className="loading-message">
              <Loader className="h-6 w-6 animate-spin" style={{ color: 'var(--primary-blue)' }} />
              <span>Please wait while we verify your information...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verified State
  return (
    <div className="company-verification-page">
      <div className="verification-container">
        <div className="verification-content">
          {/* Success Header */}
          <div className="verification-header">
            <div className="success-icon">
              <CheckCircle className="h-20 w-20" style={{ color: 'var(--success-green)' }} />
            </div>
            <h1 className="verification-title success">Company Verified!</h1>
            <p className="verification-subtitle success">
              Congratulations! Your company has been successfully verified and is ready for setup.
            </p>
          </div>

          {/* Success Details */}
          <div className="success-details">
            <div className="success-card">
              <h3 className="success-card-title">What's Next?</h3>
              <div className="success-steps">
                <div className="success-step">
                  <div className="success-step-icon">
                    <Building2 className="h-6 w-6" style={{ color: 'var(--primary-blue)' }} />
                  </div>
                  <div className="success-step-content">
                    <div className="success-step-title">Complete Company Setup</div>
                    <div className="success-step-description">
                      Add departments, teams, and employee information
                    </div>
                  </div>
                </div>
                <div className="success-step">
                  <div className="success-step-icon">
                    <CheckCircle className="h-6 w-6" style={{ color: 'var(--success-green)' }} />
                  </div>
                  <div className="success-step-content">
                    <div className="success-step-title">Configure Training Settings</div>
                    <div className="success-step-description">
                      Set up learning paths and training requirements
                    </div>
                  </div>
                </div>
                <div className="success-step">
                  <div className="success-step-icon">
                    <ArrowRight className="h-6 w-6" style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <div className="success-step-content">
                    <div className="success-step-title">Start Training</div>
                    <div className="success-step-description">
                      Begin your company's learning journey
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info Summary */}
          {companyData && (
            <div className="company-summary">
              <h3 className="summary-title">Verified Company Details</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Company Name:</span>
                  <span className="summary-value">{companyData.companyName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Domain:</span>
                  <span className="summary-value">{companyData.domain}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Industry:</span>
                  <span className="summary-value">{companyData.industry}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">HR Contact:</span>
                  <span className="summary-value">{companyData.hrName} ({companyData.hrRole})</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="verification-actions">
            <button 
              className="continue-btn"
              onClick={handleContinueToSetup}
            >
              <ArrowRight className="h-5 w-5" />
              Continue to Setup
            </button>
            <button 
              className="back-btn"
              onClick={handleBackToDirectory}
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Directory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyVerificationPage;
