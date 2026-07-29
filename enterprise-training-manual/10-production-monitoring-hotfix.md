# Document 10: Production Monitoring & Hotfix

## After Go-Live

The website is live. The team monitors for issues and handles production bugs.

## 10.1 Monitoring Setup

### Server Monitoring (Render)

Dashboard → Logs: Real-time request logging
- Morgan output: `POST /api/contact 201 45.234 ms - 128`
- Error logs: `console.error(err.stack)`
- Connection logs: `MongoDB connected`

### Client Monitoring (Vercel)

Dashboard → Analytics:
- Page views
- Bandwidth usage
- Function invocations
- Build logs

### Database Monitoring (MongoDB Atlas)

Dashboard → Metrics:
- Operations per second
- Connection count
- Storage usage
- Slow query detection (Performance Advisor)

## 10.2 Health Checks

### API Health Endpoint

```javascript
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
```

### Uptime Monitoring

Set up UptimeRobot (free):
- Monitor: https://eslands.onrender.com/api/health
- Interval: Every 5 minutes
- Alert: Email + SMS on downtime

## 10.3 Production Bug — Hotfix Process

### Scenario: Contact Form Stops Working on Live Site

**Step 1: Create Hotfix Branch from Production**

```bash
git checkout prod
git pull origin prod
git checkout -b hotfix/contact-form-fix
```

**Step 2: Fix the Bug**

```bash
# Investigate: email sending crashes the request
# Fix: wrap email in try-catch (already done, but let's say it broke)

git add .
git commit -m "fix: contact form submission — handle email failure gracefully"
git push origin hotfix/contact-form-fix
```

**Step 3: Create PR to Production**

```
Base: prod
Compare: hotfix/contact-form-fix
```

Tech Lead reviews → Approves → Merge to prod.

**Step 4: Deploy**

```bash
# Vercel and Render auto-deploy on push to prod
```

**Step 5: Back-Merge to Dev**

Critical: The fix must be propagated to dev so it's not lost in future releases.

```bash
git checkout dev
git pull origin dev
git merge hotfix/contact-form-fix
git push origin dev

# Also merge to qa, wa, uat if they exist
git checkout qa
git merge hotfix/contact-form-fix
git push origin qa
```

**Step 6: Delete Hotfix Branch**

```bash
git branch -d hotfix/contact-form-fix
git push origin --delete hotfix/contact-form-fix
```

## 10.4 Hotfix Flow Diagram

```text
Production Bug Found
        │
        ▼
Create hotfix branch from prod
        │
        ▼
Fix the bug
        │
        ▼
PR → prod (review + merge)
        │
        ▼
Auto-deploy to production
        │
        ▼
Back-merge to dev (and qa, wa, uat)
        │
        ▼
Delete hotfix branch
        │
        ▼
Verify fix in production
```

## 10.5 Real Production Issues from This Project

### Issue 1: 405 Error on Contact Form

**Symptom:** Contact form returns 405 Method Not Allowed in production
**Root Cause:** `api.js` baseURL was empty string — requests went to Vercel instead of Render
**Fix:** Changed `baseURL: ''` to `baseURL: 'https://eslands.onrender.com'`
**Hotfix Branch:** `bugfix/api-url`
**Back-merged to:** dev

### Issue 2: CORS Error

**Symptom:** Browser blocks API requests from Vercel domain
**Root Cause:** Render's CORS middleware wasn't configured for the Vercel origin
**Fix:** Added `CORS_ORIGIN` environment variable in Render
**Hotfix Branch:** `hotfix/cors-origin`

### Issue 3: CRM Routes 404 on Refresh

**Symptom:** Refreshing /admin-panel-xyz/leads shows 404
**Root Cause:** Vercel doesn't have SPA rewrite rules
**Fix:** Created `vercel.json` with rewrite rules
**Hotfix Branch:** `bugfix/vercel-spa`

### Issue 4: JWT Verification Fails

**Symptom:** CRM login succeeds but subsequent requests return 401
**Root Cause:** `JWT_SECRET` not set in Render environment
**Fix:** Added JWT_SECRET to Render env vars
**Hotfix Branch:** `hotfix/jwt-secret`

## 10.6 Rollback Procedure

### Client Rollback (Vercel)

1. Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Server Rollback (Render)

1. Render Dashboard → Manual Deploy
2. Select "Deploy previous commit"
3. Or: `git revert <bad-commit>` + push to prod

### Database Rollback (Atlas)

1. Atlas Dashboard → Backup
2. Restore to point-in-time before the issue

## 10.7 Performance Monitoring

### Key Metrics

| Metric | Target | Alert If |
|--------|--------|----------|
| API response time | < 200ms | > 1000ms |
| Page load (LCP) | < 2.5s | > 4s |
| Error rate | < 1% | > 5% |
| Uptime | > 99.9% | < 99% |

### Free Tier Limitations

| Service | Limitation | Impact |
|---------|-----------|--------|
| Render | Cold start (30-60s after idle) | First request slow |
| Vercel | 100GB bandwidth/mo | Fine for small sites |
| Atlas | 512MB storage | Fine for CRM data |

## 10.8 Cost Summary

| Service | Tier | Monthly Cost |
|---------|------|-------------|
| Vercel | Free | $0 |
| Render | Free (750 hrs) | $0 |
| MongoDB Atlas | Free (512MB) | $0 |
| UptimeRobot | Free | $0 |
| **Total** | | **$0/month** |

## 10.9 When to Upgrade

| Trigger | Action | Cost |
|---------|--------|------|
| > 100GB bandwidth | Vercel Pro | $20/mo |
| Cold starts unacceptable | Render Starter | $7/mo |
| > 512MB DB storage | Atlas M10 | $57/mo |
| Need custom domains | Free on all | $0 |
