from app.database import SessionLocal
from app.models.user import User

db = SessionLocal()
user = db.query(User).filter(User.email == "noorulhudaabid883@gmail.com").first()

if user:
    user.is_email_verified = True
    user.verification_token = None
    db.commit()
    print(f"✅ {user.email} verified successfully!")
else:
    print("❌ User not found. Pehle register karo!")

db.close()