# Sikkim Gamified Tourism Platform - Architecture

**Version:** 2.0  
**Status:** Architecture baseline for pre-implementation planning  
**Implementation status:** Not implemented  
**Initial region:** Sikkim, India  
**Platform direction:** Mobile-first browser application  
**Frontend:** React + TypeScript  
**Backend:** FastAPI + Python  
**Database and platform services:** Supabase + PostgreSQL

## 1. Purpose

This document is the architectural source of truth for the Sikkim Gamified Tourism Platform. It describes the product experience, domain model, system boundaries, data flow, technical stack, security model, implementation sequence, and unresolved decisions that must be respected before feature implementation begins.

The platform is not a conventional tourism directory. It is a mobile-first exploration experience that makes discovering Sikkim feel like entering and progressing through an interactive travel game.

Core loop:

```text
Discover
  -> Explore
  -> Interact
  -> Learn
  -> Complete
  -> Collect
  -> Progress
  -> Explore Further
```

For Artifact Quests, the quest experience is:

```text
Discover
  -> Investigate
  -> Prove
  -> Collect
```

Sikkim is the first product region. The architecture must support future Indian regions or states without rewriting the platform around a new codebase.

## 2. Scope and Non-Scope

### 2.1 In scope for this document

- Product architecture and user journey.
- Frontend, backend, database, and media boundaries.
- Domain model and entity relationships.
- Conceptual REST API groups.
- Visit logging, verification, quests, progression, profile, collections, achievements, and optional rewards.
- Security, privacy, performance, accessibility, content governance, analytics, idempotency, and implementation phases.
- Architecture Decision Log.

### 2.2 Not in scope for this document

- Application implementation.
- Final database migrations.
- Final API request/response schemas.
- Final UI design files.
- Final XP formula.
- Final quest taxonomy.
- Final non-artifact or advanced verification mechanisms beyond MVP GPS + QR + Photo.
- Final hosting provider.

Detailed API contracts should eventually live in `API.md`. Detailed physical database schema should eventually live in `DATABASE.md`. Product milestones should live in `ROADMAP.md`.

## 3. Status Language

This document uses the following labels:

- **DECIDED:** Approved direction for implementation unless the Architecture Decision Log is updated.
- **PROPOSED:** Recommended direction that still requires validation or detailed design.
- **TBD:** Intentionally unresolved. Do not silently invent a decision during implementation.
- **FUTURE:** Out of the initial MVP unless explicitly approved.

## 4. Core Architectural Principles

### 4.1 Mobile-first

The primary user is expected to use the platform on a phone. Large visuals, cinematic assets, maps, animations, and media-heavy location pages must be optimized for mobile network and device constraints.

The first screen must not load every district, every location, and every large media asset at once.

### 4.2 Exploration-first

The platform should feel like an exploration game. The main surfaces are the cinematic home, district selection, illustrated district maps, location pins, quests, progression, and profile journey.

The product must avoid becoming a static tourism directory made of generic cards.

### 4.3 Data-driven content

Regions, districts, locations, map pins, quests, experiences, challenges, collectibles, achievements, and rewards must be represented as data wherever practical.

Adding a new location should normally mean:

```text
Create or update database/content records
  -> frontend fetches data
  -> pin and location experience appear
```

It should not normally mean:

```text
Create a new React page for that destination
```

### 4.4 Separate map artwork from location data

The illustrated district map is a visual asset. Tourism locations are database entities. The frontend map renderer combines both.

```text
Illustrated map asset
  + district boundary metadata
  + location records
  -> frontend map renderer
  -> interactive pins
```

This is a mandatory boundary. Do not make the map image itself the source of tourism data.

### 4.5 Server-authoritative progression

The backend is authoritative for:

- Visit acceptance.
- Visit verification.
- XP or points.
- Quest objective completion.
- Collectible unlocks.
- Achievement unlocks.
- Reward eligibility and redemption.

The frontend may display progress, but it must not be trusted to assign rewards or mutate progression directly.

### 4.6 Modular monolith first

For the initial implementation, use a modular monolith backend with clear domain modules. Do not introduce microservices unless real scale, ownership, or deployment constraints justify them later.

### 4.7 Region-agnostic core

The product is Sikkim-first, not Sikkim-hardcoded.

```text
India
  -> Sikkim
  -> Himachal Pradesh
  -> Rajasthan
  -> future regions
```

Core hierarchy:

```text
Region
  -> Districts
      -> Locations
      -> Quests
      -> Experiences
      -> Collectibles
  -> Region-level content
```

The user model must not be a "Sikkim user profile." A user owns a global account with region-specific journeys.

## 5. Product Experience Architecture

### 5.1 Primary user journey

DECIDED:

```text
Cinematic Sikkim
  -> Explore
  -> District Selection
  -> Select District
  -> District Map
  -> Location Pins
  -> Location Experience
  -> Visit Logging
  -> Verification
  -> Progression
  -> Quests / Collections / Achievements
  -> Profile
```

### 5.2 End-to-end mental model

```text
User sees a location pin
  -> React opens a location experience
  -> user opens Add to Visited
  -> React submits visit log and photos
  -> FastAPI authenticates and validates the request
  -> Verification Service evaluates the visit if required
  -> Visit Service records the user visit
  -> Progression Service evaluates consequences
  -> Quest, collectible, achievement, and reward state may change
  -> PostgreSQL persists state atomically where required
  -> API returns updated progress
  -> React displays the result
```

## 6. Cinematic Home

### 6.1 Experience

DECIDED: The first screen is a cinematic Sikkim opening page inspired by the immersive presentation style of the official Genshin Impact website, but it must use original Sikkim identity, assets, and design language.

It should communicate Sikkim through elements such as:

- Mountains.
- Valleys.
- Rivers.
- Forests.
- Monasteries.
- Sikkimese architecture.
- Prayer flags.
- Clouds and fog.
- Atmospheric light.
- Trees and vegetation.

