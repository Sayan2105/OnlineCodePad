from fastapi import APIRouter, HTTPException
from app.schemas import CodeCreate, CodeGroupedResponse, CodeResponse
from app import crud

router = APIRouter()

@router.post("/codes")
def create_code(payload: CodeCreate):
    code_id = crud.create_code(payload)
    return {"id": code_id}

@router.get("/codes/{id}")
def get_code(id: int):
    code = crud.get_code_by_id(id)
    if code is None:
        raise HTTPException(status_code=404, detail="Code not found")
    return code

@router.put("/codes/{id}")
def update_code(id: int, payload: CodeCreate):
    updated = crud.update_code(id, payload)
    if updated == 0:
        raise HTTPException(status_code=404, detail="Code not found")
    return {"status": "updated"}

@router.delete("/codes/{id}")
def delete_code(id: int):
    deleted = crud.delete_code(id)
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Code not found")
    return {"status": "deleted"}

@router.get("/codes-grouped", response_model=CodeGroupedResponse)
def get_codes_grouped():
    return crud.get_codes_grouped()

@router.get("/ping")
def ping():
    return {"message": "pong"}
