# EasyChat CRM — Enterprise Platform

EasyChat CRM is a conversation-first Customer Relationship Management and enterprise customer communication platform. It integrates omnichannel messaging (WhatsApp, Live Chat, Email, SMS, Telephony), sales pipeline management, customer 360 profiles, support ticketing with SLA policy enforcement, workflow automation, and grounded AI customer support.

---

## 🏗️ Architecture & Monorepo Structure

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

## 📋 Prerequisites & Dependencies

- **Node.js**: v18.17.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **PostgreSQL** or **SQLite** (bundled local fallback supported)
- **Redis** (optional, for BullMQ worker queue processing)

---

## 🚀 Installation & Setup

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
   Copy the example configuration to your local environment:
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

## 🔨 Build Instructions

To build all applications, microservices, and shared packages in the monorepo:

```bash
npm run build
```

---

## 💻 Running the Application Locally

### Option A: Run Full Monorepo Simultaneously
```bash
npm run dev
```

### Option B: Run Services Individually

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

---

## 🧪 Testing & Quality Assurance

Run the automated Jest unit test suites across all workspaces:

```bash
npm test
```

To run tests specifically for the API service:
```bash
npm run test --workspace=services/api
```

---

## 🔐 Security & License

This software and associated documentation files are proprietary and confidential. Unauthorized copying, distribution, or modification is strictly prohibited.

**License**: Proprietary (UNLICENSED)
