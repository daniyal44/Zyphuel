import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import NotFoundGraphic from '../components/NotFoundGraphic';

export default function NotFoundPage() {
  useSEO({
    title: 'Page Not Found (404) | Zyphuel Fuel Delivery Lahore',
    description: 'The page you requested could not be found. Explore Zyphuel doorstep fuel delivery services, fuel guides, or contact our support team in Lahore.',
    canonicalPath: '/404.html',
    type: 'website'
  });

  return (
    <main style={{ paddingTop: 'calc(var(--nav-height) + 40px)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto', padding: '40px 20px' }}>
        <div className="fade-in-up animated" style={{ opacity: 1, transform: 'none' }}>
          <NotFoundGraphic />

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.2 }}>
            404 - Page Not Found
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
            The page you are looking for might have been removed, had its address changed, or is temporarily unavailable.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-house"></i> Return to Homepage
            </Link>
            <Link to="/services/" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-truck-droplet"></i> Explore Services
            </Link>
            <Link to="/contact/" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-headset"></i> Contact Support
            </Link>
          </div>

          <div style={{
            background: 'var(--brand-petrol, #f0f9ff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: 'var(--radius-md, 16px)',
            padding: '24px',
            textAlign: 'left'
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Popular Destinations:
            </h2>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', paddingLeft: 0, listStyle: 'none' }}>
              <li>
                <Link to="/order/" style={{ color: 'var(--accent-color, #0284c7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }}></i> Order Fuel Online
                </Link>
              </li>
              <li>
                <Link to="/download/" style={{ color: 'var(--accent-color, #0284c7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }}></i> Download Android App
                </Link>
              </li>
              <li>
                <Link to="/about/" style={{ color: 'var(--accent-color, #0284c7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }}></i> About Zyphuel
                </Link>
              </li>
              <li>
                <Link to="/blog/" style={{ color: 'var(--accent-color, #0284c7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }}></i> Fuel Guides &amp; Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
