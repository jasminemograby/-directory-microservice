import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'
import { mockLogin, mockLogout, getUserById, getRoleNavigation } from '../data/mockUsers'

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (username, password) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockLogin(username, password)
          
          if (response.success) {
            const roleNav = getRoleNavigation(response.user.role)
            
            // Determine redirect route based on role
            let redirectTo = roleNav.defaultRoute
            
            // For roles that go to employee pages, add the user's ID
            if (roleNav.defaultRoute === '/employee') {
              redirectTo = `/employee/${response.user.id}`
            } else if (roleNav.defaultRoute === '/trainer') {
              redirectTo = `/trainer/${response.user.id}`
            }
            
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
            
            toast.success(`Welcome back, ${response.user.firstName}!`)
            
            return {
              success: true,
              redirectTo: redirectTo,
              user: response.user
            }
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: response.error
            })
            
            toast.error(response.error)
            
            return {
              success: false,
              error: response.error
            }
          }
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Login failed. Please try again.'
          })
          
          toast.error('Login failed. Please try again.')
          
          return {
            success: false,
            error: 'Login failed. Please try again.'
          }
        }
      },

      logout: async () => {
        set({ isLoading: true })
        
        try {
          await mockLogout()
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          })
          
          toast.success('Logged out successfully')
          
          return { success: true }
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          })
          
          toast.success('Logged out successfully')
          
          return { success: true } // Always logout locally even if API fails
        }
      },

      refreshUser: () => {
        const { user } = get()
        if (user) {
          const updatedUser = getUserById(user.id)
          if (updatedUser) {
            set({ user: updatedUser })
          }
        }
      },

      clearError: () => set({ error: null }),

      // Helper methods
      hasPermission: (permission) => {
        const { user } = get()
        return user?.permissions?.includes(permission) || false
      },

      isRole: (role) => {
        const { user } = get()
        return user?.role === role
      },

      hasRole: (role) => {
        const { user } = get()
        return user?.role === role
      },

      getRoleInfo: () => {
        const { user } = get()
        if (user) {
          return getRoleNavigation(user.role)
        }
        return null
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }))
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export { useAuthStore }