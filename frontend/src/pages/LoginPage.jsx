import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'
import { Eye, EyeOff, Building2, Mail, Lock, ArrowRight } from 'lucide-react'

const LoginPage = () => {
  const { login, isLoading } = useAuthStore()
  const { isDarkMode } = useTheme()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(formData.email, formData.password)
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
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
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

        {/* Demo credentials */}
        <div 
          className="p-4 rounded-lg"
          style={{ 
            background: 'var(--bg-secondary)',
            border: '1px solid var(--bg-tertiary)'
          }}
        >
          <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            🚀 Demo Credentials:
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <strong>Email:</strong> demo@techcorp.com<br />
            <strong>Password:</strong> demo123
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
