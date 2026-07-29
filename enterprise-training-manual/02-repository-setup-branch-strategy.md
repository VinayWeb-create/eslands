# Document 02: Repository Setup & Branch Strategy

## Creating the Repository

The project starts with creating a professional Git repository.

## 2.1 Initialize the Repository

```bash
# Create project directory
mkdir eslands
cd eslands

# Initialize git
git init
```

Add remote:
```bash
git remote add origin https://github.com/VinayWeb-create/eslands.git
```

## 2.2 Project Structure

After initial setup, the repository looks like:

```
eslands/
├── client/                    # React SPA
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Route pages
│   │   ├── context/           # State providers
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # API config
│   │   ├── data/              # Static data
│   │   ├── assets/            # Images, icons
│   │   └── styles/            # Global CSS
│   ├── public/                # Static assets
│   ├── vercel.json            # SPA rewrites
│   └── vite.config.js         # Build config
├── server/                    # Express API
│   ├── config/                # DB connection
│   ├── controllers/           # Business logic
│   ├── middleware/             # Auth middleware
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API routes
│   └── server.js              # Entry point
└── .gitignore
```

## 2.3 Create Main Branches

```bash
# Development branch
git checkout -b dev
git push origin dev

# QA branch
git checkout -b qa
git push origin qa

# Working Acceptance branch
git checkout -b wa
git push origin wa

# User Acceptance Testing branch
git checkout -b uat
git push origin uat

# Production branch
git checkout -b prod
git push origin prod
```

## 2.4 Branch Strategy

```
prod          ← Production (live website)
│
uat           ← Client testing environment
│
wa            ← Business team validation
│
qa            ← QA team testing
│
dev           ← Integration branch
│
├── feature/home-page
├── feature/contact-api
├── feature/admin-login
├── feature/crm-dashboard
├── feature/lead-management
├── feature/quote-generation
├── bugfix/contact-email
└── hotfix/production-fix
```

### Branch Purposes

| Branch | Purpose | Deployed To | Who Merges Here |
|--------|---------|-------------|-----------------|
| dev | Integration | dev.eslands.com | Developers (via PR) |
| qa | Testing | qa.eslands.com | Tech Lead |
| wa | Business validation | wa.eslands.com | Project Manager |
| uat | Client approval | uat.eslands.com | Release Manager |
| prod | Live | www.eslands.com | Release Manager |

## 2.5 .gitignore Setup

```gitignore
node_modules
dist
.env
.DS_Store
*.log
*.mp4
*.avi
*.mov
client/node_modules
server/node_modules
```

## 2.6 Initial Commit

```bash
git add .
git commit -m "Initial commit: project structure"
git push origin dev
```

## 2.7 Feature Branch Workflow

When starting any feature:

```bash
# Always start from dev
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/home-page
```

### Actual Branches Used in This Project

```
feature/home-page          → Home page components
feature/contact-form       → Contact form + API
feature/admin-login        → CRM authentication
feature/crm-dashboard      → Dashboard with stats
feature/lead-management    → Lead CRUD + pipeline
feature/quote-generation   → Quote system
feature/mobile-hero-fix    → Mobile visibility fix
feature/careers-button     → UI tweaks
bugfix/contact-email       → Email sending fix
bugfix/api-url             → API URL fix
hotfix/cors-origin         → CORS configuration
```

## 2.8 Git Rules for the Team

1. **Never commit directly to dev** — Always use feature branches
2. **Pull before push** — `git pull origin dev` before pushing
3. **Commit often** — Small, descriptive commits
4. **One feature per branch** — Don't mix unrelated changes
5. **Delete merged branches** — Keep repository clean
6. **Tag releases** — `git tag v1.0.0` on production

## 2.9 Commit Message Convention

```
feat: add homepage hero section
fix: resolve contact form email issue
docs: add project documentation
refactor: improve CRM lead queries
chore: update dependencies
```

### Real Commits from This Project

```
52f0a81 feat: add comprehensive enterprise training manual
7a1db26 docs: complete 16-phase technical documentation
e231e96 feat: add CRM system with lead management and quotes
2d69f71 feat: add contact form with service selection and auto-lead creation
c81de27 fix: resolve 405 error on contact form
d6b2e7a fix: resolve deployment issues and add Vercel config
41e5ab4 feat: enhance mobile hero visibility and fix deployment
```
