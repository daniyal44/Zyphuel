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
