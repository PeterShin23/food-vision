import json
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate

def create_user(db: Session, user: UserCreate):
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

def get_user(db: Session):
    user = db.query(User).first()
    if user:
        user.ingredients = json.loads(user.ingredients)
        user.config = json.loads(user.config)
    return user

def update_user(db: Session, user_id: int, user_update: UserUpdate):
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
