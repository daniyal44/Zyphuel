# Project & AI Memory: Zyphuel + AITMPL Ecosystem

## Core Environment & Capabilities
- **Project**: `zyphuel-react` (React / Vite frontend web application)
- **AI Templates Ecosystem Installed**: Full integration of [aitmpl.com](https://aitmpl.com/)
  - **874 Skills**: Discovered locally in `.agents/skills/` and globally in `~/.gemini/config/skills/`
  - **425 Specialized Agents**: Located in `.claude/agents/` and `.agents/agents/`
  - **285 Slash Commands**: Located in `.claude/commands/`
  - **103 MCP Servers**: Configured in `.mcp.json`
  - **34 Plugins + 255 Official Marketplace Plugins**: Indexed in `plugins.json`
  - Full component lookup index: [COMPONENTS_INDEX.md](file:///d:/Games/New%20folder-web/zyphuel-react/COMPONENTS_INDEX.md)

## Guiding Principles & Instructions
1. **Skill Activation**:
   - For specialized tasks (e.g. creative design, security auditing, database tuning, deep research, refactoring), consult the relevant skill in `.agents/skills/<skill-name>/SKILL.md` or `~/.gemini/config/skills/<skill-name>/SKILL.md`.
2. **Subagents & Roles**:
   - Utilize agent templates in `.agents/agents/` to specialize personas (e.g., `security-auditor`, `code-simplifier`, `test-engineer`, `architecture-critic`).
3. **MCP Tool Integration**:
   - Use the preconfigured servers in `.mcp.json` (e.g. database connectors, browser automation, search providers) to interact with external tools and services.
4. **Slash Commands**:
   - Slash commands in `.claude/commands/` describe standardized workflows for testing, deployment, code audits, and git workflows.
5. **Automated Documentation Updates (MANDATORY)**:
   - Every single page and subpage in the application has a dedicated `.md` file in `docs/pages/` and `docs/pages/subpages/` (see `docs/README.md`).
   - Whenever any page, component, pricing, logic, UI element, or data file is modified or created, you **MUST ALWAYS** immediately update the corresponding markdown file in `docs/pages/<page>.md` or `docs/pages/subpages/<subpage>.md` with the exact modifications, updated parameters, and changelog.

## Core Business Logic & Pricing Rules (Permanent Memory)
- **Refueling Targets**: Strictly 4 application targets (Car/Sedan/SUV, Motorbike/Scooter, Standby Generator, Commercial Machinery). Jerrycan / Safe Storage Drum is completely removed.
- **Minimum & Maximum Fuel Volume**: Strictly **5 Litres minimum** up to **15 Litres maximum** per doorstep delivery order (sub-5L inputs clamped to 5L, capped at 15L max; step: +1L; volume chips: `[5, 7, 10, 12, 15]` with 15L Max capacity indicator).
- **Doorstep Delivery Charges**: Fixed **Rs. 300.00** nominal fee for orders up to **10 Litres** (5L–10L). For high-capacity orders between **11 Litres and 15 Litres Max**, fees are strictly scaled between **Rs. 300.00 and Rs. 400.00** with a linear +Rs. 20/L step (11L = Rs. 320, 12L = Rs. 340, 13L = Rs. 360, 14L = Rs. 380, 15L = Rs. 400). Do not display legacy `(Order <10)` or `Fixed Rate (≤10L)` tags.
- **Retail Pump Margin Markup**: Controlled margin of **+Rs. 5.00/L** (`PUMP_RATE_MARKUP = 5.00`) across Petrol, Diesel, and High-Octane over official OGRA ex-depot rates.
- **Urgent Delivery Surcharge**: Controlled, reasonable priority fee of **+Rs. 100.00** flat. Always keep this surcharge reasonable.
- **Delivery Windows**:
  - Simple Dispatch: 20–45 Mins
  - Urgent Dispatch: 10–20 Mins
- **Online Order Intake & Strict 10:00 PM Cutoff**:
  - Online doorstep fuel order intake operates daily from **8:00 AM to 10:00 PM (PKT)**.
  - **Strict Night Cutoff (10:00 PM – 8:00 AM PKT)**: The "Complete Order" button (`.truck-button`, `#truck-submit-btn`) is strictly hidden and never shown under any circumstances. A dedicated Night Cutoff alert card is rendered with countdown/notice to 8:00 AM and direct 24/7 WhatsApp emergency helpline. Server-side guard (`plugins/zyphuel-order-guard/zyphuel-order-guard.php`) rejects order submissions with 403 Forbidden.
  - Corporate support & desk verification schedule:
    - Monday – Thursday: 8:00 AM – 8:00 PM
    - Friday: 8:00 AM – 1:00 PM
    - Saturday – Sunday: 10:00 AM – 6:00 PM
  - WhatsApp emergency helpline operates **24/7 on-demand** at `+92 3230-112464`.
- **Startup Identity**: Single persistent transparency statement on Home hero; never duplicated on child pages.
- **Automated Dispatch & WhatsApp**: Direct WhatsApp pre-filled dispatch link to `+92 3230-112464`.


