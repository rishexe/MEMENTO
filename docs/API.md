# API Documentation

## Base URL
```
http://localhost:8000
```

## Endpoints

### Health Check
```
GET /api/health
Response: { "status": "ok", "service": "backend" }
```

### Root
```
GET /
Response: { "message": "Sikkim Tourism API is running" }
```

## Future Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

### Regions
- GET /api/regions
- GET /api/regions/{id}
- POST /api/regions (admin)

### Districts
- GET /api/districts
- GET /api/districts/{id}
- POST /api/districts (admin)

### Locations
- GET /api/locations
- GET /api/locations/{id}
- POST /api/locations (admin)

### Visits
- POST /api/visits
- GET /api/visits/{id}
- GET /api/user/visits

### Profile
- GET /api/user/profile
- PUT /api/user/profile

### Quests
- GET /api/quests
- GET /api/quests/{id}
- POST /api/user/quests/{id}/complete (submit)

### Collections
- GET /api/user/collectibles
- GET /api/user/achievements

### Admin
- GET /api/admin/dashboard
- GET /api/admin/visits/pending
- POST /api/admin/visits/{id}/approve
- POST /api/admin/visits/{id}/reject
