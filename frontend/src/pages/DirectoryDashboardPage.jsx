import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Building2, Users, CheckCircle, Clock, Plus, Grid, List } from 'lucide-react';
import { mockCompanies, industries, companyStats } from '../data/mockCompanies';

const DirectoryDashboardPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  // Filter companies based on search and filters
  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
      const matchesStatus = !statusFilter || company.status === statusFilter;
      
      return matchesSearch && matchesIndustry && matchesStatus;
    });
  }, [searchTerm, selectedIndustry, statusFilter]);

  const CompanyCard = ({ company }) => (
    <div className="company-card">
      <div className="company-header">
        <div className="company-logo">
          <Building2 className="h-8 w-8" style={{ color: 'var(--primary-blue)' }} />
        </div>
        <div className="company-status">
          {company.status === 'verified' ? (
            <span className="status-badge verified">
              <CheckCircle className="h-4 w-4" />
              Verified
            </span>
          ) : (
            <span className="status-badge pending">
              <Clock className="h-4 w-4" />
              Pending
            </span>
          )}
        </div>
      </div>
      
      <div className="company-info">
        <h3 className="company-name">{company.name}</h3>
        <p className="company-domain">{company.domain}</p>
        <p className="company-description">{company.description}</p>
        
        <div className="company-meta">
          <div className="meta-item">
            <span className="meta-label">Industry:</span>
            <span className="meta-value">{company.industry}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Employees:</span>
            <span className="meta-value">{company.employeeCount}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Location:</span>
            <span className="meta-value">{company.location}</span>
          </div>
        </div>
        
        <div className="company-departments">
          <span className="departments-label">Departments:</span>
          <div className="departments-list">
            {company.departments.slice(0, 3).map((dept, index) => (
              <span key={index} className="department-tag">
                {dept}
              </span>
            ))}
            {company.departments.length > 3 && (
              <span className="department-tag more">
                +{company.departments.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="company-footer">
        <div className="last-activity">
          Last activity: {new Date(company.lastActivity).toLocaleDateString()}
        </div>
        <button className="view-profile-btn">
          View Profile
        </button>
      </div>
    </div>
  );

  const CompanyListItem = ({ company }) => (
    <div className="company-list-item">
      <div className="list-item-main">
        <div className="list-item-logo">
          <Building2 className="h-6 w-6" style={{ color: 'var(--primary-blue)' }} />
        </div>
        <div className="list-item-info">
          <div className="list-item-header">
            <h3 className="list-item-name">{company.name}</h3>
            <span className="list-item-domain">{company.domain}</span>
            {company.status === 'verified' ? (
              <span className="status-badge verified">
                <CheckCircle className="h-4 w-4" />
                Verified
              </span>
            ) : (
              <span className="status-badge pending">
                <Clock className="h-4 w-4" />
                Pending
              </span>
            )}
          </div>
          <p className="list-item-description">{company.description}</p>
          <div className="list-item-meta">
            <span>{company.industry}</span>
            <span>•</span>
            <span>{company.employeeCount} employees</span>
            <span>•</span>
            <span>{company.location}</span>
          </div>
        </div>
      </div>
      <div className="list-item-actions">
        <button className="view-profile-btn">
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="directory-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-main">
            <h1 className="dashboard-title">Company Directory</h1>
            <p className="dashboard-subtitle">
              Discover and connect with companies in our platform
            </p>
          </div>
          <button 
            className="register-company-btn"
            onClick={() => navigate('/register-company')}
          >
            <Plus className="h-5 w-5" />
            Register Your Company
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Building2 className="h-6 w-6" style={{ color: 'var(--primary-blue)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{companyStats.total}</div>
              <div className="stat-label">Total Companies</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <CheckCircle className="h-6 w-6" style={{ color: 'var(--success-green)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{companyStats.verified}</div>
              <div className="stat-label">Verified</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Clock className="h-6 w-6" style={{ color: 'var(--warning-orange)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{companyStats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Users className="h-6 w-6" style={{ color: 'var(--accent-purple)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{companyStats.totalEmployees.toLocaleString()}</div>
              <div className="stat-label">Total Employees</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-filters-section">
        <div className="search-bar">
          <Search className="h-5 w-5 search-icon" />
          <input
            type="text"
            placeholder="Search companies, domains, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label className="filter-label">Industry</label>
            <select 
              value={selectedIndustry} 
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="filter-select"
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSelectedIndustry('');
              setStatusFilter('');
              setSearchTerm('');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Results Section */}
      <div className="results-section">
        <div className="results-header">
          <h2 className="results-title">
            {filteredCompanies.length} Companies Found
          </h2>
          {searchTerm && (
            <p className="results-subtitle">
              Showing results for "{searchTerm}"
            </p>
          )}
        </div>
        
        {filteredCompanies.length === 0 ? (
          <div className="empty-state">
            <Building2 className="h-16 w-16 empty-icon" />
            <h3 className="empty-title">No companies found</h3>
            <p className="empty-description">
              Try adjusting your search terms or filters to find companies.
            </p>
            <button 
              className="clear-search-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedIndustry('');
                setStatusFilter('');
              }}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className={`companies-container ${viewMode}`}>
            {viewMode === 'grid' ? (
              filteredCompanies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))
            ) : (
              filteredCompanies.map(company => (
                <CompanyListItem key={company.id} company={company} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryDashboardPage;
