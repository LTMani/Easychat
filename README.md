# EasyChat CRM — Enterprise Platform

EasyChat CRM is a conversation-first Customer Relationship Management and enterprise customer communication platform. It integrates omnichannel messaging (WhatsApp, Live Chat, Email, SMS, Telephony), sales pipeline management, customer 360 profiles, support ticketing with SLA policy enforcement, workflow automation, and grounded AI customer support.

---

## Architecture & Monorepo Structure

The repository is organized as an enterprise TypeScript monorepo using npm workspaces:

```
├── apps/
│   └── web/                   # Next.js 14 App Router dashboard & customer workspace
├── services/
│   ├── api/                   # NestJS enterprise REST API and WebSocket real-time gateway
│   └── worker/                # BullMQ asynchronous background job processor
├── packages/
│   ├── auth/                  # JWT/Bcrypt authentication and RBAC permissions
│   ├── database/              # Prisma ORM schema, migrations, seeders, and SQLite/PostgreSQL models
│   ├── sdk/                   # TypeScript SDK client for third-party developer integrations
│   └── shared/                # Zod schemas, DTOs, enums, math/currency utilities
└── docs/                      # Enterprise architecture guides, runbooks, and disaster recovery blueprints
```

---

## Dependencies

- **Node.js**: v18.17.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **PostgreSQL** or **SQLite** (bundled local fallback supported)
- **Redis** (optional, for BullMQ worker queue processing)
- **Docker** & **Docker Compose** (for containerized deployment)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LTMani/Easychat.git
   cd Easychat
   ```

2. **Install all workspace dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp example.env .env
   ```

4. **Initialize and Seed Database**:
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

---

## Build

To build all applications, microservices, and shared packages in the monorepo:

```bash
npm run build
```

Or using Docker:
```bash
docker build -t easychat-platform:latest .
```

---

## Run

### Option A: Run Full Monorepo Simultaneously
```bash
npm run dev
```

### Option B: Run via Docker Compose
```bash
docker-compose up -d
```

### Option C: Run Services Individually

- **Web Frontend Dashboard (Next.js - Port 3000)**:
  ```bash
  npm run dev:web
  ```
  Accessible at: `http://localhost:3000`

- **Backend REST API (NestJS - Port 4000)**:
  ```bash
  npm run dev:api
  ```
  Accessible at: `http://localhost:4000`

- **Background Worker**:
  ```bash
  npm run dev:worker
  ```

---

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign in or register a new workspace at `http://localhost:3000/register`.
3. Explore the omnichannel live chat, AI chatbot builder, sales pipeline, VoIP softphone, and enterprise compliance vault.
4. Interact with the REST API at `http://localhost:4000/v1` or use the TypeScript SDK in `packages/sdk`.

---

## Testing

Run the automated Jest test suites across all workspaces:

```bash
npm test
```

To run tests specifically for the API service:
```bash
npm run test --workspace=services/api
```

---

## License

This software and associated documentation files are proprietary and confidential. Unauthorized copying, distribution, or modification is strictly prohibited.

**License**: Proprietary (UNLICENSED)
