# Installation and Setup Guide

## Prerequisites
- Node.js 18+ (for frontend)
- Python 3.10+ (for backend)
- PostgreSQL 13+ (for database)

## Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Create Python virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Mac/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create .env file:
   ```bash
   cp .env.example .env
   ```

6. Update DATABASE_URL in .env with your PostgreSQL connection string

7. Start the API server:
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:8000`

## Database Setup

1. Create PostgreSQL database:
   ```bash
   createdb sikkim_tourism
   ```

2. Update DATABASE_URL in .env

3. Run migrations (when available):
   ```bash
   alembic upgrade head
   ```

## Running Both Servers

### Windows
Open two terminals:

Terminal 1 (Frontend):
```bash
scripts\dev-frontend.bat
```

Terminal 2 (Backend):
```bash
scripts\dev-backend.bat
```

### Mac/Linux
Open two terminals:

Terminal 1 (Frontend):
```bash
bash scripts/dev-frontend.sh
```

Terminal 2 (Backend):
```bash
bash scripts/dev-backend.sh
```

## Verify Setup

Frontend: Visit `http://localhost:5173`
Backend: Visit `http://localhost:8000/docs` (Swagger UI)
Health Check: `http://localhost:8000/api/health`
