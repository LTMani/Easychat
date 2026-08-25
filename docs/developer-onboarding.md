# EasyChat CRM — Developer Onboarding Guide

## Welcome to EasyChat Engineering

This guide walks new engineers through setting up the local development environment,
understanding the codebase structure, running tests, and making your first contribution.

---

## Development Environment Setup

### Step 1 — Install Required Tools

```bash
# Node.js 20 LTS (use nvm)
nvm install 20
nvm use 20
node --version  # should print v20.x.x

# PostgreSQL 15
# macOS: brew install postgresql@15
# Ubuntu: apt install postgresql-15
# Windows: Download installer from postgresql.org

# Redis 7
# macOS: brew install redis
# Ubuntu: apt install redis-server
# Windows: Use WSL2 or Docker

# Docker (for optional containerized setup)
docker --version  # Docker 24+
```

### Step 2 — Clone and Install Dependencies

```bash
git clone https://github.com/LTMani/Easychat.git
cd Easychat

npm install  # installs all workspace dependencies at root
```

### Step 3 — Set Up Environment Variables

```bash
# Copy templates
cp services/api/.env.example services/api/.env
cp apps/web/.env.example apps/web/.env.local

# Edit services/api/.env with your local values:
# DATABASE_URL="postgresql://your_user:your_pass@localhost:5432/easychat_dev"
# REDIS_URL="redis://localhost:6379"
# JWT_SECRET="any-random-256-bit-string"
```

### Step 4 — Initialize the Database

```bash
# Run Prisma migrations
npx prisma migrate dev --schema=packages/database/prisma/schema.prisma --name init

# Generate Prisma client
npx prisma generate --schema=packages/database/prisma/schema.prisma

# Seed demo data
npx prisma db seed --schema=packages/database/prisma/schema.prisma
```

### Step 5 — Start Development Servers

```bash
# Terminal 1 — API
npm run dev --workspace=services/api

# Terminal 2 — Worker
npm run dev --workspace=services/worker

# Terminal 3 — Web App
npm run dev --workspace=apps/web
```

Open `http://localhost:4000` in your browser.

---

## Project Structure Deep Dive

```
Easychat/
├── apps/
│   └── web/                        # Next.js 14 App Router frontend
│       ├── src/
│       │   ├── app/                # App router pages
│       │   │   ├── (dashboard)/    # Authenticated dashboard pages
│       │   │   ├── (auth)/         # Login/register pages
│       │   │   └── layout.tsx      # Root layout
│       │   └── components/         # Shared UI components
│       └── package.json
│
├── services/
│   ├── api/                        # NestJS REST API
│   │   ├── src/
│   │   │   ├── app.module.ts       # Root module
│   │   │   └── modules/            # Feature modules
│   │   │       ├── ai/             # AI/ML services
│   │   │       ├── automation/     # Workflow engine
│   │   │       ├── billing/        # Usage metering
│   │   │       ├── channels/       # WhatsApp, email adapters
│   │   │       ├── compliance/     # GDPR, data retention
│   │   │       ├── conversations/  # Chat routing
│   │   │       ├── crm/            # Contacts, deals, leads
│   │   │       ├── customer360/    # CDP timeline
│   │   │       ├── developer/      # API key management
│   │   │       ├── integrations/   # Zapier, Salesforce, HubSpot
│   │   │       ├── knowledge/      # Knowledge base
│   │   │       ├── marketing/      # Campaigns, A/B testing
│   │   │       ├── notifications/  # Push, SMS, webhooks
│   │   │       ├── onboarding/     # Setup wizard
│   │   │       ├── products/       # Product catalog
│   │   │       ├── quotes/         # CPQ, e-signing
│   │   │       ├── reports/        # BI analytics
│   │   │       ├── search/         # Vector search
│   │   │       ├── security/       # IP allowlist, rate limiting
│   │   │       ├── sla/            # SLA policies, breach detection
│   │   │       ├── sso/            # SAML, OAuth
│   │   │       ├── system/         # Health checks
│   │   │       ├── telephony/      # IVR, call analytics
│   │   │       └── tickets/        # Support ticket escalation
│   │   └── test/                   # Jest unit tests
│   │
│   └── worker/                     # BullMQ job processors
│       └── src/
│           ├── processors/         # One file per queue
│           └── main.ts             # Worker bootstrap
│
├── packages/
│   ├── database/                   # Prisma schema + client
│   │   └── prisma/
│   │       └── schema.prisma       # Single source of truth for DB schema
│   ├── shared/                     # Types, Zod schemas, event contracts
│   │   └── src/
│   │       ├── schemas/            # Zod validation schemas
│   │       └── types/              # TypeScript type definitions
│   ├── auth/                       # JWT + RBAC helpers
│   └── sdk/                        # Public TypeScript SDK
│
└── docs/                           # Architecture docs, API reference
```

