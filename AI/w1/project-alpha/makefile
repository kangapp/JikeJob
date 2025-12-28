.PHONY: help install dev start-backend start-frontend stop seed

help:
	@echo "Project Alpha Management"
	@echo "========================"
	@echo "Available commands:"
	@echo "  make install         - Install all dependencies (Backend & Frontend)"
	@echo "  make dev             - Start both Backend and Frontend concurrently"
	@echo "  make start-backend   - Start FastAPI backend server only"
	@echo "  make start-frontend  - Start React frontend server only"
	@echo "  make stop            - Stop Backend (port 8000) and Frontend (port 5173)"
	@echo "  make seed            - Import seed data into MySQL"

install:
	@echo ">>> Installing Backend dependencies..."
	cd backend && python3 -m venv venv && . venv/bin/activate && pip install -r requirements.txt
	@echo ">>> Installing Frontend dependencies..."
	cd frontend && npm install

dev:
	@echo ">>> Starting Development Environment..."
	$(MAKE) -j 2 start-backend start-frontend

start-backend:
	@echo ">>> Starting Backend on http://localhost:8000..."
	cd backend && . venv/bin/activate && uvicorn main:app --reload

start-frontend:
	@echo ">>> Starting Frontend on http://localhost:5173..."
	cd frontend && npm run dev

stop:
	@echo ">>> Stopping Development Environment..."
	@echo "Stopping Backend..."
	-lsof -ti:8000 | xargs kill
	@echo "Stopping Frontend..."
	-lsof -ti:5173 | xargs kill

seed:
	@echo ">>> Seeding database..."
	mysql -u root -p123456 -h 127.0.0.1 ticket_system < seed.sql
