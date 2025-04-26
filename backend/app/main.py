from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import Base, engine
from app.helpers import get_db
from app.models.user import User
from app.models.recipe import Recipe
from app.schemas.user import UserCreate, UserOut, UserUpdate
from app.schemas.recipe import RecipeCreate, RecipeOut
from app.crud.user import create_user, get_user, update_user
from app.crud.recipe import create_recipe, get_recipes, delete_recipe

app = FastAPI();

Base.metadata.create_all(bind=engine)

# ------ User --------

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


# ------ Recipe --------

@app.post("/recipes/", response_model=RecipeOut)
def create_recipe_route(recipe: RecipeCreate, db: Session = Depends(get_db)):
    return create_recipe(db=db, recipe=recipe)

@app.get("/recipes/", response_model=List[RecipeOut])
def read_recipes_route(db: Session = Depends(get_db)):
    return get_recipes(db=db)

@app.delete("/recipes/{recipe_id}", response_model=RecipeOut)
def delete_recipe_route(recipe_id: int, db: Session = Depends(get_db)):
    recipe = delete_recipe(db=db, recipe_id=recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe