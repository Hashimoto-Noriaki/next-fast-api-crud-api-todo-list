from pydantic import BaseModel
from datetime import datetime


# Todo作成用
class TodoCreate(BaseModel):
    title: str
    description: str | None = None


# Todo更新用
class TodoUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None


# レスポンス用
class TodoResponse(BaseModel):
    id: int
    title: str
    description: str | None
    completed: bool
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True