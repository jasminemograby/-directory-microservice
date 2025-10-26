import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, User, Target, Calendar, Clock, ArrowLeft, Save,
  CheckCircle, AlertCircle, Crown, Award, GraduationCap, Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

const EmployeeRequestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    requestType: 'course', // course, skill, certification
    title: '',
    description: '',
    skill: '',
    topic: '',
    suggestedInstructor: '',
    reason: '',
    urgency: 'medium', // low, medium, high
    preferredStartDate: '',
    budget: '',
    objectives: [],
    prerequisites: []
  });
  const [employee, setEmployee] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [availableInstructors, setAvailableInstructors] = useState([]);

  useEffect(() => {
    // Load employee data
    if (location.state?.employee) {
      setEmployee(location.state.employee);
    } else {
      // Try to load from localStorage
      const savedEmployees = localStorage.getItem('companyEmployees');
      if (savedEmployees) {
        try {
          const employees = JSON.parse(savedEmployees);
          // Get employee ID from URL params or use first employee as demo
          const employeeId = window.location.pathname.split('/').pop();
          const foundEmployee = employees.find(emp => emp.id === employeeId);
          if (foundEmployee) {
            setEmployee(foundEmployee);
          } else if (employees.length > 0) {
            setEmployee(employees[0]); // Use first employee as demo
          }
        } catch (error) {
          console.error('Error parsing saved employees:', error);
        }
      }
    }

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
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create employee request
      const employeeRequest = {
        id: `emp_req_${Date.now()}`,
        ...formData,
        employeeId: employee?.id || 'emp_001',
        employeeName: employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee',
        status: 'pending',
        submittedAt: new Date().toISOString(),
        companyId: companyData?.id || 'company_001'
      };

      // Save to localStorage (simulate backend)
      const existingRequests = JSON.parse(localStorage.getItem('employeeRequests') || '[]');
      existingRequests.push(employeeRequest);
      localStorage.setItem('employeeRequests', JSON.stringify(existingRequests));

      toast.success('Learning request submitted successfully! HR will review your request.');
      
      // Navigate back to employee profile or dashboard
      setTimeout(() => {
        if (employee) {
          navigate(`/employee/${employee.id}`, { 
            state: { 
              employee, 
              companyData 
            } 
          });
        } else {
          navigate('/company-dashboard', { 
            state: { 
              companyData 
            } 
          });
        }
      }, 2000);

    } catch (error) {
      toast.error('Failed to submit learning request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToProfile = () => {
    if (employee) {
      navigate(`/employee/${employee.id}`, { 
        state: { 
          employee, 
          companyData 
        } 
      });
    } else {
      navigate('/company-dashboard', { 
        state: { 
          companyData 
        } 
      });
    }
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

  if (!employee) {
    return (
      <div className="employee-request-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading employee data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-request-page">
      <div className="request-container">
        {/* Header */}
        <div className="request-header">
          <div className="header-actions">
            <button 
              className="back-btn"
              onClick={handleBackToProfile}
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Profile
            </button>
          </div>
          
          <div className="header-content">
            <div className="header-icon">
              <GraduationCap className="h-8 w-8" style={{ color: 'var(--primary-purple)' }} />
            </div>
            <div className="header-text">
              <h1>Request Learning Opportunity</h1>
              <p>Submit a request for personal development and skill enhancement</p>
            </div>
          </div>
        </div>

        {/* Employee Info */}
        <div className="employee-info-card">
          <div className="employee-avatar">
            {employee.firstName[0]}{employee.lastName[0]}
          </div>
          <div className="employee-details">
            <h2>{employee.firstName} {employee.lastName}</h2>
            <p>{employee.position} • {employee.department}</p>
            <div className="employee-type">
              {employee.trainerType === 'internal' ? (
                <>
                  <Crown className="h-4 w-4" style={{ color: 'var(--accent-gold)' }} />
                  <span>Internal Trainer</span>
                </>
              ) : employee.trainerType === 'external' ? (
                <>
                  <Award className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
                  <span>External Trainer</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
                  <span>Regular Employee</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="request-form">
          {/* Request Type Selection */}
          <div className="form-section">
            <div className="section-header">
              <Target className="h-5 w-5" />
              <h2>Request Type</h2>
            </div>
            
            <div className="type-selection">
              <div className="type-options">
                <label className={`type-option ${formData.requestType === 'course' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="requestType"
                    value="course"
                    checked={formData.requestType === 'course'}
                    onChange={(e) => handleInputChange('requestType', e.target.value)}
                  />
                  <div className="type-content">
                    <BookOpen className="h-6 w-6" />
                    <h3>Course</h3>
                    <p>Request enrollment in a specific course or training program</p>
                  </div>
                </label>
                
                <label className={`type-option ${formData.requestType === 'skill' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="requestType"
                    value="skill"
                    checked={formData.requestType === 'skill'}
                    onChange={(e) => handleInputChange('requestType', e.target.value)}
                  />
                  <div className="type-content">
                    <Zap className="h-6 w-6" />
                    <h3>Skill Development</h3>
                    <p>Request training for specific skills or competencies</p>
                  </div>
                </label>
                
                <label className={`type-option ${formData.requestType === 'certification' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="requestType"
                    value="certification"
                    checked={formData.requestType === 'certification'}
                    onChange={(e) => handleInputChange('requestType', e.target.value)}
                  />
                  <div className="type-content">
                    <Award className="h-6 w-6" />
                    <h3>Certification</h3>
                    <p>Request support for professional certification or credential</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="form-section">
            <div className="section-header">
              <BookOpen className="h-5 w-5" />
              <h2>Request Details</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="title">Request Title *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Advanced React Development Course"
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
                  placeholder="Describe what you want to learn and why it's important for your role..."
                  rows={4}
                  className="form-textarea"
                />
              </div>
              
              {formData.requestType === 'skill' && (
                <div className="form-group">
                  <label htmlFor="skill">Specific Skill</label>
                  <input
                    type="text"
                    id="skill"
                    value={formData.skill}
                    onChange={(e) => handleInputChange('skill', e.target.value)}
                    placeholder="e.g., React Hooks, Python, Leadership"
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
                  placeholder="e.g., Frontend Development, Data Science"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="urgency">Urgency</label>
                <select
                  id="urgency"
                  value={formData.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                  className="form-input"
                >
                  <option value="low">Low - Flexible timing</option>
                  <option value="medium">Medium - Within 3 months</option>
                  <option value="high">High - ASAP</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="preferredStartDate">Preferred Start Date</label>
                <input
                  type="date"
                  id="preferredStartDate"
                  value={formData.preferredStartDate}
                  onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="budget">Budget (if applicable)</label>
                <input
                  type="text"
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="e.g., $500, Company sponsored"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="form-section">
            <div className="section-header">
              <Target className="h-5 w-5" />
              <h2>Learning Objectives</h2>
            </div>
            
            <div className="objectives-section">
              <div className="objectives-input">
                <input
                  type="text"
                  placeholder="Add a learning objective..."
                  className="form-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleArrayChange('objectives', e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    handleArrayChange('objectives', input.value);
                    input.value = '';
                  }}
                  className="add-objective-btn"
                >
                  Add
                </button>
              </div>
              
              <div className="objectives-list">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="objective-tag">
                    <span>{objective}</span>
                    <button
                      type="button"
                      onClick={() => handleArrayRemove('objectives', index)}
                      className="remove-objective-btn"
                    >
                      <AlertCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor Suggestion */}
          <div className="form-section">
            <div className="section-header">
              <User className="h-5 w-5" />
              <h2>Instructor Suggestion</h2>
            </div>
            
            <div className="instructor-suggestion">
              <div className="form-group">
                <label htmlFor="suggestedInstructor">Suggested Instructor (Optional)</label>
                <div className="instructor-input">
                  <input
                    type="text"
                    id="suggestedInstructor"
                    value={formData.suggestedInstructor}
                    onChange={(e) => handleInputChange('suggestedInstructor', e.target.value)}
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

          {/* Reason */}
          <div className="form-section">
            <div className="section-header">
              <AlertCircle className="h-5 w-5" />
              <h2>Justification</h2>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="reason">Why is this learning opportunity important? *</label>
              <textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                placeholder="Explain how this learning will benefit your role, career development, or the company..."
                rows={4}
                required
                className="form-textarea"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleBackToProfile}
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
                          handleInputChange('suggestedInstructor', instructor.name);
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

export default EmployeeRequestPage;
