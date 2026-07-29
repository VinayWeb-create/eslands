# Document 11: Troubleshooting Guide

## When Things Go Wrong

Every project has issues. Here's a complete troubleshooting guide based on real problems encountered in the Esland IT Solutions project.

## 11.1 Development Issues

### "Port 5000 already in use"

**Cause:** Another terminal is running the server, or a previous instance didn't shut down.

```bash
# Kill process on port 5000
npx kill-port 5000

# Or use a different port
# In server/.env: PORT=5001
```

### "Module not found" Errors

**Cause:** Dependencies not installed after cloning.

```bash
cd server && npm install
cd ../client && npm install
```

### Vite Proxy Not Working (API calls go to wrong URL)

**Cause:** Server not running, or vite.config.js missing proxy.

1. Start server first: `cd server && node server.js`
2. Check `vite.config.js`:
```js
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```
3. Restart Vite: `cd client && npm run dev`

### MongoDB Connection Refused (ECONNREFUSED)

**Cause:** MongoDB not running locally, or Atlas connection string wrong.

- **Local:** Start MongoDB service
- **Atlas:** Check MONGO_URI, verify IP whitelist (0.0.0.0/0), verify user credentials

### "JWT_SECRET is not defined"

**Cause:** Missing JWT_SECRET in .env file.

```bash
# Generate a secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Add to server/.env
JWT_SECRET=<generated-secret>
```

## 11.2 Deployment Issues

### Blank Page on Vercel

**Cause:** Missing `vercel.json` or wrong build configuration.

**Fix:**
1. Ensure `client/vercel.json` exists:
```json
{
  "rewrites": [
    { "source": "/admin-panel-xyz/(.*)", "destination": "/index.html" },
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```
2. Set Root Directory to `client` in Vercel settings
3. Build Command: `cd client && npm run build`

### 405 Method Not Allowed (Contact Form in Production)

**Cause:** `api.js` baseURL was empty string — requests went to Vercel instead of Render.

**Fix in `client/src/lib/api.js`:**
```javascript
// Before (broken):
const api = axios.create({ baseURL: '' });

// After (fixed):
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://eslands.onrender.com'
});
```

### CORS Error in Browser Console

**Cause:** Server not allowing requests from your Vercel domain.

**Fix:** Add `CORS_ORIGIN` environment variable in Render:
```
CORS_ORIGIN=https://www.eslands.com
```

### JWT Verification Fails in Production

**Cause:** `JWT_SECRET` not set in Render environment variables.

**Fix:** Add to Render → Settings → Environment:
```
JWT_SECRET=<your-secret-here>
```

### CRM Routes 404 on Page Refresh

**Cause:** React Router routes need SPA rewrite rules.

**Fix:** Add to `client/vercel.json`:
```json
{ "source": "/admin-panel-xyz/(.*)", "destination": "/index.html" }
```

### Render Cold Start (30-60 second delay)

**Cause:** Free tier spins down after ~15 minutes of inactivity.

**Options:**
- Wait for the first request (normal for free tier)
- Upgrade to Render Starter ($7/mo) for always-on
- Set up a cron job to ping /api/health every 10 minutes

### MongoDB Atlas "Authentication Failed"

**Cause:** Wrong username or password in connection string.

**Fix:**
1. Atlas → Security → Database Access → Verify/reset user
2. Update MONGO_URI in Render env vars
3. Redeploy server

## 11.3 CRM Issues

### Can't Login to CRM

**Checklist:**
1. Is the admin user seeded? → Run `node seed.js`
2. Is JWT_SECRET set? → Check Render env vars
3. Is MongoDB connected? → Check Atlas status
4. Are you using the right URL? → `/admin-panel-xyz/login`

### Leads Not Appearing

**Checklist:**
1. Submit a contact form first (auto-creates a lead)
2. Or create a lead manually via CRM UI
3. Check browser console for API errors
4. Check Render logs for server errors

### Quote Totals Wrong

**Check:** The tax calculation:
```
subtotal = sum of (quantity × unitPrice) for all items
taxAmount = subtotal × (taxRate / 100)
total = subtotal + taxAmount
```

If items have quantity=0 or unitPrice=0, totals will be wrong.

### Dashboard Shows Zero Stats

**Cause:** No leads or quotes in database.

**Fix:** Create test data via CRM UI or run:
```javascript
// In MongoDB shell
db.leads.insertMany([...test data...])
db.quotes.insertMany([...test data...])
```

## 11.4 API Issues

### 401 Unauthorized on CRM Requests

**Cause:** JWT token missing, expired, or invalid.

**Fix:**
1. Re-login at `/admin-panel-xyz/login`
2. Check `localStorage` has `crm_token`
3. Token expires after 30 days

### 429 Too Many Requests

**Cause:** Rate limit exceeded (20 requests/minute on contact/newsletter).

**Fix:** Wait 1 minute. This is intentional to prevent spam.

### 500 Server Error

**Check:**
1. Render logs for stack trace
2. MongoDB Atlas for connection issues
3. Environment variables (all required vars set?)

## 11.5 Frontend Issues

### CSS/Tailwind Not Working

**Fix:**
1. Ensure `@tailwindcss/vite` in `vite.config.js` plugins
2. Ensure `@import "tailwindcss"` in `index.css`
3. Clear browser cache, restart dev server

### Framer Motion Animations Not Working

**Cause:** System has "Reduce Motion" enabled.

**Check:** System Settings → Accessibility → Reduce Motion

### Images Not Loading

**Check:**
1. File exists in `assets/` directory
2. Import path is correct
3. Case sensitivity matches (Windows vs Linux)

## 11.6 Debugging Checklist

When something breaks:

| Step | Action | Tool |
|------|--------|------|
| 1 | Check browser console | Chrome DevTools → Console |
| 2 | Check network requests | Chrome DevTools → Network |
| 3 | Check server logs | Render Dashboard → Logs |
| 4 | Check database | MongoDB Atlas → Collections |
| 5 | Check env vars | Render → Settings → Environment |
| 6 | Check git status | `git status` + `git log --oneline -5` |
| 7 | Check deployments | Vercel + Render dashboards |
| 8 | Test locally | `cd server && node server.js` |

## 11.7 Error Code Quick Reference

| Code | Meaning | Typical Fix |
|------|---------|-------------|
| 400 | Bad Request | Check required fields |
| 401 | Unauthorized | Re-login, check JWT |
| 403 | Forbidden | Need admin role |
| 404 | Not Found | Check URL and routes |
| 405 | Method Not Allowed | Check API URL (api.js baseURL) |
| 429 | Too Many Requests | Wait 1 minute |
| 500 | Server Error | Check server logs |

## 11.8 Getting Help

| Resource | URL |
|----------|-----|
| GitHub Issues | github.com/VinayWeb-create/eslands/issues |
| Render Docs | render.com/docs |
| Vercel Docs | vercel.com/docs |
| MongoDB Docs | docs.atlas.mongodb.com |
| React Docs | react.dev |
| Express Docs | expressjs.com |