The animation should feel alive through subtle environmental movement:

- River flow.
- Moving fog or cloud layers.
- Tree or vegetation motion.
- Prayer-flag movement.
- Atmospheric particles.
- Light movement.

The primary action is:

```text
EXPLORE
```

The home page must not look like a conventional tourism landing page filled with informational cards.

### 6.2 Rendering technology

TBD: The exact cinematic rendering implementation is not frozen.

Possible approaches:

- Optimized video.
- Canvas/WebGL.
- Three.js.
- Blender-generated assets exported for browser delivery.
- Another optimized browser-compatible approach.
- Unity/WebGL only if technically justified and performance is acceptable.

Mobile performance and fallback requirements apply regardless of the chosen technology:

- Lazy load non-critical assets.
- Use compressed video/images where appropriate.
- Provide reduced-motion behavior.
- Provide a low-bandwidth fallback.
- Keep initial load size controlled.
- Avoid blocking navigation while large optional media loads.

## 7. District Selection

### 7.1 Interaction model

DECIDED: After pressing Explore, the user transitions into district selection. The mobile-first structure is vertical:

```text
Opening
  -> District 1
  -> District 2
  -> District 3
  -> District 4
  -> ...
```

This is inspired by cinematic region-selection presentation, but it must be adapted for mobile scrolling rather than desktop-first horizontal navigation.

### 7.2 District data and presentation

Each district should be represented by data and assets:

- District ID.
- Region ID.
- Name.
- Short description or tagline.
- Representative visual asset.
- Optional theme/color metadata.
- Ordering metadata for district selection.
- Explore action target.

Design principle:

```text
Each district has a distinct visual identity while belonging to one shared design system.
```

Example visual directions, not final content:

- Gangtok: mountain city, monasteries, blue-green atmosphere.
- Namchi: valleys, temples, warmer atmosphere.
- Mangan: high mountains, forests, colder atmosphere.
- Gyalshing: heritage, monasteries, earthy atmosphere.
- Pakyong: hills, forests, lighter atmosphere.
- Soreng: rural landscapes, valleys, softer atmosphere.

Selecting a district opens its district map.

## 8. District Map

### 8.1 Experience

DECIDED: The district map is a custom illustrated game-style map inspired by the map presentation of Shadow Fight 3. It is not a standard Google Maps view.

When a district is selected:

- The selected district is visually dominant.
- The selected district has a clear visible border.
- Neighboring districts can remain visible for context.
- Neighboring districts are faded, muted, or visually subdued.
- Location markers appear as game-style pins.
- Terrain, rivers, roads, settlements, mountains, and illustrated environmental elements may be represented artistically.

Concept:

```text
Sikkim
  -> Selected District
       -> strong visual emphasis
       -> highlighted boundary
       -> district map artwork
       -> location markers
  -> Neighboring Districts
       -> muted background context
```

### 8.2 Map renderer responsibility

The frontend map renderer combines:

- District artwork.
- District boundary metadata.
- Map coordinate system or normalized pin positions.
- Location records from the API.
- Quest or filter state.
- Highlight state.

The map renderer should support:

- Tap/click pins.
- Pin categories.
- Highlighting quest-relevant locations.
- Loading and error states.
- Mobile gesture behavior.
- Accessible fallback list of map locations where practical.

### 8.3 Map rendering technology

TBD: The final map rendering technology is not frozen.

Possible approaches:

- Layered responsive image/SVG/canvas.
- Canvas.
- WebGL/Three.js.
- Map library used only as a rendering utility, not as a generic road-map UI.
- Third-party map provider for geospatial assistance only if it fits the custom illustrated-map requirement.

## 9. Location Pins

Pins are interactive representations of Location entities. They should visually belong to the platform's game-inspired design language rather than generic map-marker styling.

Initial conceptual categories:

- Cafes.
- Monuments.
- Attractions.
- Cultural locations.
- Hidden gems.
- Quest-related locations.
- Other tourism locations.

The final taxonomy is TBD and should be configurable.

Conceptual Location fields:

```text
Location
  -> id
  -> region_id
  -> district_id
  -> name
  -> category
  -> real-world coordinates, if known
  -> map position for illustrated renderer
  -> short description
  -> lore / cultural description
  -> local and pop-culture information
  -> opening hours
  -> media references
  -> associated experiences
  -> associated quests
  -> publication status
```

## 10. Location Experience

### 10.1 Dedicated screen

DECIDED: Tapping a pin opens a dedicated location experience screen. It must not be reduced to a small map popup.

The screen should combine:

- Shadow Fight-inspired UI tone.
- Sikkim cultural identity.
- Cinematic tourism photography.
- Letterboxd-like logging interaction where appropriate.
- Minimalist, cinematic, premium exploration-game aesthetic.

For artifact-focused quests, the location experience may guide the user from the monument/location into a specific artifact hunt. This should feel like discovery and investigation, not a cluttered dashboard.

UI direction:

- Large artifact imagery.
- Strong negative space.
- Restrained typography.
- Subtle borders.
- Muted earthy/Sikkim-inspired tones.
- Minimal gamification flourishes.
- Clear proof/upload actions.

### 10.2 Content

A location experience may include:

- Hero image.
- Photo gallery.
- Location name.
- Region and district.
- Opening and closing time.
- Cultural facts.
- Historical information.
- Local stories.
- Local pop-culture significance.
- Famous qualities.
- Lore or approved narrative description.
- Visit status.
- Add to Visited action.
- Related quests.
- Related experiences or challenges.
- Artifact clues or artifact quest entry points, where applicable.

Official location media must be curated tourism/content media, not automatically pulled from user logs.

## 11. Visit Logging

### 11.1 Interaction

DECIDED: The location experience contains:

```text
ADD TO VISITED
```

This opens a visit logger inspired by Letterboxd's "log an item" interaction model. It must use the platform's own game-inspired visual language, not copy Letterboxd styling.

