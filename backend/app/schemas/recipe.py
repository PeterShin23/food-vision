from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class Ingredient(BaseModel):
    name: str
    amount: str

class RecipeCreate(BaseModel):
    duration: int
    title: str
    ingredients: List[Ingredient]
    steps: List[str]
    rating: Optional[float] = None

class RecipeOut(RecipeCreate):
    id: int
    created_at: str
    model_config = ConfigDict(from_attributes=True)
