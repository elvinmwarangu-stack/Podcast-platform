from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.dependencies import get_current_active_user, get_db
from app.models.user import User

router = APIRouter(tags=["users"])


@router.get("/me", response_model=schemas.UserOut)
def read_current_user(
    current_user: User = Depends(get_current_active_user),
):
    return current_user


@router.put("/me", response_model=schemas.UserOut)
def update_current_user(
    user_update: schemas.UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    return crud.update_user(db, current_user.id, user_update)


@router.post("/me/reset-password")
def reset_password(
    password_data: schemas.PasswordReset,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    from app.utils import verify_password
    if not verify_password(password_data.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect current password")
    crud.reset_password(db, current_user.id, password_data.new_password)
    return {"message": "Password updated successfully"}