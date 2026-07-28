from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, BigInteger
from sqlalchemy.sql import func
from app.database import Base
import enum

class UserRole(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    role = Column(Enum(UserRole), default=UserRole.USER)
    is_active = Column(Boolean, default=True)
    is_email_verified = Column(Boolean, default=False)
    verification_token = Column(String, nullable=True)
    
    # Usage
    plan = Column(String, default="free")
    characters_used = Column(BigInteger, default=0)
    characters_limit = Column(BigInteger, default=10000)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())