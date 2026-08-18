# Project Structure

```
MEMENTO/
├── .git/
├── .gitignore
├── README.md
├── ARCHITECTURE.md
├── ROADMAP.md
├── FILE_STRUCTURE.md
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── .env.example
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── App.css
│       ├── index.css
│       ├── config/
│       │   └── api.ts
│       ├── utils/
│       │   └── api.ts
│       ├── types/
│       │   └── index.ts
│       └── pages/
│           ├── Home.tsx
│           └── Home.css
│
├── backend/
│   ├── run.py
│   ├── requirements.txt
│   ├── .env.example
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── api/
│       │   ├── __init__.py
│       │   └── routes.py
│       ├── core/
│       │   ├── __init__.py
│       │   └── config.py
│       ├── db/
│       │   ├── __init__.py
│       │   ├── base.py
│       │   └── session.py
│       ├── models/
│       │   ├── __init__.py
│       │   └── models.py
│       ├── schemas/
│       │   ├── __init__.py
│       │   └── schemas.py
│       ├── services/
│       │   └── __init__.py
│       └── utils/
│           └── __init__.py
│
├── shared/
│   └── TYPES.md
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   └── SETUP.md
│
├── scripts/
│   ├── dev-frontend.sh
│   ├── dev-frontend.bat
│   ├── dev-backend.sh
│   └── dev-backend.bat
│
└── tests/
```

## Key Files Summary

### Frontend
- **main.tsx**: React entry point, connects to App component
- **App.tsx**: Main application component with API status check
- **vite.config.ts**: Vite config with proxy to backend API
- **package.json**: Dependencies (React, TypeScript, Vite)
- **config/api.ts**: All API endpoints defined in one place
- **utils/api.ts**: HTTP client for making API calls
- **types/index.ts**: TypeScript interfaces for all data models

### Backend
- **main.py**: FastAPI app setup with CORS enabled
- **app/api/routes.py**: All API routes defined here
- **app/core/config.py**: Settings loaded from .env
- **app/db/session.py**: Database connection and session
- **app/models/models.py**: SQLAlchemy database models
- **app/schemas/schemas.py**: Pydantic validation schemas
- **run.py**: Development server starter script
- **requirements.txt**: Python dependencies

### Documentation
- **ARCHITECTURE.md**: Original product architecture
- **ROADMAP.md**: Implementation roadmap
- **API.md**: REST API documentation
- **DATABASE.md**: Database schema documentation
- **SETUP.md**: Setup and installation guide

## Running the Project

### Terminal 1 - Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
```

### Terminal 2 - Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python run.py
```

### Verify Everything
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs
- API Health: http://localhost:8000/api/health
