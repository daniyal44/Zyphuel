import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Accessible Breadcrumbs Component
 * Generates semantic HTML markup with Schema.org BreadcrumbList microdata
 * @param {Array<{ label: string, path?: string }>} items
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  const allItems = [{ label: 'Home', path: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <div className="container">
        <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const position = index + 1;

            return (
              <li
                key={index}
                className={`breadcrumb-item${isLast ? ' active' : ''}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {!isLast && item.path ? (
                  <Link to={item.path} itemProp="item" className="breadcrumb-link">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span itemProp="name" aria-current={isLast ? 'page' : undefined} className="breadcrumb-current">
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={String(position)} />
                {!isLast && (
                  <span className="breadcrumb-separator" aria-hidden="true">
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
