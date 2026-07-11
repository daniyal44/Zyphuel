import React from 'react';
import Bookshelf from '../components/Bookshelf';

export default function Books() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Bookshelf />
    </div>
  );
}