Instead of "change poster/backdrop", the logging interface should provide:

```text
ADD PHOTOS
```

### 11.2 Visit log fields

Conceptual fields:

```text
Visit
  -> id
  -> user_id
  -> location_id
  -> visit_datetime
  -> personal_note
  -> verification_status
  -> visibility, if public/private logging is enabled
  -> created_at
  -> updated_at
```

Optional fields, TBD:

- Rating or reaction.
- Public/private status.
- Travel party or companion metadata.
- Mood/tags.

### 11.3 Location and Visit are separate

MANDATORY:

```text
Location = tourism entity
Visit = user's interaction with that location
```

Do not model the main system as:

```text
Location.visitedByUser
```

Use a separate user visit entity. This supports visit history, photos, verification, multiple visits later if allowed, analytics, progression, and privacy controls.

## 12. User Photos

User-uploaded visit photos are user-generated content and must be separate from official location media.

```text
Official Location Media != User Visit Photos
```

User uploads must be treated as untrusted input:

- Validate file type.
- Enforce file size limits.
- Store in object storage.
- Process or compress images where appropriate.
- Apply access control.
- Apply visibility rules.
- Moderate before public/community reuse if public sharing is enabled.
- Prevent uploaded files from becoming official tourism media automatically.

Conceptual fields:

```text
VisitPhoto
  -> id
  -> visit_id
  -> user_id
  -> storage_path
  -> mime_type
  -> file_size
  -> width
  -> height
  -> moderation_status, if public sharing is enabled
  -> visibility
  -> created_at
```

## 13. Visit Verification

### 13.1 Verification abstraction

DECIDED for MVP: Artifact Quest verification uses GPS + QR + Photo.

The architecture must expose a replaceable verification service:

```text
Visit request
  -> Verification Service
  -> verified / rejected / pending
```

MVP Artifact Quest verification responsibilities:

- GPS verifies that the user is at or near the monument/location.
- QR identifies or verifies the relevant artifact.
- User photo upload provides proof for review.
- Backend remains authoritative for verification and progression.
- Photo verification may initially use manual/admin review.

The verification service must remain extensible. Future strategies may include AI/image recognition, stronger anti-spoofing checks, or different hybrid rules based on reward sensitivity. AI image verification is not an MVP dependency.

### 13.2 Verification concerns

The system must handle:

- Location permission denial.
- GPS unavailable.
- GPS inaccuracy.
- Network failure.
- Location spoofing.
- Repeated attempts.
- QR misuse if QR is selected.
- User reaches a destination but verification fails.
- User scans the wrong artifact QR.
- User uploads an unrelated or invalid proof photo.

High-value rewards must never rely solely on an untrusted frontend claim.

### 13.3 Verification flow

```text
React submits visit log
  -> FastAPI validates user and location
  -> Verification Service applies GPS + QR + Photo rules where required
  -> strategy evaluates GPS, QR, and uploaded proof evidence
  -> Visit Service records accepted/pending/rejected visit
  -> Progression Service runs only when rules allow
```

The verification evidence itself should be minimized and retained only as long as needed for security, audit, or dispute handling.

Artifact submissions can remain pending until photo proof is manually reviewed. Progression should run only after the artifact submission reaches a verified state.

## 14. Quests, Circuits, Experiences, and Challenges

### 14.1 Terminology

The source design used "tourism circuits" and the newer product direction uses "quests." Architecturally, these should share the same reusable quest framework. A circuit can be represented as a quest or quest category that links multiple locations and objectives.

### 14.2 Quest model

DECIDED: Quests are data-driven and must not be hardcoded into React components.

DECIDED: A quest objective may require a specific artifact inside a specific monument/location, not only a visit to the location.

Artifact Quest core flow:

```text
Quest
  -> Monument / Location
  -> Specific Artifact
  -> Find
  -> Verify
  -> Upload Photo
  -> Quest Completion
  -> XP / Badge / Reward
```

Conceptual fields:

```text
Quest
  -> id
  -> region_id
  -> district_id, nullable for region-level quests
  -> title
  -> description
  -> instructions
  -> category
  -> status
  -> publication_state
  -> reward references, if applicable
```

```text
QuestObjective
  -> id
  -> quest_id
  -> objective_type
  -> required_location_id, optional
  -> required_artifact_id, optional
  -> required_experience_id, optional
  -> required_challenge_id, optional
  -> target_count
  -> ordering
  -> validation_rule_reference
```

Conceptual artifact fields:

```text
Artifact
  -> id
  -> location_id
  -> name
  -> description
  -> clue
  -> reference_image
  -> difficulty
  -> verification_configuration
  -> publication_state
```

An artifact belongs to a Location/Monument. A quest objective can reference both the parent location and a specific artifact when the user must find something inside that monument/location.

Conceptual artifact submission fields:

```text
ArtifactSubmission
  -> id
  -> user_id
  -> quest_objective_id
  -> artifact_id
  -> location_id
  -> proof_photo_reference
  -> gps_evidence_reference
  -> qr_evidence_reference
  -> verification_status
  -> reviewed_by, optional
  -> reviewed_at, optional
  -> created_at
```

One location may belong to many quests:

```text
Rumtek
  -> Monastery Trail
  -> Guardian of Gangtok
  -> Cultural Heritage Quest
```

### 14.3 Quest screen

The quest screen should show:

- District/region context.
- Quest categories.
- Completed/total count.
- Progress bars.
- Individual quest progress.
- Instructions.
- Objectives.
- Required locations or experiences.
- Rewards if applicable.
- Relevant locations.

Example:

```text
GANGTOK QUESTS

District Progress
8 / 10 completed

Monastery Trail
2 / 5 objectives

Taste of Gangtok
1 / 5 objectives
```

Opening a quest shows a scrollable details panel:

- Quest title.
- Description.
- How to complete.
- Objectives.
- Required locations.
- Required artifacts, where applicable.
- Current progress.
- Remaining objectives.
- Rewards, if applicable.
- Relevant map locations.
- View on Map action.

