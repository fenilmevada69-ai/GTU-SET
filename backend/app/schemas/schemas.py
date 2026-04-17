from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Auth Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    awareness_score: float
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Scan Schemas
class ScanCreate(BaseModel):
    content: str
    type: Optional[str] = "text"

class ScanResult(BaseModel):
    id: int
    category: str
    severity: str
    confidence: float
    explanation: str
    indicators: List[str]
    recommendations: List[str]
    created_at: datetime

    class Config:
        from_attributes = True
