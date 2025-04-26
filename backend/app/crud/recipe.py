import json
from sqlalchemy.orm import Session
from app.models.recipe import Recipe
from app.schemas.recipe import RecipeCreate

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

    db_recipe.ingredients = json.loads(db_recipe.ingredients)
    db_recipe.steps = json.loads(db_recipe.steps)

    return db_recipe

def get_recipes(db: Session, skip: int = 0, limit: int = 10):
    recipes = db.query(Recipe).offset(skip).limit(limit).all()
    for recipe in recipes:
        recipe.ingredients = json.loads(recipe.ingredients)
        recipe.steps = json.loads(recipe.steps)
    return recipes

def delete_recipe(db: Session, recipe_id: int):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()

    if not recipe:
        return None

    db.delete(recipe)
    db.commit()
    return recipe