Quest to map flow:

```text
Quest Details
  -> View on Map
  -> District Map
  -> relevant pins highlighted
```

### 14.4 Quest types

DECIDED: Artifact discovery is supported as an MVP quest pattern.

TBD: Exact non-artifact quest types are not finalized.

- Visit-based.
- Quiz.
- Story.
- Puzzle.
- Discovery.
- Photo.
- Hidden gem.
- Image identification.
- Cultural recognition.

The architecture should support reusable experience/challenge types so new quest types can be introduced without rewriting the application.

### 14.5 Experience and challenge model

Experiences are content-driven interactions associated with locations or quests.

Possible experience types:

- Interactive cultural story.
- Quiz.
- Puzzle.
- 360-degree hidden-location challenge.
- Image identification.
- Nature/culture recognition.
- Future 3D or WebAR experience, if approved.

Conceptual challenge fields:

```text
Challenge
  -> id
  -> experience_id
  -> location_id, optional
  -> challenge_type
  -> prompt
  -> answer_data
  -> optional_hint
  -> difficulty
  -> media references
  -> validation_rules
  -> status
```

Challenge validation is server-side for progression-sensitive outcomes.

## 15. Progression, Collections, Achievements, and Rewards

### 15.1 Progression flow

```text
User visits Rumtek
  -> visit submitted
  -> verification succeeds
  -> visit recorded
  -> quest objectives evaluated
  -> XP or points evaluated
  -> collectibles evaluated
  -> achievements evaluated
  -> quest progress updated
  -> UI receives updated progress
```

Artifact Quest progression follows the same server-authoritative pattern:

```text
Artifact submission verified
  -> artifact objective completed
  -> quest progress updated
  -> quest completion evaluated
  -> XP or points evaluated
  -> badge/achievement evaluated
  -> collectible/reward evaluated
  -> updated progress returned to UI
```

Visit, progression, quest, collectible, achievement, and reward are separate domain concepts.

Artifact, ArtifactSubmission, QuestObjective, and Progression must also remain separate concepts. Verification of an artifact submission is the trigger for progression; it is not itself the progression record.

### 15.2 Scoring

TBD: The exact XP/point formula is not finalized.

The scoring model must be configurable and server-authoritative. React must never be able to send:

```text
xp += 100
```

as trusted state.

### 15.3 Collectibles

TBD: The exact meaning of collectibles is not finalized.

Potential meanings:

- Digital destination souvenirs.
- Cultural artifacts.
- Cultural concepts.
- Location-based collectibles.
- Event or quest collectibles.

Conceptual fields:

```text
Collectible
  -> id
  -> title
  -> description
  -> region_id
  -> associated_location_id, optional
  -> media reference
  -> rarity, optional
  -> unlock_condition
```

### 15.4 Achievements

Achievements are user-level milestones.

Examples:

- Complete a district quest set.
- Discover a certain number of locations.
- Complete a cultural trail.
- Unlock a collection.
- Visit a defined group of destinations.

Rules remain configurable.

### 15.5 Rewards

TBD: Real-world rewards are not frozen.

Potential reward types:

- Digital badge.
- Digital collectible.
- Coupon.
- Local business offer.
- Event pass.
- Souvenir.

If rewards are implemented, eligibility and redemption must be verified server-side. Duplicate redemption must be prevented transactionally.

## 16. Profile and Journey

DECIDED: Profile is region-agnostic.

The profile should represent the user's global account and regional journeys.

```text
User
  -> Global Profile
  -> Region Journeys
       -> Sikkim
       -> future region
  -> Visit Logs
  -> Photos
  -> Quest Progress
  -> Collections
  -> Achievements
  -> Statistics
```

Profile screens may be inspired by Letterboxd-style personal logging and history presentation, adapted to tourism.

Potential profile sections:

- Journey overview.
- Visited locations.
- Visit log timeline.
- User photos.
- Quest progress.
- Collections.
- Achievements.
- Region-specific progress.

Social/profile sharing behavior is TBD.

## 17. Exploration Menu and Navigation

### 17.1 Contextual map menu

DECIDED: On the district exploration map, a persistent three-bar or three-dot menu appears in a corner.

Menu items:

```text
HOME
MAP
QUESTS
PROFILE
```

### 17.2 Home

Returns to the cinematic Sikkim opening and district-selection experience.

This is navigation only. It does not reset user progress.

### 17.3 Map

Returns to the currently selected district map.

```text
currentDistrict = Gangtok
MAP -> Gangtok Map

currentDistrict = Namchi
MAP -> Namchi Map
```

The map screen is a reusable component driven by selected district data.

### 17.4 Quests

Opens the quest system for the current district or region context.

### 17.5 Profile

Opens the user's profile and journey history. The profile is not tied only to Sikkim.

## 18. Frontend Architecture

### 18.1 Stack

DECIDED:

- React.
- TypeScript.
- REST API client for FastAPI.
- Mobile-first responsive styling.
- Browser-compatible media/map rendering layer.

Routing library, state-management library, animation library, and map-rendering technology are TBD.

### 18.2 Feature organization

Do not create primary architecture like:

```text
GangtokPage
RumtekPage
EncheyPage
NamchiPage
```

Prefer reusable feature modules:

```text
App
  -> Router
  -> Auth
  -> Home
      -> CinematicOpening
  -> DistrictExplorer
      -> DistrictSelection
      -> DistrictMap
          -> MapArtwork
          -> DistrictBoundary
          -> LocationMarkers
          -> MapMenu
  -> Locations
      -> LocationExperience
      -> LocationGallery
      -> VisitLogger
  -> Artifacts
      -> ArtifactDetail
      -> ArtifactSubmission
  -> Quests
      -> QuestList
      -> QuestProgress
      -> QuestDetails
  -> Profile
      -> Journey
      -> VisitLog
      -> Collections
      -> Achievements
  -> Shared
      -> UI
      -> Forms
      -> LoadingStates
      -> ErrorStates
```

