from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, todos

# データベーステーブル作成
Base.metadata.create_all(bind=engine)

# FastAPIアプリケーション
app = FastAPI(
    title="Todo App API",
    description="Next.js + FastAPI Todo Application",
    version="1.0.0",
)

# CORS設定（Next.jsからのアクセスを許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js開発サーバー
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーター登録
app.include_router(auth.router,prefix="/api")
app.include_router(todos.router,prefix="/api")


@app.get("/")
def read_root():
    return {"message": "Todo App API", "status": "running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
