import { create } from 'zustand'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://directory-microservice-backend-production.up.railway.app/api'

const useCompanyStore = create((set, get) => ({
  // State
  companies: [],
  currentCompany: null,
  isLoading: false,
  error: null,

  // Actions
  fetchCompanies: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_BASE_URL}/companies`)
      const data = await response.json()

      if (data.success) {
        set({ companies: data.data, isLoading: false })
        return { success: true, data: data.data }
      } else {
        set({ error: data.message, isLoading: false })
        toast.error(data.message || 'Failed to fetch companies')
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Fetch companies error:', error)
      set({ error: error.message, isLoading: false })
      toast.error('Failed to fetch companies')
      return { success: false, error: error.message }
    }
  },

  fetchCompany: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`)
      const data = await response.json()

      if (data.success) {
        set({ currentCompany: data.data, isLoading: false })
        return { success: true, data: data.data }
      } else {
        set({ error: data.message, isLoading: false })
        toast.error(data.message || 'Failed to fetch company')
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Fetch company error:', error)
      set({ error: error.message, isLoading: false })
      toast.error('Failed to fetch company')
      return { success: false, error: error.message }
    }
  },

  createCompany: async (companyData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_BASE_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      })

      const data = await response.json()

      if (data.success) {
        set((state) => ({
          companies: [...state.companies, data.data],
          isLoading: false
        }))
        toast.success('Company created successfully!')
        return { success: true, data: data.data }
      } else {
        set({ error: data.message, isLoading: false })
        toast.error(data.message || 'Failed to create company')
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Create company error:', error)
      set({ error: error.message, isLoading: false })
      toast.error('Failed to create company')
      return { success: false, error: error.message }
    }
  },

  updateCompany: async (id, updates) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (data.success) {
        set((state) => ({
          companies: state.companies.map(company =>
            company.id === id ? { ...company, ...updates } : company
          ),
          currentCompany: state.currentCompany?.id === id 
            ? { ...state.currentCompany, ...updates } 
            : state.currentCompany,
          isLoading: false
        }))
        toast.success('Company updated successfully!')
        return { success: true, data: data.data }
      } else {
        set({ error: data.message, isLoading: false })
        toast.error(data.message || 'Failed to update company')
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Update company error:', error)
      set({ error: error.message, isLoading: false })
      toast.error('Failed to update company')
      return { success: false, error: error.message }
    }
  },

  verifyCompany: async (id, method = 'manual_review') => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ method }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Company verification initiated!')
        return { success: true, data: data.data }
      } else {
        set({ error: data.message, isLoading: false })
        toast.error(data.message || 'Failed to verify company')
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Verify company error:', error)
      set({ error: error.message, isLoading: false })
      toast.error('Failed to verify company')
      return { success: false, error: error.message }
    }
  },

  deleteCompany: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        set((state) => ({
          companies: state.companies.filter(company => company.id !== id),
          currentCompany: state.currentCompany?.id === id ? null : state.currentCompany,
          isLoading: false
        }))
        toast.success('Company deleted successfully!')
        return { success: true }
      } else {
        set({ error: data.message, isLoading: false })
        toast.error(data.message || 'Failed to delete company')
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Delete company error:', error)
      set({ error: error.message, isLoading: false })
      toast.error('Failed to delete company')
      return { success: false, error: error.message }
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentCompany: () => set({ currentCompany: null }),
}))

export { useCompanyStore }