### 18.3 Frontend responsibilities

The frontend owns:

- Rendering.
- Navigation.
- Animations.
- Cinematic presentation.
- Map presentation.
- Location markers.
- Forms.
- User interaction.
- API calls.
- Temporary UI state.
- Displaying server state.
- Loading, empty, success, error, and retry states.

The frontend does not own authoritative:

- XP calculation.
- Quest completion.
- Reward eligibility.
- Visit verification.
- Authorization.
- Permanent progression state.

## 19. Backend Architecture

### 19.1 Stack

DECIDED:

- FastAPI.
- Python.
- REST API.
- Supabase/PostgreSQL persistence.

### 19.2 Backend style

The backend should be a modular monolith organized around domain modules, not one giant controller and not separate microservices for the MVP.

Concept:

```text
Client
  -> API / Application Layer
  -> Domain Services
  -> Repositories / Persistence
  -> PostgreSQL / Supabase
```

### 19.3 Proposed backend modules

PROPOSED:

- Auth.
- Region.
- District.
- Location.
- Artifact.
- Media.
- Visit.
- Verification.
- Quest.
- Experience.
- Challenge.
- Progression.
- Collection.
- Achievement.
- Reward.
- Profile.
- Content/Admin.
- Analytics.
- Audit.

### 19.4 Backend responsibilities

The backend owns:

- Authentication integration and user identity validation.
- Authorization checks.
- Server-side request validation.
- Location and content retrieval.
- Visit creation and verification orchestration.
- Challenge submission validation.
- Quest progress evaluation.
- Artifact submission verification orchestration.
- XP/points calculation.
- Collectible and achievement unlocks.
- Reward eligibility and redemption.
- Upload signing and media validation flow.
- Administrative content workflows.
- Audit logging for sensitive actions.
- Data consistency and idempotency.

## 20. Data and Database Architecture

### 20.1 Database direction

DECIDED: Use Supabase + PostgreSQL.

Supabase may provide:

- Authentication.
- PostgreSQL database.
- Row Level Security.
- Database policies.
- Object storage.
- Edge/platform services if justified later.

FastAPI remains the application/backend layer.

### 20.2 Conceptual entities

The final physical schema is TBD, but the database model should be derived from these conceptual entities:

```text
users
roles
user_roles

regions
districts

locations
artifacts
location_media
location_hours
location_categories

map_assets
map_pin_positions

visits
visit_photos
visit_verification_attempts
artifact_submissions

quests
quest_objectives
quest_locations
user_quest_progress
user_quest_objective_progress

experiences
challenges
challenge_options
challenge_submissions

user_progress

collectibles
user_collectibles

achievements
user_achievements

rewards
reward_redemptions
businesses

content_sources
content_review_statuses
audit_logs
analytics_events
```

### 20.3 Core relationships

```text
Region 1 -> many Districts
District 1 -> many Locations
District 1 -> many Quests
Location 1 -> many LocationMedia
Location 1 -> many Artifacts
Location 1 -> many Experiences
Location 1 -> many Challenges

Quest many -> many Locations
Quest 1 -> many QuestObjectives
QuestObjective 0 or 1 -> 1 Artifact, when the objective targets a specific artifact

User 1 -> many Visits
Visit 1 -> many VisitPhotos
Visit many -> 1 Location
User 1 -> many ArtifactSubmissions
Artifact 1 -> many ArtifactSubmissions

User 1 -> many UserQuestProgress records
User 1 -> many UserCollectibles
User 1 -> many UserAchievements

Reward 1 -> many RewardRedemptions
Business 1 -> many Rewards, if business rewards are enabled
```

Many-to-many relationships should use join tables, for example:

- `quest_locations`.
- `location_collectibles`, if collectibles attach to many locations.
- `quest_objectives.required_artifact_id`, when an objective targets a specific artifact.
- `user_roles`.

### 20.4 Content status

Tourism and cultural content should support governance:

- Draft.
- In review.
- Approved.
- Published.
- Archived.

Cultural and historical claims should have review capability before publication.

## 21. API Architecture

### 21.1 Boundary

The frontend talks to FastAPI through REST endpoints. FastAPI applies application rules and talks to PostgreSQL/Supabase.

```text
User Browser
  -> React + TypeScript
  -> REST API
  -> FastAPI
  -> Domain/Application Services
  -> PostgreSQL / Supabase
```

### 21.2 Conceptual endpoint groups

These are conceptual and not final contracts:

```text
GET  /regions
GET  /regions/{id}

GET  /districts
GET  /districts/{id}
GET  /districts/{id}/locations
GET  /districts/{id}/map

GET  /locations/{id}
GET  /locations/{id}/media
GET  /locations/{id}/experiences
GET  /locations/{id}/quests
GET  /locations/{id}/artifacts

POST /locations/{id}/visits
GET  /users/me/visits
GET  /visits/{id}

POST /visits/{id}/photos

GET  /users/me/quests
GET  /quests/{id}
POST /quests/{id}/start, if explicit start is needed

POST /challenges/{id}/submit
POST /artifacts/{id}/submissions
GET  /artifact-submissions/{id}

GET  /users/me/progress
GET  /users/me/collections
GET  /users/me/achievements

GET  /users/me/profile

GET  /rewards
POST /rewards/{id}/redeem
```

Detailed request/response schemas, error format, pagination, filtering, rate limits, and idempotency behavior should be documented in `API.md` before implementation.

### 21.3 API design rules

- Use authentication for user-specific operations.
- Do not expose admin operations to tourist users.
- Validate all request data server-side.
- Use idempotency keys for retryable mutation operations where appropriate.
- Return enough state for the frontend to update without guessing progression.
- Avoid leaking private user records.

## 22. Authentication, Authorization, and RLS

### 22.1 Roles

Potential roles:

