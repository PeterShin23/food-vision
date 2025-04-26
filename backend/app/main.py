from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import json
from app.database import Base, engine
from app.helpers import get_db
from app.models.user import User
from app.models.recipe import Recipe
from app.schemas.user import UserCreate, UserOut, UserUpdate
from app.schemas.recipe import RecipeCreate, RecipeOut
from app.crud.user import create_user, get_user, update_user
from app.crud.recipe import create_recipe, get_recipes

app = FastAPI();

Base.metadata.create_all(bind=engine)

@app.post("/users/", response_model=UserOut)
def create_user_route(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db=db, user=user)

@app.get("/users", response_model=UserOut)
def read_user_route(db: Session = Depends(get_db)):
    user = get_user(db=db)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.patch("/users/{user_id}", response_model=UserOut)
def update_user_route(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = update_user(db=db, user_id=user_id, user_update=user_update)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

