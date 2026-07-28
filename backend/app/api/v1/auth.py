# from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from sqlalchemy.orm import Session

# from app.database import get_db
# from app.models.user import User, UserRole
# from app.schemas.user import (
#     UserCreate, EmailVerification, TokenResponse, UserOut,
#     MessageResponse, ResendVerificationRequest
# )
# from app.utils.auth_utils import (
#     verify_password, get_password_hash, create_access_token,
#     decode_token, generate_verification_token
# )
# from app.utils.email_utils import send_verification_email

# router = APIRouter()
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

# # ============ REGISTER ============
# @router.post("/register", response_model=MessageResponse)
# async def register(
#     user_data: UserCreate,
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db)
# ):
#     # Check if email exists
#     existing = db.query(User).filter(User.email == user_data.email).first()
#     if existing:
#         raise HTTPException(status_code=400, detail="Email already registered")
    
#     # Hash password
#     hashed = get_password_hash(user_data.password)
#     verification_token = generate_verification_token()
    
#     # Create user
#     new_user = User(
#         email=user_data.email,
#         full_name=user_data.full_name,
#         hashed_password=hashed,
#         role=UserRole.USER,
#         is_email_verified=False,
#         verification_token=verification_token
#     )
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
    
#     # Send verification email
#     background_tasks.add_task(
#         send_verification_email,
#         new_user.email,
#         verification_token,
#         new_user.full_name
#     )
    
#     return MessageResponse(
#         message="User registered. Please check your email for verification link."
#     )

# # ============ VERIFY EMAIL ============
# @router.post("/verify-email", response_model=MessageResponse)
# async def verify_email(
#     verify_data: EmailVerification,
#     db: Session = Depends(get_db)
# ):
#     user = db.query(User).filter(User.verification_token == verify_data.token).first()
#     if not user:
#         raise HTTPException(status_code=400, detail="Invalid or expired token")
#     if user.is_email_verified:
#         return MessageResponse(message="Email already verified")
    
#     user.is_email_verified = True
#     user.verification_token = None
#     db.commit()
    
#     return MessageResponse(message="Email verified successfully")

# # ============ RESEND VERIFICATION ============
# @router.post("/resend-verification", response_model=MessageResponse)
# async def resend_verification(
#     request: ResendVerificationRequest,
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db)
# ):
#     user = db.query(User).filter(User.email == request.email).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     if user.is_email_verified:
#         return MessageResponse(message="Email already verified")
    
#     token = generate_verification_token()
#     user.verification_token = token
#     db.commit()
    
#     background_tasks.add_task(
#         send_verification_email,
#         user.email,
#         token,
#         user.full_name
#     )
    
#     return MessageResponse(message="Verification email sent")

# # ============ LOGIN ============
# @router.post("/login", response_model=TokenResponse)
# async def login(
#     form_data: OAuth2PasswordRequestForm = Depends(),
#     db: Session = Depends(get_db)
# ):
#     user = db.query(User).filter(User.email == form_data.username).first()
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     if not verify_password(form_data.password, user.hashed_password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     if not user.is_email_verified:
#         raise HTTPException(status_code=403, detail="Please verify your email first")
#     if not user.is_active:
#         raise HTTPException(status_code=403, detail="Account is suspended")
    
#     access_token = create_access_token({
#         "sub": user.email,
#         "id": user.id,
#         "role": user.role.value
#     })
    
#     return TokenResponse(
#         access_token=access_token,
#         user=UserOut.model_validate(user)
#     )

# # ============ GET CURRENT USER ============
# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     try:
#         payload = decode_token(token)
#         user_id = payload.get("id")
#         if user_id is None:
#             raise HTTPException(status_code=401, detail="Invalid token")
#     except Exception:
#         raise HTTPException(status_code=401, detail="Invalid token")
    
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=401, detail="User not found")
#     return user

# def get_current_active_user(current_user: User = Depends(get_current_user)):
#     if not current_user.is_active:
#         raise HTTPException(status_code=403, detail="Inactive user")
#     if not current_user.is_email_verified:
#         raise HTTPException(status_code=403, detail="Email not verified")
#     return current_user

# def get_current_admin_user(current_user: User = Depends(get_current_active_user)):
#     if current_user.role != UserRole.ADMIN:
#         raise HTTPException(status_code=403, detail="Admin privileges required")
#     return current_user

# @router.get("/me", response_model=UserOut)
# async def get_me(current_user: User = Depends(get_current_active_user)):
#     return current_user


from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User, UserRole
from app.schemas.user import UserCreate, TokenResponse, UserOut, MessageResponse
from app.utils.auth_utils import verify_password, get_password_hash, create_access_token, decode_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

# ======================================================
# REGISTER (Auto-verified, no email sent)
# ======================================================
@router.post("/register", response_model=MessageResponse)
async def register(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    # Check if email exists
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    hashed = get_password_hash(user_data.password)
    
    # Create user with is_email_verified = True
    new_user = User(
        email=user_data.email,
        full_name=user_data.full_name,
        hashed_password=hashed,
        role=UserRole.USER,
        is_email_verified=True,        # ✅ Auto verified
        verification_token=None         # No token needed
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return MessageResponse(
        message="User registered successfully! You can now login."
    )

# ======================================================
# LOGIN (No email verification check)
# ======================================================
@router.post("/login", response_model=TokenResponse)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is suspended")
    
    # ✅ No email verification check here!
    
    access_token = create_access_token({
        "sub": user.email,
        "id": user.id,
        "role": user.role.value
    })
    
    return TokenResponse(
        access_token=access_token,
        user=UserOut.model_validate(user)
    )

# ======================================================
# GET CURRENT USER (Dependencies)
# ======================================================
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = decode_token(token)
        user_id = payload.get("id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=403, detail="Inactive user")
    # ✅ No email verification check here
    return current_user

def get_current_admin_user(current_user: User = Depends(get_current_active_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return current_user

@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_active_user)):
    return current_user