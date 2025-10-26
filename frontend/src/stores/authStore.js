import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })

          const data = await response.json()

          if (data.success) {
            set({
              user: data.data.user,
              token: data.data.token,
              isAuthenticated: true,
              isLoading: false,
            })
            toast.success('Login successful!')
            return { success: true }
          } else {
            toast.error(data.message || 'Login failed')
            return { success: false, error: data.message }
          }
        } catch (error) {
          console.error('Login error:', error)
          toast.error('Login failed. Please try again.')
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },

      register: async (userData) => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          })

          const data = await response.json()

          if (data.success) {
            set({
              user: data.data.user,
              token: data.data.token,
              isAuthenticated: true,
              isLoading: false,
            })
            toast.success('Registration successful!')
            return { success: true }
          } else {
            toast.error(data.message || 'Registration failed')
            return { success: false, error: data.message }
          }
        } catch (error) {
          console.error('Registration error:', error)
          toast.error('Registration failed. Please try again.')
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },

      logout: async () => {
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${get().token}`,
            },
          })
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
          toast.success('Logged out successfully')
        }
      },

      refreshUser: async () => {
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${get().token}`,
            },
          })

          const data = await response.json()

          if (data.success) {
            set({ user: data.data })
            return { success: true }
          } else {
            // Token might be expired, logout user
            get().logout()
            return { success: false }
          }
        } catch (error) {
          console.error('Refresh user error:', error)
          get().logout()
          return { success: false }
        }
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }))
      },

      hasPermission: (permission) => {
        const { user } = get()
        return user?.permissions?.includes(permission) || false
      },

      hasRole: (role) => {
        const { user } = get()
        return user?.role === role
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export { useAuthStore }
