import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiService } from '../services/api'
import { User, Mail, Phone, MapPin, Calendar, Star, Award, Github, Linkedin } from 'lucide-react'
import toast from 'react-hot-toast'

const EmployeePage = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enriching, setEnriching] = useState(false)

  useEffect(() => {
    fetchEmployee()
  }, [id])

  const fetchEmployee = async () => {
    try {
      setLoading(true)
      const response = await apiService.employees.getById(id)
      setEmployee(response.data.data)
    } catch (error) {
      console.error('Error fetching employee:', error)
      toast.error('Failed to fetch employee details')
    } finally {
      setLoading(false)
    }
  }

  const handleEnrichProfile = async () => {
    try {
      setEnriching(true)
      const response = await apiService.employees.enrich(id, ['linkedin', 'github', 'credly'])
      toast.success('Profile enrichment initiated!')
    } catch (error) {
      console.error('Error enriching profile:', error)
      toast.error('Failed to enrich profile')
    } finally {
      setEnriching(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Employee not found</h3>
        <p className="text-gray-500">The employee you're looking for doesn't exist.</p>
      </div>
    )
  }

  const { personalInfo, profile, enrichment } = employee

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="text-lg text-gray-600">{personalInfo.position}</p>
                <p className="text-sm text-gray-500">{personalInfo.department}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleEnrichProfile}
                disabled={enriching}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {enriching ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Star className="h-4 w-4 mr-2" />
                )}
                Enrich Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
            </div>
            <div className="px-6 py-4">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{personalInfo.email}</dd>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900">{personalInfo.phone}</dd>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Hire Date</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(personalInfo.hireDate).toLocaleDateString()}
                    </dd>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="text-sm text-gray-900 capitalize">{employee.status}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              {profile.bio && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Bio</h3>
                  <p className="text-sm text-gray-900">{profile.bio}</p>
                </div>
              )}

              {profile.skills && profile.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile.certifications && profile.certifications.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Certifications</h3>
                  <div className="space-y-2">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-sm text-gray-900">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profile.education && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Education</h3>
                  <p className="text-sm text-gray-900">{profile.education}</p>
                </div>
              )}

              {profile.experience && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Experience</h3>
                  <p className="text-sm text-gray-900">{profile.experience}</p>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          {(profile.linkedinUrl || profile.githubUrl) && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Social Links</h2>
              </div>
              <div className="px-6 py-4">
                <div className="flex space-x-4">
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  )}
                  {profile.githubUrl && (
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrichment Status */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Profile Enrichment</h2>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Relevance Score</span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(enrichment.relevanceScore * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${enrichment.relevanceScore * 100}%` }}
                  ></div>
                </div>
                {enrichment.valueProposition && (
                  <div>
                    <span className="text-sm text-gray-500">Value Proposition</span>
                    <p className="text-sm text-gray-900 mt-1">{enrichment.valueProposition}</p>
                  </div>
                )}
                {enrichment.lastEnriched && (
                  <div>
                    <span className="text-sm text-gray-500">Last Enriched</span>
                    <p className="text-sm text-gray-900">
                      {new Date(enrichment.lastEnriched).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                Request Training
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                Update Skills
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                View Training History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeePage
