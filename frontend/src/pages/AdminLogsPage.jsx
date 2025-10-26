import { useState, useEffect } from 'react'
import { FileText, User, Calendar, Activity } from 'lucide-react'

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      // Mock data for now - would be replaced with real API call
      const mockLogs = [
        {
          id: 'log_001',
          userId: 'hr_001',
          action: 'employee_profile_updated',
          resourceType: 'employee',
          resourceId: 'emp_001',
          details: {
            changes: {
              skills: {
                old: ['JavaScript', 'React', 'Node.js'],
                new: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS']
              }
            }
          },
          timestamp: '2024-01-25T16:45:00Z',
          ipAddress: '192.168.1.100'
        },
        {
          id: 'log_002',
          userId: 'hr_001',
          action: 'training_request_approved',
          resourceType: 'training_request',
          resourceId: 'tr_001',
          details: {
            trainingTitle: 'Advanced React Patterns',
            employeeId: 'emp_001'
          },
          timestamp: '2024-01-24T14:30:00Z',
          ipAddress: '192.168.1.100'
        },
        {
          id: 'log_003',
          userId: 'hr_001',
          action: 'company_verified',
          resourceType: 'company',
          resourceId: 'comp_001',
          details: {
            verificationMethod: 'domain_verification'
          },
          timestamp: '2024-01-23T10:15:00Z',
          ipAddress: '192.168.1.100'
        }
      ]
      setLogs(mockLogs)
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'employee_profile_updated':
        return <User className="h-4 w-4 text-blue-500" />
      case 'training_request_approved':
        return <Calendar className="h-4 w-4 text-green-500" />
      case 'company_verified':
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case 'employee_profile_updated':
        return 'bg-blue-100 text-blue-800'
      case 'training_request_approved':
        return 'bg-green-100 text-green-800'
      case 'company_verified':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Logs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Audit trail of all administrative actions
        </p>
      </div>

      {/* Logs Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Activity Log</h2>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getActionIcon(log.action)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.resourceType}</div>
                    <div className="text-sm text-gray-500">ID: {log.resourceId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminLogsPage
