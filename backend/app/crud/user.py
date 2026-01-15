from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime, timedelta
from .. import models, schemas, utils

def get_user_by_email(db: Session, email: str):
    return db.execute(
        select(models.User).where(models.User.email == email)
    ).scalar_one_or_none()


def get_user_by_username(db: Session, username: str):
    return db.execute(
        select(models.User).where(models.User.username == username)
    ).scalar_one_or_none()


def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not utils.verify_password(password, user.hashed_password):
        return None
    return user


def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    user = db.get(models.User, user_id)
    if not user:
        return None

    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def reset_password(db: Session, user_id: int, new_password: str):
    user = db.get(models.User, user_id)
    if not user:
        return None
    user.hashed_password = utils.get_password_hash(new_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def create_reset_token(db: Session, email: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    token = utils.generate_reset_token()
    user.reset_token = token
    user.reset_token_expires = datetime.utcnow() + timedelta(hours=1)
    db.add(user)
    db.commit()
    return token


def reset_password_with_token(db: Session, token: str, new_password: str):
    user = db.execute(
        select(models.User).where(models.User.reset_token == token)
    ).scalar_one_or_none()
    if not user or not user.reset_token_expires or user.reset_token_expires < datetime.utcnow():
        return None
    user.hashed_password = utils.get_password_hash(new_password)
    user.reset_token = None
    user.reset_token_expires = None
    db.add(user)
    db.commit()
    return user