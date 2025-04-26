from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class UserCreate(BaseModel):
    ingredients: List[str]
    config: dict

class UserUpdate(BaseModel):
    ingredients: Optional[List[str]] = None
    config: Optional[dict] = None
    model_config = ConfigDict(from_attributes=True)

class UserOut(UserCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