---

## Making Changes

### Adding a New API Service

1. Create `services/api/src/modules/<feature>/<feature>.service.ts`
2. Add unit tests in `services/api/test/<feature>.spec.ts`
3. Import the service in `services/api/src/app.module.ts`
4. Add any Prisma queries using types from `packages/database`

### Adding a New Dashboard Page

1. Create `apps/web/src/app/(dashboard)/<page>/page.tsx`
2. Use `'use client'` directive if using React hooks
3. Add navigation link in `apps/web/src/components/AppSidebar.tsx`
4. Build to verify: `npm run build --workspace=apps/web`

### Adding a Background Job

1. Create processor: `services/worker/src/processors/<name>.processor.ts`
2. Register in `services/worker/src/main.ts`
3. Add job type to `packages/shared/src/types/events.ts`
4. Enqueue from the API service using BullMQ client

---

## Testing

### Running Tests

```bash
# Run all tests
npm test --workspace=services/api

# Run a specific test file
npx jest services/api/test/rate-limiter.spec.ts

# Run tests with coverage
npx jest --coverage --workspace=services/api

# Watch mode
npx jest --watch --workspace=services/api
```

### Test Architecture

All unit tests use Jest with NestJS Testing Module (`@nestjs/testing`).

Tests follow this pattern:
```typescript
describe('ServiceName', () => {
  let service: ServiceName;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceName],
    }).compile();
    service = module.get<ServiceName>(ServiceName);
  });

  it('should ...', () => { ... });
});
```

Database-dependent tests mock Prisma using `jest.mock('@easychat/database')`.

---

## Code Standards

### TypeScript
- Strict mode enabled (`"strict": true` in tsconfig)
- No `any` types — use `unknown` and narrow down
- Prefer `const` over `let`
- Use optional chaining `?.` and nullish coalescing `??`

### NestJS Services
- Inject `Logger` via constructor for structured logging
- Catch and rethrow as `NotFoundException` or `BadRequestException`
- Never expose raw Prisma errors to the HTTP layer

### Next.js Pages
- All interactive pages use `'use client'` directive
- Data fetching in Server Components where possible
- Use Tailwind CSS utility classes — no custom CSS files

### Git Commits
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`
- Keep commits atomic and focused

---

## Useful Commands

```bash
# Build all packages
npm run build --workspaces

# Type-check without building
npx tsc --noEmit -p services/api/tsconfig.json

# Database studio (visual table browser)
npx prisma studio --schema=packages/database/prisma/schema.prisma

# Count lines of code
node -e "..." # (see LOC script in README)

# Check git log
git log --oneline -20

# Lint
npx eslint services/api/src --ext .ts

# Format
npx prettier --write apps/web/src
```

---

## Common Issues & Fixes

### `P1001: Can't reach database server`
Ensure PostgreSQL is running: `pg_ctl status` or check Docker container.

### `ECONNREFUSED redis`
Ensure Redis is running: `redis-cli ping` should return `PONG`.

### `Module not found: @easychat/database`
Run `npm run build --workspace=packages/database` to generate the Prisma client.

### Next.js build error: `Cannot find module`
Check that all new pages import from existing, built packages.
Run `npm install` at root if workspace symlinks are broken.

### Prisma schema mismatch
Always check field names in `packages/database/prisma/schema.prisma` before writing queries.
Use `prisma migrate diff` to identify pending changes.
