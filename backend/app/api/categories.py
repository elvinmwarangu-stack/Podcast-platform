from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..dependencies import get_db

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("/", response_model=List[schemas.CategoryOut])
def list_categories(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    return crud.get_categories(db, skip, limit)


@router.get("/{category_id}", response_model=schemas.CategoryOut)
def get_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    category = crud.get_category(db, category_id)
    if not category:
        raise HTTPException(404, "Category not found")
    return category


@router.post("/", response_model=schemas.CategoryOut, status_code=201)
def create_category(
    category_in: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    # current_user = Depends(get_current_admin_user)   # ← add later
):
    if crud.get_category_by_name(db, category_in.name):
        raise HTTPException(400, "Category name already exists")
    return crud.create_category(db, category_in)