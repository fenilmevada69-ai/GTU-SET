from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.auth import get_db
from app.models.user import User, Scan
from app.schemas.schemas import ScanCreate, ScanResult
from app.services.openai_service import openai_service
from jose import jwt
from app.core.config import settings
from fastapi.security import OAuth2PasswordBearer
import json

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

router = APIRouter()

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/analyze", response_model=ScanResult)
def analyze(scan_in: ScanCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # 1. Call OpenAI service
    analysis = openai_service.analyze_content(scan_in.content)
    
    # 2. Save to DB
    new_scan = Scan(
        user_id=current_user.id,
        content=scan_in.content,
        type=scan_in.type,
        category=analysis["category"],
        severity=analysis["severity"],
        confidence=analysis["confidence"],
        explanation=analysis["explanation"],
        recommendations=json.dumps(analysis["recommendations"])
    )
    db.add(new_scan)
    
    # 3. Update User Score (Simple logic: interaction increases awareness slightly)
    current_user.awareness_score = min(100, current_user.awareness_score + 2.0)
    
    db.commit()
    db.refresh(new_scan)
    
    # Prepare response
    return {
        "id": new_scan.id,
        "category": new_scan.category,
        "severity": new_scan.severity,
        "confidence": new_scan.confidence,
        "explanation": new_scan.explanation,
        "indicators": analysis.get("indicators", []),
        "recommendations": analysis.get("recommendations", []),
        "created_at": new_scan.created_at
    }

@router.get("/history", response_model=List[ScanResult])
def get_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    scans = db.query(Scan).filter(Scan.user_id == current_user.id).order_by(Scan.created_at.desc()).all()
    
    results = []
    for s in scans:
        results.append({
            "id": s.id,
            "category": s.category,
            "severity": s.severity,
            "confidence": s.confidence,
            "explanation": s.explanation,
            "indicators": [], # Not stored explicitly for history in this simple schema
            "recommendations": json.loads(s.recommendations) if s.recommendations else [],
            "created_at": s.created_at
        })
    return results

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total_scans = db.query(Scan).filter(Scan.user_id == current_user.id).count()
    threats_detected = db.query(Scan).filter(Scan.user_id == current_user.id, Scan.category != "Safe").count()
    
    return {
        "awareness_score": current_user.awareness_score,
        "total_scans": total_scans,
        "threats_detected": threats_detected,
        "safe_scans": total_scans - threats_detected
    }
