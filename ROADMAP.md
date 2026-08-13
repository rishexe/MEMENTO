# Sikkim Gamified Tourism Platform - Roadmap

**Version:** 1.0  
**Status:** Planning baseline for implementation  
**Based on:** `ARCHITECTURE.md`  
**Target:** Mobile-first web app for Sikkim tourism gamification

## 1. Goal of this roadmap

This roadmap converts the architecture baseline into a practical delivery plan. It helps us:

- collect the right information before coding
- break the product into buildable phases
- reduce ambiguity on content, data, and verification logic
- keep implementation aligned with the architecture decisions

The core objective is to build a region-agnostic tourism gamification platform, starting with Sikkim as the first region.

---

## 2. Delivery principles

1. Build for mobile-first experience.
2. Treat all locations, quests, collectibles, and achievements as data-first entities.
3. Keep the backend authoritative for all progression logic.
4. Prefer one clean modular backend over premature service splitting.
5. Validate with real content and real user flows before expanding feature breadth.
6. Keep Sikkim launch scope clear and region-agnostic architecture in mind.

---

## 3. Technical roadmap: how we will build it

This project should not start with feature-heavy coding. It should start with clean project scaffolding and technical foundations, then move into domain modules and product features.

### 3.1 Initial project skeleton

We will create the project structure in this order:

```text
project/
  frontend/
    src/
    public/
    package.json
    vite.config.ts
    tsconfig.json
    .env.example
  backend/
    app/
      api/
      core/
      db/
      models/
      schemas/
      services/
      utils/
    requirements.txt
    .env.example
  docs/
    ARCHITECTURE.md
    ROADMAP.md
    API.md
    DATABASE.md
  shared/
  scripts/
  tests/
```

This structure separates:

- frontend app code
- backend domain logic
- shared data contracts
- documentation
- operational scripts
- automated tests

### 3.2 Technical setup sequence

1. Create base folders for frontend, backend, docs, scripts, and tests.
2. Initialize frontend with React + TypeScript.
3. Initialize backend with FastAPI + Python.
4. Configure environment variables and secrets handling.
5. Connect frontend to backend API base URL.
6. Add Supabase connection and database configuration.
7. Add health-check endpoints and frontend startup screen.
8. Build basic developer tooling: linting, formatting, and environment validation.

### 3.3 Engineering phase order

The build should happen in this sequence:

- Phase A: bootstrapping and folder setup
- Phase B: database schema and ORM models
- Phase C: auth and user profiles
- Phase D: region, district, and location data model
- Phase E: map and location experience UI
- Phase F: visit logging and proof validation
- Phase G: quest, collectible, and achievement engine
- Phase H: profile, rewards, and collection screens
- Phase I: admin panel and moderation tools
- Phase J: testing, optimization, and launch hardening

### 3.4 Implementation philosophy

We should build in slices:

- first: working project skeleton
- second: data layer and schemas
- third: core location and map flows
- fourth: verification and progression engine
- fifth: polish and admin tools

This avoids building a large system without any functioning layer.

---

## 4. Information to gather before implementation

This is the most important section for coding. We need the data and decisions below before writing final app logic.

### 3.1 Content data

We need structured information for:

- Regions
- Districts
- Locations
- Visit categories
- Quests
- Experiences
- Collectibles
- Achievements
- Rewards

For each entity, the minimum data fields should be collected:

- unique ID
- display name
- short description
- long description
- image/video references
- map coordinates
- district/region association
- difficulty / category / tags
- verification method required
- status active/inactive
- associated quest or achievement IDs

### 3.2 Map and asset requirements

- district boundary data or map metadata
- location pin coordinates
- illustrated district map files
- fallback mobile-friendly assets
- image optimization strategy
- media storage path and naming convention

### 3.3 User and auth data

- user roles (guest, traveler, admin, moderator)
- login method (email, OAuth, Supabase auth)
- profile fields
- region preferences
- user device permissions
- analytics and privacy expectations

### 3.4 Verification logic

For MVP we must define:

- GPS validation rules
- QR code support
- photo upload requirement
- proof of visit conditions
- acceptance/rejection logic
- duplicate visit handling
- idempotency rules for repeated submissions

### 3.5 Progression rules

We need explicit decisions for:

- XP formula
- quest completion rules
- collectible unlock logic
- achievement triggers
- reward claim rules
- streak or milestone mechanics
- badge and leaderboard design

### 3.6 Admin workflows

We must define:

- how admins add a new region
- how they add a district and location
- how they author quests
- how they review user-submitted proofs
- how they validate suspicious activity

---

## 4. Implementation phases

## Phase 0: Discovery and alignment

### Purpose
Set the foundation for product scope and shared understanding.

### Deliverables
- finalized MVP feature list
- confirmed Sikkim region scope
- content inventory for locations and districts
- acceptance criteria for visit verification
- agreed tech stack boundaries
- project folder structure and naming standards

### Main questions to answer
- Which Sikkim districts are included in MVP?
- Which attractions/locations are priority content?
- Which verification types are required for the first release?
- What is the minimum viable quest system?
- Which analytics and privacy requirements matter most?

### Output
A content and requirements sheet that feeds UI, API, and database work.

---

## Phase 1: Foundation setup

### Purpose
Take the architecture from plan to working project skeleton.

