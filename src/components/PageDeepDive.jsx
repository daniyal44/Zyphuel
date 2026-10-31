/**
 * PageDeepDive
 *
 * A single, prerender-safe block of genuinely page-specific content.
 *
 * Why this exists: /services/, /download/ and /order/ were the only three URLs
 * Google kept out of the index. Their titles, canonicals, robots directives and
 * sitemap entries were already correct, so the remaining gap was on-page depth —
 * each page leaned on the same shared header, footer and boilerplate copy, and
 * most of its unique text sat behind canvas animations.
 *
 * This component renders real prose, tables and Q&A into the prerendered HTML
 * (no client state, no effects, no images), so a crawler that never executes
 * JavaScript still gets the full page value.
 *
 * Rules for editing `src/data/pageDeepDives.js`:
 *  - Only publish facts that are true for the live service (volumes, fees, fuel
 *    grades, app build numbers, coverage areas, hours).
 *  - A question only belongs in `faqs` if the same question and answer are
 *    rendered here — the FAQPage schema is generated from this same array.
 */

import { Link } from 'react-router-dom'

const styles = {
  section: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid var(--border-color, #e2e8f0)',
    padding: '56px 0 64px'
  },
  inner: { maxWidth: '980px', margin: '0 auto' },
  eyebrow: {
    display: 'inline-block',
    fontSize: '0.78rem',
    fontWeight: 800,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#0369a1',
    backgroundColor: '#e0f2fe',
    borderRadius: '999px',
    padding: '6px 14px',
    marginBottom: '14px'
  },
  title: {
    fontSize: 'clamp(1.45rem, 3vw, 2rem)',
    lineHeight: 1.25,
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 14px'
  },
  intro: {
    fontSize: '1rem',
    lineHeight: 1.75,
    color: '#334155',
    margin: '0 0 12px'
  },
  updated: {
    fontSize: '0.82rem',
    color: '#64748b',
    margin: '0 0 34px'
  },
  block: { marginBottom: '34px' },
  h3: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 10px'
  },
  p: {
    fontSize: '0.94rem',
    lineHeight: 1.75,
    color: '#334155',
    margin: '0 0 10px'
  },
  list: {
    margin: '0 0 10px',
    paddingLeft: '1.2rem',
    fontSize: '0.94rem',
    lineHeight: 1.8,
    color: '#334155'
  },
  tableWrap: {
    width: '100%',
    overflowX: 'auto',
    border: '1px solid var(--border-color, #e2e8f0)',
    borderRadius: '10px',
    margin: '4px 0 10px'
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '420px' },
  th: {
    textAlign: 'left',
    padding: '11px 14px',
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    fontWeight: 800,
    borderBottom: '1px solid var(--border-color, #e2e8f0)',
    whiteSpace: 'nowrap'
  },
  td: {
    padding: '11px 14px',
    borderBottom: '1px solid #eef2f7',
    color: '#334155',
    verticalAlign: 'top'
  },
  faqItem: {
    border: '1px solid var(--border-color, #e2e8f0)',
    borderRadius: '10px',
    padding: '16px 18px',
    marginBottom: '12px',
    backgroundColor: '#f8fafc'
  },
  faqQ: {
    fontSize: '0.98rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 7px'
  },
  faqA: { fontSize: '0.92rem', lineHeight: 1.7, color: '#334155', margin: 0 },
  related: {
    borderTop: '1px solid var(--border-color, #e2e8f0)',
    paddingTop: '22px',
    marginTop: '34px'
  },
  relatedTitle: {
    fontSize: '0.95rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 10px'
  },
  relatedList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px 22px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  relatedLink: { color: '#0369a1', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'underline' },
  note: {
    fontSize: '0.86rem',
    lineHeight: 1.7,
    color: '#475569',
    backgroundColor: '#f8fafc',
    borderLeft: '3px solid #0ea5e9',
    borderRadius: '0 8px 8px 0',
    padding: '12px 16px',
    margin: '18px 0 0'
  }
}

export default function PageDeepDive({ id, eyebrow, title, intro, lastUpdated, sections = [], faqs = [], related = [], note }) {
  return (
    <section id={id} style={styles.section} aria-labelledby={`${id}-heading`}>
      <div className="container" style={styles.inner}>
        {eyebrow ? <span style={styles.eyebrow}>{eyebrow}</span> : null}
        <h2 id={`${id}-heading`} style={styles.title}>{title}</h2>
        {intro ? <p style={styles.intro}>{intro}</p> : null}
        {lastUpdated ? (
          <p style={styles.updated}>
            Last updated: {lastUpdated} · Maintained by the Zyphuel operations and dispatch team
          </p>
        ) : null}

        {sections.map((section) => (
          <div key={section.h3} style={styles.block}>
            <h3 style={styles.h3}>{section.h3}</h3>
            {(section.body || []).map((paragraph) => (
              <p key={paragraph.slice(0, 48)} style={styles.p}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul style={styles.list}>
                {section.list.map((item) => (
                  <li key={item.slice(0, 48)}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.table ? (
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {section.table.head.map((cell) => (
                        <th key={cell} style={styles.th} scope="col">{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row.join('|')}>
                        {row.map((cell, index) => (
                          index === 0
                            ? <th key={cell} scope="row" style={{ ...styles.td, fontWeight: 700, color: '#0f172a', backgroundColor: '#ffffff' }}>{cell}</th>
                            : <td key={`${cell}-${index}`} style={styles.td}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {section.after ? <p style={styles.p}>{section.after}</p> : null}
          </div>
        ))}

        {faqs.length ? (
          <div style={styles.block}>
            <h3 style={styles.h3}>Straight answers</h3>
            {faqs.map((faq) => (
              <div key={faq.q} style={styles.faqItem}>
                <h4 style={styles.faqQ}>{faq.q}</h4>
                <p style={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>
        ) : null}

        {note ? <p style={styles.note}>{note}</p> : null}

        {related.length ? (
          <nav style={styles.related} aria-label="Related pages">
            <p style={styles.relatedTitle}>Related pages</p>
            <ul style={styles.relatedList}>
              {related.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} style={styles.relatedLink}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </section>
  )
}
