# AI Narrative Platform

A collaborative platform where players shape AI-generated narratives through group decision-making. Each choice meaningfully impacts the story's progression, with the AI adapting dynamically to the group's decisions.

## Project Structure

-   `/client` - React frontend application
-   `/server` - Node.js + Express backend
-   `/shared-types` - TypeScript interfaces shared between client and server
-   `/docs` - Documentation and API specifications

## Tech Stack

-   **Frontend**: React, TypeScript, Material UI, Emotion, React Query, Socket.io Client
-   **Backend**: Node.js, Express, Socket.io, MongoDB, OpenAI SDK
-   **Authentication**: Supabase
-   **Deployment**: TBD

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   MongoDB (local or Atlas)
-   Supabase account
-   OpenAI API key

### Installation

1. Clone the repository

    ```
    git clone <repository-url>
    cd ai-narrative-platform
    ```

2. Install dependencies

    ```
    # Install client dependencies
    cd client
    npm install

    # Install server dependencies
    cd ../server
    npm install

    # Install shared-types dependencies
    cd ../shared-types
    npm install
    ```

3. Environment Setup

    - Create a `.env` file in the server directory based on the `.env.example` file
    - Add your MongoDB URI, OpenAI API key, and Supabase credentials

4. Start the development servers

    ```
    # Start the client (in one terminal)
    cd client
    npm start

    # Start the server (in another terminal)
    cd server
    npm run dev
    ```

### Using Docker Compose

Alternatively, you can use Docker Compose to run the entire application stack:

1. Make sure you have Docker and Docker Compose installed on your machine

2. Create a `.env` file in the root directory with your OpenAI API key and Supabase credentials:

    ```
    OPENAI_API_KEY=your_openai_api_key
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    ```

3. Build and start the containers:

    ```
    # Using Docker Compose directly
    docker-compose up -d

    # Or using npm script
    npm run docker:prod
    ```

4. Access the application:

    - Frontend: http://localhost
    - Backend API: http://localhost/api
    - MongoDB: mongodb://localhost:27017

5. To stop the containers:

    ```
    # Using Docker Compose directly
    docker-compose down

    # Or using npm script
    npm run docker:prod:down
    ```

### Development with Docker Compose

For development with hot reloading:

1. Use the development Docker Compose file:

    ```
    # Using Docker Compose directly
    docker-compose -f docker-compose.dev.yml up -d

    # Or using npm script
    npm run docker:dev
    ```

2. Access the development environment:

    - Frontend: http://localhost:3000
    - Backend API: http://localhost:5001/api
    - MongoDB: mongodb://localhost:27017

3. Any changes to the client or server code will automatically trigger a rebuild.

4. To stop the development containers:

    ```
    # Using Docker Compose directly
    docker-compose -f docker-compose.dev.yml down

    # Or using npm script
    npm run docker:dev:down
    ```

### Additional Docker Compose Commands

The project includes several npm scripts to make working with Docker Compose easier:

```
# Start development environment
npm run docker:dev

# Stop development environment
npm run docker:dev:down

# View development logs
npm run docker:dev:logs

# Start production environment
npm run docker:prod

# Stop production environment
npm run docker:prod:down

# View production logs
npm run docker:prod:logs

# Build production containers
npm run docker:build

# Build development containers
npm run docker:dev:build
```

## Features

-   Real-time collaborative storytelling
-   AI-generated narrative progression
-   Democratic voting system for story choices
-   Persistent world and choice impact
-   User authentication and profiles

## License

[MIT](LICENSE)
