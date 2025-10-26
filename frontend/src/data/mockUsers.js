// Mock user data for role-based authentication
export const mockUsers = [
  // Admin User
  {
    id: 'admin_001',
    username: 'admin',
    password: 'admin123',
    email: 'admin@directory.com',
    firstName: 'System',
    lastName: 'Administrator',
    role: 'admin',
    companyId: null, // Admin has access to all companies
    permissions: ['view_all_companies', 'manage_system', 'access_admin_panel'],
    lastLogin: '2024-07-21T10:30:00Z',
    isActive: true
  },

  // HR Users
  {
    id: 'hr_001',
    username: 'hr.sarah',
    password: 'hr123',
    email: 'sarah.johnson@techcorp.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'hr',
    companyId: 'company_001',
    department: 'Human Resources',
    position: 'HR Manager',
    permissions: ['manage_employees', 'manage_training', 'view_company_data'],
    lastLogin: '2024-07-21T09:15:00Z',
    isActive: true
  },

  {
    id: 'hr_002',
    username: 'hr.mike',
    password: 'hr123',
    email: 'mike.chen@datatech.com',
    firstName: 'Mike',
    lastName: 'Chen',
    role: 'hr',
    companyId: 'company_002',
    department: 'Human Resources',
    position: 'HR Director',
    permissions: ['manage_employees', 'manage_training', 'view_company_data'],
    lastLogin: '2024-07-20T16:45:00Z',
    isActive: true
  },

  // Department Managers
  {
    id: 'manager_001',
    username: 'manager.alex',
    password: 'manager123',
    email: 'alex.rodriguez@techcorp.com',
    firstName: 'Alex',
    lastName: 'Rodriguez',
    role: 'department_manager',
    companyId: 'company_001',
    department: 'Engineering',
    position: 'Engineering Manager',
    team: null, // Department managers don't belong to specific teams
    permissions: ['view_department', 'view_team_members', 'manage_department_training'],
    lastLogin: '2024-07-21T08:30:00Z',
    isActive: true
  },

  {
    id: 'manager_002',
    username: 'manager.lisa',
    password: 'manager123',
    email: 'lisa.wang@datatech.com',
    firstName: 'Lisa',
    lastName: 'Wang',
    role: 'department_manager',
    companyId: 'company_002',
    department: 'Data Science',
    position: 'Data Science Manager',
    team: null,
    permissions: ['view_department', 'view_team_members', 'manage_department_training'],
    lastLogin: '2024-07-20T14:20:00Z',
    isActive: true
  },

  // Team Leaders
  {
    id: 'leader_001',
    username: 'leader.emma',
    password: 'leader123',
    email: 'emma.davis@techcorp.com',
    firstName: 'Emma',
    lastName: 'Davis',
    role: 'team_leader',
    companyId: 'company_001',
    department: 'Engineering',
    position: 'Frontend Team Lead',
    team: 'Frontend',
    managerId: 'manager_001', // Reports to Alex Rodriguez
    permissions: ['view_team', 'view_team_members', 'manage_team_training'],
    lastLogin: '2024-07-21T11:00:00Z',
    isActive: true
  },

  {
    id: 'leader_002',
    username: 'leader.james',
    password: 'leader123',
    email: 'james.brown@datatech.com',
    firstName: 'James',
    lastName: 'Brown',
    role: 'team_leader',
    companyId: 'company_002',
    department: 'Data Science',
    position: 'ML Team Lead',
    team: 'Machine Learning',
    managerId: 'manager_002', // Reports to Lisa Wang
    permissions: ['view_team', 'view_team_members', 'manage_team_training'],
    lastLogin: '2024-07-20T13:15:00Z',
    isActive: true
  },

  // Trainers
  {
    id: 'trainer_001',
    username: 'trainer.sarah',
    password: 'trainer123',
    email: 'sarah.johnson@techcorp.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'trainer',
    companyId: 'company_001',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    team: 'Frontend',
    trainerType: 'internal',
    aiEnabled: true,
    permissions: ['teach_courses', 'publish_content', 'view_student_progress'],
    lastLogin: '2024-07-21T10:30:00Z',
    isActive: true
  },

  {
    id: 'trainer_002',
    username: 'trainer.mike',
    password: 'trainer123',
    email: 'mike.chen@datatech.com',
    firstName: 'Mike',
    lastName: 'Chen',
    role: 'trainer',
    companyId: 'company_002',
    department: 'Data Science',
    position: 'Data Science Lead',
    team: 'Machine Learning',
    trainerType: 'external',
    aiEnabled: false,
    permissions: ['teach_courses', 'publish_content', 'view_student_progress'],
    lastLogin: '2024-07-20T15:45:00Z',
    isActive: true
  },

  // Regular Employees
  {
    id: 'employee_001',
    username: 'employee.john',
    password: 'employee123',
    email: 'john.doe@techcorp.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'employee',
    companyId: 'company_001',
    department: 'Engineering',
    position: 'Software Engineer',
    team: 'Frontend',
    managerId: 'leader_001', // Reports to Emma Davis
    permissions: ['view_profile', 'request_training', 'update_profile'],
    lastLogin: '2024-07-21T09:45:00Z',
    isActive: true
  },

  {
    id: 'employee_002',
    username: 'employee.jane',
    password: 'employee123',
    email: 'jane.smith@datatech.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'employee',
    companyId: 'company_002',
    department: 'Data Science',
    position: 'Data Analyst',
    team: 'Machine Learning',
    managerId: 'leader_002', // Reports to James Brown
    permissions: ['view_profile', 'request_training', 'update_profile'],
    lastLogin: '2024-07-20T12:30:00Z',
    isActive: true
  },

  {
    id: 'employee_003',
    username: 'employee.bob',
    password: 'employee123',
    email: 'bob.wilson@techcorp.com',
    firstName: 'Bob',
    lastName: 'Wilson',
    role: 'employee',
    companyId: 'company_001',
    department: 'Engineering',
    position: 'Junior Developer',
    team: 'Backend',
    managerId: 'leader_003', // Reports to another team leader
    permissions: ['view_profile', 'request_training', 'update_profile'],
    lastLogin: '2024-07-21T08:15:00Z',
    isActive: true
  }
];

