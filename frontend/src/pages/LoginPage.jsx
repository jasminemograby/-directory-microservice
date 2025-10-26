import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'
import { Eye, EyeOff, Building2, Mail, Lock, ArrowRight, Shield, Users, GraduationCap } from 'lucide-react'
import { demoCredentials } from '../data/mockUsers'

const LoginPage = () => {
  const { login, isLoading } = useAuthStore()
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(formData.username, formData.password)
    
    if (result.success) {
      // Navigate based on role
      navigate(result.redirectTo, { replace: true })
    }
  }

  const handleDemoLogin = async (role) => {
    const credentials = demoCredentials[role]
    if (credentials) {
      const result = await login(credentials.username, credentials.password)
      if (result.success) {
        navigate(result.redirectTo, { replace: true })
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div 
            className="mx-auto h-16 w-16 flex items-center justify-center rounded-full"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            Welcome Back
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Sign in to access your company directory and training management
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      background: 'var(--bg-secondary)',
                      borderColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      focusRingColor: 'var(--primary-cyan)'
                    }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      background: 'var(--bg-secondary)',
                      borderColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      focusRingColor: 'var(--primary-cyan)'
                    }}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 hover:opacity-70" />
                    ) : (
                      <Eye className="h-5 w-5 hover:opacity-70" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Don't have an account?{' '}
                <a
                  href="/register-company"
                  className="font-medium hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--primary-cyan)' }}
                >
                  Register your company
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Demo Credentials */}
        <div 
          className="card mt-6"
          style={{ 
            background: 'var(--gradient-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: 'var(--spacing-lg)',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Demo Credentials
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Try different roles to see the platform features
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('admin')}
              className="demo-btn"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            >
              <Shield className="h-4 w-4" style={{ color: 'var(--error-red)' }} />
              <span>Admin</span>
            </button>
            
            <button
              onClick={() => handleDemoLogin('hr')}
              className="demo-btn"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            >
              <Users className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
              <span>HR Manager</span>
            </button>
            
            <button
              onClick={() => handleDemoLogin('manager')}
              className="demo-btn"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            >
              <Building2 className="h-4 w-4" style={{ color: 'var(--accent-green)' }} />
              <span>Manager</span>
            </button>
            
            <button
              onClick={() => handleDemoLogin('trainer')}
              className="demo-btn"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            >
              <GraduationCap className="h-4 w-4" style={{ color: 'var(--primary-purple)' }} />
              <span>Trainer</span>
            </button>
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              All demo accounts use password: role123 (e.g., admin123, hr123)
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
