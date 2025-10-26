import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, Users, Target, Settings, Plus, Trash2, Edit, 
  ArrowLeft, ArrowRight, CheckCircle, Upload, Download,
  UserPlus, Briefcase, GraduationCap, Award
} from 'lucide-react';

const CompanySetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyData, setCompanyData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Company Details
    companyName: '',
    industry: '',
    kpis: '',
    goals: '',
    
    // Hierarchy
    departments: [],
    
    // Global Settings
    minPassingGrade: 70,
    requiredQuestions: 10,
    
    // Employees
    employees: []
  });

  const [newDepartment, setNewDepartment] = useState({
    name: '',
    manager: '',
    teams: []
  });

  const [newTeam, setNewTeam] = useState({
    name: '',
    lead: '',
    employees: []
  });

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    team: '',
    currentRole: '',
    targetRole: '',
    trainerType: 'regular' // 'internal', 'external', 'regular'
  });

  useEffect(() => {
    if (location.state?.companyData) {
      setCompanyData(location.state.companyData);
      setFormData(prev => ({
        ...prev,
        companyName: location.state.companyData.companyName,
        industry: location.state.companyData.industry
      }));
    }
  }, [location.state]);

  const steps = [
    { id: 1, title: 'Company Details', icon: Building2 },
    { id: 2, title: 'Organization Structure', icon: Users },
    { id: 3, title: 'Career Paths', icon: Target },
    { id: 4, title: 'Global Settings', icon: Settings }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addDepartment = () => {
    if (newDepartment.name.trim()) {
      setFormData(prev => ({
        ...prev,
        departments: [...prev.departments, { ...newDepartment, id: Date.now() }]
      }));
      setNewDepartment({ name: '', manager: '', teams: [] });
    }
  };

  const addTeam = (departmentId) => {
    if (newTeam.name.trim()) {
      setFormData(prev => ({
        ...prev,
        departments: prev.departments.map(dept => 
          dept.id === departmentId 
            ? { ...dept, teams: [...dept.teams, { ...newTeam, id: Date.now() }] }
            : dept
        )
      }));
      setNewTeam({ name: '', lead: '', employees: [] });
    }
  };

  const addEmployee = () => {
    if (newEmployee.name.trim() && newEmployee.email.trim()) {
      setFormData(prev => ({
        ...prev,
        employees: [...prev.employees, { ...newEmployee, id: Date.now() }]
      }));
      setNewEmployee({
        name: '',
        email: '',
        role: '',
        department: '',
        team: '',
        currentRole: '',
        targetRole: '',
        trainerType: 'regular'
      });
    }
  };

  const removeDepartment = (departmentId) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.filter(dept => dept.id !== departmentId)
    }));
  };

  const removeTeam = (departmentId, teamId) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.map(dept => 
        dept.id === departmentId 
          ? { ...dept, teams: dept.teams.filter(team => team.id !== teamId) }
          : dept
      )
    }));
  };

  const removeEmployee = (employeeId) => {
    setFormData(prev => ({
      ...prev,
      employees: prev.employees.filter(emp => emp.id !== employeeId)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Company setup data:', formData);
      setIsSuccess(true);
      
      // Redirect to company dashboard after 2 seconds
      setTimeout(() => {
        navigate('/company-dashboard', { 
          state: { 
            companyData: formData,
            setupComplete: true
          }
        });
      }, 2000);
      
    } catch (error) {
      console.error('Setup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="company-setup-page">
        <div className="setup-container">
          <div className="success-state">
            <div className="success-icon">
              <CheckCircle className="h-16 w-16" style={{ color: 'var(--success-green)' }} />
            </div>
            <h1 className="success-title">Company Setup Complete!</h1>
            <p className="success-message">
              Your company has been successfully configured. You can now start managing your team and training programs.
            </p>
            <div className="success-actions">
              <button 
                className="continue-btn"
                onClick={() => navigate('/company-dashboard')}
              >
                <ArrowRight className="h-5 w-5" />
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="company-setup-page">
      <div className="setup-container">
        {/* Header */}
        <div className="setup-header">
          <button 
            className="back-button"
            onClick={() => navigate('/company-verification')}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Verification
          </button>
          
          <div className="header-content">
            <div className="header-icon">
              <Building2 className="h-12 w-12" style={{ color: 'var(--primary-blue)' }} />
            </div>
            <div className="header-text">
              <h1 className="page-title">Company Setup</h1>
              <p className="page-subtitle">
                Complete your company configuration to start your learning journey
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div 
                key={step.id} 
                className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                <div className="step-icon">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  <div className="step-number">Step {step.id}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="setup-form-container">
          {/* Step 1: Company Details */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2 className="step-title">
                <Building2 className="h-6 w-6" />
                Company Details
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="form-input"
                    placeholder="Enter company name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Industry *</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="form-input"
                    placeholder="Enter industry"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Key Performance Indicators (KPIs)</label>
                  <textarea
                    value={formData.kpis}
                    onChange={(e) => handleInputChange('kpis', e.target.value)}
                    className="form-textarea"
                    placeholder="Describe your company's key performance indicators..."
                    rows={4}
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Company Goals</label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    className="form-textarea"
                    placeholder="Describe your company's goals and objectives..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Organization Structure */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2 className="step-title">
                <Users className="h-6 w-6" />
                Organization Structure
              </h2>

              {/* Departments */}
              <div className="section">
                <div className="section-header">
                  <h3 className="section-title">Departments</h3>
                  <button className="add-btn" onClick={addDepartment}>
                    <Plus className="h-5 w-5" />
                    Add Department
                  </button>
                </div>

                <div className="add-form">
                  <input
                    type="text"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment(prev => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                    placeholder="Department name"
                  />
                  <input
                    type="text"
                    value={newDepartment.manager}
                    onChange={(e) => setNewDepartment(prev => ({ ...prev, manager: e.target.value }))}
                    className="form-input"
                    placeholder="Department manager"
                  />
                </div>

                <div className="items-list">
                  {formData.departments.map(dept => (
                    <div key={dept.id} className="item-card">
                      <div className="item-header">
                        <div className="item-info">
                          <h4 className="item-title">{dept.name}</h4>
                          <p className="item-subtitle">Manager: {dept.manager}</p>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeDepartment(dept.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Teams */}
                      <div className="sub-items">
                        <div className="sub-header">
                          <h5 className="sub-title">Teams</h5>
                          <button 
                            className="add-sub-btn"
                            onClick={() => addTeam(dept.id)}
                          >
                            <Plus className="h-4 w-4" />
                            Add Team
                          </button>
                        </div>

                        <div className="sub-add-form">
                          <input
                            type="text"
                            value={newTeam.name}
                            onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
                            className="form-input small"
                            placeholder="Team name"
                          />
                          <input
                            type="text"
                            value={newTeam.lead}
                            onChange={(e) => setNewTeam(prev => ({ ...prev, lead: e.target.value }))}
                            className="form-input small"
                            placeholder="Team lead"
                          />
                        </div>

                        {dept.teams.map(team => (
                          <div key={team.id} className="sub-item">
                            <span className="sub-item-name">{team.name}</span>
                            <span className="sub-item-info">Lead: {team.lead}</span>
                            <button 
                              className="remove-sub-btn"
                              onClick={() => removeTeam(dept.id, team.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Career Paths & Employees */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2 className="step-title">
                <Target className="h-6 w-6" />
                Career Paths & Employees
              </h2>

              {/* Add Employee */}
              <div className="section">
                <div className="section-header">
                  <h3 className="section-title">Add Employees</h3>
                  <button className="add-btn" onClick={addEmployee}>
                    <UserPlus className="h-5 w-5" />
                    Add Employee
                  </button>
                </div>

                <div className="employee-form">
                  <div className="form-row">
                    <input
                      type="text"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                      className="form-input"
                      placeholder="Full name"
                    />
                    <input
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                      className="form-input"
                      placeholder="Email address"
                    />
                  </div>

                  <div className="form-row">
                    <input
                      type="text"
                      value={newEmployee.currentRole}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, currentRole: e.target.value }))}
                      className="form-input"
                      placeholder="Current role"
                    />
                    <input
                      type="text"
                      value={newEmployee.targetRole}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, targetRole: e.target.value }))}
                      className="form-input"
                      placeholder="Target role (e.g., Team Lead in 6 months)"
                    />
                  </div>

                  <div className="form-row">
                    <select
                      value={newEmployee.trainerType}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, trainerType: e.target.value }))}
                      className="form-select"
                    >
                      <option value="regular">Regular Employee</option>
                      <option value="internal">Internal Trainer</option>
                      <option value="external">External Trainer</option>
                    </select>
                  </div>
                </div>

                {/* Employee List */}
                <div className="employees-list">
                  {formData.employees.map(emp => (
                    <div key={emp.id} className="employee-card">
                      <div className="employee-info">
                        <h4 className="employee-name">{emp.name}</h4>
                        <p className="employee-email">{emp.email}</p>
                        <div className="employee-details">
                          <span className="detail-item">
                            <Briefcase className="h-4 w-4" />
                            {emp.currentRole}
                          </span>
                          <span className="detail-item">
                            <Target className="h-4 w-4" />
                            {emp.targetRole}
                          </span>
                          <span className="detail-item">
                            <GraduationCap className="h-4 w-4" />
                            {emp.trainerType === 'internal' ? 'Internal Trainer' : 
                             emp.trainerType === 'external' ? 'External Trainer' : 'Regular Employee'}
                          </span>
                        </div>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeEmployee(emp.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Global Settings */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2 className="step-title">
                <Settings className="h-6 w-6" />
                Global Company Settings
              </h2>

              <div className="settings-grid">
                <div className="setting-card">
                  <div className="setting-icon">
                    <Award className="h-8 w-8" style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <div className="setting-content">
                    <h3 className="setting-title">Minimum Passing Grade</h3>
                    <p className="setting-description">
                      Set the minimum score required to pass training exams
                    </p>
                    <div className="setting-input">
                      <input
                        type="number"
                        value={formData.minPassingGrade}
                        onChange={(e) => handleInputChange('minPassingGrade', parseInt(e.target.value))}
                        className="form-input"
                        min="0"
                        max="100"
                      />
                      <span className="input-suffix">%</span>
                    </div>
                  </div>
                </div>

                <div className="setting-card">
                  <div className="setting-icon">
                    <GraduationCap className="h-8 w-8" style={{ color: 'var(--primary-blue)' }} />
                  </div>
                  <div className="setting-content">
                    <h3 className="setting-title">Required Exercise Questions</h3>
                    <p className="setting-description">
                      Minimum number of practice questions required per training module
                    </p>
                    <div className="setting-input">
                      <input
                        type="number"
                        value={formData.requiredQuestions}
                        onChange={(e) => handleInputChange('requiredQuestions', parseInt(e.target.value))}
                        className="form-input"
                        min="1"
                        max="50"
                      />
                      <span className="input-suffix">questions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="setup-summary">
                <h3 className="summary-title">Setup Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Company:</span>
                    <span className="summary-value">{formData.companyName}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Departments:</span>
                    <span className="summary-value">{formData.departments.length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Employees:</span>
                    <span className="summary-value">{formData.employees.length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Min Passing Grade:</span>
                    <span className="summary-value">{formData.minPassingGrade}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="setup-navigation">
          <button 
            className="nav-btn prev"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-5 w-5" />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button 
              className="nav-btn next"
              onClick={nextStep}
            >
              Next
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button 
              className="nav-btn submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Setting Up...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Complete Setup
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySetupPage;
