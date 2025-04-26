from app.helpers import to_camel
from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class UserCreate(BaseModel):
    ingredients: List[str]
    config: dict

    model_config = ConfigDict(
      from_attributes=True,
      alias_generator=to_camel,
      populate_by_name=True
    )

class UserUpdate(BaseModel):
    ingredients: Optional[List[str]] = None
    config: Optional[dict] = None
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True
    )

class UserOut(UserCreate):
    id: int
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True
    )
