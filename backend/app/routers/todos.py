from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, Todo
from app.schemas import TodoCreate, TodoUpdate, TodoResponse
from app.core.security import get_current_user

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("", response_model=List[TodoResponse])
def get_todos(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: str | None = None,
    completed: bool | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Todo一覧取得（検索・フィルター対応）"""
    query = db.query(Todo).filter(Todo.user_id == current_user.id)

    # 検索
    if search:
        query = query.filter(Todo.title.contains(search))

    # 完了/未完了フィルター
    if completed is not None:
        query = query.filter(Todo.completed == completed)

    # ページネーション
    todos = query.offset(skip).limit(limit).all()

    return [TodoResponse.model_validate(todo) for todo in todos]


@router.post("", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
def create_todo(
    todo_data: TodoCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Todo作成"""
    new_todo = Todo(**todo_data.model_dump(), user_id=current_user.id)

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return TodoResponse.model_validate(new_todo)


@router.get("/{todo_id}", response_model=TodoResponse)
def get_todo(
    todo_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Todo詳細取得"""
    todo = (
        db.query(Todo)
        .filter(Todo.id == todo_id, Todo.user_id == current_user.id)
        .first()
    )

    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todoが見つかりません"
        )

    return TodoResponse.model_validate(todo)


@router.put("/{todo_id}", response_model=TodoResponse)
def update_todo(
    todo_id: int,
    todo_data: TodoUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Todo更新"""
    todo = (
        db.query(Todo)
        .filter(Todo.id == todo_id, Todo.user_id == current_user.id)
        .first()
    )

    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todoが見つかりません"
        )

    # 更新
    update_data = todo_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(todo, key, value)

    db.commit()
    db.refresh(todo)

    return TodoResponse.model_validate(todo)


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(
    todo_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Todo削除"""
    todo = (
        db.query(Todo)
        .filter(Todo.id == todo_id, Todo.user_id == current_user.id)
        .first()
    )

    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todoが見つかりません"
        )

    db.delete(todo)
    db.commit()

    return None