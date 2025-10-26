import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, Users, Target, Calendar, Clock, MapPin, User, 
  ArrowLeft, Save, CheckCircle, AlertCircle, Crown, Award,
  Building2, GraduationCap, Zap, Filter, Search
} from 'lucide-react';
import toast from 'react-hot-toast';

const TrainingRequestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    mode: 'career-path', // career-path, skill-driven, instructor-driven
    title: '',
    description: '',
    skill: '',
    topic: '',
    targetEmployees: [],
    targetTeams: [],
    targetDepartments: [],
    instructor: '',
    instructorType: 'internal', // internal, external
    duration: '',
    format: 'in-person', // in-person, virtual, hybrid
    priority: 'medium', // low, medium, high
    startDate: '',
    endDate: '',
    location: '',
    maxParticipants: '',
    objectives: [],
    prerequisites: [],
    materials: []
  });
  const [companyData, setCompanyData] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [availableInstructors, setAvailableInstructors] = useState([]);

  useEffect(() => {
    // Load company data
    if (location.state?.companyData) {
      setCompanyData(location.state.companyData);
    } else {
      const savedCompanyData = localStorage.getItem('companyData');
      if (savedCompanyData) {
        try {
          setCompanyData(JSON.parse(savedCompanyData));
        } catch (error) {
          console.error('Error parsing saved company data:', error);
        }
      }
    }

    // Load employees
    if (location.state?.employees) {
      setEmployees(location.state.employees);
    } else {
      const savedEmployees = localStorage.getItem('companyEmployees');
      if (savedEmployees) {
        try {
          setEmployees(JSON.parse(savedEmployees));
        } catch (error) {
          console.error('Error parsing saved employees:', error);
        }
      }
    }

    // Load mock instructors
    setAvailableInstructors([
      {
        id: 'inst_001',
        name: 'Sarah Johnson',
        type: 'internal',
        skills: ['JavaScript', 'React', 'Node.js'],
        rating: 4.8,
        coursesTaught: 15,
        availability: 'Available'
      },
      {
        id: 'inst_002',
        name: 'Mike Chen',
        type: 'external',
        skills: ['Python', 'Data Science', 'Machine Learning'],
        rating: 4.9,
        coursesTaught: 25,
        availability: 'Available'
      },
      {
        id: 'inst_003',
        name: 'Emily Davis',
        type: 'internal',
        skills: ['Leadership', 'Project Management', 'Agile'],
        rating: 4.7,
        coursesTaught: 12,
        availability: 'Busy'
      }
    ]);
  }, [location.state]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value]
    }));
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleEmployeeToggle = (employeeId) => {
    setFormData(prev => ({
      ...prev,
      targetEmployees: prev.targetEmployees.includes(employeeId)
        ? prev.targetEmployees.filter(id => id !== employeeId)
        : [...prev.targetEmployees, employeeId]
    }));
  };

  const handleTeamToggle = (teamName) => {
    setFormData(prev => ({
      ...prev,
      targetTeams: prev.targetTeams.includes(teamName)
        ? prev.targetTeams.filter(name => name !== teamName)
        : [...prev.targetTeams, teamName]
    }));
  };

  const handleDepartmentToggle = (departmentName) => {
    setFormData(prev => ({
      ...prev,
      targetDepartments: prev.targetDepartments.includes(departmentName)
        ? prev.targetDepartments.filter(name => name !== departmentName)
        : [...prev.targetDepartments, departmentName]
    }));
  };

  const getAvailableDepartments = () => {
    if (!companyData?.departments) return [];
    return companyData.departments.map(dept => dept.name);
  };

  const getAvailableTeams = () => {
    if (!companyData?.departments) return [];
    const teams = [];
    companyData.departments.forEach(dept => {
      if (dept.teams) {
        dept.teams.forEach(team => {
          teams.push(`${dept.name} - ${team.name}`);
        });
      }
    });
    return teams;
  };

  const getFilteredEmployees = () => {
    return employees.filter(emp => {
      if (formData.targetDepartments.length > 0 && !formData.targetDepartments.includes(emp.department)) {
        return false;
      }
      if (formData.targetTeams.length > 0) {
        const teamMatch = formData.targetTeams.some(team => {
          const [dept, teamName] = team.split(' - ');
          return emp.department === dept && emp.team === teamName;
        });
        if (!teamMatch) return false;
      }
      return true;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create training request
      const trainingRequest = {
        id: `req_${Date.now()}`,
        ...formData,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        submittedBy: 'current_user',
        companyId: companyData?.id || 'company_001'
      };

      // Save to localStorage (simulate backend)
      const existingRequests = JSON.parse(localStorage.getItem('trainingRequests') || '[]');
      existingRequests.push(trainingRequest);
      localStorage.setItem('trainingRequests', JSON.stringify(existingRequests));

      toast.success('Training request submitted successfully! HR will review and schedule the training.');
      
      // Navigate back to dashboard
      setTimeout(() => {
        navigate('/company-dashboard', { 
          state: { 
            companyData,
            employees 
          } 
        });
      }, 2000);

    } catch (error) {
      toast.error('Failed to submit training request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/company-dashboard', { 
      state: { 
        companyData,
        employees 
      } 
    });
  };

  const getInstructorIcon = (type) => {
    switch (type) {
      case 'internal':
        return <Crown className="h-4 w-4" style={{ color: 'var(--accent-gold)' }} />
      case 'external':
        return <Award className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
      default:
        return <User className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
    }
  };

  return (
    <div className="training-request-page">
      <div className="request-container">
        {/* Header */}
        <div className="request-header">
          <div className="header-actions">
            <button 
              className="back-btn"
              onClick={handleBackToDashboard}
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="header-content">
            <div className="header-icon">
              <BookOpen className="h-8 w-8" style={{ color: 'var(--primary-blue)' }} />
            </div>
            <div className="header-text">
              <h1>Request Training</h1>
              <p>Create a new training request for your team</p>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="request-form">
          {/* Training Mode Selection */}
          <div className="form-section">
            <div className="section-header">
              <Target className="h-5 w-5" />
              <h2>Training Mode</h2>
            </div>
            
            <div className="mode-selection">
              <div className="mode-options">
                <label className={`mode-option ${formData.mode === 'career-path' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="mode"
                    value="career-path"
                    checked={formData.mode === 'career-path'}
                    onChange={(e) => handleInputChange('mode', e.target.value)}
                  />
                  <div className="mode-content">
                    <Target className="h-6 w-6" />
                    <h3>Career Path Driven</h3>
                    <p>Training based on employee career goals and progression</p>
                  </div>
                </label>
                
                <label className={`mode-option ${formData.mode === 'skill-driven' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="mode"
                    value="skill-driven"
                    checked={formData.mode === 'skill-driven'}
                    onChange={(e) => handleInputChange('mode', e.target.value)}
                  />
                  <div className="mode-content">
                    <Zap className="h-6 w-6" />
                    <h3>Skill-Driven</h3>
                    <p>Training focused on specific skills or competencies</p>
                  </div>
                </label>
                
                <label className={`mode-option ${formData.mode === 'instructor-driven' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="mode"
                    value="instructor-driven"
                    checked={formData.mode === 'instructor-driven'}
                    onChange={(e) => handleInputChange('mode', e.target.value)}
                  />
                  <div className="mode-content">
                    <User className="h-6 w-6" />
                    <h3>Instructor-Driven</h3>
                    <p>Training led by specific instructors or experts</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Training Details */}
          <div className="form-section">
            <div className="section-header">
              <BookOpen className="h-5 w-5" />
              <h2>Training Details</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="title">Training Title *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Advanced JavaScript Patterns"
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the training objectives and content..."
                  rows={4}
                  className="form-textarea"
                />
              </div>
              
              {formData.mode === 'skill-driven' && (
                <div className="form-group">
                  <label htmlFor="skill">Primary Skill</label>
                  <input
                    type="text"
                    id="skill"
                    value={formData.skill}
                    onChange={(e) => handleInputChange('skill', e.target.value)}
                    placeholder="e.g., React Hooks"
                    className="form-input"
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="topic">Topic/Subject</label>
                <input
                  type="text"
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  placeholder="e.g., Frontend Development"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 2 days, 8 hours"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="format">Format</label>
                <select
                  id="format"
                  value={formData.format}
                  onChange={(e) => handleInputChange('format', e.target.value)}
                  className="form-input"
                >
                  <option value="in-person">In-Person</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="form-input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="maxParticipants">Max Participants</label>
                <input
                  type="number"
                  id="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                  placeholder="e.g., 20"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="form-section">
            <div className="section-header">
              <Users className="h-5 w-5" />
              <h2>Target Audience</h2>
            </div>
            
            <div className="target-selection">
              {/* Department Selection */}
              <div className="target-group">
                <h3>Departments</h3>
                <div className="target-options">
                  {getAvailableDepartments().map(dept => (
                    <label key={dept} className="target-option">
                      <input
                        type="checkbox"
                        checked={formData.targetDepartments.includes(dept)}
                        onChange={() => handleDepartmentToggle(dept)}
                      />
                      <span>{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Team Selection */}
              <div className="target-group">
                <h3>Teams</h3>
                <div className="target-options">
                  {getAvailableTeams().map(team => (
                    <label key={team} className="target-option">
                      <input
                        type="checkbox"
                        checked={formData.targetTeams.includes(team)}
                        onChange={() => handleTeamToggle(team)}
                      />
                      <span>{team}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Individual Employee Selection */}
              <div className="target-group">
                <h3>Individual Employees</h3>
                <div className="employee-selection">
                  <div className="employee-filters">
                    <input
                      type="text"
                      placeholder="Search employees..."
                      className="search-input"
                    />
                  </div>
                  <div className="employee-list">
                    {getFilteredEmployees().map(employee => (
                      <label key={employee.id} className="employee-option">
                        <input
                          type="checkbox"
                          checked={formData.targetEmployees.includes(employee.id)}
                          onChange={() => handleEmployeeToggle(employee.id)}
                        />
                        <div className="employee-info">
                          <span className="employee-name">{employee.firstName} {employee.lastName}</span>
                          <span className="employee-role">{employee.position} - {employee.department}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Selection */}
          <div className="form-section">
            <div className="section-header">
              <User className="h-5 w-5" />
              <h2>Instructor Selection</h2>
            </div>
            
            <div className="instructor-selection">
              <div className="form-group">
                <label htmlFor="instructorType">Instructor Type</label>
                <select
                  id="instructorType"
                  value={formData.instructorType}
                  onChange={(e) => handleInputChange('instructorType', e.target.value)}
                  className="form-input"
                >
                  <option value="internal">Internal Trainer</option>
                  <option value="external">External Trainer</option>
                  <option value="any">Any Available</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="instructor">Preferred Instructor</label>
                <div className="instructor-input">
                  <input
                    type="text"
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => handleInputChange('instructor', e.target.value)}
                    placeholder="Search for instructors..."
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowInstructorModal(true)}
                    className="browse-btn"
                  >
                    Browse
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="form-section">
            <div className="section-header">
              <Calendar className="h-5 w-5" />
              <h2>Schedule</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Conference Room A, Zoom Meeting"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleBackToDashboard}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner small"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>

        {/* Instructor Modal */}
        {showInstructorModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Select Instructor</h2>
                <button 
                  className="modal-close"
                  onClick={() => setShowInstructorModal(false)}
                >
                  <AlertCircle className="h-5 w-5" />
                </button>
              </div>
              <div className="modal-body">
                <div className="instructor-list">
                  {availableInstructors.map(instructor => (
                    <div key={instructor.id} className="instructor-card">
                      <div className="instructor-info">
                        <div className="instructor-header">
                          <div className="instructor-avatar">
                            {instructor.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="instructor-details">
                            <h3>{instructor.name}</h3>
                            <div className="instructor-type">
                              {getInstructorIcon(instructor.type)}
                              <span>{instructor.type === 'internal' ? 'Internal' : 'External'} Trainer</span>
                            </div>
                          </div>
                        </div>
                        <div className="instructor-stats">
                          <div className="stat">
                            <span className="stat-value">{instructor.rating}</span>
                            <span className="stat-label">Rating</span>
                          </div>
                          <div className="stat">
                            <span className="stat-value">{instructor.coursesTaught}</span>
                            <span className="stat-label">Courses</span>
                          </div>
                          <div className="stat">
                            <span className={`stat-value ${instructor.availability === 'Available' ? 'available' : 'busy'}`}>
                              {instructor.availability}
                            </span>
                            <span className="stat-label">Status</span>
                          </div>
                        </div>
                        <div className="instructor-skills">
                          {instructor.skills.map(skill => (
                            <span key={skill} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        className="select-instructor-btn"
                        onClick={() => {
                          handleInputChange('instructor', instructor.name);
                          setShowInstructorModal(false);
                        }}
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingRequestPage;