- Tourist / Explorer.
- Administrator.
- Content Manager / Tourism Stakeholder.
- Local Business / Reward Partner.

Exact permissions are TBD.

Authentication answers:

```text
Who is the user?
```

Authorization answers:

```text
What is this user allowed to do?
```

### 22.2 Security boundary

Do not rely on frontend checks alone. React is an untrusted client.

```text
React
  -> FastAPI authorization
  -> Supabase/PostgreSQL
  -> RLS / database policies
```

### 22.3 Row Level Security

Supabase/PostgreSQL should use RLS and database policies where appropriate.

Users must not be able to access another user's private:

- Visit logs.
- Visit photos.
- Progress.
- Collections.
- Achievements.
- Profile/private journey data.

Admin/content operations require role-based authorization and audit logging.

## 23. Media Architecture

Media includes:

- Cinematic opening assets.
- District artwork.
- District map artwork.
- Location photos.
- Official cultural/story media.
- User visit photos.
- Artifact reference images.
- Artifact proof photos.
- Challenge media.
- 360-degree media.
- Collectible artwork.

Large media should use object storage and CDN delivery. The database stores metadata and references, not large binary files.

```text
Database row
  -> media metadata and storage path
  -> object storage / CDN
  -> optimized asset delivered to browser
```

Media requirements:

- Responsive sizes.
- WebP/AVIF where appropriate.
- Video compression for cinematic assets.
- Lazy loading.
- Signed URLs or protected storage where needed.
- Separate official media and user-generated content.
- Fallback assets for low bandwidth or unsupported formats.

## 24. Performance Architecture

The platform is media-heavy and mobile-first.

Requirements:

- Code splitting by route/feature.
- Lazy load district and location media.
- Do not load all Sikkim assets on the first screen.
- Use responsive image sizes.
- Compress images and video.
- Cache relatively static tourism content.
- Paginate or filter large lists.
- Optimize map rendering.
- Avoid unnecessary GPS polling.
- Defer non-critical analytics.
- Provide cinematic fallback.
- Respect reduced-motion preferences.
- Optimize 360-degree assets if used.

Initial load target should be defined during performance budgeting before implementation.

## 25. Accessibility Architecture

The game-like visual style must not make the product unusable.

Requirements:

- Sufficient text contrast.
- Readable typography.
- Keyboard accessibility where practical.
- Accessible form controls.
- Alt text for meaningful images.
- Do not rely only on color for status.
- Reduced-motion support.
- Text alternatives for audio-dependent experiences.
- Clear loading, failure, retry, and empty states.
- Touch targets sized for mobile.

Map screens should provide an accessible fallback where practical, such as a list of visible locations for the current district.

## 26. Offline and Low Connectivity

Sikkim may have inconsistent connectivity.

FUTURE/TBD: Offline-first is not frozen for MVP, but the architecture should leave room for:

```text
Download destination content
  -> limited-connectivity exploration
  -> local temporary state
  -> connection restored
  -> synchronize with backend
```

If offline support is approved later, the team must define:

- Which data can be cached.
- Which actions can be queued.
- Which actions require online verification.
- Conflict handling.
- Sync security.
- Expiration of cached tourism information.

## 27. Content Management

Tourism and cultural content requires governance.

Content should have:

- Source or owner.
- Review status.
- Publication state.
- Update capability.
- Auditability.
- Cultural/historical review where appropriate.

Potential admin-managed content:

- Regions.
- Districts.
- Locations.
- Location media.
- Stories.
- Challenges.
- Quests/circuits.
- Collectibles.
- Rewards.
- Businesses.

TBD: Whether a full admin dashboard is required in the MVP.

## 28. Analytics

Potential aggregate analytics:

- Popular destinations.
- Quest completion.
- Challenge completion.
- Collection engagement.
- Reward redemption.
- Lesser-known destination discovery.
- Drop-off points in the exploration flow.

Analytics must be privacy-aware and data-minimized. Do not retain precise location history unless a specific approved feature requires it.

## 29. Security, Integrity, and Edge Cases

### 29.1 Security requirements

- Secure session/auth handling.
- Role-based authorization.
- Server-side validation.
- Rate limiting for sensitive actions.
- Secure upload validation.
- Protection against malicious files.
- Server-side progression validation.
- Reward redemption protection.
- Audit logs for administrative changes.
- Privacy controls for user-generated content.
- Minimal retention of precise location evidence.

### 29.2 Edge cases

The system must account for:

- User denies location permission.
- GPS unavailable.
- GPS inaccurate.
- Location spoofing.
- Network failure.
- Verification failure.
- Repeated verification attempts.
- QR misuse if QR is selected.
- Artifact QR mismatch.
- Duplicate artifact submission.
- Pending manual review delaying quest progress.
- User refreshes during a challenge.
- Multiple tabs.
- Multiple devices.
- Duplicate quest completion.
- Duplicate reward redemption.
- Reward becoming unavailable.
- Location temporarily inaccessible.
- Outdated tourism information.
- Location removed after users visited.
- Invalid challenge data.
- External media or map service failure.
- User deletion.
- Concurrent progress updates.

Major actions should support:

```text
Loading
Success
Failure
Retry
Empty state
```

## 30. Idempotency and Transactions

Retryable operations must not accidentally duplicate progress.

Examples:

- Visit submission.
- Artifact submission.
- Challenge completion.
- Quest completion.
- Reward redemption.
- Progression updates.
- Photo upload finalization.

Example risk:

```text
POST visit
  -> network timeout
  -> frontend retries
  -> XP must not be awarded twice
```

Design requirements:

- Use idempotency keys for critical mutation endpoints where appropriate.
- Use unique constraints for one-time unlocks.
- Prevent duplicate objective completion from repeated artifact submissions.
- Use database transactions for multi-record progression updates.
- Use server-side checks before issuing rewards.
- Make reward redemption atomic.
- Store enough audit data to investigate duplicate or suspicious actions.

## 31. Deployment Architecture

