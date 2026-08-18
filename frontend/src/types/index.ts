// Types for the application

export interface HealthResponse {
  status: string
  service: string
}

export interface Region {
  id: number
  name: string
  slug: string
  description: string
  is_active: boolean
}

export interface District {
  id: number
  region_id: number
  name: string
  description: string
  map_data: Record<string, any>
}

export interface Location {
  id: number
  district_id: number
  name: string
  description: string
  latitude: number
  longitude: number
  category: string
  image_url?: string
}

export interface User {
  id: number
  username: string
  email: string
  created_at: string
  updated_at: string
}

export interface VisitLog {
  id: number
  user_id: number
  location_id: number
  verification_method: string
  proof_data: Record<string, any>
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}
