import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, User, Mail, Briefcase, ArrowLeft, CheckCircle } from 'lucide-react';
import { industries } from '../data/mockCompanies';

const CompanyRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    domain: '',
    industry: '',
    hrName: '',
    hrEmail: '',
    hrRole: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.domain.trim()) {
      newErrors.domain = 'Domain is required';
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/.test(formData.domain)) {
      newErrors.domain = 'Please enter a valid domain (e.g., company.com)';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.hrName.trim()) {
      newErrors.hrName = 'HR contact name is required';
    }

    if (!formData.hrEmail.trim()) {
      newErrors.hrEmail = 'HR email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.hrEmail)) {
      newErrors.hrEmail = 'Please enter a valid email address';
    }

    if (!formData.hrRole.trim()) {
      newErrors.hrRole = 'HR role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Company registration data:', formData);
      
      setIsSuccess(true);
      
      // Redirect to verification page after 2 seconds
      setTimeout(() => {
        navigate('/company-verification', { 
          state: { 
            companyData: formData,
            step: 'verifying'
          }
        });
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Failed to register company. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDirectory = () => {
    navigate('/directory');
  };

  if (isSuccess) {
    return (
      <div className="company-registration-page">
        <div className="registration-container">
          <div className="success-state">
            <div className="success-icon">
              <CheckCircle className="h-16 w-16" style={{ color: 'var(--success-green)' }} />
            </div>
            <h1 className="success-title">Registration Submitted!</h1>
            <p className="success-message">
              Your company registration has been submitted successfully. 
              We'll verify your information and get back to you shortly.
            </p>
            <div className="success-details">
              <h3>What happens next?</h3>
              <ul>
                <li>We'll verify your company information</li>
                <li>You'll receive an email confirmation</li>
                <li>Once verified, you can complete your company setup</li>
              </ul>
            </div>
            <div className="success-actions">
              <button 
                className="back-to-directory-btn"
                onClick={handleBackToDirectory}
              >
                Back to Directory
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="company-registration-page">
      <div className="registration-container">
        {/* Header */}
        <div className="registration-header">
          <button 
            className="back-button"
            onClick={handleBackToDirectory}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Directory
          </button>
          
          <div className="header-content">
            <div className="header-icon">
              <Building2 className="h-12 w-12" style={{ color: 'var(--primary-blue)' }} />
            </div>
            <div className="header-text">
              <h1 className="page-title">Register Your Company</h1>
              <p className="page-subtitle">
                Join our platform and start building your company's learning ecosystem
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="registration-form-container">
          <form onSubmit={handleSubmit} className="registration-form">
            {/* Company Information Section */}
            <div className="form-section">
              <h2 className="section-title">
                <Building2 className="h-6 w-6" />
                Company Information
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="companyName" className="form-label">
                    Company Name *
                  </label>
                  <div className="input-container">
                    <Building2 className="input-icon" />
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.companyName ? 'error' : ''}`}
                      placeholder="Enter your company name"
                    />
                  </div>
                  {errors.companyName && (
                    <span className="error-message">{errors.companyName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="domain" className="form-label">
                    Company Domain *
                  </label>
                  <div className="input-container">
                    <Globe className="input-icon" />
                    <input
                      type="text"
                      id="domain"
                      name="domain"
                      value={formData.domain}
                      onChange={handleInputChange}
                      className={`form-input ${errors.domain ? 'error' : ''}`}
                      placeholder="company.com"
                    />
                  </div>
                  {errors.domain && (
                    <span className="error-message">{errors.domain}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="industry" className="form-label">
                    Industry *
                  </label>
                  <div className="input-container">
                    <Briefcase className="input-icon" />
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`form-select ${errors.industry ? 'error' : ''}`}
                    >
                      <option value="">Select your industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.industry && (
                    <span className="error-message">{errors.industry}</span>
                  )}
                </div>
              </div>
            </div>

            {/* HR Contact Section */}
            <div className="form-section">
              <h2 className="section-title">
                <User className="h-6 w-6" />
                HR Contact Information
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="hrName" className="form-label">
                    Full Name *
                  </label>
                  <div className="input-container">
                    <User className="input-icon" />
                    <input
                      type="text"
                      id="hrName"
                      name="hrName"
                      value={formData.hrName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.hrName ? 'error' : ''}`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.hrName && (
                    <span className="error-message">{errors.hrName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="hrEmail" className="form-label">
                    Email Address *
                  </label>
                  <div className="input-container">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      id="hrEmail"
                      name="hrEmail"
                      value={formData.hrEmail}
                      onChange={handleInputChange}
                      className={`form-input ${errors.hrEmail ? 'error' : ''}`}
                      placeholder="your.email@company.com"
                    />
                  </div>
                  {errors.hrEmail && (
                    <span className="error-message">{errors.hrEmail}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="hrRole" className="form-label">
                    Role/Title *
                  </label>
                  <div className="input-container">
                    <Briefcase className="input-icon" />
                    <input
                      type="text"
                      id="hrRole"
                      name="hrRole"
                      value={formData.hrRole}
                      onChange={handleInputChange}
                      className={`form-input ${errors.hrRole ? 'error' : ''}`}
                      placeholder="e.g., HR Director, People Operations Manager"
                    />
                  </div>
                  {errors.hrRole && (
                    <span className="error-message">{errors.hrRole}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="form-section">
              <div className="submit-section">
                <div className="terms-notice">
                  <p>
                    By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                    We'll use this information to verify your company and set up your account.
                  </p>
                </div>
                
                {errors.submit && (
                  <div className="submit-error">
                    <span className="error-message">{errors.submit}</span>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Submitting Registration...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Submit Registration
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationPage;
