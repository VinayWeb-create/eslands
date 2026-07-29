# Document 06: CRM System Development

## Building the Admin Panel

Sprint 2 and 3 focus on building the CRM (Customer Relationship Management) system. This is the most complex feature — a full lead management and quotation tool.

## 6.1 CRM Architecture

```
Admin visits /admin-panel-xyz/login
  → Enters credentials
  → JWT token stored in localStorage
  → CrmLayout checks auth → allows access
  ├── Dashboard (stats overview)
  ├── Leads (list → detail → edit/notes)
  └── Quotes (list → detail → create)
```

### Frontend (7 pages + 3 components)

| File | Purpose |
|------|---------|
| pages/crm/Login.jsx | Email/password form, JWT storage |
| pages/crm/Dashboard.jsx | Stats cards, pipeline, activity |
| pages/crm/Leads.jsx | Table with search, filters, pagination |
| pages/crm/LeadDetail.jsx | Edit, status, notes, create quote |
| pages/crm/Quotes.jsx | Quotes table |
| pages/crm/QuoteDetail.jsx | View quote, change status |
| pages/crm/QuoteNew.jsx | Create quote with line items |
| components/crm/CrmLayout.jsx | Auth guard wrapper |
| components/crm/CrmSidebar.jsx | Navigation sidebar |
| components/crm/StatusBadge.jsx | Colored status pills |

### Backend (3 models + 4 controllers + 4 routes)

Already covered in Document 05.

## 6.2 CRM Login

### Frontend: `pages/crm/Login.jsx`

```jsx
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/crm/auth/login', { email, password });
      login(data.user, data.token);  // Stores token in localStorage
      navigate('/admin-panel-xyz');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Backend: POST /api/crm/auth/login

```javascript
// Validates email + password
// Returns { token: "eyJ...", user: { _id, name, email, role } }
// Token expires in 30 days
```

## 6.3 Auth Guard (CrmLayout)

### `components/crm/CrmLayout.jsx`

```jsx
function CrmLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin-panel-xyz/login');
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="flex">
      <CrmSidebar />
      <main className="flex-1 p-6">
        <Outlet />  {/* Nested routes render here */}
      </main>
    </div>
  );
}
```

## 6.4 CRM Dashboard

### `pages/crm/Dashboard.jsx`

Shows:
- Total leads count
- Total quotes count
- Revenue from won quotes
- Conversion rate
- Pipeline breakdown (leads per status)
- Recent activity (last 5 leads + 5 quotes)

```
┌──────────┬──────────┬──────────┬──────────┐
│  Leads   │  Quotes  │ Revenue  │   Rate   │
│    25    │    15    │  $15,340 │   8.0%   │
├──────────┴──────────┴──────────┴──────────┤
│ Pipeline: ■■■■■■■■■■■■■■■■□□□□□□□□□□□□  │
│          new  contacted  qual  proposal   │
├──────────────────────────────────────────┤
│ Recent Activity                          │
│ • John Doe — new lead (2 min ago)        │
│ • QTN-2026-0001 — draft ($7,670)         │
└──────────────────────────────────────────┘
```

## 6.5 Lead Management

### Lead List (`pages/crm/Leads.jsx`)

Features:
- Search bar (regex on name, email, subject)
- Filter dropdowns: Status, Priority, Service, Source
- Pagination (10 per page)
- Create new lead button → modal form

### Lead Detail (`pages/crm/LeadDetail.jsx`)

```
┌─────────────────────────────────────────┐
│ Lead: John Doe                          │
│ Email: john@example.com                 │
│ Phone: +1234567890                      │
│ Service: Web Development                │
│ Source: contact-form                    │
│ Status: [new ▼] → Change pipeline stage │
│ Priority: [medium ▼]                    │
├─────────────────────────────────────────┤
│ Notes:                                  │
│ • "Called client, interested" (Jul 25)  │
│ • "Sent proposal" (Jul 26)              │
│ [+ Add Note]                            │
├─────────────────────────────────────────┤
│ [Edit Lead] [Create Quote] [Delete]     │
└─────────────────────────────────────────┘
```

### Lead Status Pipeline

```
new → contacted → qualified → proposal → negotiation → won
                                                          ↘ lost
