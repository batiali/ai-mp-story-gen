Core Concept

A collaborative platform where players shape AI-generated narratives through group decision-making. Each choice meaningfully impacts the story's progression, with the AI adapting dynamically to the group's decisions.

Stories are designed to reach a satisfying conclusion within a predetermined number of story beats, ensuring narrative cohesion and engagement.

Project Structure

📁 Project Organization

-   /client # React frontend application
-   /server # Node.js + Express backend
-   /shared-types # TypeScript interfaces shared between client and server
-   /docs # Documentation and API specifications

Client Implementation

🎨 UI/UX Stack

-   Material UI (MUI) v5 - Modern React component library
-   Emotion - Styled components and theming
-   React Query - Server state management

📱 Key Pages & Components

1. Authentication
    - Login/Register
    - Profile Management
2. Story Experience
    - Story Lobby / Browse Active Stories
    - Story Room (Main gameplay interface)
    - Choice Voting Interface
    - Story History & Branching Visualization
3. Community
    - Player Profiles
    - Story Archives
    - Achievement Showcase

-- Server Architecture --

🔧 Backend Stack

-   Express.js - API framework
-   MongoDB - Story and game state persistence
-   OpenAI SDK - Story generation
-   Supabase - Authentication & user management

-- Authentication & User Management --

🔐 Supabase Integration

-   Email/Password authentication
-   OAuth providers (Google, GitHub)
-   Row Level Security (RLS) for data protection
-   User profile management
-   Session handling

-- Tech Stack --

✅ Core Technologies

-   TypeScript - End-to-end type safety
-   MERN Stack (MongoDB + Express.js + React + Node.js)
-   OpenAI - AI story generation
-   Supabase - Authentication & user management
-   Material UI - Component library & theming

1️⃣ Real-Time Story Voting

-   Dynamic voting system based on active player count
-   Real-time vote tracking and visualization
-   Automatic progression when vote threshold is reached
-   Configurable voting timeouts

2️⃣ Collaborative Storytelling

-   Synchronized story progression for all players
-   Real-time choice presentation and selection
-   Visual feedback for group decisions
-   Chat system for player discussion

3️⃣ Persistent World & Choice Impact

-   MongoDB-backed story state persistence
-   Branching narrative paths based on group decisions
-   AI memory system for tracking world state
-   Story checkpoints and resumable sessions
