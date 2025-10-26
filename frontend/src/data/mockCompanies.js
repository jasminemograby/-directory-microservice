/**
 * Mock data for companies in the Directory Dashboard
 * This simulates the API response for companies
 */

export const mockCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    domain: "techcorp.com",
    industry: "Technology",
    status: "verified",
    verifiedAt: "2024-01-15",
    employeeCount: 150,
    location: "San Francisco, CA",
    description: "Leading provider of enterprise software solutions",
    logo: null,
    hrContact: {
      name: "Sarah Johnson",
      email: "hr@techcorp.com",
      role: "HR Director"
    },
    departments: ["Engineering", "Sales", "Marketing", "HR"],
    lastActivity: "2024-01-20"
  },
  {
    id: 2,
    name: "GreenEnergy Corp",
    domain: "greenenergy.com",
    industry: "Energy",
    status: "verified",
    verifiedAt: "2024-01-10",
    employeeCount: 75,
    location: "Austin, TX",
    description: "Sustainable energy solutions for the future",
    logo: null,
    hrContact: {
      name: "Michael Chen",
      email: "hr@greenenergy.com",
      role: "People Operations Manager"
    },
    departments: ["Operations", "Engineering", "Finance", "HR"],
    lastActivity: "2024-01-18"
  },
  {
    id: 3,
    name: "HealthFirst Medical",
    domain: "healthfirst.com",
    industry: "Healthcare",
    status: "pending",
    verifiedAt: null,
    employeeCount: 200,
    location: "Boston, MA",
    description: "Comprehensive healthcare services and medical technology",
    logo: null,
    hrContact: {
      name: "Dr. Emily Rodriguez",
      email: "hr@healthfirst.com",
      role: "Chief Medical Officer"
    },
    departments: ["Medical", "Administration", "IT", "HR"],
    lastActivity: "2024-01-22"
  },
  {
    id: 4,
    name: "FinanceFlow Inc",
    domain: "financeflow.com",
    industry: "Finance",
    status: "verified",
    verifiedAt: "2024-01-05",
    employeeCount: 90,
    location: "New York, NY",
    description: "Innovative financial technology and investment solutions",
    logo: null,
    hrContact: {
      name: "David Kim",
      email: "hr@financeflow.com",
      role: "VP of Human Resources"
    },
    departments: ["Finance", "Technology", "Compliance", "HR"],
    lastActivity: "2024-01-19"
  },
  {
    id: 5,
    name: "EduTech Learning",
    domain: "edutech.com",
    industry: "Education",
    status: "pending",
    verifiedAt: null,
    employeeCount: 120,
    location: "Seattle, WA",
    description: "Revolutionary educational technology and online learning platforms",
    logo: null,
    hrContact: {
      name: "Lisa Thompson",
      email: "hr@edutech.com",
      role: "Learning & Development Manager"
    },
    departments: ["Education", "Technology", "Content", "HR"],
    lastActivity: "2024-01-21"
  },
  {
    id: 6,
    name: "RetailMax Stores",
    domain: "retailmax.com",
    industry: "Retail",
    status: "verified",
    verifiedAt: "2024-01-12",
    employeeCount: 300,
    location: "Chicago, IL",
    description: "Leading retail chain with innovative customer experience",
    logo: null,
    hrContact: {
      name: "Robert Martinez",
      email: "hr@retailmax.com",
      role: "HR Business Partner"
    },
    departments: ["Retail", "Supply Chain", "Marketing", "HR"],
    lastActivity: "2024-01-17"
  },
  {
    id: 7,
    name: "ManufacturingPro",
    domain: "manufacturingpro.com",
    industry: "Manufacturing",
    status: "pending",
    verifiedAt: null,
    employeeCount: 180,
    location: "Detroit, MI",
    description: "Advanced manufacturing solutions and industrial automation",
    logo: null,
    hrContact: {
      name: "Jennifer Lee",
      email: "hr@manufacturingpro.com",
      role: "HR Operations Director"
    },
    departments: ["Production", "Engineering", "Quality", "HR"],
    lastActivity: "2024-01-16"
  },
  {
    id: 8,
    name: "ConsultingExperts",
    domain: "consultingexperts.com",
    industry: "Consulting",
    status: "verified",
    verifiedAt: "2024-01-08",
    employeeCount: 85,
    location: "Washington, DC",
    description: "Strategic consulting services for enterprise clients",
    logo: null,
    hrContact: {
      name: "Amanda Foster",
      email: "hr@consultingexperts.com",
      role: "Talent Acquisition Manager"
    },
    departments: ["Consulting", "Research", "Business Development", "HR"],
    lastActivity: "2024-01-20"
  }
];

export const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Energy",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Real Estate",
  "Transportation",
  "Media",
  "Government"
];

export const companyStats = {
  total: mockCompanies.length,
  verified: mockCompanies.filter(c => c.status === 'verified').length,
  pending: mockCompanies.filter(c => c.status === 'pending').length,
  totalEmployees: mockCompanies.reduce((sum, c) => sum + c.employeeCount, 0)
};
