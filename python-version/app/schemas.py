from pydantic import BaseModel
from typing import List, Dict

class CodeCreate(BaseModel):
    title: str
    category: str
    explanation: str
    code: str


class CodeResponse(BaseModel):
    id: int
    title: str
    category: str
    explanation: str
    code: str


class CodeListItem(BaseModel):
    id: int
    title: str


CodeGroupedResponse = Dict[str, List[CodeListItem]]
