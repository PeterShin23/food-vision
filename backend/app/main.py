from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import json
from app.database import Base, SessionLocal, engine
from app.models.user import User
from app.models.recipe import Recipe
from app.schemas.user import UserCreate, UserOut, UserUpdate
from app.schemas.recipe import RecipeCreate, RecipeOut
from app.crud.user import create_user, get_user
from app.crud.recipe import create_recipe, get_recipes

app = FastAPI();

Base.metadata.create_all(bind=engine)

@app.post("/users/", response_model=UserOut)
def create_user_async(user: UserCreate, db: Session = Depends(lambda: SessionLocal())):
    db_user = User(
        ingredients=json.dumps(user.ingredients),
        config=json.dumps(user.config)
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    db_user.ingredients = json.loads(db_user.ingredients)
    db_user.config = json.loads(db_user.config)

    return db_user

@app.patch("/users/{userId}", response_model=UserOut)
def update_user_async(db: Session, user_id: int, user_update: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    if user_update.ingredients is not None:
        user.ingredients = json.dumps(user_update.ingredients)

    if user_update.config is not None:
        user.config = json.dumps(user_update.config)

    db.commit()
    db.refresh(user)

    user.ingredients = json.loads(user.ingredients)
    user.config = json.loads(user.config)

    return user


@app.get("/users", response_model=UserOut)
def read_user_async(db: Session = Depends(lambda: SessionLocal())):
    user = db.query(User).first()

    if user:
        user.ingredients = json.loads(user.ingredients)
        user.config = json.loads(user.config)

    return user