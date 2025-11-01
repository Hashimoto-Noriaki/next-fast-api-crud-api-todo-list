from pydantic import BaseModel, EmailStr
from datetime import datetime


# ユーザー登録用
class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str


# ユーザーログイン用
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ユーザー更新用
class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None


# レスポンス用
class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# トークンレスポンス
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class TokenData(BaseModel):
    email: str | None = None