from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
import models, schemas, crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ticket System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/tickets", response_model=schemas.TicketResponse)
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    return crud.create_ticket(db=db, ticket=ticket)

@app.get("/api/tickets", response_model=List[schemas.TicketResponse])
def read_tickets(
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None, 
    tag_id: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    tickets = crud.get_tickets(db, skip=skip, limit=limit, status=status, tag_id=tag_id, search=search)
    return tickets

@app.get("/api/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def read_ticket(ticket_id: int, db: Session = Depends(get_db)):
    db_ticket = crud.get_ticket(db, ticket_id=ticket_id)
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket

@app.put("/api/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def update_ticket(ticket_id: int, ticket_update: schemas.TicketUpdate, db: Session = Depends(get_db)):
    db_ticket = crud.update_ticket(db, ticket_id, ticket_update)
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket

@app.delete("/api/tickets/{ticket_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
    db_ticket = crud.delete_ticket(db, ticket_id)
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return None

@app.get("/api/tags", response_model=List[schemas.TagResponse])
def read_tags(db: Session = Depends(get_db)):
    return crud.get_tags(db)

@app.post("/api/tags", response_model=schemas.TagResponse)
def create_tag(tag: schemas.TagCreate, db: Session = Depends(get_db)):
    db_tag = crud.get_tag_by_name(db, name=tag.name)
    if db_tag:
        raise HTTPException(status_code=400, detail="Tag already registered")
    return crud.create_tag(db=db, tag=tag)

@app.post("/api/tickets/{ticket_id}/tags", response_model=schemas.TicketResponse)
def add_tag_to_ticket(ticket_id: int, tag_data: schemas.TicketTagCreate, db: Session = Depends(get_db)):
    if tag_data.tag_id:
        db_ticket = crud.add_tag_to_ticket(db, ticket_id, tag_data.tag_id)
    elif tag_data.tag_name:
        # Check if tag exists
        db_tag = crud.get_tag_by_name(db, tag_data.tag_name)
        if not db_tag:
            # Create new tag
            new_tag = schemas.TagCreate(name=tag_data.tag_name)
            db_tag = crud.create_tag(db, new_tag)
        db_ticket = crud.add_tag_to_ticket(db, ticket_id, db_tag.id)
    else:
        raise HTTPException(status_code=400, detail="Either tag_id or tag_name must be provided")
        
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket

@app.delete("/api/tickets/{ticket_id}/tags/{tag_id}", response_model=schemas.TicketResponse)
def remove_tag_from_ticket(ticket_id: int, tag_id: int, db: Session = Depends(get_db)):
    db_ticket = crud.remove_tag_from_ticket(db, ticket_id, tag_id)
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket

@app.get("/api/stats", response_model=schemas.DashboardStats)
def read_stats(db: Session = Depends(get_db)):
    return crud.get_stats(db)