### Deliverables
- frontend project setup with React + TypeScript
- backend project setup with FastAPI + Python
- Supabase project connection and environment configuration
- folder structure for domain modules
- base auth and routing setup
- unified API configuration and environment variables

### Technical components
- frontend app shell
- backend service structure
- database connection layer
- settings and secrets management
- API health-check endpoint

### Result
A working app skeleton with no business logic yet, but ready for modules.

---

## Phase 2: Core data model and schema

### Purpose
Define the real entities behind the experience.

### Deliverables
- region, district, location, quest, collectible, achievement schemas
- user profile schema
- visit log model
- progression state model
- reward model

### Database focus
- PostgreSQL tables and relationships
- seed data for Sikkim content
- indexes for geo and search queries
- constraints for uniqueness and integrity

### Result
The product can store locations, user visits, and progression state as real data instead of hardcoded placeholders.

---

## Phase 3: Region exploration and map experience

### Purpose
Build the core discovery layer of the app.

### Deliverables
- cinematic home screen
- district selection flow
- district map screen
- location pin overlays
- location detail experience
- mobile-friendly navigation and interactions

### UI focus
- immersive intro experience
- map interaction patterns
- mobile layout and performance optimization
- loading strategy for large media and map assets

### Result
Users can browse districts and discover attractions in a travel-game fashion.

---

## Phase 4: Visit logging and verification

### Purpose
Create the mechanism that turns exploration into proof and progression.

### Deliverables
- visit submission flow
- GPS check logic
- QR validation support
- photo upload handling
- duplicate and invalid check logic
- visit status lifecycle

### Backend logic
- validate location + user + timing
- evaluate proof against rules
- determine accepted, rejected, or pending states
- persist verification event records

### Result
The app can approve user visits and convert them into meaningful game state.

---

## Phase 5: Gamification engine

### Purpose
Convert valid visits into progress, rewards, and collection growth.

### Deliverables
- XP and progression flow
- quest completion engine
- collectible unlock engine
- achievement checks
- reward eligibility and claim flow

### Business logic focus
- event-driven progression checks
- atomic updates to user state
- idempotent progression updates
- clear reward audit trail

### Result
The platform becomes a real gamified tourism experience rather than a static location viewer.

---

## Phase 6: Profile, collections, and progression screens

### Purpose
Provide the player-facing journey for visibility and retention.

### Deliverables
- user profile overview
- visited locations list
- quest dashboard
- collectible gallery
- achievements screen
- reward redemption state

### UX goals
- show progress clearly
- make the journey motivating without overwhelming the user
- keep gamified visuals lightweight and mobile-friendly

### Result
Players see meaningful growth from their travel behavior.

---

## Phase 7: Admin tooling and moderation

### Purpose
Support the operational side of the platform.

### Deliverables
- admin login and dashboard
- content creation tools
- location and quest management
- moderation queue for visit proofs
- analytics dashboard

### Result
The product becomes maintainable beyond initial launch and can scale with more regions and content.

---

## Phase 8: Quality assurance, performance, and launch readiness

### Purpose
Ensure the platform is reliable and production-ready.

### Deliverables
- API testing for core flows
- mobile usability validation
- performance optimization
- security review
- analytics instrumentation
- launch pilot checklist

### Focus areas
- app stability
- low-latency map performance
- proof verification reliability
- data integrity and auditability
- accessibility and mobile responsiveness

### Result
The MVP is ready for a pilot or staged launch.

---

## 5. Recommended first milestone

The best first milestone for this project is:

### MVP milestone: Sikkim Explorer Core

This includes:

- cinematic home screen
- district and map browsing
- location detail pages
- visit logging
- GPS/QR/photo proof submission
- backend verification logic
- progression for XP and quests
- user profile summary
- admin content management for core entities

This milestone delivers a real playable tourism game experience while staying within the architecture baseline.

---

## 6. Suggested order of work

1. Confirm the data inventory and MVP region scope.
2. Create initial schema and backend domain modules.
3. Seed Sikkim content data.
4. Build the app shell and district exploration flow.
5. Add visit submission and verification.
6. Add progression and rewards engine.
7. Finish profile and collection UX.
8. Test, harden, and prepare for pilot launch.

---

## 7. Recommended working structure

We should keep the project organized in this sequence:

```text
project/
  frontend/
  backend/
  shared/
  docs/
    ARCHITECTURE.md
    ROADMAP.md
    API.md
    DATABASE.md
  scripts/
  tests/
```

This keeps product decisions separated from implementation details and helps us avoid mixing content, API, and app logic too early.

---

## 8. Immediate next step

The next action should be a structured content and requirement sheet. We should collect the following before starting big-code work:

- list of Sikkim districts
- list of major places to include in MVP
- chosen verification methods for MVP
- estimated quest and collectible structure
- known map and media assets we can use
- basic admin needs

Once that is filled, we can start the actual code scaffolding and database model.

---

## 9. Decision status summary

- Region-agnostic architecture: DECIDED
- Mobile-first platform: DECIDED
- Backend authoritative progression: DECIDED
- Modular monolith backend: DECIDED
- MVP verification methods: GPS + QR + Photo (minimum)
- Cinematic home screen: DECIDED
- Final map tech and final reward formulas: TBD

---

## 10. Final note

This roadmap is the bridge between the product vision and actual implementation. It reduces uncertainty and ensures we are not coding blindly. The project should proceed in small, verified slices rather than trying to build the full gamified ecosystem in one pass.
