import { API_ENDPOINTS } from '../config/api'

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error)
    throw error
  }
}

export async function getHealth() {
  return apiCall(API_ENDPOINTS.HEALTH)
}

export async function getRegions() {
  return apiCall(API_ENDPOINTS.REGIONS)
}

export async function getDistricts() {
  return apiCall(API_ENDPOINTS.DISTRICTS)
}

export async function getLocations() {
  return apiCall(API_ENDPOINTS.LOCATIONS)
}

export async function getUserProfile() {
  return apiCall(API_ENDPOINTS.USER_PROFILE)
}
