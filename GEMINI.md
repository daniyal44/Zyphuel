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
- **Minimum Fuel Volume**: Strictly **5 Litres** (sub-5L inputs clamped to 5L; step: +1L; volume chips: `[5, 10, 20, 50, 100, 250, 500, 1000]`).
- **Simple Delivery Charges**: **Rs. 280.00** nominal fee for fuel orders <50 Litres (revised from Rs. 250 due to nationwide fuel price hikes). **Free Delivery (Rs. 0.00)** for fuel orders ≥50 Litres.
- **Urgent Delivery Surcharge**: Controlled, reasonable priority fee of **+Rs. 100.00** flat (Sub-50L Urgent = Rs. 380 total; 50L+ Urgent = Rs. 100 total). Always keep this surcharge reasonable.
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


