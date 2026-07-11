import React from 'react';

const Bookshelf = () => {
  const sqSize = 16;
  const xSpaces = 24;
  const ySpaces = 14;
  const zSpaces = 19;
  const bookStart = 6;
  const booksCount = 11;

  const zyphuelBooks = [
    {
      title: "On-Demand Fuel Delivery",
      image: "/images/fuel.png",
      heading: "On-Demand Fuel Delivery",
      content: "Zyphuel brings terminal-sourced petrol and high-octane directly to your doorstep in Lahore. Book your delivery slot online, and enjoy convenient refueling without waiting in long queues."
    },
    {
      title: "Backup Generator Diesel",
      image: "/images/Gallen.png",
      heading: "Generator Refueling",
      content: "Avoid outages. We deliver premium diesel directly to residential and commercial generator tanks. Experience precise fuel telemetry and prioritized scheduled dispatches."
    },
    {
      title: "Fleet Fuel Management",
      image: "/images/tank.png",
      heading: "Fleet Fuel Management",
      content: "Tailored B2B refueling solutions for delivery fleets, trucks, and vans. Manage enterprise logistics overnight with consolidated billing, live routing logs, and digital telemetry."
    },
    {
      title: "Smart Dispatch Telemetry",
      image: "/images/tablet.png",
      heading: "Smart Dispatch Telemetry",
      content: "100% transparency. Our micro-tankers are fitted with digital flow sensors that stream exact dispensed volumes in real-time, eliminating theft and short-refueling concerns."
    },
    {
      title: "24/7 Doorstep Refueling",
      image: "/images/cup.png",
      heading: "24/7 Refueling Services",
      content: "Around-the-clock service. Whether it is a midnight emergency or a corporate early-morning slot, Zyphuel runs 24/7 to keep Lahore's vehicles and facilities powered."
    },
    {
      title: "Construction Site Fueling",
      image: "/images/helmet.png",
      heading: "Construction Site Fueling",
      content: "No project delays. Zyphuel delivers commercial grade diesel directly into heavy machinery, excavators, and generators on construction sites via all-terrain tankers."
    },
    {
      title: "Transparent Digital Billing",
      image: "/images/card.png",
      heading: "Transparent Billing & COD",
      content: "Clear pricing. Small orders from 5 to 10 Litres are eligible for Cash on Delivery (COD), while orders above 10 Litres utilize prioritized advance payment structures."
    },
    {
      title: "Roadside Fuel Assistance",
      image: "/images/Cap.png",
      heading: "Emergency Fuel Assistance",
      content: "Stuck on the road? Send your coordinates via the Zyphuel platform and our dispatch rider will reach you with emergency petrol or high-octane in under 40 minutes."
    },
    {
      title: "Refueling Safety Standards",
      image: "/images/wall.png",
      heading: "Refueling Safety Standards",
      content: "Safety first. Zyphuel complies with international standards, using double-walled tanker containers, leak sensors, automatic shut-offs, and HAZMAT-trained operators."
    },
    {
      title: "Scale Verse Partnership",
      image: "/images/scaleverse-preview.jpg",
      heading: "Scale Verse Engineering",
      content: "Built on high-performance infrastructure. Scale Verse engineered Zyphuel's telemetry dash, route optimization systems, and highly responsive mobile-friendly React interfaces."
    },
    {
      title: "B2B Bulk Tanker Supply",
      image: "/images/Zyphuel-logo.png",
      heading: "Bulk Tanker Supply",
      content: "Large volume logistics ranging from 500L to 10,000L. Custom bulk fuel supply chains for manufacturing hubs, commercial centers, corporate offices, and hospitals."
    }
  ];

  const blocks = [
    // shelves
    { x: 2, y: 1, z: 1, w: 22, d: 14, h: 1, color: '#441e12', isBook: false },
    { x: 1, y: 14, z: 1, w: 24, d: 1, h: 18, color: '#441e12', isBook: false },
    { x: 1, y: 1, z: 1, w: 1, d: 13, h: 18, color: '#441e12', isBook: false },
    { x: 24, y: 1, z: 1, w: 1, d: 13, h: 18, color: '#441e12', isBook: false },
    { x: 1, y: 1, z: 19, w: 24, d: 14, h: 1, color: '#441e12', isBook: false },
    // books
    { x: 2, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#c00000', isBook: true },
    { x: 4, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#891a21', isBook: true },
    { x: 6, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#bf3e22', isBook: true },
    { x: 8, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#0e4326', isBook: true },
    { x: 10, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#0066cc', isBook: true },
    { x: 12, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#0f7b7e', isBook: true },
    { x: 14, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#084e6f', isBook: true },
    { x: 16, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#0b0823', isBook: true },
    { x: 18, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#38103d', isBook: true },
    { x: 20, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#443344', isBook: true },
    { x: 22, y: 4, z: 2, w: 2, d: 9, h: 12, color: '#666777', isBook: true }
  ];

  const generateCSS = () => {
    let css = `
      .bookshelf-container {
        display: flex;
        margin: auto;
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 580px;
        perspective: 900px;
        transform-style: preserve-3d;
        background-color: #f1f5f9;
        border-radius: 16px;
        border: 1px solid var(--border-color);
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
        --bookshelf-scale: 0.85;
      }
      @media (max-width: 768px) {
        .bookshelf-container {
          --bookshelf-scale: 0.75;
          height: 500px;
        }
      }
      @media (max-width: 600px) {
        .bookshelf-container {
          --bookshelf-scale: 0.65;
          height: 440px;
        }
      }
      @media (max-width: 480px) {
        .bookshelf-container {
          --bookshelf-scale: 0.55;
          height: 380px;
        }
      }
      @media (max-width: 380px) {
        .bookshelf-container {
          --bookshelf-scale: 0.45;
          height: 320px;
        }
      }
      .bookshelf-container input[type=radio] {
        position: absolute;
        top: -20px;
        left: -20px;
        opacity: 0;
        z-index: -1;
      }
      .bookshelf-container input[type=radio]:checked ~ input[type=reset] {
        visibility: visible;
      }
      .bookshelf-container input[type=reset] {
        background-color: #c22;
        border: 0;
        border-radius: 6px;
        color: #fff;
        padding: 0.5em 1em;
        position: absolute;
        bottom: 20px;
        left: 50%;
        visibility: hidden;
        transform: translateX(-50%);
        transition: background-color 0.2s, transform 0.2s;
        -webkit-appearance: none;
        appearance: none;
        z-index: 100;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(194, 34, 34, 0.3);
      }
      .bookshelf-container input[type=reset]:hover,
      .bookshelf-container input[type=reset]:focus {
        background-color: #e44;
      }
      .bookshelf-container input[type=reset]:active {
        background-color: #a11;
      }
      .bookshelf-container .bookshelf-inner-container {
        animation: fadeIn 0.25s 0.25s linear forwards;
        display: flex;
        margin: auto;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        perspective: 800px;
        transform-style: preserve-3d;
      }
      .bookshelf-container .bookshelf-surface {
        display: block;
        width: ${sqSize * xSpaces}px;
        height: ${sqSize * ySpaces}px;
        margin: auto;
        transform-style: preserve-3d;
        transform: translateY(${sqSize * zSpaces / 2}px) rotateX(80deg) rotateZ(0deg) scale(var(--bookshelf-scale));
        transition: transform 0.25s;
        will-change: transform;
      }
      .bookshelf-container .bookshelf-block {
        display: none;
        transform-style: preserve-3d;
        position: absolute;
        bottom: 0;
      }
      .bookshelf-container .bookshelf-block-inner div {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        position: absolute;
        width: ${sqSize}px;
        height: ${sqSize}px;
      }
      .bookshelf-container .bookshelf-block-inner {
        position: relative;
        width: ${sqSize}px;
        transition: transform 0.25s linear;
        transform-style: preserve-3d;
        transform: rotateX(-90deg) translateZ(${sqSize}px);
      }
      .bookshelf-container .bookshelf-back {
        transform: translateZ(-${sqSize}px) rotateY(180deg);
      }
      .bookshelf-container .bookshelf-left {
        transform-origin: center left;
        transform: rotateY(270deg) translateX(-${sqSize}px);
      }
      .bookshelf-container .bookshelf-right {
        transform-origin: top right;
      }
      .bookshelf-container .bookshelf-right::after,
      .bookshelf-container .bookshelf-right div {
        top: 0;
        left: 0;
        transform-origin: 0 50%;
        transition: transform 0.25s 0.25s linear;
      }
      .bookshelf-container .bookshelf-right::after {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        color: #fff;
        font-size: 24px;
        line-height: 24px;
        text-align: center;
        padding: 20% 5%;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
      }
      .bookshelf-container .bookshelf-block-inner .bookshelf-right div {
        width: 100% !important;
        height: 100% !important;
      }
      .bookshelf-container .bookshelf-top,
      .bookshelf-container .bookshelf-bottom {
        transform-origin: top center;
      }
      .bookshelf-container .bookshelf-spine,
      .bookshelf-container .bookshelf-right::after,
      .bookshelf-container .bookshelf-contents h1 {
        font-family: "Lora", serif;
        font-weight: bold;
        -webkit-font-smoothing: antialiased;
      }
      .bookshelf-container .bookshelf-spine {
        background: transparent;
        color: #fff;
        font-size: 12px;
        line-height: 12px;
        top: 0;
        left: 0;
        transform: rotate(90deg) translate(${sqSize * 0.75}px, -50%);
        white-space: nowrap;
        width: 0;
        height: ${sqSize}px;
      }
      .bookshelf-container .bookshelf-cover {
        background-color: #fff;
        z-index: 1;
      }
      .bookshelf-container .bookshelf-contents {
        font-size: 11.2px;
        padding: ${sqSize}px;
        background: #fff;
        color: #334155;
        width: 100%;
        height: 100%;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .bookshelf-container .bookshelf-contents h1 {
        font-size: 2em;
        margin-bottom: 4px;
        color: #0f172a;
      }
      .bookshelf-container .bookshelf-contents p {
        font-family: "Source Sans Pro", serif;
      }
    `;

    blocks.forEach((block, idx) => {
      const b = idx + 1;
      const { x, y, z, w, d, h, color, isBook } = block;
      const blockWidth = sqSize * w;
      const blockDepth = sqSize * d;
      const blockHeight = sqSize * h;
      const tx = sqSize * (x - 1);
      const ty = sqSize * (-y - (d - 1));
      const tz = sqSize * z + sqSize * (h - 1);

      css += `
      .bookshelf-container .b${b} {
        display: block;
        transform: translate3d(${tx}px, ${ty}px, ${tz}px);
      }
      .bookshelf-container .b${b} .bookshelf-block-inner > .bookshelf-top,
      .bookshelf-container .b${b} .bookshelf-block-inner > .bookshelf-bottom {
        width: ${blockWidth}px;
        height: ${blockDepth}px;
      }
      .bookshelf-container .b${b} .bookshelf-top {
        transform: rotateX(-90deg) translateY(-${blockDepth - sqSize}px);
      }
      .bookshelf-container .b${b} .bookshelf-bottom {
        transform: rotateX(-90deg) translateY(-${blockDepth - sqSize}px) translateZ(${blockHeight}px);
      }
      .bookshelf-container .b${b} .bookshelf-front,
      .bookshelf-container .b${b} .bookshelf-back {
        width: ${blockWidth}px;
        height: ${blockHeight}px;
      }
      .bookshelf-container .b${b} .bookshelf-front::before,
      .bookshelf-container .b${b} .bookshelf-back::before,
      .bookshelf-container .b${b} .bookshelf-left::before,
      .bookshelf-container .b${b} .bookshelf-right::before {
        background-color: #000;
        content: "";
        width: 100%;
        height: 100%;
        display: block;
      }
      .bookshelf-container .b${b} .bookshelf-front::before,
      .bookshelf-container .b${b} .bookshelf-back::before {
        opacity: 0.2;
      }
      .bookshelf-container .b${b} .bookshelf-front {
        transform: translateZ(${blockDepth - sqSize}px);
      }
      .bookshelf-container .b${b} .bookshelf-left,
      .bookshelf-container .b${b} .bookshelf-right {
        width: ${blockDepth}px;
        height: ${blockHeight}px;
      }
      .bookshelf-container .b${b} .bookshelf-right {
        transform: rotateY(-270deg) translate3d(${sqSize}px, 0, ${sqSize * (w - d)}px);
        transform-style: preserve-3d;
      }
      `;

      if (isBook) {
        css += `
      .bookshelf-container .b${b} .bookshelf-left::before,
      .bookshelf-container .b${b} .bookshelf-right::before,
      .bookshelf-container .b${b} .bookshelf-front::before,
      .bookshelf-container .b${b} .bookshelf-back::before,
      .bookshelf-container .b${b} .bookshelf-top::before,
      .bookshelf-container .b${b} .bookshelf-bottom::before {
        opacity: 0 !important;
      }
      .bookshelf-container .b${b} .bookshelf-right {
        background-color: ${color};
      }
      .bookshelf-container .b${b} .bookshelf-right::after {
        background-color: ${color};
        content: attr(data-title);
      }
      .bookshelf-container .b${b} .bookshelf-front {
        background-color: ${color};
      }
      .bookshelf-container .b${b} .bookshelf-left {
        background-color: ${color};
      }
      .bookshelf-container .b${b} .bookshelf-top,
      .bookshelf-container .b${b} .bookshelf-back,
      .bookshelf-container .b${b} .bookshelf-bottom {
        background-color: #fff;
        background-image: repeating-linear-gradient(90deg, transparent, transparent 21%, #aaa 21%, #aaa 25%, transparent 25%, transparent 46%, #aaa 46%, #aaa 50%, transparent 50%);
        background-size: ${sqSize}px ${sqSize}px;
      }
        `;
      } else {
        css += `
      .bookshelf-container .b${b} .bookshelf-left::before,
      .bookshelf-container .b${b} .bookshelf-right::before {
        opacity: 0.4;
      }
      .bookshelf-container .b${b} .bookshelf-top,
      .bookshelf-container .b${b} .bookshelf-bottom,
      .bookshelf-container .b${b} .bookshelf-left,
      .bookshelf-container .b${b} .bookshelf-right,
      .bookshelf-container .b${b} .bookshelf-front,
      .bookshelf-container .b${b} .bookshelf-back {
        background-color: ${color};
      }
        `;
      }
    });

    // Hover effect on books
    css += `
      .bookshelf-container label.bookshelf-block:hover .bookshelf-block-inner {
        transform: rotateX(-90deg) translateZ(${sqSize * 4}px);
      }
    `;

    // Checked states and view/return animations
    for (let i = 1; i <= booksCount; i++) {
      const labelIndex = i + bookStart - 1;
      const xPercent = 50 - (200 / 24) * i; // original calculation
      css += `
      .bookshelf-container input[type=radio]:nth-child(${i}):checked ~ .bookshelf-surface {
        transform: translate(${xPercent.toFixed(3)}%, ${sqSize * zSpaces / 2}px) rotateX(80deg) rotateZ(0deg) scale(var(--bookshelf-scale));
      }
      .bookshelf-container input[type=radio]:nth-child(${i}):checked ~ .bookshelf-surface label:nth-child(${labelIndex}) .bookshelf-block-inner {
        animation: viewBook 0.25s 0.25s linear forwards;
      }
      .bookshelf-container input[type=radio]:nth-child(${i}) ~ .bookshelf-surface label:nth-child(${labelIndex}) .bookshelf-block-inner {
        animation: returnBook 0.25s linear;
      }
      .bookshelf-container input[type=radio]:nth-child(${i}):checked ~ .bookshelf-surface label:nth-child(${labelIndex}) .bookshelf-block-inner:hover .bookshelf-right::after,
      .bookshelf-container input[type=radio]:nth-child(${i}):checked ~ .bookshelf-surface label:nth-child(${labelIndex}) .bookshelf-block-inner:hover .bookshelf-cover {
        transform: rotateY(-135deg);
      }
      `;
    }

    // Keyframes
    css += `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes viewBook {
        from { transform: rotateX(-90deg) translateZ(64px) rotateY(0); }
        50%  { transform: rotateX(-90deg) translateZ(240px) rotateY(0); }
        to   { transform: rotateX(-90deg) translateZ(240px) rotateY(-90deg) rotateZ(-10deg) translateZ(-80px); }
      }
      @keyframes returnBook {
        from { transform: rotateX(-90deg) translateZ(240px) rotateY(-90deg) rotateZ(-10deg) translateZ(-80px); }
        50%  { transform: rotateX(-90deg) translateZ(240px) rotateY(0); }
        to   { transform: rotateX(-90deg) translateZ(16px) rotateY(0); }
      }
    `;

    return css;
  };

  return (
    <div className="bookshelf-container">
      <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
      <form className="bookshelf-inner-container">
        {zyphuelBooks.map((_, i) => (
          <input key={i} type="radio" name="title" id={`book${i + 1}`} />
        ))}
        <div className="bookshelf-surface">
          {Array.from({ length: blocks.length }, (_, i) => i + 1).map((b) => {
            const idx = b - 1;
            const block = blocks[idx];
            if (block.isBook) {
              const bookId = b - bookStart; // zero‑based index in zyphuelBooks array
              const bookData = zyphuelBooks[bookId];
              return (
                <label key={b} htmlFor={`book${bookId + 1}`} className={`bookshelf-block b${b}`}>
                  <div className="bookshelf-block-inner">
                    <div className="bookshelf-back"></div>
                    <div className="bookshelf-bottom"></div>
                    <div className="bookshelf-front">
                      <div className="bookshelf-spine">{bookData.title}</div>
                    </div>
                    <div className="bookshelf-left"></div>
                    <div className="bookshelf-right" data-title={bookData.title}>
                      <div className="bookshelf-cover" style={{ background: `url(${bookData.image}) no-repeat center`, backgroundSize: 'cover' }}></div>
                      <div className="bookshelf-contents">
                        <h1>{bookData.heading}</h1>
                        <p>{bookData.content}</p>
                      </div>
                    </div>
                    <div className="bookshelf-top"></div>
                  </div>
                </label>
              );
            } else {
              return (
                <div key={b} className={`bookshelf-block b${b}`}>
                  <div className="bookshelf-block-inner">
                    <div className="bookshelf-back"></div>
                    <div className="bookshelf-bottom"></div>
                    <div className="bookshelf-front"></div>
                    <div className="bookshelf-left"></div>
                    <div className="bookshelf-right"></div>
                    <div className="bookshelf-top"></div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <input type="reset" value="Return" />
      </form>
    </div>
  );
};

export default Bookshelf;