// Role-based navigation configuration
export const roleNavigation = {
  admin: {
    defaultRoute: '/directory',
    name: 'Administrator',
    description: 'System-wide access to all companies',
    icon: 'Shield',
    color: 'var(--error-red)'
  },
  hr: {
    defaultRoute: '/hr-choice',
    name: 'HR Manager',
    description: 'Company management and employee oversight',
    icon: 'Users',
    color: 'var(--primary-blue)'
  },
  department_manager: {
    defaultRoute: '/employee',
    name: 'Department Manager',
    description: 'Department oversight and team management',
    icon: 'Building2',
    color: 'var(--accent-green)'
  },
  team_leader: {
    defaultRoute: '/employee',
    name: 'Team Leader',
    description: 'Team management and member oversight',
    icon: 'Users',
    color: 'var(--accent-gold)'
  },
  trainer: {
    defaultRoute: '/trainer',
    name: 'Trainer',
    description: 'Course delivery and content creation',
    icon: 'GraduationCap',
    color: 'var(--primary-purple)'
  },
  employee: {
    defaultRoute: '/employee',
    name: 'Employee',
    description: 'Personal development and skill building',
    icon: 'User',
    color: 'var(--text-secondary)'
  }
};

// Helper functions
export const getUserByCredentials = (username, password) => {
  return mockUsers.find(user => 
    user.username === username && 
    user.password === password && 
    user.isActive
  );
};

export const getUserById = (userId) => {
  return mockUsers.find(user => user.id === userId);
};

export const getUsersByRole = (role) => {
  return mockUsers.filter(user => user.role === role);
};

export const getUsersByCompany = (companyId) => {
  return mockUsers.filter(user => user.companyId === companyId);
};

export const getRoleNavigation = (role) => {
  return roleNavigation[role] || roleNavigation.employee;
};

// Mock authentication functions
export const mockLogin = async (username, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = getUserByCredentials(username, password);
  
  if (user) {
    // Update last login
    user.lastLogin = new Date().toISOString();
    
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        companyId: user.companyId,
        department: user.department,
        position: user.position,
        team: user.team,
        permissions: user.permissions,
        lastLogin: user.lastLogin
      },
      token: `mock_token_${user.id}_${Date.now()}`
    };
  }
  
  return {
    success: false,
    error: 'Invalid username or password'
  };
};

export const mockLogout = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    message: 'Logged out successfully'
  };
};

// Demo credentials for easy testing
export const demoCredentials = {
  admin: { username: 'admin', password: 'admin123' },
  hr: { username: 'hr.sarah', password: 'hr123' },
  manager: { username: 'manager.alex', password: 'manager123' },
  leader: { username: 'leader.emma', password: 'leader123' },
  trainer: { username: 'trainer.sarah', password: 'trainer123' },
  employee: { username: 'employee.john', password: 'employee123' }
};
