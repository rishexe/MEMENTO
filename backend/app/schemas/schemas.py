from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class HealthResponse(BaseModel):
    status: str
    service: str

class RegionBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    is_active: bool = True

class RegionResponse(RegionBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class DistrictBase(BaseModel):
    region_id: int
    name: str
    description: Optional[str] = None
    map_data: Optional[dict] = None

class DistrictResponse(DistrictBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class LocationBase(BaseModel):
    district_id: int
    name: str
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None

class LocationResponse(LocationBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class VisitLogBase(BaseModel):
    user_id: int
    location_id: int
    verification_method: str
    proof_data: Optional[dict] = None
    status: str = "pending"

class VisitLogResponse(VisitLogBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
