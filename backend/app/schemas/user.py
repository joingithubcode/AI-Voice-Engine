from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# Request Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: str = Field(min_length=2)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class EmailVerification(BaseModel):
    token: str

class ResendVerificationRequest(BaseModel):
    email: EmailStr

# Response Schemas
class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    is_active: bool
    is_email_verified: bool
    plan: str
    characters_used: int
    characters_limit: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class MessageResponse(BaseModel):
    message: str
    success: bool = True