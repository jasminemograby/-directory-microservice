import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Calendar, Clock, Save, ArrowLeft,
  Crown, Award, Target, GraduationCap, Building2, Users,
  CheckCircle, XCircle, AlertCircle, Eye, EyeOff, Lock, Unlock
} from 'lucide-react';
import toast from 'react-hot-toast';

const EmployeeEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee, setEmployee] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [changeRequests, setChangeRequests] = useState([]);

  useEffect(() => {
    // Try to load from location state first (from navigation)
    if (location.state?.employee) {
      setEmployee(location.state.employee);
      setFormData({
        firstName: location.state.employee.firstName || '',
        lastName: location.state.employee.lastName || '',
        email: location.state.employee.email || '',
        phone: location.state.employee.phone || '',
        position: location.state.employee.position || '',
        department: location.state.employee.department || '',
        team: location.state.employee.team || '',
        trainerType: location.state.employee.trainerType || 'regular',
        targetRole: location.state.employee.targetRole || '',
        bio: location.state.employee.bio || '',
        skills: location.state.employee.skills || [],
        emergencyContact: location.state.employee.emergencyContact || {
          name: '',
          phone: '',
          relationship: ''
        },
        address: location.state.employee.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      });
    } else {
      // If no employee in state, try to load from localStorage
      const savedEmployees = localStorage.getItem('companyEmployees');
      if (savedEmployees) {
        try {
          const employees = JSON.parse(savedEmployees);
          // Get employee ID from URL params
          const employeeId = window.location.pathname.split('/')[2]; // /employee/{id}/edit
          const foundEmployee = employees.find(emp => emp.id === employeeId);
          if (foundEmployee) {
            setEmployee(foundEmployee);
            setFormData({
              firstName: foundEmployee.firstName || '',
              lastName: foundEmployee.lastName || '',
              email: foundEmployee.email || '',
              phone: foundEmployee.phone || '',
              position: foundEmployee.position || '',
              department: foundEmployee.department || '',
              team: foundEmployee.team || '',
              trainerType: foundEmployee.trainerType || 'regular',
              targetRole: foundEmployee.targetRole || '',
              bio: foundEmployee.bio || '',
              skills: foundEmployee.skills || [],
              emergencyContact: foundEmployee.emergencyContact || {
                name: '',
                phone: '',
                relationship: ''
              },
              address: foundEmployee.address || {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: ''
              }
            });
          }
        } catch (error) {
          console.error('Error parsing saved employees:', error);
        }
      }
    }

    if (location.state?.companyData) {
      setCompanyData(location.state.companyData);
    } else {
      // If no company data in state, try to load from localStorage
      const savedCompanyData = localStorage.getItem('companyData');
      if (savedCompanyData) {
        try {
          setCompanyData(JSON.parse(savedCompanyData));
        } catch (error) {
          console.error('Error parsing saved company data:', error);
        }
      }
    }
  }, [location.state]);

  if (!employee) {
    return (
      <div className="employee-edit-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading employee data...</p>
        </div>
      </div>
    );
  }

  const getTrainerIcon = (trainerType) => {
    switch (trainerType) {
      case 'internal':
        return <Crown className="h-5 w-5" style={{ color: 'var(--accent-gold)' }} />
      case 'external':
        return <Award className="h-5 w-5" style={{ color: 'var(--primary-blue)' }} />
      default:
        return <User className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
    }
  };

  const getTrainerLabel = (trainerType) => {
    switch (trainerType) {
      case 'internal':
        return 'Internal Trainer'
      case 'external':
        return 'External Trainer'
      default:
        return 'Regular Employee'
    }
  };

  const getAvailableDepartments = () => {
    if (!companyData?.departments) return [];
    return companyData.departments.map(dept => ({
      value: dept.name,
      label: dept.name
    }));
  };

  const getAvailableTeams = (departmentName) => {
    if (!companyData?.departments) return [];
    const department = companyData.departments.find(dept => dept.name === departmentName);
    if (!department?.teams) return [];
    return department.teams.map(team => ({
      value: team.name,
      label: team.name
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  const handleSkillAdd = (skill) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create change request
      const changeRequest = {
        id: `req_${Date.now()}`,
        employeeId: employee.id,
        changes: formData,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        submittedBy: 'current_user'
      };

      setChangeRequests(prev => [...prev, changeRequest]);
      
      toast.success('Change request submitted successfully! HR will review your changes.');
      
      // Navigate back to profile
      setTimeout(() => {
        navigate(`/employee/${employee.id}`, { 
          state: { 
            employee: { ...employee, ...formData }, 
            companyData 
          } 
        });
      }, 2000);

    } catch (error) {
      toast.error('Failed to submit changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToProfile = () => {
    navigate(`/employee/${employee.id}`, { 
      state: { 
        employee, 
        companyData 
      } 
    });
  };

  const handleBackToEmployees = () => {
    navigate('/employees', { 
      state: { 
        companyData,
        employees: [employee]
      } 
    });
  };

  const lockedFields = ['email', 'position', 'department']; // Fields that require HR approval

  return (
    <div className="employee-edit-page">
      <div className="edit-container">
        {/* Header */}
        <div className="edit-header">
          <div className="header-actions">
            <button 
              className="back-btn"
              onClick={handleBackToProfile}
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Profile
            </button>
            <button 
              className="back-btn"
              onClick={handleBackToEmployees}
            >
              <Users className="h-5 w-5" />
              Employee List
            </button>
          </div>
          
          <div className="header-content">
            <div className="employee-info">
              <div className="employee-avatar">
                {employee.firstName[0]}{employee.lastName[0]}
              </div>
              <div className="employee-details">
                <h1>Edit {employee.firstName} {employee.lastName}</h1>
                <p>Update employee information and submit for HR approval</p>
              </div>
            </div>
            <div className="employee-type">
              {getTrainerIcon(employee.trainerType)}
              <span>{getTrainerLabel(employee.trainerType)}</span>
            </div>
          </div>
        </div>

        {/* Change Requests Status */}
        {changeRequests.length > 0 && (
          <div className="change-requests-card">
            <h3>Pending Change Requests</h3>
            <div className="requests-list">
              {changeRequests.map((request) => (
                <div key={request.id} className="request-item">
                  <div className="request-info">
                    <span className="request-id">#{request.id.slice(-6)}</span>
                    <span className="request-status pending">Pending HR Review</span>
                    <span className="request-date">
                      Submitted: {new Date(request.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="request-actions">
                    <button className="view-btn">
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="edit-form">
          {/* Personal Information */}
          <div className="form-section">
            <div className="section-header">
              <User className="h-5 w-5" />
              <h2>Personal Information</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group locked">
                <label htmlFor="email">Email Address *</label>
                <div className="locked-input">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    disabled
                    className="form-input"
                  />
                  <Lock className="h-4 w-4" />
                </div>
                <small className="locked-note">Email changes require HR approval</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <div className="section-header">
              <Building2 className="h-5 w-5" />
              <h2>Professional Information</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group locked">
                <label htmlFor="position">Position *</label>
                <div className="locked-input">
                  <input
                    type="text"
                    id="position"
                    value={formData.position}
                    disabled
                    className="form-input"
                  />
                  <Lock className="h-4 w-4" />
                </div>
                <small className="locked-note">Position changes require HR approval</small>
              </div>
              
              <div className="form-group locked">
                <label htmlFor="department">Department *</label>
                <div className="locked-input">
                  <select
                    id="department"
                    value={formData.department}
                    disabled
                    className="form-input"
                  >
                    <option value="">Select Department</option>
                    {getAvailableDepartments().map(dept => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                  <Lock className="h-4 w-4" />
                </div>
                <small className="locked-note">Department changes require HR approval</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="team">Team</label>
                <select
                  id="team"
                  value={formData.team}
                  onChange={(e) => handleInputChange('team', e.target.value)}
                  className="form-input"
                >
                  <option value="">Select Team (Optional)</option>
                  {getAvailableTeams(formData.department).map(team => (
                    <option key={team.value} value={team.value}>
                      {team.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="trainerType">Employee Type</label>
                <select
                  id="trainerType"
                  value={formData.trainerType}
                  onChange={(e) => handleInputChange('trainerType', e.target.value)}
                  className="form-input"
                >
                  <option value="regular">Regular Employee</option>
                  <option value="internal">Internal Trainer</option>
                  <option value="external">External Trainer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Career Development */}
          <div className="form-section">
            <div className="section-header">
              <Target className="h-5 w-5" />
              <h2>Career Development</h2>
            </div>
            
            <div className="form-group">
              <label htmlFor="targetRole">Target Role</label>
              <input
                type="text"
                id="targetRole"
                value={formData.targetRole}
                onChange={(e) => handleInputChange('targetRole', e.target.value)}
                placeholder="e.g., Senior Developer in 6 months"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your experience, and career goals..."
                rows={4}
                className="form-textarea"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="form-section">
            <div className="section-header">
              <GraduationCap className="h-5 w-5" />
              <h2>Skills</h2>
            </div>
            
            <div className="skills-section">
              <div className="skills-input">
                <input
                  type="text"
                  placeholder="Add a skill..."
                  className="form-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSkillAdd(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    handleSkillAdd(input.value);
                    input.value = '';
                  }}
                  className="add-skill-btn"
                >
                  Add
                </button>
              </div>
              
              <div className="skills-list">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="remove-skill-btn"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="form-section">
            <div className="section-header">
              <Phone className="h-5 w-5" />
              <h2>Emergency Contact</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="emergencyName">Contact Name</label>
                <input
                  type="text"
                  id="emergencyName"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="emergencyPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="emergencyRelationship">Relationship</label>
                <select
                  id="emergencyRelationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
                  className="form-input"
                >
                  <option value="">Select Relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="child">Child</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="form-section">
            <div className="section-header">
              <MapPin className="h-5 w-5" />
              <h2>Address</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="street">Street Address</label>
                <input
                  type="text"
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => handleNestedInputChange('address', 'street', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleNestedInputChange('address', 'city', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State/Province</label>
                <input
                  type="text"
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => handleNestedInputChange('address', 'state', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">ZIP/Postal Code</label>
                <input
                  type="text"
                  id="zipCode"
                  value={formData.address.zipCode}
                  onChange={(e) => handleNestedInputChange('address', 'zipCode', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={formData.address.country}
                  onChange={(e) => handleNestedInputChange('address', 'country', e.target.value)}
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
                  Submit Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEditPage;
