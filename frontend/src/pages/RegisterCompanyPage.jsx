import { useState, useEffect } from 'react'
import { useCompanyStore } from '../stores/companyStore'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'
import { Building2, Users, CheckCircle, AlertCircle, Mail, Phone, ArrowRight, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

const RegisterCompanyPage = () => {
  const { createCompany, isLoading } = useCompanyStore()
  const { isDarkMode } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    industry: '',
    size: '',
    hrContact: {
      name: '',
      email: '',
      phone: '',
    },
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [createdCompany, setCreatedCompany] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await createCompany(formData)
    if (result.success) {
      setIsSuccess(true)
      setCreatedCompany(result.data)
      toast.success('Company registration submitted successfully!')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('hrContact.')) {
      const field = name.split('.')[1]
      setFormData({
        ...formData,
        hrContact: {
          ...formData.hrContact,
          [field]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Other',
  ]

  const companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+',
  ]

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div 
              className="mx-auto h-16 w-16 flex items-center justify-center rounded-full"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Company Verified Successfully!
            </h1>
            <p className="mt-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
              Your company has been registered and verified. You can now start managing your team.
            </p>
          </div>

          <div 
            className="card"
            style={{ 
              background: 'var(--gradient-card)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: 'var(--spacing-xl)',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Welcome to {createdCompany?.name || formData.name}!
              </h2>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Your company is now part of our directory. Let's set up your team and training programs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div 
                  className="p-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105"
                  style={{ 
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--bg-tertiary)'
                  }}
                >
                  <Users className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--primary-cyan)' }} />
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Add Employees
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Import your team members and their profiles
                  </p>
                </div>
                
                <div 
                  className="p-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105"
                  style={{ 
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--bg-tertiary)'
                  }}
                >
                  <Building2 className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--accent-green)' }} />
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Setup Training
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Create training programs and track progress
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/company-dashboard'}
                  className="btn btn-primary inline-flex items-center px-6 py-3 text-base font-medium"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    boxShadow: 'var(--shadow-glow)'
                  }}
                >
                  Go to Company Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                
                <button
                  onClick={() => {
                    setIsSuccess(false)
                    setFormData({
                      name: '',
                      domain: '',
                      industry: '',
                      size: '',
                      hrContact: { name: '', email: '', phone: '' },
                    })
                  }}
                  className="btn btn-secondary inline-flex items-center px-6 py-3 text-base font-medium"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--bg-tertiary)'
                  }}
                >
                  Register Another Company
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div 
            className="mx-auto h-12 w-12 flex items-center justify-center rounded-full"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            Register Your Company
          </h1>
          <p className="mt-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Join our directory and start managing your team's training and development
          </p>
        </div>

        <div 
          className="card"
          style={{ 
            background: 'var(--gradient-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: 'var(--spacing-xl)',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
                  Company Information
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-secondary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="domain" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Company Domain *
                    </label>
                    <input
                      type="text"
                      name="domain"
                      id="domain"
                      required
                      value={formData.domain}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-secondary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                      placeholder="example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Industry *
                    </label>
                    <select
                      name="industry"
                      id="industry"
                      required
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-secondary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                    >
                      <option value="">Select industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Company Size *
                    </label>
                    <select
                      name="size"
                      id="size"
                      required
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        background: 'var(--bg-secondary)',
                        borderColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        focusRingColor: 'var(--primary-cyan)'
                      }}
                    >
                      <option value="">Select size</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size} employees
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* HR Contact Information */}
              <div className="border-t pt-6" style={{ borderColor: 'var(--bg-tertiary)' }}>
                <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
                  HR Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="hrContact.name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Contact Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserPlus className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <input
                        type="text"
                        name="hrContact.name"
                        id="hrContact.name"
                        required
                        value={formData.hrContact.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                        style={{
                          background: 'var(--bg-secondary)',
                          borderColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          focusRingColor: 'var(--primary-cyan)'
                        }}
                        placeholder="Enter contact name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hrContact.email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <input
                        type="email"
                        name="hrContact.email"
                        id="hrContact.email"
                        required
                        value={formData.hrContact.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                        style={{
                          background: 'var(--bg-secondary)',
                          borderColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          focusRingColor: 'var(--primary-cyan)'
                        }}
                        placeholder="contact@company.com"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="hrContact.phone" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <input
                        type="tel"
                        name="hrContact.phone"
                        id="hrContact.phone"
                        value={formData.hrContact.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                        style={{
                          background: 'var(--bg-secondary)',
                          borderColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          focusRingColor: 'var(--primary-cyan)'
                        }}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary px-8 py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    boxShadow: 'var(--shadow-glow)'
                  }}
                >
                  {isLoading ? (
                    <div className="loading-spinner w-5 h-5" />
                  ) : (
                    <>
                      Register Company
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                What happens next?
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>We'll verify your company domain and contact information</li>
                  <li>You'll receive an email confirmation within 24 hours</li>
                  <li>Once verified, you can start adding employees and managing training requests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterCompanyPage
