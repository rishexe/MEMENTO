from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text, JSONB
from sqlalchemy.sql import func
from app.db.base import Base

class Region(Base):
    __tablename__ = "regions"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class District(Base):
    __tablename__ = "districts"
    
    id = Column(Integer, primary_key=True)
    region_id = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    map_data = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True)
    district_id = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    category = Column(String(100))
    image_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())

class VisitLog(Base):
    __tablename__ = "visit_logs"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    location_id = Column(Integer, nullable=False)
    verification_method = Column(String(50))
    proof_data = Column(JSONB)
    status = Column(String(50), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Quest(Base):
    __tablename__ = "quests"
    
    id = Column(Integer, primary_key=True)
    region_id = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    reward_xp = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    icon_url = Column(String(500))
    criteria = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
