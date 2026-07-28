from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, UserRole
from app.schemas.user import UserOut
from app.api.v1.auth import get_current_admin_user

router = APIRouter()

@router.get("/users")
async def list_users(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    search: str = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    query = db.query(User)
    if search:
        query = query.filter(
            (User.email.contains(search)) | 
            (User.full_name.contains(search))
        )
    
    offset = (page - 1) * limit
    total = query.count()
    users = query.offset(offset).limit(limit).all()
    
    return {
        "data": [UserOut.model_validate(u) for u in users],
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit
        }
    }

@router.put("/users/{user_id}/role")
async def change_user_role(
    user_id: int,
    role: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot change your own role")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        user.role = UserRole(role)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid role. Use 'user' or 'admin'")
    
    db.commit()
    return {
        "message": f"User role updated to {role}",
        "user": UserOut.model_validate(user)
    }

@router.put("/users/{user_id}/suspend")
async def toggle_suspend_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot suspend yourself")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = not user.is_active
    db.commit()
    
    status = "activated" if user.is_active else "suspended"
    return {
        "message": f"User {status} successfully",
        "user": UserOut.model_validate(user)
    }

@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete yourself")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

@router.get("/stats")
async def get_platform_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    total_users = db.query(User).count()
    active_users = db.query(User).filter(User.is_active == True).count()
    verified_users = db.query(User).filter(User.is_email_verified == True).count()
    admin_users = db.query(User).filter(User.role == UserRole.ADMIN).count()
    total_chars = db.query(db.func.sum(User.characters_used)).scalar() or 0
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "verified_users": verified_users,
        "admin_users": admin_users,
        "total_characters_used": total_chars
    }