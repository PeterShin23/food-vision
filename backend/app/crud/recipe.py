from sqlalchemy.orm import Session
from app.models.recipe import Recipe
from app.schemas.recipe import RecipeCreate, RecipeOut
import json

def create_recipe(db: Session, recipe: RecipeCreate):
    db_recipe = Recipe(
        duration=recipe.duration,
        title=recipe.title,
        ingredients=json.dumps([ingredient.dict() for ingredient in recipe.ingredients]),
        steps=json.dumps(recipe.steps),
        rating=recipe.rating
    )
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def get_recipes(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Recipe).offset(skip).limit(limit).all()
