# Bug Tracker

A full-stack bug tracking application built with React, Node.js, Express, and PostgreSQL.

## Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma

## Features

- Create, read, update, and delete bugs
- Filter bugs by status (Open, In Progress, Closed)
- Filter bugs by priority (Low, Medium, High)
- Responsive and clean UI

## API Endpoints

| Method |     Path      |  Description   |
|--------|---------------|----------------|
| GET    | /api/bugs     | Get all bugs   |
| GET    | /api/bugs/:id | Get bug by ID  |
| POST   | /api/bugs     | Create new bug |
| PUT    | /api/bugs/:id | Update bug     |
| DELETE | /api/bugs/:id | Delete bug     |

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL

### Setup

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/bug-tracker.git
cd bug-tracker
```

1. Setup the backend

```bash
cd server
npm install
```

1. Create a `.env` file in the server directory

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/bug_tracker"
```

1. Run database migration

```bash
npx prisma migrate dev
```

1. Start the backend server

```bash
npx ts-node src/index.ts
```

1. Setup the frontend

```bash
cd ../client
npm install
npm start
```

1. Open <http://localhost:3000> in your browser

## Screenshot

![Bug Tracker Screenshot](screenshot.png)
