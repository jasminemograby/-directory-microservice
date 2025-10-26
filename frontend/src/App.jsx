import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterCompanyPage from './pages/RegisterCompanyPage'
import CompanyRegistrationPage from './pages/CompanyRegistrationPage'
import CompanyVerificationPage from './pages/CompanyVerificationPage'
import CompanySetupPage from './pages/CompanySetupPage'
import CompanyDashboardPage from './pages/CompanyDashboardPage'
import DirectoryDashboardPage from './pages/DirectoryDashboardPage'
import EmployeePage from './pages/EmployeePage'
import HRDashboardPage from './pages/HRDashboardPage'
import TrainingRequestsPage from './pages/TrainingRequestsPage'
import InstructorsPage from './pages/InstructorsPage'
import AdminLogsPage from './pages/AdminLogsPage'
import ProtectedRoute from './components/ProtectedRoute'
import BackgroundAnimation from './components/BackgroundAnimation'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <BackgroundAnimation />
        <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/hr/dashboard" replace /> : <LoginPage />
        } />
        
        <Route path="/directory" element={<DirectoryDashboardPage />} />
        <Route path="/register-company" element={<CompanyRegistrationPage />} />
        <Route path="/company-verification" element={<CompanyVerificationPage />} />
        <Route path="/company-setup" element={<CompanySetupPage />} />
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
    </ThemeProvider>
  )
}

export default App
