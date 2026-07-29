# Document 08: Testing & QA Workflow

## QA Team Takes Over

After code is merged to `dev` and deployed, the QA team begins testing.

## 8.1 Merge to QA Branch

```bash
git checkout qa
git pull origin qa
git merge dev
git push origin qa
```

QA environment updates: `qa.eslands.com`

## 8.2 Testing Strategy

### Levels of Testing

| Level | Who | When | What |
|-------|-----|------|------|
| Unit Testing | Developer | During development | Individual functions |
| Integration Testing | Developer | Before PR | API endpoints work |
| Manual QA | QA Engineer | After merge to qa | Full feature testing |
| Regression QA | QA Engineer | Before each release | Existing features still work |
| UAT | Client | Before production | Business requirements met |

## 8.3 QA Test Plan for Esland IT Solutions

### Module 1: Public Website

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| QA-001 | Homepage loads | Navigate to / | All sections render | ☐ |
| QA-002 | Hero section | Check hero | Services displayed, mobile visible | ☐ |
| QA-003 | Navigation | Click nav links | SPA routing works, no 404 | ☐ |
| QA-004 | Mobile responsive | Resize to 375px | Layout adapts | ☐ |
| QA-005 | Footer | Scroll to bottom | Footer with links renders | ☐ |
| QA-006 | Services page | Navigate to /services | Service list with detail toggle | ☐ |
| QA-007 | Careers page | Navigate to /careers | Jobs loaded from API | ☐ |
| QA-008 | Contact form | Fill and submit | 201 success, lead created | ☐ |
| QA-009 | Contact form validation | Submit empty form | Error: required fields | ☐ |
| QA-010 | Contact form service | Select service dropdown | Service saved with submission | ☐ |
| QA-011 | SEO meta tags | View page source | Title, description, OG tags present | ☐ |
| QA-012 | 404 page | Navigate to /nonexistent | Custom 404 page renders | ☐ |

### Module 2: CRM (Admin Panel)

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| QA-101 | CRM login | Enter credentials | JWT returned, dashboard loads | ☐ |
| QA-102 | Wrong password | Enter wrong password | Error: Invalid credentials | ☐ |
| QA-103 | Access without login | Navigate to /admin-panel-xyz | Redirected to /login | ☐ |
| QA-104 | Dashboard stats | View dashboard | Accurate counts shown | ☐ |
| QA-105 | Create lead | Fill form, submit | Lead appears in list | ☐ |
| QA-106 | Search leads | Type in search bar | Results filtered by name/email | ☐ |
| QA-107 | Filter by status | Select status dropdown | Only matching leads shown | ☐ |
| QA-108 | Lead detail | Click lead | Full info, notes, status shown | ☐ |
| QA-109 | Add note | Type note, submit | Note appears with timestamp | ☐ |
| QA-110 | Change status | Select new status | Status updated, pipeline reflects | ☐ |
| QA-111 | Create quote | Click Create Quote on lead | Quote form with lead info | ☐ |
| QA-112 | Quote line items | Add items | Totals auto-computed correctly | ☐ |
| QA-113 | Quote tax | Set tax rate 18% | TaxAmount = Subtotal × 0.18 | ☐ |
| QA-114 | Quote number | Create quote | Auto-generated QTN-2026-XXXX | ☐ |
| QA-115 | Quote status change | Change draft → sent | Status updated | ☐ |
| QA-116 | Logout | Click logout | Token cleared, redirected to login | ☐ |

### Module 3: API Testing