Conceptual deployment:

```text
User Browser
  -> CDN / web hosting
  -> React frontend
  -> FastAPI backend
  -> Supabase / PostgreSQL
  -> Object storage / CDN for media
```

TBD:

- Frontend hosting provider.
- Backend hosting provider.
- CDN provider.
- Domain and TLS setup.
- CI/CD workflow.
- Observability stack.

## 32. Repository Structure

PROPOSED:

```text
project/
  docs/
    ARCHITECTURE.md
    ROADMAP.md
    API.md
    DATABASE.md
    REQUIREMENTS.md
  frontend/
    src/
      app/
      features/
        home/
        districts/
        map/
        locations/
        visits/
        quests/
        profile/
        progression/
      shared/
        ui/
        api/
        hooks/
        types/
        utils/
  backend/
    app/
      api/
      core/
      modules/
        auth/
        regions/
        districts/
        locations/
        media/
        visits/
        artifacts/
        verification/
        quests/
        experiences/
        challenges/
        progression/
        collections/
        achievements/
        rewards/
        profiles/
        admin/
        analytics/
      models/
      schemas/
      repositories/
      services/
  shared/
    contracts/
```

This is a proposed structure, not a final implementation mandate. Domain boundaries are more important than exact folder names.

## 33. Implementation Strategy

Do not implement everything at once. Use vertical, independently testable milestones.

Before each milestone:

1. Read `ARCHITECTURE.md`.
2. Read `ROADMAP.md`.
3. Understand only the current milestone.
4. Design the feature against the approved architecture.
5. Implement only that milestone.
6. Test it.
7. Review the code.
8. Update documentation if required.
9. Commit meaningfully.
10. Stop before starting unrelated milestones.

Never silently modify a frozen architectural decision. Architecture changes must be recorded in the Architecture Decision Log.

## 34. Proposed Implementation Phases

### Phase 0 - Requirements and Architecture

- Finalize requirements.
- Freeze core architecture.
- Define unresolved MVP decisions.
- Create API contract.
- Create database design.
- Define design system.

### Phase 1 - Foundation

- Repository structure.
- React app.
- FastAPI app.
- Supabase project.
- Environment variables.
- Authentication foundation.
- Basic API/database connection.
- Git workflow.

### Phase 2 - Cinematic Home

- Sikkim hero.
- Animation or cinematic media.
- Explore action.
- Mobile responsiveness.
- Transition into district selection.
- Reduced-motion and low-bandwidth fallback.

### Phase 3 - District Selection

- District data model.
- District sections.
- District themes.
- Smooth vertical scrolling.
- District selection action.

### Phase 4 - District Map

- Map artwork system.
- Selected district highlighting.
- Neighboring district background.
- Location marker rendering.
- Map menu.
- Location data API integration.

### Phase 5 - Location Experience

- Location details.
- Gallery.
- Hours.
- Cultural information.
- Visit logger.
- Visit photo upload flow.
- Artifact detail/clue presentation for Artifact Quests.

### Phase 6 - Verification

- Implement MVP GPS + QR + Photo verification for Artifact Quests.
- Support manual/admin photo review for artifact submissions.
- Handle permission, network, and failure states.
- Keep high-value progression server-authoritative.
- Keep AI/image recognition as a future extension, not an MVP dependency.

### Phase 7 - Quest Engine

- Freeze initial quest types.
- Implement quest model.
- Implement objectives.
- Support objectives that reference a specific artifact.
- Implement quest progress.
- Implement instructions/details.
- Integrate "View on Map."

### Phase 8 - Progression

- XP/points.
- Collections.
- Achievements.
- Quest completion.
- Atomic progression updates.

### Phase 9 - Profile

- Journey overview.
- Visit history.
- Photos.
- Collections.
- Achievements.
- Region-aware profile model.

### Phase 10 - Optional Systems

Only if approved:

- Rewards.
- Admin dashboard.
- AI features.
- Offline mode.
- Community.
- Leaderboards.
- Local business partner flows.

## 35. Risks to Challenge

The team should explicitly resist the following:

- Do not build all of Sikkim before proving one end-to-end journey.
- Do not hardcode individual locations into React.
- Do not make AR a core dependency unless it materially helps.
- Do not add AI merely for presentation or marketing.
- Do not rely exclusively on GPS for high-value rewards.
- Do not build a complex social network unless justified.
- Do not sacrifice mobile performance for visual effects.
- Do not collect unnecessary precise location history.
- Do not create unnecessary microservices.
- Do not create separate application logic for every district.
- Do not prematurely introduce complex infrastructure that the MVP does not need.

## 36. MVP Boundary Recommendation

PROPOSED: The MVP should prove the complete loop with a limited set of representative destinations rather than attempting full regional coverage immediately.

Recommended MVP proof:

- Cinematic home.
- District selection.
- One district map.
- A small set of curated locations.
- Location experience screen.
- Visit logger.
- Artifact Quest flow for at least one specific artifact inside a location/monument.
- GPS + QR + Photo verification with manual/admin review support.
- One quest/circuit.
- At least one progression event.
- One collection or achievement unlock.
- Profile summary of the journey.

Rewards, AI, full admin, public community, leaderboards, and offline mode should remain optional unless the SIH requirements make them necessary.

## 37. Architecture Decision Log

