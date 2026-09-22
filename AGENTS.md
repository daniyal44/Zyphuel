# Multi-Agent Coordination Protocol: AITMPL Ecosystem

## Agent Architecture
This project has access to **425 specialized subagents** across 28 functional domains:
- **Architecture & Modernization**: `architecture-critic`, `scaffolder`, `legacy-analyst`, `version-delta-analyst`
- **Quality & Security**: `security-auditor`, `test-engineer`, `code-simplifier`, `accessibility-tester`
- **Domain Specialists**: Cloud (AWS, Azure, GCP), Data (Airflow, BigQuery, ClickHouse), Web (React, Next.js, Vite), AI/ML (Deep Research, Prompt Engineering)

## Coordination Rules
1. **Discovery**: Look up agent instructions in `.claude/agents/<agent-name>.md` or `.agents/agents/<agent-name>.md`.
2. **Execution**: Activate skills corresponding to agent specialties from `.agents/skills/<skill-name>/SKILL.md`.
3. **Tools**: Use MCP tools declared in `.mcp.json` when external execution is required.
4. **Automated Documentation Updates (MANDATORY)**:
   - Every single page and subpage has a dedicated `.md` documentation file in `docs/pages/` and `docs/pages/subpages/` (indexed in `docs/README.md`).
   - Whenever ANY change, refactor, styling update, pricing modification, or feature addition is made to any page, component, or data file, you **MUST ALWAYS** immediately update the corresponding `.md` file with the exact modifications, updated parameters, and changelog.

## Core Business Logic & Pricing Rules (Permanent Memory)
- **Minimum & Maximum Fuel Volume**: Strictly **5 Litres minimum** up to **15 Litres maximum** per doorstep delivery order (sub-5L clamped to 5L, capped at 15L max; step: +1L; chips: `[5, 7, 10, 12, 15]` with 15L Max capacity indicator).
- **Simple Delivery Charges**: Flat **Rs. 280.00** nominal fee for doorstep fuel orders.
- **Urgent Delivery Surcharge**: Controlled, reasonable priority fee of **+Rs. 100.00** flat (Standard Rs. 280 + Rs. 100 Urgent = **Rs. 380.00** total). Always keep this surcharge reasonable.
- **Delivery Windows**:
  - Simple Dispatch: 20–45 Mins
  - Urgent Dispatch: 10–20 Mins
- **Office Operating Hours**:
  - Monday – Thursday: 8:00 AM – 8:00 PM
  - Friday: 8:00 AM – 1:00 PM
  - Saturday – Sunday: 10:00 AM – 6:00 PM
  - Fuel Delivery (24/7): Always Active
- **Startup Identity**: Single persistent transparency statement on Home hero; never duplicated on child pages.
- **Automated Dispatch & WhatsApp**: Direct WhatsApp pre-filled dispatch link to `+92 3230-112464`.


