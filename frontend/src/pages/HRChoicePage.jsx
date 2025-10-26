import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Building2, ArrowLeft, Users, Briefcase, 
  Shield, Crown, Award, GraduationCap, Settings
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const HRChoicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [companyData, setCompanyData] = useState(null);

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
  }, [location.state]);

  const handleMyProfile = () => {
    // Navigate to HR's personal employee profile
    navigate(`/employee/${user.id}`, { 
      state: { 
        employee: user, 
        companyData 
      } 
    });
  };

  const handleMyCompany = () => {
    // Navigate to company dashboard with HR privileges
    navigate('/company-dashboard', { 
      state: { 
        companyData,
        userRole: 'hr'
      } 
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-6 w-6" style={{ color: 'var(--error-red)' }} />
      case 'hr':
        return <Users className="h-6 w-6" style={{ color: 'var(--primary-blue)' }} />
      case 'department_manager':
        return <Building2 className="h-6 w-6" style={{ color: 'var(--accent-green)' }} />
      case 'team_leader':
        return <Users className="h-6 w-6" style={{ color: 'var(--accent-gold)' }} />
      case 'trainer':
        return <GraduationCap className="h-6 w-6" style={{ color: 'var(--primary-purple)' }} />
      case 'employee':
        return <User className="h-6 w-6" style={{ color: 'var(--text-secondary)' }} />
      default:
        return <User className="h-6 w-6" style={{ color: 'var(--text-muted)' }} />
    }
  };

  if (!user) {
    return (
      <div className="hr-choice-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hr-choice-page">
      <div className="choice-container">
        {/* Header */}
        <div className="choice-header">
          <div className="header-actions">
            <button 
              className="logout-btn"
              onClick={handleLogout}
            >
              <ArrowLeft className="h-5 w-5" />
              Logout
            </button>
          </div>
          
          <div className="header-content">
            <div className="user-info">
              <div className="user-avatar">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="user-details">
                <h1>Welcome, {user.firstName}!</h1>
                <p>{user.position} • {user.department}</p>
                <div className="user-role">
                  {getRoleIcon(user.role)}
                  <span>HR Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Choice Cards */}
        <div className="choice-cards">
          <div className="choice-intro">
            <h2>Choose Your View</h2>
            <p>As an HR Manager, you can access both your personal profile and your company's management dashboard.</p>
          </div>

          <div className="cards-grid">
            {/* My Profile Card */}
            <div className="choice-card" onClick={handleMyProfile}>
              <div className="card-icon">
                <User className="h-8 w-8" style={{ color: 'var(--primary-blue)' }} />
              </div>
              <div className="card-content">
                <h3>My Profile</h3>
                <p>View and manage your personal employee profile, skills, and development progress.</p>
                <div className="card-features">
                  <div className="feature-item">
                    <Briefcase className="h-4 w-4" />
                    <span>Personal Information</span>
                  </div>
                  <div className="feature-item">
                    <Award className="h-4 w-4" />
                    <span>Skills & Certifications</span>
                  </div>
                  <div className="feature-item">
                    <GraduationCap className="h-4 w-4" />
                    <span>Training History</span>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <button className="action-btn">
                  View My Profile
                </button>
              </div>
            </div>

            {/* My Company Card */}
            <div className="choice-card" onClick={handleMyCompany}>
              <div className="card-icon">
                <Building2 className="h-8 w-8" style={{ color: 'var(--accent-green)' }} />
              </div>
              <div className="card-content">
                <h3>My Company</h3>
                <p>Access the full company management dashboard with employee oversight and training management.</p>
                <div className="card-features">
                  <div className="feature-item">
                    <Users className="h-4 w-4" />
                    <span>Employee Management</span>
                  </div>
                  <div className="feature-item">
                    <Building2 className="h-4 w-4" />
                    <span>Company Hierarchy</span>
                  </div>
                  <div className="feature-item">
                    <Settings className="h-4 w-4" />
                    <span>Training Requests</span>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <button className="action-btn">
                  Manage Company
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {companyData && (
          <div className="quick-stats">
            <h3>Company Overview</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <Users className="h-5 w-5" />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{companyData.employees?.length || 0}</div>
                  <div className="stat-label">Total Employees</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{companyData.departments?.length || 0}</div>
                  <div className="stat-label">Departments</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{companyData.trainers?.length || 0}</div>
                  <div className="stat-label">Trainers</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Offline Notice */}
        <div className="offline-notice">
          <div className="notice-content">
            <p>
              <strong>Note:</strong> This system is currently running in offline mode with mock data. 
              All interactions are simulated and data is not permanently stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRChoicePage;