```

Each status change updates the lead in the database and refreshes the dashboard.

## 6.6 Quote Generation

### Create Quote (`pages/crm/QuoteNew.jsx`)

Route: `/admin-panel-xyz/quotes/new/:leadId`

Lead info is pre-populated. Admin adds line items:

```
┌───────────────────────────────────────────┐
│ Quote for: John Doe                       │
├───────────────────────────────────────────┤
│ Description          Qty   Price   Total  │
│ Web Development      1     $5,000  $5,000 │
│ SEO Package          1     $1,500  $1,500 │
│ [+ Add Item]                              │
├───────────────────────────────────────────┤
│ Tax Rate: [18]%                           │
│ Subtotal:                 $6,500          │
│ Tax:                      $1,170          │
│ Total:                    $7,670          │
├───────────────────────────────────────────┤
│ Notes: [Quote for web dev package    ]    │
│ Valid Until: Aug 24, 2026 (auto +30 days) │
│ [Submit Quote]                            │
└───────────────────────────────────────────┘
```

### Auto-Generated Quote Numbers

Format: `QTN-YYYY-XXXX`
- QTN-2026-0001
- QTN-2026-0002
- Auto-incrementing, unique

### Auto-Computed Totals

```javascript
// Line item total
item.total = item.quantity * item.unitPrice;

// Subtotal
subtotal = items.reduce((sum, item) => sum + item.total, 0);

// Tax
taxAmount = subtotal * (taxRate / 100);

// Grand total
total = subtotal + taxAmount;
```

### Quote Status Lifecycle

```
draft → sent → viewed → accepted
                    ↘ rejected
                    ↘ expired (auto after validUntil)
```

## 6.7 Dashboard Statistics

### Backend: `controllers/dashboardController.js`

```javascript
export const getStats = async (req, res) => {
  const totalLeads = await Lead.countDocuments();
  const totalQuotes = await Quote.countDocuments();

  // Pipeline breakdown
  const pipeline = await Lead.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  // Revenue from accepted quotes
  const revenue = await Quote.aggregate([
    { $match: { status: 'accepted' } },
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);

  // Conversion rate
  const wonLeads = await Lead.countDocuments({ status: 'won' });
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : 0;

  // Recent activity
  const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);
  const recentQuotes = await Quote.find().sort({ createdAt: -1 }).limit(5);

  res.json({ totalLeads, totalQuotes, pipeline, revenue: revenue[0]?.total || 0, conversionRate, recentLeads, recentQuotes });
};
```

## 6.8 CRM Branches

| Branch | Sprint | Files |
|--------|--------|-------|
| feature/admin-login | Sprint 1 | Login.jsx, authController.js, auth.js middleware, Admin.js |
| feature/crm-dashboard | Sprint 2 | Dashboard.jsx, dashboardController.js |
| feature/lead-management | Sprint 2 | Leads.jsx, LeadDetail.jsx, leadController.js, Lead.js |
| feature/quote-generation | Sprint 3 | Quotes.jsx, QuoteDetail.jsx, QuoteNew.jsx, quoteController.js, Quote.js |

## 6.9 CRM Testing Checklist

- [ ] Login with valid credentials → JWT returned
- [ ] Login with wrong password → Error message
- [ ] Access CRM without login → Redirected to /login
- [ ] Dashboard shows correct stats
- [ ] Create lead → Appears in list
- [ ] Search leads → Results match
- [ ] Filter by status → Correct results
- [ ] Change lead status → Pipeline updates
- [ ] Add note → Note appears with timestamp
- [ ] Create quote → Auto-number generated
- [ ] Add line items → Totals computed correctly
- [ ] Change quote status → Status updates
