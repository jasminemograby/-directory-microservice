import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  FileText, 
  Settings,
  LogOut,
  Menu,
  X,
  Building2
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '../utils/cn'

const Layout = () => {
  const { user, logout } = useAuthStore()
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/hr/dashboard', icon: Users },
    { name: 'Training Requests', href: '/training-requests', icon: GraduationCap },
    { name: 'Instructors', href: '/instructors', icon: UserCheck },
    { name: 'Admin Logs', href: '/admin/logs', icon: FileText },
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (href) => location.pathname === href

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50" 
          onClick={() => setSidebarOpen(false)} 
        />
        <div 
          className="relative flex w-full max-w-xs flex-1 flex-col"
          style={{ background: 'var(--bg-card)' }}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6" style={{ color: 'var(--primary-cyan)' }} />
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Directory
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{ color: 'var(--text-muted)' }}
              className="hover:opacity-70"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4">
            <NavigationItems items={navigation} isActive={isActive} />
          </nav>
          <div className="p-4 border-t" style={{ borderColor: 'var(--bg-tertiary)' }}>
            <UserProfile user={user} onLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div 
          className="flex flex-col flex-grow border-r"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--bg-tertiary)' 
          }}
        >
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6" style={{ color: 'var(--primary-cyan)' }} />
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Directory Microservice
              </h1>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4">
            <NavigationItems items={navigation} isActive={isActive} />
          </nav>
          <div className="p-4 border-t" style={{ borderColor: 'var(--bg-tertiary)' }}>
            <UserProfile user={user} onLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div 
          className="sticky top-0 z-40 flex h-16 border-b lg:hidden"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--bg-tertiary)' 
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ color: 'var(--text-muted)' }}
            className="px-4 hover:opacity-70"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Directory
            </h1>
          </div>
          <div className="flex items-center px-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const NavigationItems = ({ items, isActive }) => (
  <ul className="space-y-1">
    {items.map((item) => {
      const Icon = item.icon
      return (
        <li key={item.name}>
          <a
            href={item.href}
            className={cn(
              "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
              isActive(item.href)
                ? "text-white"
                : "hover:opacity-80"
            )}
            style={{
              background: isActive(item.href) 
                ? 'var(--gradient-primary)' 
                : 'transparent',
              color: isActive(item.href) 
                ? 'white' 
                : 'var(--text-secondary)'
            }}
          >
            <Icon className={cn(
              "mr-3 h-5 w-5 flex-shrink-0",
              isActive(item.href) ? "text-white" : "text-current"
            )} />
            {item.name}
          </a>
        </li>
      )
    })}
  </ul>
)

const UserProfile = ({ user, onLogout }) => (
  <div className="space-y-3">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <div 
          className="h-8 w-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <span className="text-sm font-medium text-white">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {user?.name}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {user?.role}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <button
        onClick={onLogout}
        className="flex-1 flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 hover:opacity-80"
        style={{ 
          color: 'var(--text-secondary)',
          background: 'var(--bg-tertiary)'
        }}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </div>
  </div>
)

export default Layout
