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
