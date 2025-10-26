import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, Search, Filter, Plus, Edit, Trash2, Eye, 
  Crown, Award, User, Building2, Target, GraduationCap,
  Download, Upload, MoreVertical, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTrainerType, setSelectedTrainerType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    // Try to load employees from localStorage first
    const savedEmployees = localStorage.getItem('companyEmployees');
    if (savedEmployees) {
      try {
        const parsedEmployees = JSON.parse(savedEmployees);
        setEmployees(parsedEmployees);
      } catch (error) {
        console.error('Error parsing saved employees:', error);
      }
    }

    // Get company data from location state or mock data
    if (location.state?.companyData) {
      setCompanyData(location.state.companyData);
      // Convert setup employees to list format
      if (location.state.companyData.employees) {
        const convertedEmployees = location.state.companyData.employees.map(emp => ({
          id: emp.id,
          firstName: emp.name.split(' ')[0] || '',
          lastName: emp.name.split(' ').slice(1).join(' ') || '',
          email: emp.email,
          position: emp.currentRole,
          department: emp.department || 'General',
          team: emp.team || '',
          phone: '',
          status: 'active',
          trainerType: emp.trainerType,
          targetRole: emp.targetRole,
          hireDate: new Date().toISOString(),
          lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          skills: ['JavaScript', 'React', 'Node.js'],
          coursesCompleted: Math.floor(Math.random() * 10),
          coursesInProgress: Math.floor(Math.random() * 3)
        }));
        setEmployees(convertedEmployees);
        // Save to localStorage
        localStorage.setItem('companyEmployees', JSON.stringify(convertedEmployees));
      }
    } else if (location.state?.employees) {
      // Use employees passed from navigation
      setEmployees(location.state.employees);
    } else {
      // Mock data for demonstration
      setEmployees([
        {
          id: 'emp_001',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@company.com',
          position: 'Senior Developer',
          department: 'Engineering',
          team: 'Frontend',
          phone: '+1-555-0123',
          status: 'active',
          trainerType: 'internal',
          targetRole: 'Tech Lead in 6 months',
          hireDate: '2023-01-15T00:00:00Z',
          lastLogin: '2024-01-20T10:30:00Z',
          skills: ['JavaScript', 'React', 'TypeScript'],
          coursesCompleted: 8,
          coursesInProgress: 2
        },
        {
          id: 'emp_002',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@company.com',
          position: 'UX Designer',
          department: 'Design',
          team: 'Product',
          phone: '+1-555-0124',
          status: 'active',
          trainerType: 'external',
          targetRole: 'Senior Designer in 1 year',
          hireDate: '2023-03-20T00:00:00Z',
          lastLogin: '2024-01-19T14:20:00Z',
          skills: ['Figma', 'Sketch', 'User Research'],
          coursesCompleted: 5,
          coursesInProgress: 1
        },
        {
          id: 'emp_003',
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'mike.johnson@company.com',
          position: 'Marketing Manager',
          department: 'Marketing',
          team: '',
          phone: '+1-555-0125',
          status: 'active',
          trainerType: 'regular',
          targetRole: 'Marketing Director in 2 years',
          hireDate: '2022-11-10T00:00:00Z',
          lastLogin: '2024-01-18T09:15:00Z',
          skills: ['Digital Marketing', 'Analytics', 'Content Strategy'],
          coursesCompleted: 12,
          coursesInProgress: 3
        }
      ]);
    }
  }, [location.state]);

  const getTrainerIcon = (trainerType) => {
    switch (trainerType) {
      case 'internal':
        return <Crown className="h-4 w-4" style={{ color: 'var(--accent-gold)' }} />
      case 'external':
        return <Award className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
      default:
        return <User className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
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
        return <AlertCircle className="h-4 w-4" style={{ color: 'var(--error-red)' }} />
      case 'pending':
        return <Clock className="h-4 w-4" style={{ color: 'var(--accent-orange)' }} />
      default:
        return <User className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  };

  const getAvailableDepartments = () => {
    const departments = [...new Set(employees.map(emp => emp.department))];
    return departments.map(dept => ({ value: dept, label: dept }));
  };

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter(employee => {
      const matchesSearch = 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !selectedDepartment || employee.department === selectedDepartment;
      const matchesTrainerType = !selectedTrainerType || employee.trainerType === selectedTrainerType;
      const matchesStatus = !selectedStatus || employee.status === selectedStatus;

      return matchesSearch && matchesDepartment && matchesTrainerType && matchesStatus;
    });

    // Sort employees
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case 'department':
          aValue = a.department.toLowerCase();
          bValue = b.department.toLowerCase();
          break;
        case 'position':
          aValue = a.position.toLowerCase();
          bValue = b.position.toLowerCase();
          break;
        case 'hireDate':
          aValue = new Date(a.hireDate);
          bValue = new Date(b.hireDate);
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [employees, searchTerm, selectedDepartment, selectedTrainerType, selectedStatus, sortBy, sortOrder]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectEmployee = (employeeId) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(employeeId)) {
      newSelected.delete(employeeId);
    } else {
      newSelected.add(employeeId);
    }
    setSelectedEmployees(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const handleSelectAll = () => {
    if (selectedEmployees.size === filteredAndSortedEmployees.length) {
      setSelectedEmployees(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedEmployees(new Set(filteredAndSortedEmployees.map(emp => emp.id)));
      setShowBulkActions(true);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action}`, Array.from(selectedEmployees));
    // Implement bulk actions here
    setSelectedEmployees(new Set());
    setShowBulkActions(false);
  };

  const handleViewEmployee = (employee) => {
    navigate(`/employee/${employee.id}`, { 
      state: { 
        employee, 
        companyData 
      } 
    });
  };

  const handleEditEmployee = (employee) => {
    navigate(`/employee/${employee.id}/edit`, { 
      state: { 
        employee, 
        companyData 
      } 
    });
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
      setEmployees(updatedEmployees);
      // Save to localStorage
      localStorage.setItem('companyEmployees', JSON.stringify(updatedEmployees));
    }
  };

  const handleBackToDashboard = () => {
    navigate('/company-dashboard', { 
      state: { 
        employees: employees,
        companyData: companyData,
        updatedCompanyData: companyData
      } 
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('');
    setSelectedTrainerType('');
    setSelectedStatus('');
  };

  return (
    <div className="employee-list-page">
      <div className="employee-list-container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <div className="header-icon">
              <Users className="h-12 w-12" style={{ color: 'var(--primary-blue)' }} />
            </div>
            <div className="header-text">
              <h1 className="page-title">Employee Management</h1>
              <p className="page-subtitle">
                Manage your company's employees, trainers, and learning paths
              </p>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="action-btn secondary"
              onClick={handleBackToDashboard}
            >
              <Building2 className="h-5 w-5" />
              Back to Dashboard
            </button>
            <button 
              className="action-btn primary"
              onClick={() => navigate('/employee/add')}
            >
              <Plus className="h-5 w-5" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Users className="h-8 w-8" style={{ color: 'var(--accent-green)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{employees.length}</div>
              <div className="stat-label">Total Employees</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Crown className="h-8 w-8" style={{ color: 'var(--accent-gold)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {employees.filter(emp => emp.trainerType === 'internal').length}
              </div>
              <div className="stat-label">Internal Trainers</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Award className="h-8 w-8" style={{ color: 'var(--primary-blue)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {employees.filter(emp => emp.trainerType === 'external').length}
              </div>
              <div className="stat-label">External Trainers</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <GraduationCap className="h-8 w-8" style={{ color: 'var(--primary-purple)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {employees.reduce((sum, emp) => sum + emp.coursesCompleted, 0)}
              </div>
              <div className="stat-label">Courses Completed</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="search-filters-section">
          <div className="search-bar">
            <Search className="h-5 w-5 search-icon" />
            <input
              type="text"
              placeholder="Search employees by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
              Filters
              {showFilters ? ' (Hide)' : ' (Show)'}
            </button>
            
            {(searchTerm || selectedDepartment || selectedTrainerType || selectedStatus) && (
              <button 
                className="clear-filters"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label className="filter-label">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Departments</option>
                  {getAvailableDepartments().map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Employee Type</label>
                <select
                  value={selectedTrainerType}
                  onChange={(e) => setSelectedTrainerType(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Types</option>
                  <option value="regular">Regular Employee</option>
                  <option value="internal">Internal Trainer</option>
                  <option value="external">External Trainer</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {showBulkActions && (
          <div className="bulk-actions">
            <div className="bulk-info">
              <span>{selectedEmployees.size} employee(s) selected</span>
            </div>
            <div className="bulk-buttons">
              <button 
                className="bulk-btn"
                onClick={() => handleBulkAction('export')}
              >
                <Download className="h-4 w-4" />
                Export
              </button>
              <button 
                className="bulk-btn"
                onClick={() => handleBulkAction('assign-course')}
              >
                <GraduationCap className="h-4 w-4" />
                Assign Course
              </button>
              <button 
                className="bulk-btn danger"
                onClick={() => handleBulkAction('deactivate')}
              >
                <AlertCircle className="h-4 w-4" />
                Deactivate
              </button>
            </div>
          </div>
        )}

        {/* Employee Table */}
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">
              Employees ({filteredAndSortedEmployees.length})
            </h2>
            <div className="table-actions">
              <button className="table-action-btn">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="table-action-btn">
                <Upload className="h-4 w-4" />
                Import
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="employee-table">
              <thead>
                <tr>
                  <th className="table-header-cell checkbox">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.size === filteredAndSortedEmployees.length && filteredAndSortedEmployees.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th 
                    className="table-header-cell sortable"
                    onClick={() => handleSort('name')}
                  >
                    <div className="header-content">
                      Name
                      {sortBy === 'name' && (
                        <span className="sort-indicator">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="table-header-cell sortable"
                    onClick={() => handleSort('position')}
                  >
                    <div className="header-content">
                      Position
                      {sortBy === 'position' && (
                        <span className="sort-indicator">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="table-header-cell sortable"
                    onClick={() => handleSort('department')}
                  >
                    <div className="header-content">
                      Department
                      {sortBy === 'department' && (
                        <span className="sort-indicator">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="table-header-cell">Team</th>
                  <th className="table-header-cell">Type</th>
                  <th className="table-header-cell">Status</th>
                  <th className="table-header-cell">Courses</th>
                  <th className="table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedEmployees.map((employee) => (
                  <tr key={employee.id} className="table-row">
                    <td className="table-cell checkbox">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.has(employee.id)}
                        onChange={() => handleSelectEmployee(employee.id)}
                      />
                    </td>
                    <td className="table-cell employee-name">
                      <div className="employee-info">
                        <div className="employee-avatar">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </div>
                        <div className="employee-details">
                          <div className="employee-name-text">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="employee-email">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="position-info">
                        <div className="position-title">{employee.position}</div>
                        {employee.targetRole && (
                          <div className="target-role">
                            <Target className="h-3 w-3" />
                            <span>{employee.targetRole}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="department-info">
                        <Building2 className="h-4 w-4" />
                        <span>{employee.department}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      {employee.team ? (
                        <span className="team-badge">{employee.team}</span>
                      ) : (
                        <span className="no-team">-</span>
                      )}
                    </td>
                    <td className="table-cell">
                      <div className="type-info">
                        {getTrainerIcon(employee.trainerType)}
                        <span className="type-label">{getTrainerLabel(employee.trainerType)}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="status-info">
                        {getStatusIcon(employee.status)}
                        <span className={`status-badge ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="courses-info">
                        <div className="courses-stats">
                          <span className="completed">{employee.coursesCompleted} completed</span>
                          {employee.coursesInProgress > 0 && (
                            <span className="in-progress">{employee.coursesInProgress} in progress</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell actions">
                      <div className="action-buttons">
                        <button 
                          className="action-btn view"
                          onClick={() => handleViewEmployee(employee)}
                          title="View Profile"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEditEmployee(employee)}
                          title="Edit Employee"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDeleteEmployee(employee.id)}
                          title="Delete Employee"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedEmployees.length === 0 && (
            <div className="empty-state">
              <Users className="h-12 w-12" style={{ color: 'var(--text-muted)' }} />
              <h3 className="empty-title">No Employees Found</h3>
              <p className="empty-subtitle">
                {searchTerm || selectedDepartment || selectedTrainerType || selectedStatus
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Start by adding your first employee to the system.'
                }
              </p>
              {!searchTerm && !selectedDepartment && !selectedTrainerType && !selectedStatus && (
                <button 
                  className="empty-action-btn"
                  onClick={() => navigate('/employee/add')}
                >
                  <Plus className="h-5 w-5" />
                  Add First Employee
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeListPage;
