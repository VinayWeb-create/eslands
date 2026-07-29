# Document 07: Code Review & Pull Request Process

## Developer Opens Pull Request

After completing a feature, the developer opens a Pull Request for code review.

## 7.1 Pull Request Flow

```
feature/home-page  →  Pull Request  →  Code Review  →  Merge to dev
                                          │
                                    ┌─────┴─────┐
                                    │  APPROVED  │  or  CHANGES REQUESTED
                                    └─────┬─────┘
                                          │
                              Merge to dev → Deploy to dev server
```

## 7.2 Creating a Pull Request

### Step 1: Push Feature Branch

```bash
git checkout feature/home-page
git add .
git commit -m "feat: complete home page with all sections"
git push origin feature/home-page
```

### Step 2: Create PR on GitHub

```
Title: feat: Complete Home Page with Hero, Services, Stats, Testimonials, CTA

Description:
- Added Hero section with service cards
- Added ServicesGrid with responsive layout
- Added animated Stats counters
- Added Testimonials carousel
- Added CTA section
- Mobile responsive
- Framer Motion page transitions

Closes #1
```

### Step 3: PR Targets

```
Base: dev
Compare: feature/home-page
```

## 7.3 What the Tech Lead Reviews

### Code Quality Checklist

| Check | What to Look For | Example (Good) | Example (Bad) |
|-------|-----------------|----------------|---------------|
| Naming | camelCase vars, PascalCase components | `servicesGrid`, `HeroSection` | `sg`, `hero_sec` |
| Structure | Components in correct directories | `components/home/Hero.jsx` | `components/Hero.jsx` (wrong place) |
| React | Functional components, hooks | `useState`, `useEffect` | `class Component` |
| Props | Destructured, no prop drilling | `function Hero({ title })` | `function Hero(props)` |
| Security | No secrets, auth on routes | `process.env.JWT_SECRET` | `'mysecret123'` in code |
| Error Handling | Try-catch, user feedback | `try { ... } catch (e) { toast.error(...) }` | Unhandled promises |
| Performance | Lazy loading, memoization | `React.lazy(() => import(...))` | Importing everything eagerly |
| CSS | Tailwind utilities, responsive | `className="md:grid-cols-3"` | Inline styles with `!important` |

### Security Review

```javascript
// ✅ GOOD: Secret in environment variable
const secret = process.env.JWT_SECRET;

// ❌ BAD: Hardcoded secret
const secret = 'my-super-secret-key-123';

// ✅ GOOD: Auth middleware on protected routes
router.get('/leads', protect, adminOnly, getLeads);

// ❌ BAD: No auth middleware
router.get('/leads', getLeads);

// ✅ GOOD: Input validation
if (!name || !email || !message) {
  return res.status(400).json({ message: 'Required fields missing' });
}

// ❌ BAD: No validation
const contact = await Contact.create(req.body);
```

### API Usage Review

```javascript
// ✅ GOOD: Proper error handling with loading states
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const { data } = await api.post('/api/contact', formData);
    toast.success('Message sent!');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed');
  } finally {
    setLoading(false);
  }
};

// ❌ BAD: No error handling
const handleSubmit = async (e) => {
  e.preventDefault();
  const { data } = await api.post('/api/contact', formData);
  // What if it fails?
};
```

## 7.4 Review Example: Contact Form PR

### Files Changed

```
+ client/src/pages/Contact.jsx         (new)
+ server/models/Contact.js             (new)
+ server/controllers/contactController.js (new)
+ server/routes/contactRoutes.js       (new)
~ server/server.js                     (modified — added route)
```

### Review Comments

**Tech Lead:**
> "Looks good overall. A few comments:
> 1. In `contactController.js` line 15, you should validate email format
> 2. In `Contact.jsx`, the service dropdown needs a default 'Select a Service' option
> 3. The email sending should be wrapped in try-catch (what if SMTP is down?)
> 4. Good job auto-creating leads from contacts — nice bridge between public and CRM
>
> Please fix items 1-3 and we can merge."

**Developer fixes:**
```bash
git checkout feature/contact-form
# Fix code
git add .
git commit -m "fix: add email validation, default dropdown option, try-catch for email"
git push origin feature/contact-form
```

**Tech Lead re-reviews → Approves → Merge**

## 7.5 Merging the Pull Request

### Option 1: GitHub UI
1. Click "Merge pull request"
2. Confirm merge
3. Delete feature branch

### Option 2: Command Line
```bash
git checkout dev
git pull origin dev
git merge feature/home-page
git push origin dev
```

### After Merge: Delete Feature Branch

```bash
git branch -d feature/home-page
git push origin --delete feature/home-page
```

## 7.6 Real PRs from This Project

| PR | Feature Branch | Files Changed | Review Notes |
|----|---------------|---------------|-------------|
| PR 1 | feature/home-page | 8 files | Hero mobile fix needed |
| PR 2 | feature/contact-form | 5 files | Email try-catch added |
| PR 3 | feature/admin-login | 6 files | JWT_SECRET env var required |
| PR 4 | feature/crm-dashboard | 3 files | Stats aggregation optimized |
| PR 5 | feature/lead-management | 4 files | Pagination added |
| PR 6 | feature/quote-generation | 5 files | Auto-totals working |
| PR 7 | feature/mobile-hero-fix | 2 files | Gradient adjustments |
| PR 8 | bugfix/api-url | 1 file | Render URL fallback |

## 7.7 Code Review Best Practices

### For Reviewers
1. Review within 24 hours — don't block the team
2. Be constructive — "This could be improved" not "This is wrong"
3. Check for security issues first — they're critical
4. Test locally if unsure — checkout the branch and run it
5. Approve with confidence — if it works and follows standards

### For Authors
1. Keep PRs small — easier to review (under 300 lines ideal)
2. Write descriptive PR titles and descriptions
3. Self-review before requesting review
4. Respond to all comments — even if just "Done"
5. Don't take feedback personally — it's about the code

## 7.8 Branch Protection Rules (Recommended)

On GitHub, configure branch protection for `dev`:

```
Settings → Branches → Add rule

Branch name pattern: dev
☑ Require pull request reviews before merging
  Required approving reviews: 1
☑ Require status checks to pass
☑ Require branches to be up to date
☑ Require conversation resolution
```

This prevents direct pushes to `dev` — all changes must go through PR review.
