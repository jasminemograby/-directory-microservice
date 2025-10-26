import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCompanyStore } from '../stores/companyStore'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'
import { 
  Building2, Users, Plus, UserPlus, Settings, BarChart3, Calendar, 
  CheckCircle, Edit, Trash2, ChevronDown, ChevronRight, User, 
  Crown, Award, Target, GraduationCap
} from 'lucide-react'
import toast from 'react-hot-toast'

const CompanyDashboardPage = () => {
  const location = useLocation()
  const { companies, fetchCompanies, isLoading } = useCompanyStore()
  const { isDarkMode } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [employees, setEmployees] = useState([])
  const [companyData, setCompanyData] = useState(null)
  const [expandedNodes, setExpandedNodes] = useState(new Set())
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    phone: ''
  })

  useEffect(() => {
    fetchCompanies()
    
    // Get company data from setup process
    if (location.state?.companyData) {
      setCompanyData(location.state.companyData)
      // Convert setup employees to dashboard format
      if (location.state.companyData.employees) {
        const convertedEmployees = location.state.companyData.employees.map(emp => ({
          id: emp.id,
          firstName: emp.name.split(' ')[0] || '',
          lastName: emp.name.split(' ').slice(1).join(' ') || '',
          email: emp.email,
          position: emp.currentRole,
          department: emp.department || 'General',
          phone: '',
          status: 'active',
          trainerType: emp.trainerType,
          targetRole: emp.targetRole
        }))
        setEmployees(convertedEmployees)
      }
    }
  }, [location.state])

  const handleAddEmployee = (e) => {
    e.preventDefault()
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email) {
      toast.error('Please fill in required fields')
      return
    }

    const employee = {
      id: `emp_${Date.now()}`,
      ...newEmployee,
      companyId: companies[0]?.id || 'comp_001',
      hireDate: new Date().toISOString(),
      status: 'active'
    }

    setEmployees([...employees, employee])
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      department: '',
      phone: ''
    })
    toast.success('Employee added successfully!')
  }

  const currentCompany = companyData ? {
    id: 'comp_001',
    name: companyData.companyName,
    domain: companyData.domain || 'company.com',
    industry: companyData.industry,
    size: `${employees.length} employees`,
    status: 'verified',
    employeesCount: employees.length,
    trainingPrograms: 5,
    pendingRequests: 2,
    departments: companyData.departments || [],
    minPassingGrade: companyData.minPassingGrade || 70,
    requiredQuestions: companyData.requiredQuestions || 10
  } : (companies[0] || {
    id: 'comp_001',
    name: 'TechCorp Solutions',
    domain: 'techcorp.com',
    industry: 'Technology',
    size: '501-1000',
    status: 'verified',
    employeesCount: employees.length,
    trainingPrograms: 5,
    pendingRequests: 2,
    departments: [],
    minPassingGrade: 70,
    requiredQuestions: 10
  })

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id))
    toast.success('Employee removed successfully!')
  }

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const getTrainerIcon = (trainerType) => {
    switch (trainerType) {
      case 'internal':
        return <Crown className="h-4 w-4" style={{ color: 'var(--accent-gold)' }} />
      case 'external':
        return <Award className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
      default:
        return <User className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
    }
  }

  const getTrainerLabel = (trainerType) => {
    switch (trainerType) {
      case 'internal':
        return 'Internal Trainer'
      case 'external':
        return 'External Trainer'
      default:
        return 'Regular Employee'
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div 
            className="mx-auto h-12 w-12 flex items-center justify-center rounded-full"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {currentCompany.name} Dashboard
          </h1>
          <p className="mt-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Manage your company's directory, employees, and training
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b" style={{ borderColor: 'var(--bg-tertiary)' }}>
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-opacity-100'
                  : 'border-transparent hover:border-opacity-50'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
              style={{
                borderColor: activeTab === 'overview' ? 'var(--primary-cyan)' : 'transparent',
                color: activeTab === 'overview' ? 'var(--primary-cyan)' : 'var(--text-secondary)'
              }}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`${
                activeTab === 'employees'
                  ? 'border-opacity-100'
                  : 'border-transparent hover:border-opacity-50'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
              style={{
                borderColor: activeTab === 'employees' ? 'var(--primary-cyan)' : 'transparent',
                color: activeTab === 'employees' ? 'var(--primary-cyan)' : 'var(--text-secondary)'
              }}
            >
              Employees ({employees.length})
            </button>
            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`${
                activeTab === 'hierarchy'
                  ? 'border-opacity-100'
                  : 'border-transparent hover:border-opacity-50'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
              style={{
                borderColor: activeTab === 'hierarchy' ? 'var(--primary-cyan)' : 'transparent',
                color: activeTab === 'hierarchy' ? 'var(--primary-cyan)' : 'var(--text-secondary)'
              }}
            >
              Hierarchy
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`${
                activeTab === 'training'
                  ? 'border-opacity-100'
                  : 'border-transparent hover:border-opacity-50'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200`}
              style={{
                borderColor: activeTab === 'training' ? 'var(--primary-cyan)' : 'transparent',
                color: activeTab === 'training' ? 'var(--primary-cyan)' : 'var(--text-secondary)'
              }}
            >
              Training
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                className="card"
                style={{ 
                  background: 'var(--gradient-card)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: 'var(--spacing-lg)',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                <div className="flex items-center">
                  <Building2 className="h-8 w-8 mr-4" style={{ color: 'var(--primary-cyan)' }} />
                  <div>
                    <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Company Details</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Domain: {currentCompany.domain}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Industry: {currentCompany.industry}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Size: {currentCompany.size} employees</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Status: {currentCompany.status}</p>
                  </div>
                </div>
              </div>

              <div 
                className="card"
                style={{ 
                  background: 'var(--gradient-card)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: 'var(--spacing-lg)',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                <div className="flex items-center">
                  <Users className="h-8 w-8 mr-4" style={{ color: 'var(--accent-green)' }} />
                  <div>
                    <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Employees</h3>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{employees.length}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total active employees</p>
                  </div>
                </div>
              </div>

              <div 
                className="card"
                style={{ 
                  background: 'var(--gradient-card)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: 'var(--spacing-lg)',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                <div className="flex items-center">
                  <Settings className="h-8 w-8 mr-4" style={{ color: 'var(--accent-orange)' }} />
                  <div>
                    <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Training Programs</h3>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{currentCompany.trainingPrograms}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Active training programs</p>
                  </div>
                </div>
              </div>

              <div 
                className="card"
                style={{ 
                  background: 'var(--gradient-card)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: 'var(--spacing-lg)',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 mr-4" style={{ color: 'var(--accent-gold)' }} />
                  <div>
                    <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Pending Requests</h3>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{currentCompany.pendingRequests}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Training & HR requests</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'employees' && (
            <div 
              className="card"
              style={{ 
                background: 'var(--gradient-card)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: 'var(--spacing-lg)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Manage Employees</h2>

              {/* Add Employee Form */}
              <form onSubmit={handleAddEmployee} className="mb-8 p-4 rounded-lg" style={{ 
                background: 'var(--bg-secondary)',
                border: '1px solid var(--bg-tertiary)'
              }}>
                <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Add New Employee</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-primary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                      value={newEmployee.firstName}
                      onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-primary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                      value={newEmployee.lastName}
                      onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-primary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Position</label>
                    <input
                      type="text"
                      id="position"
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-primary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Department</label>
                    <input
                      type="text"
                      id="department"
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-primary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-primary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-6 inline-flex items-center px-4 py-2 text-sm font-medium"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    boxShadow: 'var(--shadow-glow)'
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" /> Add Employee
                </button>
              </form>

              {/* Employee List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y" style={{ borderColor: 'var(--bg-tertiary)' }}>
                  <thead style={{ background: 'var(--bg-secondary)' }}>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        Position
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ 
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--bg-tertiary)'
                  }}>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {employee.firstName} {employee.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {employee.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {employee.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="mr-3 hover:opacity-70" style={{ color: 'var(--primary-cyan)' }}>
                            <Edit className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDeleteEmployee(employee.id)} className="hover:opacity-70" style={{ color: 'var(--streak-color)' }}>
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'hierarchy' && (
            <div 
              className="card"
              style={{ 
                background: 'var(--gradient-card)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: 'var(--spacing-lg)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Company Hierarchy
                </h2>
                <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4" style={{ color: 'var(--accent-gold)' }} />
                    <span>Internal Trainer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
                    <span>External Trainer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
                    <span>Regular Employee</span>
                  </div>
                </div>
              </div>

              {/* Company Root */}
              <div className="hierarchy-tree">
                <div className="company-root">
                  <div className="company-node">
                    <Building2 className="h-6 w-6" style={{ color: 'var(--primary-blue)' }} />
                    <div className="node-content">
                      <h3 className="node-title">{currentCompany.name}</h3>
                      <p className="node-subtitle">{currentCompany.industry} • {currentCompany.size}</p>
                    </div>
                  </div>

                  {/* Departments */}
                  {currentCompany.departments && currentCompany.departments.length > 0 ? (
                    <div className="departments-container">
                      {currentCompany.departments.map((dept, deptIndex) => (
                        <div key={dept.id || deptIndex} className="department-branch">
                          <div className="branch-line"></div>
                          <div className="department-node">
                            <button
                              className="expand-btn"
                              onClick={() => toggleNode(`dept-${deptIndex}`)}
                            >
                              {expandedNodes.has(`dept-${deptIndex}`) ? 
                                <ChevronDown className="h-4 w-4" /> : 
                                <ChevronRight className="h-4 w-4" />
                              }
                            </button>
                            <Users className="h-5 w-5" style={{ color: 'var(--accent-green)' }} />
                            <div className="node-content">
                              <h4 className="node-title">{dept.name}</h4>
                              <p className="node-subtitle">Manager: {dept.manager}</p>
                            </div>
                          </div>

                          {/* Teams */}
                          {expandedNodes.has(`dept-${deptIndex}`) && dept.teams && dept.teams.length > 0 && (
                            <div className="teams-container">
                              {dept.teams.map((team, teamIndex) => (
                                <div key={team.id || teamIndex} className="team-branch">
                                  <div className="branch-line"></div>
                                  <div className="team-node">
                                    <button
                                      className="expand-btn"
                                      onClick={() => toggleNode(`team-${deptIndex}-${teamIndex}`)}
                                    >
                                      {expandedNodes.has(`team-${deptIndex}-${teamIndex}`) ? 
                                        <ChevronDown className="h-4 w-4" /> : 
                                        <ChevronRight className="h-4 w-4" />
                                      }
                                    </button>
                                    <User className="h-4 w-4" style={{ color: 'var(--primary-purple)' }} />
                                    <div className="node-content">
                                      <h5 className="node-title">{team.name}</h5>
                                      <p className="node-subtitle">Lead: {team.lead}</p>
                                    </div>
                                  </div>

                                  {/* Employees in Team */}
                                  {expandedNodes.has(`team-${deptIndex}-${teamIndex}`) && (
                                    <div className="employees-container">
                                      {employees
                                        .filter(emp => emp.department === dept.name)
                                        .map((emp, empIndex) => (
                                        <div key={emp.id} className="employee-branch">
                                          <div className="branch-line"></div>
                                          <div className="employee-node">
                                            <div className="employee-icon">
                                              {getTrainerIcon(emp.trainerType)}
                                            </div>
                                            <div className="node-content">
                                              <h6 className="node-title">{emp.firstName} {emp.lastName}</h6>
                                              <p className="node-subtitle">{emp.position}</p>
                                              {emp.targetRole && (
                                                <div className="career-path">
                                                  <Target className="h-3 w-3" style={{ color: 'var(--accent-gold)' }} />
                                                  <span className="career-text">{emp.targetRole}</span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Employees in Department (not in teams) */}
                          {expandedNodes.has(`dept-${deptIndex}`) && (
                            <div className="department-employees">
                              {employees
                                .filter(emp => emp.department === dept.name && !dept.teams?.some(team => team.name === emp.department))
                                .map((emp) => (
                                <div key={emp.id} className="employee-branch">
                                  <div className="branch-line"></div>
                                  <div className="employee-node">
                                    <div className="employee-icon">
                                      {getTrainerIcon(emp.trainerType)}
                                    </div>
                                    <div className="node-content">
                                      <h6 className="node-title">{emp.firstName} {emp.lastName}</h6>
                                      <p className="node-subtitle">{emp.position}</p>
                                      {emp.targetRole && (
                                        <div className="career-path">
                                          <Target className="h-3 w-3" style={{ color: 'var(--accent-gold)' }} />
                                          <span className="career-text">{emp.targetRole}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <Users className="h-12 w-12" style={{ color: 'var(--text-muted)' }} />
                      <h3 className="empty-title">No Departments Set Up</h3>
                      <p className="empty-subtitle">
                        Complete the company setup to see your organization hierarchy here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <div 
              className="card"
              style={{ 
                background: 'var(--gradient-card)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: 'var(--spacing-lg)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Training Programs</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Details about training programs will go here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboardPage