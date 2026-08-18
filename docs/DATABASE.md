# Database Schema

## Tables

### users
- id: SERIAL PRIMARY KEY
- username: VARCHAR UNIQUE NOT NULL
- email: VARCHAR UNIQUE NOT NULL
- password_hash: VARCHAR NOT NULL
- created_at: TIMESTAMP DEFAULT NOW()
- updated_at: TIMESTAMP DEFAULT NOW()

### regions
- id: SERIAL PRIMARY KEY
- name: VARCHAR NOT NULL
- slug: VARCHAR UNIQUE NOT NULL
- description: TEXT
- is_active: BOOLEAN DEFAULT true

### districts
- id: SERIAL PRIMARY KEY
- region_id: INTEGER FOREIGN KEY
- name: VARCHAR NOT NULL
- description: TEXT
- map_data: JSONB

### locations
- id: SERIAL PRIMARY KEY
- district_id: INTEGER FOREIGN KEY
- name: VARCHAR NOT NULL
- description: TEXT
- latitude: DECIMAL
- longitude: DECIMAL
- category: VARCHAR
- image_url: VARCHAR

### visit_logs
- id: SERIAL PRIMARY KEY
- user_id: INTEGER FOREIGN KEY
- location_id: INTEGER FOREIGN KEY
- verification_method: VARCHAR
- proof_data: JSONB
- status: VARCHAR (pending, approved, rejected)
- created_at: TIMESTAMP DEFAULT NOW()

### quests
- id: SERIAL PRIMARY KEY
- region_id: INTEGER FOREIGN KEY
- title: VARCHAR NOT NULL
- description: TEXT
- reward_xp: INTEGER

### collectibles
- id: SERIAL PRIMARY KEY
- region_id: INTEGER FOREIGN KEY
- name: VARCHAR NOT NULL
- image_url: VARCHAR

### achievements
- id: SERIAL PRIMARY KEY
- title: VARCHAR NOT NULL
- description: TEXT
- icon_url: VARCHAR
- criteria: JSONB

### user_progress
- user_id: INTEGER FOREIGN KEY
- location_id: INTEGER FOREIGN KEY
- xp_earned: INTEGER
- collected_at: TIMESTAMP
