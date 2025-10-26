import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  FileText, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '../utils/cn'

const Layout = () => {
  const { user, logout } = useAuthStore()
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900">Directory</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4">
            <NavigationItems items={navigation} isActive={isActive} />
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">Directory Microservice</h1>
          </div>
          <nav className="flex-1 px-4 py-4">
            <NavigationItems items={navigation} isActive={isActive} />
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-3 w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-4 text-gray-500 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="text-lg font-semibold text-gray-900">Directory</h1>
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
              "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
              isActive(item.href)
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <Icon className={cn(
              "mr-3 h-5 w-5 flex-shrink-0",
              isActive(item.href) ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
            )} />
            {item.name}
          </a>
        </li>
      )
    })}
  </ul>
)

export default Layout
