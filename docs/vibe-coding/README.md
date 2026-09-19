# The 6 Context Files for Zyphuel Vibe Coding

These markdown files give any AI assistant (Antigravity, Claude Code, Cursor, Windsurf) the complete context it needs to build, maintain, and scale the Zyphuel web application.

Without them, the AI can forget architectural boundaries, miscalculate fuel pump markups, or rewrite features already battle-tested. With them, it **refers back** to a single source of truth every time — even in a brand new chat session.

## The Context Files Registry
| # | File | What it locks down |
|---|------|--------------------|
| 1 | [`architecture.md`](./architecture.md) | Component tree, live Trackmate API, React Context data flow, tech stack, and WhatsApp dispatch |
| 2 | [`phases.md`](./phases.md) | Chronological development roadmap split from Phase 1 MVP to Phase 7 Retail Pump Markup |
| 3 | [`database.md`](./database.md) | Client-side schema, SessionStorage price caching, LocalStorage active order contracts |
| 4 | [`prompts.md`](./prompts.md) | Dispatch bot, customer service, SEO, and structured WhatsApp output prompt templates |
| 5 | [`security.md`](./security.md) | Phone sanitization, XSS mitigation, CORS proxy fallbacks, CSP headers, order anti-spam |
| 6 | [`error-handling.md`](./error-handling.md) | Toast notification bus, API retry fallbacks, input validation alerts, HTTP error mappings |
| 7 | [`generator-prompt.md`](./generator-prompt.md) | Master meta-prompt used to generate or extend architecture files |

## The Golden Rule of Zyphuel
When an AI proposes code or business logic that contradicts these context files, the **files win** — update the code to comply, or if business rules have officially changed, update the documentation file first, then the code.

---
*Indexed in `docs/README.md` as part of the core Zyphuel system documentation.*
