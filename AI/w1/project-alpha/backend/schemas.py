from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime
from models import TicketStatus

class TagBase(BaseModel):
    name: str
    color: Optional[str] = "#000000"

class TagCreate(TagBase):
    pass

class TagResponse(TagBase):
    id: int
    
    class Config:
        from_attributes = True

class TicketBase(BaseModel):
    title: str
    description: Optional[str] = None

class TicketCreate(TicketBase):
    pass

class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TicketStatus] = None

class TicketResponse(TicketBase):
    id: int
    status: TicketStatus
    created_at: datetime
    updated_at: datetime
    tags: List[TagResponse] = []

    class Config:
        from_attributes = True

class TicketTagCreate(BaseModel):
    tag_id: Optional[int] = None
    tag_name: Optional[str] = None

class TagStats(BaseModel):
    name: str
    count: int
    color: str

class DashboardStats(BaseModel):
    total_tickets: int
    open_tickets: int
    closed_tickets: int
    top_tags: List[TagStats]
