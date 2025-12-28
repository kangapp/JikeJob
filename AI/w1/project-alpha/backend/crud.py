from sqlalchemy.orm import Session
from sqlalchemy import or_, func
import models, schemas

def get_ticket(db: Session, ticket_id: int):
    return db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()

def get_tickets(db: Session, skip: int = 0, limit: int = 100, status: str = None, tag_id: int = None, search: str = None):
    query = db.query(models.Ticket)
    
    if status:
        query = query.filter(models.Ticket.status == status)
    
    if tag_id:
        query = query.join(models.Ticket.tags).filter(models.Tag.id == tag_id)
        
    if search:
        query = query.filter(models.Ticket.title.contains(search))
        
    return query.offset(skip).limit(limit).all()

def create_ticket(db: Session, ticket: schemas.TicketCreate):
    db_ticket = models.Ticket(title=ticket.title, description=ticket.description)
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

def update_ticket(db: Session, ticket_id: int, ticket_update: schemas.TicketUpdate):
    db_ticket = get_ticket(db, ticket_id)
    if not db_ticket:
        return None
    
    update_data = ticket_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_ticket, key, value)
        
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

def delete_ticket(db: Session, ticket_id: int):
    db_ticket = get_ticket(db, ticket_id)
    if db_ticket:
        db.delete(db_ticket)
        db.commit()
    return db_ticket

def get_tags(db: Session):
    return db.query(models.Tag).all()

def get_tag_by_name(db: Session, name: str):
    return db.query(models.Tag).filter(models.Tag.name == name).first()

def create_tag(db: Session, tag: schemas.TagCreate):
    db_tag = models.Tag(name=tag.name, color=tag.color)
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag

def add_tag_to_ticket(db: Session, ticket_id: int, tag_id: int):
    db_ticket = get_ticket(db, ticket_id)
    db_tag = db.query(models.Tag).filter(models.Tag.id == tag_id).first()
    
    if db_ticket and db_tag:
        if db_tag not in db_ticket.tags:
            db_ticket.tags.append(db_tag)
            db.commit()
            db.refresh(db_ticket)
    return db_ticket

def remove_tag_from_ticket(db: Session, ticket_id: int, tag_id: int):
    db_ticket = get_ticket(db, ticket_id)
    db_tag = db.query(models.Tag).filter(models.Tag.id == tag_id).first()
    
    if db_ticket and db_tag:
        if db_tag in db_ticket.tags:
            db_ticket.tags.remove(db_tag)
            db.commit()
            db.refresh(db_ticket)
    return db_ticket

def get_stats(db: Session):
    total_tickets = db.query(models.Ticket).count()
    open_tickets = db.query(models.Ticket).filter(models.Ticket.status == models.TicketStatus.OPEN).count()
    closed_tickets = db.query(models.Ticket).filter(models.Ticket.status == models.TicketStatus.CLOSED).count()
    
    # Get top 5 tags
    top_tags = db.query(
        models.Tag.name,
        models.Tag.color,
        func.count(models.ticket_tags.c.ticket_id).label('count')
    ).join(models.ticket_tags).group_by(models.Tag.id).order_by(func.count(models.ticket_tags.c.ticket_id).desc()).limit(5).all()
    
    return {
        "total_tickets": total_tickets,
        "open_tickets": open_tickets,
        "closed_tickets": closed_tickets,
        "top_tags": [{"name": t[0], "color": t[1], "count": t[2]} for t in top_tags]
    }
