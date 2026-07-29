# Document 09: Deployment Pipeline (Dev → QA → WA → UAT → PROD)

## DevOps Engineer Sets Up Deployment

After features are tested in dev, the DevOps Engineer configures automated deployments.

## 9.1 Deployment Architecture

```
Code Push to GitHub
        │
        ├──→ Vercel (auto) → Client SPA deployed
        │
        └──→ Render (auto) → Express API deployed
                │
                └──→ MongoDB Atlas (always running)
```

| Environment | Client URL | Server URL | Trigger |
|-------------|-----------|------------|---------|
| dev | dev.vercel.app | dev-api.onrender.com | Push to dev |
| qa | qa.vercel.app | qa-api.onrender.com | Push to qa |
| wa | wa.vercel.app | wa-api.onrender.com | Push to wa |
| uat | uat.vercel.app | uat-api.onrender.com | Push to uat |
| prod | www.eslands.com | eslands.onrender.com | Push to prod |

## 9.2 Dev Server Deployment

### Step 1: Merge Feature to Dev

```bash
# After PR approved
git checkout dev
git pull origin dev
git merge feature/home-page
git push origin dev
```

### Step 2: Auto-Deploy Triggers

Vercel and Render detect push to `dev` and auto-deploy.

### Step 3: Verify

```
dev.vercel.app → Homepage renders
dev-api.onrender.com/api/health → {"status":"OK"}
```

## 9.3 QA Server Deployment

### Merge to QA

```bash
git checkout qa
git pull origin qa
git merge dev
git push origin qa
```

### QA Environment Setup

Same Vercel/Render project, different deployment branch.

**Vercel:** Project Settings → Git → Production Branch = qa
**Render:** Settings → Auto Deploy → Branch = qa

### Verify

```
qa.vercel.app → Full website
qa-api.onrender.com/api/health → {"status":"OK"}
```

QA team begins testing.

## 9.4 WA (Working Acceptance) Deployment

### Merge to WA

```bash
git checkout wa
git pull origin wa
git merge qa
git push origin wa
```

### Business Team Validation

Business team checks at `wa.company.com`:
- Content accuracy
- Images and branding
- Services information
- Contact details
- SEO metadata
- Overall business requirements match

### If Approved

```bash
git checkout uat
git pull origin uat
git merge wa
git push origin uat
```

### If Changes Needed

```bash
# Business team requests change
git checkout dev
git checkout -b feature/content-update
# Make changes
git commit -m "feat: update service descriptions per business review"
git push origin feature/content-update
# PR → dev → qa → wa → uat (full cycle again)
```

## 9.5 UAT (User Acceptance Testing) Deployment

### Client Tests at uat.company.com

Client checks:
- All pages render correctly
- Contact form works
- Admin login works
- CRM functionality complete
- Mobile responsive
- Performance acceptable

### Client Feedback Example

> "Please change the Careers button color from blue to green."

```bash
git checkout dev
git checkout -b feature/careers-button-color
# Update button color in Careers.jsx
git commit -m "feat: change careers button color to green per client request"
git push origin feature/careers-button-color
# Full cycle: PR → dev → qa → wa → uat
```

## 9.6 Production Deployment

### Release Manager Approves

```bash
git checkout prod
git pull origin prod
git merge uat
git push origin prod
```

### Tag Release

```bash
git tag v1.0.0
git push origin v1.0.0
```

### Production URLs

```
www.eslands.com        → Vercel (React SPA)
eslands.onrender.com   → Render (Express API)
```

### Post-Deployment Verification

| Check | URL | Expected |
|-------|-----|----------|
| Homepage | www.eslands.com | Full page |
| Contact form | www.eslands.com/contact | Submit works |
| CRM login | www.eslands.com/admin-panel-xyz/login | Login works |
| API health | eslands.onrender.com/api/health | {"status":"OK"} |
| Careers | www.eslands.com/careers | Jobs from API |

## 9.7 MongoDB Atlas Setup for Production

### Step 1: Create Cluster
1. cloud.mongodb.com → Create M0 Sandbox
2. Choose region closest to users

### Step 2: Database User
1. Security → Database Access → Add User
2. Username: esland-prod
3. Password: <strong-password>
4. Privileges: Read/Write to any database

### Step 3: Network Access
1. Security → Network Access → Add IP
2. Allow Access from Anywhere: 0.0.0.0/0

### Step 4: Connection String
```
mongodb+srv://esland-prod:<password>@cluster0.xxxxx.mongodb.net/onebridge?retryWrites=true&w=majority
```

## 9.8 Render Server Setup

### Create Web Service

| Setting | Value |
|---------|-------|
| Name | eslands-api |
| Runtime | Node |
| Root Directory | server |
| Build Command | npm install |
| Start Command | node server.js |

### Environment Variables

| Key | Value |
|-----|-------|
| MONGO_URI | mongodb+srv://... |
| JWT_SECRET | <random-64-chars> |
| EMAIL_USER | your-email@example.com |
| EMAIL_PASS | your-app-password |
| CORS_ORIGIN | https://www.eslands.com |

## 9.9 Vercel Client Setup

### Import Project

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Root Directory | client |
| Build Command | cd client && npm run build |
| Output Directory | client/dist |

### vercel.json (Critical for SPA)

```json
{
  "rewrites": [
    { "source": "/admin-panel-xyz/(.*)", "destination": "/index.html" },
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

## 9.10 Common Deployment Issues & Fixes

| Issue | Environment | Fix |
|-------|-------------|-----|
| Blank page | Vercel | Add vercel.json with SPA rewrites |
| 405 on contact form | Production | Set VITE_API_BASE_URL or fix api.js fallback |
| CORS error | Production | Add CORS_ORIGIN env var in Render |
| JWT verification failed | Production | Add JWT_SECRET env var in Render |
| MongoDB connection refused | Production | Whitelist 0.0.0.0/0 in Atlas |
| 404 on CRM routes | Production | Ensure /admin-panel-xyz rewrite in vercel.json |
| Cold start slow | Render free tier | Normal; upgrade for always-on |

## 9.11 Deployment Flow Diagram

```text
feature/home-page → PR → dev (auto-deploy)
                              │
                              ▼
                         dev.vercel.app (test)
                              │
                    git merge dev → qa (auto-deploy)
                              │
                              ▼
                         qa.vercel.app (QA testing)
                              │
                    git merge qa → wa (auto-deploy)
                              │
                              ▼
                    wa.vercel.app (business review)
                              │
                    git merge wa → uat (auto-deploy)
                              │
                              ▼
                    uat.vercel.app (client testing)
                              │
                    git merge uat → prod (auto-deploy)
                              │
                              ▼
                    www.eslands.com (LIVE)
```
