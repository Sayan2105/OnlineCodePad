from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import codes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for learning ONLY
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(codes.router, prefix="/api")
