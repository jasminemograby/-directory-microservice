import { useState, useEffect } from 'react'
import { useCompanyStore } from '../stores/companyStore'
import { Building2, Users, CheckCircle, AlertCircle, Mail, Phone, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const RegisterCompanyPage = () => {
  const { createCompany, isLoading } = useCompanyStore()
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
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
              Company Verified Successfully!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Your company has been registered and verified. You can now start managing your team.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to {createdCompany?.name || formData.name}!
              </h2>
              <p className="text-gray-600 mb-6">
                Your company is now part of our directory. Let's set up your team and training programs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 border border-gray-200 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Employees</h3>
                  <p className="text-gray-600 text-sm">
                    Import your team members and their profiles
                  </p>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-lg">
                  <Building2 className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Setup Training</h3>
                  <p className="text-gray-600 text-sm">
                    Create training programs and track progress
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/login'}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Dashboard
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
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            Register Your Company
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Join our directory and start managing your team's training and development
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                      Company Domain *
                    </label>
                    <input
                      type="text"
                      name="domain"
                      id="domain"
                      required
                      value={formData.domain}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      id="industry"
                      required
                      value={formData.industry}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                      Company Size *
                    </label>
                    <select
                      name="size"
                      id="size"
                      required
                      value={formData.size}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">HR Contact Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="hrContact.name" className="block text-sm font-medium text-gray-700">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="hrContact.name"
                      id="hrContact.name"
                      required
                      value={formData.hrContact.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter contact name"
                    />
                  </div>

                  <div>
                    <label htmlFor="hrContact.email" className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="hrContact.email"
                      id="hrContact.email"
                      required
                      value={formData.hrContact.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="contact@company.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="hrContact.phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="hrContact.phone"
                      id="hrContact.phone"
                      value={formData.hrContact.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Register Company
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
