export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Sikkim Tourism'

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  ROOT: `${API_BASE_URL}/`,
  
  // Auth
  AUTH_REGISTER: `${API_BASE_URL}/api/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  AUTH_LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  
  // Regions & Districts
  REGIONS: `${API_BASE_URL}/api/regions`,
  DISTRICTS: `${API_BASE_URL}/api/districts`,
  
  // Locations
  LOCATIONS: `${API_BASE_URL}/api/locations`,
  
  // Visits
  VISITS: `${API_BASE_URL}/api/visits`,
  USER_VISITS: `${API_BASE_URL}/api/user/visits`,
  
  // User
  USER_PROFILE: `${API_BASE_URL}/api/user/profile`,
  USER_COLLECTIBLES: `${API_BASE_URL}/api/user/collectibles`,
  USER_ACHIEVEMENTS: `${API_BASE_URL}/api/user/achievements`,
  
  // Quests
  QUESTS: `${API_BASE_URL}/api/quests`,
  
  // Admin
  ADMIN_DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
  ADMIN_VISITS_PENDING: `${API_BASE_URL}/api/admin/visits/pending`,
}
