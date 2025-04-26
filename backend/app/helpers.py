from .database import SessionLocal

def to_camel(string: str) -> str:
    parts = string.split('_')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()