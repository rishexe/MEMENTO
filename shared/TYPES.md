# Shared Types and Constants

## API Response Models

```python
class HealthResponse:
    status: str
    service: str
```

## User Roles

- GUEST: Unauthenticated user
- TRAVELER: Authenticated user exploring tourism
- ADMIN: Platform administrator
- MODERATOR: Content and proof verifier

## Verification Methods

- GPS: Location-based verification
- QR: QR code scanning
- PHOTO: Photo upload proof

## Region

- name: str
- slug: str
- description: str
- is_active: bool

## District

- name: str
- region_id: int
- map_coordinates: tuple
- description: str

## Location

- name: str
- district_id: int
- lat: float
- lon: float
- description: str
- category: str

## Visit Log

- user_id: int
- location_id: int
- verification_method: str
- proof_data: dict
- status: str (pending, approved, rejected)