| ID | Decision | Status | Rationale |
| --- | --- | --- | --- |
| AD-001 | Sikkim is the initial product region. | DECIDED | SIH implementation focuses on Sikkim. |
| AD-002 | Architecture supports future regions/states. | DECIDED | Prevents a one-off Sikkim-only codebase. |
| AD-003 | Mobile-first web platform. | DECIDED | Tourists are likely to use phones during travel. |
| AD-004 | Frontend uses React + TypeScript. | DECIDED | Current stack direction. |
| AD-005 | Backend uses FastAPI + Python. | DECIDED | Current stack direction and suitable modular API layer. |
| AD-006 | Database uses Supabase/PostgreSQL. | DECIDED | Current persistence direction with auth, RLS, and storage options. |
| AD-007 | Product starts with cinematic Sikkim opening. | DECIDED | Establishes exploration-game identity. |
| AD-008 | District selection is vertical and mobile-first. | DECIDED | Fits phone interaction better than desktop-first horizontal navigation. |
| AD-009 | District maps are custom illustrated exploration maps. | DECIDED | Product should not feel like generic Google Maps tourism. |
| AD-010 | Selected district is visually highlighted. | DECIDED | Keeps the active exploration area clear. |
| AD-011 | Map artwork is separated from location data. | DECIDED | Enables data-driven location updates. |
| AD-012 | Location pins are interactive and game-styled. | DECIDED | Pins are core exploration affordances. |
| AD-013 | Pins open dedicated location experiences. | DECIDED | Location content needs a rich screen, not a tiny popup. |
| AD-014 | Visit is separate from Location. | DECIDED | Supports history, photos, verification, progression, and privacy. |
| AD-015 | Visit logging is Letterboxd-inspired. | DECIDED | Personal logging model fits travel history. |
| AD-016 | User photos attach to visits. | DECIDED | Keeps UGC separate from official tourism media. |
| AD-017 | Map menu contains Home, Map, Quests, Profile. | DECIDED | Defines contextual navigation for exploration. |
| AD-018 | Profile is region-agnostic. | DECIDED | Supports future regions under one user account. |
| AD-019 | Quest architecture is reusable and data-driven. | DECIDED | Avoids hardcoded destination logic. |
| AD-020 | Initial backend should be a modular monolith. | DECIDED | Practical for SIH/student team and avoids premature distributed complexity. |
| AD-021 | Artifact Quests are supported. | DECIDED | Quests can target a specific artifact inside a location/monument. |
| AD-022 | MVP Artifact Quest verification uses GPS + QR + Photo. | DECIDED | GPS confirms proximity, QR identifies the artifact, and photo proof supports review. |
| AD-023 | Photo verification may start with manual/admin review. | DECIDED | Avoids making AI image recognition an MVP dependency. |
| AD-024 | Exact non-artifact quest types. | PENDING | Must be decided before broader quest engine implementation. |
| AD-025 | XP/scoring formula. | PENDING | Needs product balancing and abuse review. |
| AD-026 | Real-world rewards. | PENDING | Requires operational/business validation. |
| AD-027 | Rating/review system. | PENDING | Could change moderation and profile requirements. |
| AD-028 | Public/private community model. | PENDING | Requires privacy and moderation decisions. |
| AD-029 | Admin dashboard scope. | PENDING | Full dashboard may exceed MVP needs. |
| AD-030 | Offline mode. | PENDING | Important in Sikkim but not yet frozen for MVP. |
| AD-031 | AI features. | PENDING | Must have a defined user value before implementation and must not be required for MVP artifact verification. |
| AD-032 | Leaderboards/social features. | PENDING | Could increase complexity and moderation burden. |
| AD-033 | Cinematic rendering technology. | PENDING | Must balance quality, mobile performance, and team capability. |
| AD-034 | Map rendering technology. | PENDING | Must support custom illustrated maps and mobile performance. |
| AD-035 | Third-party map provider. | PENDING | Not required unless it supports the custom map architecture. |
| AD-036 | Hosting/deployment provider. | PENDING | To be selected during deployment planning. |

## 38. Unresolved Questions Before Build Freeze

These must be answered before implementation reaches the affected milestone:

- Which quest types are mandatory in the first release?
- What is the initial XP/scoring model?
- What exactly counts as a collectible?
- Are real-world rewards required in the MVP?
- Is public sharing of visit logs/photos allowed?
- Is a rating/review system included?
- Who can create/edit tourism content?
- Is a full admin dashboard required for MVP?
- Is offline support required for MVP?
- Are AI features required by the SIH problem statement?
- Are leaderboards or social features required?
- What are the performance budgets for initial load and map screens?
- What rendering technology will be used for the cinematic opening?
- What rendering technology will be used for district maps?
- Which hosting providers will be used?

## 39. Consistency Rules

During implementation, use these checks to avoid architectural drift:

- A new location should be content/data, not a new hardcoded page.
- A new district should reuse the district selection and district map architecture.
- A new quest should reference reusable objectives, locations, artifacts, experiences, or challenges.
- A visit should create a visit record, not mutate the location entity as user-specific state.
- An artifact submission should create proof and verification records, not directly award progression from the frontend.
- User photos should attach to visits, not official media.
- Progression should happen through backend services.
- Rewards should require server-side eligibility and redemption checks.
- Map artwork should never become the source of location truth.
- Profile should remain region-aware, not Sikkim-only.
- Pending decisions must be recorded before implementation depends on them.

## 40. Final System Summary

```text
User Browser
  -> React + TypeScript
      -> Cinematic Home
      -> District Selection
      -> District Map
      -> Location Experience
      -> Visit Logger
      -> Artifact Detail / Submission
      -> Quests
      -> Profile
  -> REST API
  -> FastAPI + Python
      -> Auth
      -> Region/District/Location/Artifact Services
      -> Visit and Verification Services
      -> Quest/Challenge Services
      -> Progression Services
      -> Collection/Achievement/Reward Services
      -> Profile and Content Services
  -> Supabase/PostgreSQL
      -> tourism content
      -> user visits
      -> artifacts and artifact submissions
      -> photos and media metadata
      -> quests and objectives
      -> progression
      -> collections
      -> achievements
      -> rewards, if enabled
```

The architectural goal is to build a Sikkim tourism experience that feels like an exploration game while keeping content, maps, locations, artifacts, submissions, visits, verification, progression, quests, collections, achievements, rewards, and user profile data as separate reusable systems.

Sikkim is the first region. The platform should be strong enough to support future regions primarily through new content, assets, and configuration rather than a new application architecture.
