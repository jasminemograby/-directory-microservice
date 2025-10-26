import { useState, useEffect } from 'react'
import { apiService } from '../services/api'
import { Star, Users, Award, Plus } from 'lucide-react'

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInstructors()
  }, [])

  const fetchInstructors = async () => {
    try {
      setLoading(true)
      const response = await apiService.instructors.getAll()
      setInstructors(response.data.data)
    } catch (error) {
      console.error('Error fetching instructors:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instructors</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage training instructors and their specialties
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Instructor
        </button>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">
                  {instructor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{instructor.name}</h3>
                <p className="text-sm text-gray-500">{instructor.email}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-gray-900">{instructor.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({instructor.totalTrainings} trainings)</span>
              </div>
              
              <div className="mb-3">
                <span className="text-sm text-gray-500">Specialties:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {instructor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              {instructor.bio && (
                <p className="text-sm text-gray-600 mb-3">{instructor.bio}</p>
              )}
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  instructor.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {instructor.status}
                </span>
                <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InstructorsPage
