# Esland IT Solutions — Enterprise Training Manual

A comprehensive 12-document enterprise training manual following a **real company workflow** — from client requirement to production deployment. Uses the actual Esland IT Solutions codebase as the running example throughout.

> "I need a MERN Stack Company Website with an Admin Panel."
> — Client, Esland IT Solutions

## Project Overview

| Component | Technology | Hosting |
|-----------|-----------|---------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion | Vercel |
| Backend | Express.js, MongoDB (Mongoose) | Render |
| Database | MongoDB Atlas | MongoDB Atlas |
| CRM | JWT auth, Lead management, Quotes | Embedded in both |

## Documents

| # | Document | What It Covers |
|---|----------|---------------|
| 01 | [Project Overview & Client Requirements](01-project-overview-client-requirements.md) | Client brief, SRS, team structure, tech stack, sprint overview |
| 02 | [Repository Setup & Branch Strategy](02-repository-setup-branch-strategy.md) | Git init, branches (dev→qa→wa→uat→prod), .gitignore, commit conventions |
| 03 | [Sprint Planning & Task Breakdown](03-sprint-planning-task-breakdown.md) | 5 sprints, task IDs, assignees, branches, sprint board, Definition of Done |
| 04 | [Frontend Development Workflow](04-frontend-development-workflow.md) | Building Home, Contact, Hero, routing, API integration, Framer Motion |
| 05 | [Backend Development Workflow](05-backend-development-workflow.md) | Express server, Contact API, Auth middleware, Lead CRUD, seeding |
| 06 | [CRM System Development](06-crm-system-development.md) | Login, Dashboard, Lead pipeline, Quote generation, status tracking |
| 07 | [Code Review & Pull Request Process](07-code-review-pull-request.md) | PR flow, review checklist, security review, real PR examples |
| 08 | [Testing & QA Workflow](08-testing-qa-workflow.md) | 46 test cases, bug reporting, severity levels, sign-off checklist |
| 09 | [Deployment Pipeline](09-deployment-pipeline.md) | Dev→QA→WA→UAT→PROD flow, Vercel/Render/Atlas setup, vercel.json |
| 10 | [Production Monitoring & Hotfix](10-production-monitoring-hotfix.md) | Monitoring, health checks, hotfix workflow, rollback, real issues |
| 11 | [Troubleshooting Guide](11-troubleshooting-guide.md) | Dev, deployment, CRM, API, frontend issues with fixes |
| 12 | [Complete Project Walkthrough](12-complete-project-walkthrough.md) | Full timeline, all phases, file inventory, lessons learned |

## Reading Order

**For new team members:**
Start with `01-project-overview-client-requirements.md` → `02-repository-setup-branch-strategy.md`

**For frontend developers:**
`03-sprint-planning-task-breakdown.md` → `04-frontend-development-workflow.md` → `06-crm-system-development.md`

**For backend developers:**
`03-sprint-planning-task-breakdown.md` → `05-backend-development-workflow.md` → `06-crm-system-development.md`

**For QA engineers:**
`08-testing-qa-workflow.md` → `07-code-review-pull-request.md`

**For DevOps/engineering managers:**
`09-deployment-pipeline.md` → `10-production-monitoring-hotfix.md` → `11-troubleshooting-guide.md`

**For project managers:**
`01-project-overview-client-requirements.md` → `03-sprint-planning-task-breakdown.md` → `12-complete-project-walkthrough.md`

## The Workflow at a Glance

```text
Client Requirement
        │
        ▼
Business Analysis (SRS)
        │
        ▼
Project Planning (Sprints)
        │
        ▼
Create Repository + Branches (dev→qa→wa→uat→prod)
        │
        ▼
Development (feature branches → PR → dev)
        │
        ▼
Code Review & Merge
        │
        ▼
QA Testing (qa branch)
        │
        ▼
Business Validation (wa branch)
        │
        ▼
Client UAT (uat branch)
        │
        ▼
Production Launch (prod branch)
        │
        ▼
Monitoring & Hotfixes
```

## Quick Reference

| What | Where |
|------|-------|
| CRM Login | `/admin-panel-xyz/login` |
| Default Admin | `admin@eslandsitsolutions.com` / `admin123` |
| API Health | `https://eslands.onrender.com/api/health` |
| GitHub Repo | `github.com/VinayWeb-create/eslands` |
| API Base URL | `https://eslands.onrender.com` |

## Related Documentation

- [`eslands-documentation/`](../eslands-documentation/) — 16-phase technical analysis of the codebase
