import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterCompanyPage from './pages/RegisterCompanyPage'
import CompanyDashboardPage from './pages/CompanyDashboardPage'
import EmployeePage from './pages/EmployeePage'
import HRDashboardPage from './pages/HRDashboardPage'
import TrainingRequestsPage from './pages/TrainingRequestsPage'
import InstructorsPage from './pages/InstructorsPage'
import AdminLogsPage from './pages/AdminLogsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/hr/dashboard" replace /> : <LoginPage />
        } />
        
        <Route path="/register-company" element={<RegisterCompanyPage />} />
        <Route path="/company-dashboard" element={<CompanyDashboardPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/hr/dashboard" replace />} />
          <Route path="employee/:id" element={<EmployeePage />} />
          <Route path="hr/dashboard" element={<HRDashboardPage />} />
          <Route path="training-requests" element={<TrainingRequestsPage />} />
          <Route path="instructors" element={<InstructorsPage />} />
          <Route path="admin/logs" element={<AdminLogsPage />} />
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
