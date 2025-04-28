import os
import shutil
import uuid

from concurrent.futures import ThreadPoolExecutor
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List
from ultralytics import YOLO
from app.database import Base, engine
from app.helpers import get_db
from app.models.user import User
from app.models.recipe import Recipe
from app.schemas.user import UserCreate, UserOut, UserUpdate
from app.schemas.recipe import RecipeCreate, RecipeOut
from app.crud.user import create_user, get_user, update_user
from app.crud.recipe import create_recipe, get_recipes, delete_recipe

app = FastAPI();

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# ------ User --------

@app.post("/users/", response_model=UserOut)
def create_user_route(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db=db, user=user)

@app.get("/users", response_model=UserOut)
def read_user_route(db: Session = Depends(get_db)):
    user = get_user(db=db)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.patch("/users/{user_id}", response_model=UserOut)
def update_user_route(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = update_user(db=db, user_id=user_id, user_update=user_update)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ------ Recipe --------

@app.post("/recipes/", response_model=RecipeOut)
def create_recipe_route(recipe: RecipeCreate, db: Session = Depends(get_db)):
    return create_recipe(db=db, recipe=recipe)

@app.get("/recipes/", response_model=List[RecipeOut])
def read_recipes_route(db: Session = Depends(get_db)):
    return get_recipes(db=db)

@app.delete("/recipes/{recipe_id}", response_model=RecipeOut)
def delete_recipe_route(recipe_id: int, db: Session = Depends(get_db)):
    recipe = delete_recipe(db=db, recipe_id=recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe


# ------- ML --------

# Load model once
model_path = Path("../../models/yolov8n.pt")  # adjust if needed
model = YOLO(str(model_path))

# Create thread pool executor
executor = ThreadPoolExecutor(max_workers=3)

# Helper function to predict a single image
def predict_image(file_path: str):
    results = model(file_path)

    names = results[0].names
    boxes = results[0].boxes

    class_ids = boxes.cls.tolist()
    predictions = [names[int(class_id)] for class_id in class_ids]

    return list(set(predictions))

# Predict endpoint
@app.post("/predict/")
async def predict(files: List[UploadFile] = File(...)):
    temp_file_paths = []
    results = []

    try:
        # Save uploaded files temporarily
        for file in files:
            temp_filename = f"temp_{uuid.uuid4()}.jpg"
            with open(temp_filename, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            temp_file_paths.append(temp_filename)

        # Run predictions concurrently
        futures = [executor.submit(predict_image, path) for path in temp_file_paths]

        for future in futures:
            prediction = future.result()
            results.append(prediction)

    finally:
        # Always clean up temp files
        for path in temp_file_paths:
            if os.path.exists(path):
                os.remove(path)

    return JSONResponse(content={"results": results})