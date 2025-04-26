from app.helpers import to_camel
from pydantic import BaseModel, ConfigDict
from typing import List, Optional

def to_camel(string: str) -> str:
    parts = string.split('_')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])

class Ingredient(BaseModel):
    name: str
    amount: str

    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True
    )

class RecipeCreate(BaseModel):
    duration: int
    title: str
    ingredients: List[Ingredient]
    steps: List[str]
    rating: Optional[float] = None

    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True
    )

class RecipeOut(RecipeCreate):
    id: int
    created_at: str

    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True
    )