| Test ID | Endpoint | Method | Test | Expected |
|---------|----------|--------|------|----------|
| QA-201 | /api/health | GET | Health check | {"status":"OK"} |
| QA-202 | /api/contact | POST | Valid data | 201 Created |
| QA-203 | /api/contact | POST | Missing fields | 400 Error |
| QA-204 | /api/careers | GET | List careers | Array of careers |
| QA-205 | /api/crm/auth/login | POST | Valid credentials | 200 + JWT |
| QA-206 | /api/crm/auth/login | POST | Wrong password | 401 Error |
| QA-207 | /api/crm/leads | GET | With JWT | Array of leads |
| QA-208 | /api/crm/leads | GET | Without JWT | 401 Error |
| QA-209 | /api/crm/leads | POST | Create lead | 201 Created |
| QA-210 | /api/crm/leads/:id | PUT | Update lead | 200 Updated |
| QA-211 | /api/crm/quotes | POST | Create quote | 201 + auto-totals |
| QA-212 | /api/crm/dashboard/stats | GET | Stats | Aggregated data |

### Module 4: Cross-Cutting

| Test ID | Test Case | Steps | Expected |
|---------|-----------|-------|----------|
| QA-301 | Browser compat | Chrome, Firefox, Safari, Edge | All render correctly |
| QA-302 | Mobile iOS | iPhone 14, Safari | Responsive, no overflow |
| QA-303 | Mobile Android | Samsung Galaxy, Chrome | Responsive, no overflow |
| QA-304 | Slow network | Throttle to 3G | Loading states shown |
| QA-305 | Refresh on CRM route | F5 on /admin-panel-xyz/leads | Page loads (SPA rewrite) |
| QA-306 | Rate limiting | Submit 21 contacts in 1 min | 429 after 20th request |

## 8.4 Bug Reporting

### Bug Template

```
BUG-104: Contact Form Email Failed

Environment: qa.eslands.com
Browser: Chrome 125
Device: Desktop

Steps to Reproduce:
1. Navigate to /contact
2. Fill in name, email, message
3. Click Submit

Expected: Success message, email notification sent
Actual: Success message shown, but no email received

Priority: Medium
Assigned To: Backend Developer
```

### Bug Severity Levels

| Severity | Description | Response Time |
|----------|-------------|---------------|
| Critical | Site down, data loss | Fix immediately |
| High | Major feature broken | Fix within 24 hours |
| Medium | Feature works but with issues | Fix within sprint |
| Low | Cosmetic, minor | Fix when convenient |

## 8.5 Bug Fix Workflow

### QA Finds Bug

```
QA: "Contact form doesn't send email on qa.eslands.com"
```

### Developer Fixes

```bash
# Create bugfix branch from dev
git checkout dev
git pull origin dev
git checkout -b bugfix/contact-email

# Fix the code
# In contactController.js: wrap email in try-catch, check placeholder creds

git add .
git commit -m "fix: handle email sending failure gracefully"
git push origin bugfix/contact-email

# Create PR: bugfix/contact-email → dev
# Review → Merge
```

### Promote Fix

```bash
# Merge to qa for retest
git checkout qa
git merge dev
git push origin qa
```

### QA Retests

```
QA: "Email fix verified. Bug-104 closed."
```

## 8.6 Known Bugs Found and Fixed

| Bug ID | Description | Severity | Fix |
|--------|-------------|----------|-----|
| BUG-101 | 405 error on contact form in production | High | Changed api.js baseURL fallback |
| BUG-102 | Hero banner invisible on mobile | High | Reduced gradient darkness, glow |
| BUG-103 | CORS error from Vercel | High | Added CORS_ORIGIN env var |
| BUG-104 | CRM routes 404 on page refresh | Medium | Added vercel.json SPA rewrites |
| BUG-105 | JWT_SECRET missing in production | High | Added to Render env vars |
| BUG-106 | Email not sending | Low | Wrapped in try-catch, skip placeholder |
| BUG-107 | Cold start timeout on Render | Medium | Free tier limitation documented |

## 8.7 QA Sign-Off Checklist

Before merging to WA:

- [ ] All critical/high bugs resolved
- [ ] All QA test cases passed
- [ ] Mobile responsive verified
- [ ] API endpoints tested
- [ ] CRM functionality complete
- [ ] Performance acceptable
- [ ] Security review passed

```bash
# After QA approval
git checkout wa
git merge qa
git push origin wa
```
