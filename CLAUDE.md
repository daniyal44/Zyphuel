# Claude Code Configuration & Memory

## Project Overview
- **Repository**: `zyphuel-react`
- **Stack**: React, Vite, Node.js
- **Templates & Components**: Integrated with [Claude Code Templates (aitmpl.com)](https://aitmpl.com/)

## Components Architecture
- `.claude/agents/`: 425 agent role specifications (e.g., `code-simplifier`, `security-auditor`, `architect`)
- `.claude/commands/`: 285 slash commands for automated workflows
- `.claude/skills/`: 874 skills following standard SKILL.md progressive disclosure
- `.claude/hooks/`: 62 automation hooks
- `.claude/settings/`: 71 configuration setting templates
- `.mcp.json`: 103 configured MCP servers
- `plugins.json`: 34 featured plugins and 255 official Claude Code plugins

## Workflow Standards
- **Component Index**: Check [COMPONENTS_INDEX.md](file:///d:/Games/New%20folder-web/zyphuel-react/COMPONENTS_INDEX.md) for full directory of components.
- **Commands**: Execute slash commands via `/<command-name>` matching files in `.claude/commands/`.
- **Agents**: Delegate specialized subtasks to agents defined in `.claude/agents/`.
