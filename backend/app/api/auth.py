from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core import security
from app.core.config import settings
from app.models.user import User, engine
from app.schemas.schemas import UserCreate, UserLogin, Token, User as UserSchema
from sqlalchemy.orm import sessionmaker

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.post("/register", response_model=UserSchema)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="User already exists.",
        )
    hashed_password = security.get_password_hash(user_in.password)
    new_user = User(
        email=user_in.email,
        hashed_password=hashed_password,
        full_name=user_in.full_name
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not security.verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    access_token = security.create_access_token(user.id)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/demo-login", response_model=Token)
def demo_login(db: Session = Depends(get_db)):
    # Check if demo user exists, create if not
    demo_email = "demo@cyberaware.ai"
    user = db.query(User).filter(User.email == demo_email).first()
    if not user:
        new_user = User(
            email=demo_email,
            hashed_password=security.get_password_hash("demo123"),
            full_name="Demo User",
            awareness_score=75.0
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        user = new_user
    
    access_token = security.create_access_token(user.id)
    return {"access_token": access_token, "token_type": "bearer"}
