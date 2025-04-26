from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserOut
import json

def create_user(db: Session, user: UserCreate):
    """
    Creates a user record in the User table
    """

    db_user = User(
        ingredients=json.dumps(user.ingredients),
        config=json.dumps(user.config)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
  """
  Gets a user by ID
  """

  return db.query(User).filter(User.id == user_id).first()
