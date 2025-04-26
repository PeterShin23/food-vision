from sqlalchemy import Column, Integer, String, Text, Float, DateTime, func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    ingredients = Column(Text, nullable=False)  # JSON serialized
    config = Column(Text, nullable=False)        # JSON serialized
