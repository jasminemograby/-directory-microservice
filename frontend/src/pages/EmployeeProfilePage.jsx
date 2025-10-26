import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Calendar, Clock, Edit, ArrowLeft,
  Crown, Award, Target, GraduationCap, BookOpen, Activity,
  CheckCircle, XCircle, AlertCircle, Star, TrendingUp, Users,
  Building2, Briefcase, Award as AwardIcon, Zap, Eye, EyeOff
} from 'lucide-react';

const EmployeeProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee, setEmployee] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSkillGapModal, setShowSkillGapModal] = useState(false);

  useEffect(() => {
    if (location.state?.employee) {
      setEmployee(location.state.employee);
    }
    if (location.state?.companyData) {
      setCompanyData(location.state.companyData);
    }
  }, [location.state]);

  if (!employee) {
    return (
      <div className="employee-profile-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading employee profile...</p>
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
      case 'inactive':
        return <XCircle className="h-4 w-4" style={{ color: 'var(--error-red)' }} />
      case 'pending':
        return <AlertCircle className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
      default:
        return <User className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
    }
  };

  const getSkillLevel = (skill) => {
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const getSkillProgress = (skill) => {
    return Math.floor(Math.random() * 100);
  };

  const mockSkills = [
    { name: 'JavaScript', level: 'Advanced', progress: 85, verified: true },
    { name: 'React', level: 'Intermediate', progress: 70, verified: true },
    { name: 'Node.js', level: 'Beginner', progress: 45, verified: false },
    { name: 'TypeScript', level: 'Intermediate', progress: 60, verified: true },
    { name: 'Python', level: 'Beginner', progress: 30, verified: false },
    { name: 'SQL', level: 'Advanced', progress: 80, verified: true },
    { name: 'AWS', level: 'Beginner', progress: 25, verified: false },
    { name: 'Docker', level: 'Intermediate', progress: 55, verified: false }
  ];

  const mockCourses = [
    { 
      id: 1, 
      title: 'Advanced JavaScript Patterns', 
      status: 'completed', 
      progress: 100, 
      duration: '8 hours',
      instructor: 'John Smith',
      completedDate: '2024-01-15'
    },
    { 
      id: 2, 
      title: 'React Hooks Deep Dive', 
      status: 'in-progress', 
      progress: 65, 
      duration: '6 hours',
      instructor: 'Sarah Johnson',
      startedDate: '2024-01-20'
    },
    { 
      id: 3, 
      title: 'Node.js Backend Development', 
      status: 'enrolled', 
      progress: 0, 
      duration: '12 hours',
      instructor: 'Mike Chen',
      enrolledDate: '2024-01-25'
    }
  ];

  const mockActivity = [
    { 
      id: 1, 
      type: 'course_completed', 
      title: 'Completed Advanced JavaScript Patterns', 
      timestamp: '2024-01-15T14:30:00Z',
      description: 'Successfully completed the Advanced JavaScript Patterns course with 95% score'
    },
    { 
      id: 2, 
      type: 'skill_verified', 
      title: 'JavaScript skill verified', 
      timestamp: '2024-01-14T10:15:00Z',
      description: 'JavaScript skill was verified by internal trainer Sarah Johnson'
    },
    { 
      id: 3, 
      type: 'course_started', 
      title: 'Started React Hooks Deep Dive', 
      timestamp: '2024-01-20T09:00:00Z',
      description: 'Enrolled and started the React Hooks Deep Dive course'
    },
    { 
      id: 4, 
      type: 'profile_updated', 
      title: 'Profile information updated', 
      timestamp: '2024-01-18T16:45:00Z',
      description: 'Updated contact information and career goals'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'course_completed':
        return <GraduationCap className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
      case 'skill_verified':
        return <CheckCircle className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
      case 'course_started':
        return <BookOpen className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
      case 'profile_updated':
        return <Edit className="h-4 w-4" style={{ color: 'var(--primary-purple)' }} />
      default:
        return <Activity className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
    }
  };

  const handleEditProfile = () => {
    navigate(`/employee/${employee.id}/edit`, { 
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
        employees: [employee] // Pass current employee back
      } 
    });
  };

  const handleBackToDashboard = () => {
    navigate('/company-dashboard', { 
      state: { 
        companyData,
        employees: [employee] // Pass current employee back
      } 
    });
  };

  return (
    <div className="employee-profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="header-actions">
            <button 
              className="back-btn"
              onClick={handleBackToEmployees}
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Employees
            </button>
            <button 
              className="back-btn"
              onClick={handleBackToDashboard}
            >
              <Building2 className="h-5 w-5" />
              Dashboard
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {employee.firstName[0]}{employee.lastName[0]}
              </div>
              <div className="status-indicator">
                {getStatusIcon(employee.status)}
              </div>
            </div>
            
            <div className="profile-info">
              <div className="profile-name">
                <h1>{employee.firstName} {employee.lastName}</h1>
                <div className="employee-type">
                  {getTrainerIcon(employee.trainerType)}
                  <span>{getTrainerLabel(employee.trainerType)}</span>
                </div>
              </div>
              
              <div className="profile-details">
                <div className="detail-item">
                  <Briefcase className="h-4 w-4" />
                  <span>{employee.position}</span>
                </div>
                <div className="detail-item">
                  <Building2 className="h-4 w-4" />
                  <span>{employee.department}</span>
                </div>
                {employee.team && (
                  <div className="detail-item">
                    <Users className="h-4 w-4" />
                    <span>{employee.team}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-actions">
              <button 
                className="action-btn primary"
                onClick={handleEditProfile}
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-section">
            <h3>Contact Information</h3>
            <div className="contact-grid">
              <div className="contact-item">
                <Mail className="h-4 w-4" />
                <span>{employee.email}</span>
              </div>
              {employee.phone && (
                <div className="contact-item">
                  <Phone className="h-4 w-4" />
                  <span>{employee.phone}</span>
                </div>
              )}
              <div className="contact-item">
                <Calendar className="h-4 w-4" />
                <span>Hired: {new Date(employee.hireDate).toLocaleDateString()}</span>
              </div>
              <div className="contact-item">
                <Clock className="h-4 w-4" />
                <span>Last login: {new Date(employee.lastLogin).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Career Path Section */}
        {employee.targetRole && (
          <div className="career-path-card">
            <div className="career-header">
              <Target className="h-6 w-6" style={{ color: 'var(--accent-gold)' }} />
              <h2>Career Path</h2>
            </div>
            <div className="career-content">
              <div className="career-current">
                <div className="career-node current">
                  <div className="node-icon">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="node-content">
                    <h4>Current Role</h4>
                    <p>{employee.position}</p>
                  </div>
                </div>
                <div className="career-arrow">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="career-node target">
                  <div className="node-icon">
                    <AwardIcon className="h-5 w-5" />
                  </div>
                  <div className="node-content">
                    <h4>Target Role</h4>
                    <p>{employee.targetRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Overview */}
        <div className="skills-overview-card">
          <div className="skills-header">
            <Zap className="h-6 w-6" style={{ color: 'var(--primary-purple)' }} />
            <h2>Skills Overview</h2>
            <button 
              className="skill-gap-btn"
              onClick={() => setShowSkillGapModal(true)}
            >
              <AlertCircle className="h-4 w-4" />
              View Skill Gaps
            </button>
          </div>
          
          <div className="skills-stats">
            <div className="skill-stat">
              <div className="stat-number">{mockSkills.filter(s => s.verified).length}</div>
              <div className="stat-label">Verified Skills</div>
            </div>
            <div className="skill-stat">
              <div className="stat-number">{mockSkills.filter(s => !s.verified).length}</div>
              <div className="stat-label">Skills in Progress</div>
            </div>
            <div className="skill-stat">
              <div className="stat-number">{Math.round(mockSkills.reduce((sum, s) => sum + s.progress, 0) / mockSkills.length)}%</div>
              <div className="stat-label">Average Progress</div>
            </div>
          </div>

          <div className="skills-preview">
            {mockSkills.slice(0, 4).map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}</span>
                </div>
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{skill.progress}%</span>
                </div>
                <div className="skill-status">
                  {skill.verified ? (
                    <CheckCircle className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
                  ) : (
                    <Clock className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <User className="h-4 w-4" />
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <Zap className="h-4 w-4" />
              Skills
            </button>
            <button 
              className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <BookOpen className="h-4 w-4" />
              Courses
            </button>
            <button 
              className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Activity className="h-4 w-4" />
              Activity
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="overview-grid">
                  <div className="overview-card">
                    <h3>Performance Metrics</h3>
                    <div className="metrics-grid">
                      <div className="metric-item">
                        <div className="metric-value">{employee.coursesCompleted || 0}</div>
                        <div className="metric-label">Courses Completed</div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-value">{employee.coursesInProgress || 0}</div>
                        <div className="metric-label">Courses in Progress</div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-value">{mockSkills.filter(s => s.verified).length}</div>
                        <div className="metric-label">Skills Verified</div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-value">4.8</div>
                        <div className="metric-label">Average Rating</div>
                      </div>
                    </div>
                  </div>

                  <div className="overview-card">
                    <h3>Recent Achievements</h3>
                    <div className="achievements-list">
                      <div className="achievement-item">
                        <AwardIcon className="h-5 w-5" style={{ color: 'var(--accent-gold)' }} />
                        <div>
                          <h4>JavaScript Expert</h4>
                          <p>Completed Advanced JavaScript Patterns course</p>
                        </div>
                      </div>
                      <div className="achievement-item">
                        <Star className="h-5 w-5" style={{ color: 'var(--primary-blue)' }} />
                        <div>
                          <h4>Top Performer</h4>
                          <p>Highest course completion rate this month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="skills-tab">
                <div className="skills-list">
                  {mockSkills.map((skill, index) => (
                    <div key={index} className="skill-card">
                      <div className="skill-header">
                        <div className="skill-info">
                          <h4>{skill.name}</h4>
                          <span className="skill-level">{skill.level}</span>
                        </div>
                        <div className="skill-status">
                          {skill.verified ? (
                            <div className="verified-badge">
                              <CheckCircle className="h-4 w-4" />
                              <span>Verified</span>
                            </div>
                          ) : (
                            <div className="pending-badge">
                              <Clock className="h-4 w-4" />
                              <span>In Progress</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="skill-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{skill.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="courses-tab">
                <div className="courses-list">
                  {mockCourses.map((course) => (
                    <div key={course.id} className="course-card">
                      <div className="course-header">
                        <div className="course-info">
                          <h4>{course.title}</h4>
                          <p>Instructor: {course.instructor}</p>
                        </div>
                        <div className="course-status">
                          <span className={`status-badge ${course.status}`}>
                            {course.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="course-details">
                        <div className="course-meta">
                          <span>Duration: {course.duration}</span>
                          <span>
                            {course.status === 'completed' ? `Completed: ${course.completedDate}` : 
                             course.status === 'in-progress' ? `Started: ${course.startedDate}` :
                             `Enrolled: ${course.enrolledDate}`}
                          </span>
                        </div>
                        <div className="course-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="activity-tab">
                <div className="activity-timeline">
                  {mockActivity.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="activity-content">
                        <h4>{activity.title}</h4>
                        <p>{activity.description}</p>
                        <span className="activity-time">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skill Gap Modal */}
        {showSkillGapModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Skill Gap Analysis</h2>
                <button 
                  className="modal-close"
                  onClick={() => setShowSkillGapModal(false)}
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              <div className="modal-body">
                <div className="skill-gap-analysis">
                  <div className="gap-section">
                    <h3>Missing Skills for Target Role</h3>
                    <div className="gap-skills">
                      {['Leadership', 'Project Management', 'System Design', 'DevOps'].map((skill, index) => (
                        <div key={index} className="gap-skill">
                          <AlertCircle className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="gap-section">
                    <h3>Recommended Courses</h3>
                    <div className="recommended-courses">
                      {['Leadership Fundamentals', 'Project Management Basics', 'System Design Patterns'].map((course, index) => (
                        <div key={index} className="recommended-course">
                          <BookOpen className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowSkillGapModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary">
                  Assign Courses
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
