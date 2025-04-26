from sqlalchemy import Column, Integer, String, Text, Float, DateTime, func
from app.database import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    duration = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    ingredients = Column(Text, nullable=False)  # JSON serialized
    steps = Column(Text, nullable=False)         # JSON serialized
    rating = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
