// import { useNavigate } from 'react-router-dom';
// import { useScrollReveal } from '../hooks/useScrollReveal';
// import GeometricalBirds from '../components/GeometricalBirds';
// import { useState, useEffect, useRef, useCallback } from "react";
// import { useSEO } from '../hooks/useSEO';
// import BrandAIIndex from '../components/BrandAIIndex';
// import "./styles.css";


// const TOTAL_CARDS = 6;

// const cardImages = [
//   "/images/daniyal.jpeg",
//   "/images/umar.jpeg",
//   "/images/rauf.jpeg",
//   "https://i.postimg.cc/TYpkHfqp/collab.png",
//   "/images/adil.png",
//   "https://i.postimg.cc/SsxV8N1q/logo.png",
// ];

// const teamMembers = [
//   { name: "Muhammad Daniyal", role: "Founder of Zyphuel" },
//   { name: "Muhammad Umer Farooq", role: "Founder of Scale Verse" },
//   { name: "Muhammad Abdul Rauf", role: "CO-Founder of Scale Verse" },
//   { name: "Zyphuel", role: "Collaboration with Scale Verse" },
//   { name: "Adil Farooq", role: "Sales Manager of Scale Verse" },
//   { name: "Scale Verse", role: "Business Partner's" },
// ];
// // ==========================================
// // Main Export Component: AboutPage
// // ==========================================
// export default function AboutPage() {
//   useSEO({
//     title: 'About Us | Zyphuel – Pakistan’s #1 Fuel Supplier & Agency in Lahore',
//     description: 'Learn about Zyphuel, Pakistan\'s No.1 mobile fuel delivery brand, supplier, and agency. Founded by CEO Muhammad Daniyal with partner Muhammad Umer Farooq. Operating on global standards of energy mobility, logistics, and tech innovation.',
//     keywords: [
//       'Z', 'zy', 'zyp', 'zyph', 'zyphu', 'zyphue', 'zyphuel', 'zphuel', 'zafuel', 'ziphuel', 'zaful', 'zeiphuel', 'zephiel', 'zaphotel', 'z fuel', 'zaphael', 'zyphus', 'keyfuels', 'z fuels',
//       'Pakistan number 1 fuel brand', 'Pakistan number 1 fuel agency', 'Pakistan number 1 fuel suppliers', 'best fuel delivery Pakistan', 'best services in Pakistan',
//       'images', 'videos', 'links', 'articles', 'blogs', 'founder', 'ceo', 'business partners', 'Muhammad Daniyal CEO', 'Scale Verse', 'Muhammad Umer Farooq', 'Zyphuel story', 'energy mobility partners',
//       'global logistics benchmarks', 'international energy startup', 'Pakistan tech logistics'
//     ],
//     image: 'https://zyphuel.netlify.app/images/logo.png',
//     url: 'https://zyphuel.netlify.app/about',
//     type: 'website',
//     schema: {
//       "@context": "https://schema.org",
//       "@type": "AboutPage",
//       "mainEntity": {
//         "@type": "Organization",
//         "name": "Zyphuel",
//         "url": "https://zyphuel.netlify.app",
//         "founder": [
//           {
//             "@type": "Person",
//             "name": "Muhammad Daniyal",
//             "jobTitle": "Founder & CEO",
//             "sameAs": "https://github.com/daniyal44"
//           }
//         ],
//         "partner": [
//           {
//             "@type": "Person",
//             "name": "Muhammad Umer Farooq",
//             "jobTitle": "Founder of Scale Verse (Business Partner)"
//           },
//           {
//             "@type": "Person",
//             "name": "Muhammad Abdul Rauf",
//             "jobTitle": "CO-Founder of Scale Verse (Business Partner)"
//           }
//         ]
//       }
//     }
//   });

//   const pageRef = useScrollReveal();
//   const navigate = useNavigate();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [displayedMember, setDisplayedMember] = useState(teamMembers[0]);
//   const [infoOpacity, setInfoOpacity] = useState(1);
//   const [showScrollIndicator, setShowScrollIndicator] = useState(true);

//   /* Refs for values that are needed inside stable callbacks */
//   const isAnimatingRef = useRef(false);
//   const currentIndexRef = useRef(0);
//   const touchStartY = useRef(0);

//   /* ---------- helper: compute CSS class for a card ---------- */
//   const getCardClass = (cardIndex) => {
//     const offset =
//       (cardIndex - currentIndex + TOTAL_CARDS) % TOTAL_CARDS;
//     if (offset === 0) return "card center";
//     if (offset === 1) return "card down-1";
//     if (offset === 2) return "card down-2";
//     if (offset === TOTAL_CARDS - 1) return "card up-1";
//     if (offset === TOTAL_CARDS - 2) return "card up-2";
//     return "card hidden";
//   };

//   /* ---------- stable update function (uses refs, never changes) ---------- */
//   const updateCarousel = useCallback((newIndex) => {
//     if (isAnimatingRef.current) return;
//     isAnimatingRef.current = true;

//     const index = (newIndex + TOTAL_CARDS) % TOTAL_CARDS;
//     currentIndexRef.current = index;
//     setCurrentIndex(index);

//     // Fade out → change text → fade in
//     setInfoOpacity(0);
//     setTimeout(() => {
//       setDisplayedMember(teamMembers[index]);
//       setInfoOpacity(1);
//     }, 300);

//     // Unlock after animation completes
//     setTimeout(() => {
//       isAnimatingRef.current = false;
//     }, 800);
//   }, []);

//   /* ---------- keyboard navigation ---------- */
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowUp")
//         updateCarousel(currentIndexRef.current - 1);
//       else if (e.key === "ArrowDown")
//         updateCarousel(currentIndexRef.current + 1);
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [updateCarousel]);

//   /* ---------- scroll indicator auto‑hide ---------- */
//   useEffect(() => {
//     const timer = setTimeout(() => setShowScrollIndicator(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   /* ---------- touch / swipe handlers ---------- */
//   const handleTouchStart = (e) => {
//     touchStartY.current = e.changedTouches[0].screenY;
//   };
//   const handleTouchEnd = (e) => {
//     const touchEndY = e.changedTouches[0].screenY;
//     const diff = touchStartY.current - touchEndY;
//     if (Math.abs(diff) > 50) {
//       if (diff > 0) updateCarousel(currentIndexRef.current + 1);
//       else updateCarousel(currentIndexRef.current - 1);
//     }
//   };


//   return (
//     <div ref={pageRef}>
//       <main style={{ paddingTop: 'var(--nav-height)' }}>

//         {/* Story Section */}
//         <section id="about" className="about section-padding">
//           <div className="container" style={{ maxWidth: '900px' }}>
//             <div className="fade-in-up">

//               <div className="about-header-logo-row">
//                 <img src="/images/Zyphuel-logo.png" alt="Zyphuel Company Logo" className="about-company-logo" />
//                 <h1 className="section-title">Fuel Delivery & Mobile Refueling Solutions</h1>
//               </div>

//               <div className="story-desktop-copy">
//                 <p className="about-story" style={{ marginBottom: '16px' }}>
//                   Zyphuel is a Lahore-based fuel services agency revolutionizing how Pakistan keeps running. Instead of making customers idle in long lines or managing hazardous jerrycans, Zyphuel delivers high-quality fuel directly to vehicles and equipment, wherever they are. Our fleet of professional tanker trucks comes to you on schedule, ensuring you save time, cut costs, and avoid downtime. This on-demand fuel delivery model boosts productivity for fleets, farms, and businesses: by refueling during downtime, clients free their teams to focus on core work, not fueling logistics.
//                 </p>
//                 <p className="about-story" style={{ marginBottom: '24px' }}>
//                   Every Zyphuel delivery is handled with certified safety standards and digital tracking, so you always know your fuel quality and delivery status. We use advanced logistics and scheduling software (and a mobile app) to optimize routes, meaning faster response times and fewer miles on the road. Beyond convenience, our service helps the environment by reducing extra trips to gas stations – lowering emissions and fuel waste. In short, Zyphuel brings fuel on demand: reliable, safe, and right where you need it.
//                 </p>
//               </div>

//               <div className="story-mobile-copy">
//                 <p className="about-story" style={{ fontWeight: '700', marginBottom: '14px' }}>
//                   Zyphuel brings fuel to you on demand – no lines, no hassle.
//                 </p>
//                 <ul className="story-mobile-bullets" style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
//                   <li style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Our tanker trucks come to your location with certified, top-grade fuel.</li>
//                   <li style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Enjoy more uptime: fuel arrives during your downtime, so your vehicles and equipment stay on schedule.</li>
//                   <li style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Get a quick quote or schedule delivery easily through our app or website.</li>
//                   <li style={{ color: 'var(--text-secondary)' }}>Reliable service and safety compliance as standard.</li>
//                 </ul>
//               </div>

//               <div style={{ marginBottom: '35px' }}>
//                 <button
//                   onClick={() => {
//                     navigate('/order');
//                     window.scrollTo(0, 0);
//                   }}
//                   className="btn btn-primary"
//                   style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
//                 >
//                   <i className="fa-solid fa-truck-fast"></i> Schedule Your First Delivery
//                 </button>
//               </div>

//               {/* Geometrical Birds slideshow showcased under hero/story section */}
//               <div style={{ margin: '45px 0', borderTop: '1px solid var(--border-color)', paddingTop: '45px', paddingBottom: '25px' }}>
//                 <GeometricalBirds />
//               </div>

//               <div className="about-values-grid">
//                 <div className="value-item">
//                   <span className="value-icon"><i className="fa-solid fa-truck-ramp-box"></i></span>
//                   <h4 className="value-title">On-Demand Logistics</h4>
//                   <p className="value-desc">Certified fleet refuels vehicles and equipment during downtime.</p>
//                 </div>
//                 <div className="value-item">
//                   <span className="value-icon"><i className="fa-solid fa-scale-balanced"></i></span>
//                   <h4 className="value-title">Uptime Transparency</h4>
//                   <p className="value-desc">Calibrated digital flow meters show precise volumetric billing.</p>
//                 </div>
//                 <div className="value-item">
//                   <span className="value-icon"><i className="fa-solid fa-shield-halved"></i></span>
//                   <h4 className="value-title">Safety Compliance</h4>
//                   <p className="value-desc">Strict adherence to HAZMAT, NFPA 30A, and EPA guidelines.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>


//         {/* Founder Section */}
//         <section className="about-founder section-padding" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border-color)' }}>
//           <div className="container">
//             <div className="founder-grid fade-in-up">

//               <div className="founder-image-col">
//                 <div className="founder-card-frame">
//                   <img src="/images/daniyal.jpeg" alt="Muhammad Daniyal - Founder & CEO" className="founder-avatar-img" />
//                   <div className="founder-badge">Founder & CEO</div>
//                 </div>
//               </div>

//               <div className="founder-info-col">
//                 <div className="hero-subtitle-badge" style={{ backgroundColor: 'var(--brand-petrol)', borderColor: 'rgba(58,134,200,0.15)', color: '#1a4f7c' }}>
//                   <span>Visionary Leadership</span>
//                 </div>
//                 <h2 className="section-title" style={{ marginBottom: '16px' }}>Muhammad Daniyal</h2>
//                 <h4 className="founder-subtitle">Founder & CEO, Zyphuel</h4>
//                 <p className="founder-bio">
//                   Muhammad Daniyal is the visionary founder leading Zyphuel. Recognizing the persistent energy delivery bottlenecks in Pakistan—from home backup generators during grid outages to logistical disruptions in commercial fleet management—he designed an on-demand, mobile refuelling network. Under his supervision, Zyphuel is setting new benchmarks for fuel safety, transparency, and consumer convenience.
//                 </p>
//                 <div className="founder-quote-box">
//                   <i className="fa-solid fa-quote-left quote-icon"></i>
//                   <p className="founder-quote-text">
//                     "We are bringing technology and efficiency directly to the fueling nozzle. No lines, no delay, and complete digital transparency with every drop delivered."
//                   </p>
//                 </div>
//               </div>
//                       <h1>
//                         <button>
//                           <icon="Linkedn">
//                           Linkedn Profile
//                           <a href="www.linkedin.com/in/muhammad-d-9243b5243"></a>
//                         </button>
                        
//                       </h1>
//             </div>
//           </div>
//         </section>

//         {/* Partner Section */}
//         <section className="about-partner section-padding" style={{ borderTop: '1px solid var(--border-color)' }}>
//           <div className="container">
//             <div className="partner-grid fade-in-up">

//               <div className="partner-info-col">
//                 <div className="hero-subtitle-badge" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.2)', color: '#7e22ce' }}>
//                   <span>Growth & Tech Partner</span>
//                 </div>
//                 <h2 className="section-title" style={{ marginBottom: '16px' }}>Strategic Business Partner</h2>
//                 <h4 className="partner-company-name">Scale Verse</h4>
//                 <p className="partner-description">
//                   Scale Verse is Zyphuel's primary technology and design alliance. The user interfaces, digital dashboards, logistics platforms, and scaling operations that power our 24/7 delivery services were engineered in collaboration with Scale Verse's executive team.
//                 </p>

//                 <div className="partner-meta-box">
//                   <div className="partner-meta-item">
//                     <span className="partner-meta-label">Website:</span>
//                     <a href="https://scaleverse.app" target="_blank" rel="noopener noreferrer" className="partner-website-link">
//                       scaleverse.app <i className="fa-solid fa-arrow-up-right-from-square"></i>
//                     </a>
//                   </div>

//                   <div className="partner-founder-profile">
//                     <img src="/images/umar.jpeg" alt="Muhammad Umer Farooq - Founder of Scaleverse" className="partner-founder-avatar" />
//                     <div className="partner-founder-details">
//                       <span className="partner-founder-badge">Scale Verse</span>
//                       <h4 className="partner-founder-fullname">Muhammad Umer Farooq</h4>
//                       <p className="partner-founder-designation">Founder of Scaleverse</p>
//                     </div>
//                   </div>
//                   <div className="partner-founder-profile">
//                     <img src="/images/rauf.jpeg" alt="Abdul Rauf - Co-Founder of Scaleverse" className="partner-founder-avatar" />
//                     <div className="partner-founder-details">
//                       <span className="partner-founder-badge">Scale Verse</span>
//                       <h4 className="partner-founder-fullname">Abdul Rauf</h4>
//                       <p className="partner-founder-designation">CO-Founder of Scaleverse</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="partner-preview-col">
//                 <div className="browser-mockup-frame">
//                   <div className="browser-header-bar">
//                     <span className="browser-header-dot red"></span>
//                     <span className="browser-header-dot yellow"></span>
//                     <span className="browser-header-dot green"></span>
//                     <span className="browser-address-field">https://scaleverse.app</span>
//                   </div>
//                   <div className="browser-body-content">
//                     <a href="https://scaleverse.app" target="_blank" rel="noopener noreferrer" className="partner-link-block">
//                       <img src="/images/scaleverse-preview.jpg" alt="Scaleverse Web Portal Preview" className="partner-mockup-img" />
//                       <div className="browser-hover-overlay">
//                         <span>Visit scaleverse.app <i className="fa-solid fa-up-right-from-square"></i></span>
//                       </div>
//                     </a>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </section>

//         {/* team members*/}
//         <section className="about-team-section">
//           <div className="main-container">
//             {/* ============ CAROUSEL SECTION ============ */}
//             <div className="carousel-section">
//               <div className="carousel-container">
//                 <button
//                   className="nav-arrow up"
//                   onClick={() =>
//                     updateCarousel(currentIndexRef.current - 1)
//                   }
//                 >
//                   <img src="https://ik.imagekit.io/gopichakradhar/icons/top.png?updatedAt=1754290522765" alt="Up" />
//                 </button>

//                 <div
//                   className="carousel-track"
//                   onTouchStart={handleTouchStart}
//                   onTouchEnd={handleTouchEnd}
//                 >
//                   {cardImages.map((src, i) => (
//                     <div
//                       key={i}
//                       className={getCardClass(i)}
//                       data-index={i}
//                       onClick={() => updateCarousel(i)}
//                     >
//                       <img
//                         src={src}
//                         alt={`${teamMembers[i]?.name || 'Team Member'} - ${teamMembers[i]?.role || 'Staff'}`}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   className="nav-arrow down"
//                   onClick={() =>
//                     updateCarousel(currentIndexRef.current + 1)
//                   }
//                 >
//                   <img
//                     src="https://ik.imagekit.io/gopichakradhar/icons/down.png?updatedAt=1754290523249"
//                     alt="Down"
//                   />
//                 </button>
//               </div>
//             </div>

//             {/* ============ CONTROLS SECTION ============ */}
//             <div className="controls-section">
//               <div className="nav-controls">
//                 <button
//                   className="nav-arrow up"
//                   onClick={() =>
//                     updateCarousel(currentIndexRef.current - 1)
//                   }
//                 >
//                   <img
//                     src="https://ik.imagekit.io/gopichakradhar/icons/top.png?updatedAt=1754290522765"
//                     alt="Up"
//                   />
//                 </button>
//                 <button
//                   className="nav-arrow down"
//                   onClick={() =>
//                     updateCarousel(currentIndexRef.current + 1)
//                   }
//                 >
//                   <img
//                     src="https://ik.imagekit.io/gopichakradhar/icons/down.png?updatedAt=1754290523249"
//                     alt="Down"
//                   />
//                 </button>
//               </div>

//               <div
//                 className="member-info"
//                 style={{ opacity: infoOpacity }}
//               >
//                 <h2 className="member-name">{displayedMember.name}</h2>
//                 <p className="member-role">{displayedMember.role}</p>
//               </div>

//               <div className="dots">
//                 {teamMembers.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`dot${i === currentIndex ? " active" : ""
//                       }`}
//                     data-index={i}
//                     onClick={() => updateCarousel(i)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ============ SCROLL INDICATOR ============ */}
//           {showScrollIndicator && (
//             <div className="scroll-indicator">scroll</div>
//           )}






//         </section>

//         {/* Strategic Collaboration Post Section */}
//         <section className="about-collaboration section-padding" style={{ backgroundColor: '#faf5ff', borderTop: '1px solid var(--border-color)' }}>
//           <div className="container">
//             <div className="collaboration-post-container fade-in-up">
//               <div className="collaboration-post-header">
//                 <div className="collab-badge-row">
//                   <span className="collab-badge badge-zyphuel">Zyphuel</span>
//                   <span className="collab-divider"><i className="fa-solid fa-handshake"></i></span>
//                   <span className="collab-badge badge-scaleverse">Scale Verse</span>
//                 </div>
//                 <div className="collab-meta">
//                   <span className="collab-location"><i className="fa-solid fa-earth-americas"></i> Lahore &amp; London</span>
//                   <span className="collab-date"><i className="fa-solid fa-calendar-days"></i> July 2026</span>
//                 </div>
//               </div>

//               <div className="collaboration-post-content">
//                 <h3 className="collab-post-title">
//                   Strategic Announcement: Scale Verse × Zyphuel Partner to Accelerate Next-Generation Energy Mobility
//                 </h3>
//                 <p className="collab-post-paragraph">
//                   <strong>Scale Verse</strong>, a premier global digital engineering and product acceleration firm, today announced a long-term technology partnership with <strong>Zyphuel</strong>, Pakistan's leading digital platform for on-demand fuel and petrol delivery. This strategic alliance focuses on optimizing Zyphuel's smart logistics backbone, real-time routing engines, and consumer telemetry dashboards.
//                 </p>
//                 <p className="collab-post-paragraph">
//                   Through this alliance, Scale Verse's executive product team will design and engineer scalable web architectures, IoT-calibrated fuel meter integrations, and predictive supply chain dispatch dashboards for Zyphuel. By merging Scale Verse's international software design principles with Zyphuel's hyper-local distribution network in Lahore, the partnership represents a major milestone in modernizing fuel logistics in the region.
//                 </p>
//                 <p className="collab-post-paragraph font-italic">
//                   "This collaboration is a testament to what happens when local operational expertise meets world-class engineering standards. Scale Verse is proud to assist Zyphuel in scaling its platform and delivering seamless, transparent refueling solutions to thousands of customers."
//                   <br />
//                   <span className="collab-sign">— Joint Executive Board Statement</span>
//                 </p>
//               </div>

//               <div className="collaboration-post-footer">
//                 <span className="collab-category">Global Expansion Initiative</span>
//                 <div className="collab-share-info">
//                   <span>Official Release</span>
//                   <i className="fa-solid fa-circle-check verify-icon"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Global AI & Search Engine Directory Index */}
//         <BrandAIIndex />

//       </main>
//     </div>
//   );
// }















import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import GeometricalBirds from '../components/GeometricalBirds';
import { useState, useEffect, useRef, useCallback } from "react";
import { useSEO } from '../hooks/useSEO';
import BrandAIIndex from '../components/BrandAIIndex';
import "./styles.css";

const TOTAL_CARDS = 6;

const cardImages = [
  "/images/daniyal.jpeg",
  "/images/umar.jpeg",
  "/images/rauf.jpeg",
  "https://i.postimg.cc/TYpkHfqp/collab.png",
  "/images/adil.png",
  "https://i.postimg.cc/SsxV8N1q/logo.png",
];

const teamMembers = [
  { name: "Muhammad Daniyal", role: "Founder of Zyphuel" },
  { name: "Muhammad Umer Farooq", role: "Founder of Scale Verse" },
  { name: "Muhammad Abdul Rauf", role: "CO-Founder of Scale Verse" },
  { name: "Zyphuel", role: "Collaboration with Scale Verse" },
  { name: "Adil Farooq", role: "Sales Manager of Scale Verse" },
  { name: "Scale Verse", role: "Business Partner's" },
];

// ==========================================
// Main Export Component: AboutPage
// ==========================================
export default function AboutPage() {
  useSEO({
    title: 'About Us | Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers',
    description: 'Learn about Zyphuel, Pakistan\'s No.1 mobile fuel delivery brand, supplier, agency, and premier mobile application for fuel suppliers. Founded by CEO Muhammad Daniyal with partner Muhammad Umer Farooq. Operating on global standards of energy mobility, logistics, and tech innovation.',
    keywords: [
      'Z', 'zy', 'zyp', 'zyph', 'zyphu', 'zyphue', 'zyphuel', 'zphuel', 'zafuel', 'ziphuel', 'zaful', 'zeiphuel', 'zephiel', 'zaphotel', 'z fuel', 'zaphael', 'zyphus', 'keyfuels', 'z fuels',
      'Pakistan number 1 fuel brand', 'Pakistan number 1 fuel agency', 'Pakistan number 1 fuel suppliers', 'Pakistan number 1 best fuel delivery', 'best services in Pakistan',
      'mobile application for fuel suppliers', 'best mobile application for fuel suppliers', 'images', 'videos', 'links', 'articles', 'blogs', 'founder', 'ceo', 'business partners', 'Muhammad Daniyal CEO', 'Scale Verse', 'Muhammad Umer Farooq', 'Zyphuel story', 'energy mobility partners',
      'global logistics benchmarks', 'international energy startup', 'Pakistan tech logistics'
    ],
    image: 'https://zyphuel.netlify.app/images/logo.png',
    url: 'https://zyphuel.netlify.app/about',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "Zyphuel",
        "alternateName": ["Z", "zy", "zyp", "zyph", "zyphu", "zyphue", "zyphuel", "zphuel", "zafuel", "ziphuel", "zaful", "zeiphuel", "zephiel", "zaphotel", "z fuel", "zaphael", "zyphus", "keyfuels", "z fuels"],
        "url": "https://zyphuel.netlify.app",
        "sameAs": [
          "https://www.linkedin.com/company/zyphuel/?viewAsMember=true",
          "https://www.linkedin.com/in/muhammad-daniyal490",
          "https://share.google/Nb4XGKYq5aU0nzLr3",
          "https://github.com/daniyal44",
          "https://scaleverse.app"
        ],
        "founder": [
          {
            "@type": "Person",
            "name": "Muhammad Daniyal",
            "jobTitle": "Founder & CEO",
            "sameAs": [
              "https://www.linkedin.com/in/muhammad-daniyal490",
              "https://github.com/daniyal44",
              "https://www.facebook.com/muhammad.daniyal.522942/"
            ]
          }
        ],
        "partner": [
          {
            "@type": "Person",
            "name": "Muhammad Umer Farooq",
            "jobTitle": "Founder of Scale Verse (Business Partner)"
          },
          {
            "@type": "Person",
            "name": "Muhammad Abdul Rauf",
            "jobTitle": "CO-Founder of Scale Verse (Business Partner)"
          }
        ],
        "award": [
          "Pakistan number 1 fuel brand",
          "Pakistan number 1 fuel agency",
          "Pakistan number 1 fuel suppliers",
          "Pakistan number 1 best fuel delivery",
          "best services in Pakistan",
          "mobile application for fuel suppliers"
        ]
      }
    }
  });

  const pageRef = useScrollReveal();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedMember, setDisplayedMember] = useState(teamMembers[0]);
  const [infoOpacity, setInfoOpacity] = useState(1);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const touchStartY = useRef(0);

  const getCardClass = (cardIndex) => {
    const offset = (cardIndex - currentIndex + TOTAL_CARDS) % TOTAL_CARDS;
    if (offset === 0) return "card center";
    if (offset === 1) return "card down-1";
    if (offset === 2) return "card down-2";
    if (offset === TOTAL_CARDS - 1) return "card up-1";
    if (offset === TOTAL_CARDS - 2) return "card up-2";
    return "card hidden";
  };

  const updateCarousel = useCallback((newIndex) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const index = (newIndex + TOTAL_CARDS) % TOTAL_CARDS;
    currentIndexRef.current = index;
    setCurrentIndex(index);

    setInfoOpacity(0);
    setTimeout(() => {
      setDisplayedMember(teamMembers[index]);
      setInfoOpacity(1);
    }, 300);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") updateCarousel(currentIndexRef.current - 1);
      else if (e.key === "ArrowDown") updateCarousel(currentIndexRef.current + 1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [updateCarousel]);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIndicator(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStartY.current = e.changedTouches[0].screenY;
  };
  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].screenY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) updateCarousel(currentIndexRef.current + 1);
      else updateCarousel(currentIndexRef.current - 1);
    }
  };

  return (
    <div ref={pageRef}>
      <main style={{ paddingTop: 'var(--nav-height)' }}>

        {/* Story Section */}
        <section id="about" className="about section-padding">
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="fade-in-up">
              <div className="about-header-logo-row">
                <img src="/images/Zyphuel-logo.png" alt="Zyphuel Company Logo" className="about-company-logo" />
                <h1 className="section-title">Fuel Delivery & Mobile Refueling Solutions</h1>
              </div>

              <div className="story-desktop-copy">
                <p className="about-story" style={{ marginBottom: '16px' }}>
                  Zyphuel is a Lahore-based fuel services agency revolutionizing how Pakistan keeps running. Instead of making customers idle in long lines or managing hazardous jerrycans, Zyphuel delivers high-quality fuel directly to vehicles and equipment, wherever they are. Our fleet of professional tanker trucks comes to you on schedule, ensuring you save time, cut costs, and avoid downtime. This on-demand fuel delivery model boosts productivity for fleets, farms, and businesses: by refueling during downtime, clients free their teams to focus on core work, not fueling logistics.
                </p>
                <p className="about-story" style={{ marginBottom: '24px' }}>
                  Every Zyphuel delivery is handled with certified safety standards and digital tracking, so you always know your fuel quality and delivery status. We use advanced logistics and scheduling software (and a mobile app) to optimize routes, meaning faster response times and fewer miles on the road. Beyond convenience, our service helps the environment by reducing extra trips to gas stations – lowering emissions and fuel waste. In short, Zyphuel brings fuel on demand: reliable, safe, and right where you need it.
                </p>
              </div>

              <div className="story-mobile-copy">
                <p className="about-story" style={{ fontWeight: '700', marginBottom: '14px' }}>
                  Zyphuel brings fuel to you on demand – no lines, no hassle.
                </p>
                <ul className="story-mobile-bullets" style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Our tanker trucks come to your location with certified, top-grade fuel.</li>
                  <li style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Enjoy more uptime: fuel arrives during your downtime, so your vehicles and equipment stay on schedule.</li>
                  <li style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Get a quick quote or schedule delivery easily through our app or website.</li>
                  <li style={{ color: 'var(--text-secondary)' }}>Reliable service and safety compliance as standard.</li>
                </ul>
              </div>

              <div style={{ marginBottom: '35px' }}>
                <button
                  onClick={() => {
                    navigate('/order');
                    window.scrollTo(0, 0);
                  }}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-truck-fast"></i> Schedule Your First Delivery
                </button>
              </div>

              <div style={{ margin: '45px 0', borderTop: '1px solid var(--border-color)', paddingTop: '45px', paddingBottom: '25px' }}>
                <GeometricalBirds />
              </div>

              <div className="about-values-grid">
                <div className="value-item">
                  <span className="value-icon"><i className="fa-solid fa-truck-ramp-box"></i></span>
                  <h4 className="value-title">On-Demand Logistics</h4>
                  <p className="value-desc">Certified fleet refuels vehicles and equipment during downtime.</p>
                </div>
                <div className="value-item">
                  <span className="value-icon"><i className="fa-solid fa-scale-balanced"></i></span>
                  <h4 className="value-title">Uptime Transparency</h4>
                  <p className="value-desc">Calibrated digital flow meters show precise volumetric billing.</p>
                </div>
                <div className="value-item">
                  <span className="value-icon"><i className="fa-solid fa-shield-halved"></i></span>
                  <h4 className="value-title">Safety Compliance</h4>
                  <p className="value-desc">Strict adherence to HAZMAT, NFPA 30A, and EPA guidelines.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="about-founder section-padding" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <div className="founder-grid fade-in-up">
              <div className="founder-image-col">
                <div className="founder-card-frame">
                  <img src="/images/daniyal.jpeg" alt="Muhammad Daniyal - Founder & CEO" className="founder-avatar-img" />
                  <div className="founder-badge">Founder & CEO</div>
                </div>
              </div>

              <div className="founder-info-col">
                <div className="hero-subtitle-badge" style={{ backgroundColor: 'var(--brand-petrol)', borderColor: 'rgba(58,134,200,0.15)', color: '#1a4f7c' }}>
                  <span>Visionary Leadership</span>
                </div>
                <h2 className="section-title" style={{ marginBottom: '16px' }}>Muhammad Daniyal</h2>
                <h4 className="founder-subtitle">Founder & CEO, Zyphuel</h4>
                <p className="founder-bio">
                  Muhammad Daniyal is the visionary founder leading Zyphuel. Recognizing the persistent energy delivery bottlenecks in Pakistan—from home backup generators during grid outages to logistical disruptions in commercial fleet management—he designed an on-demand, mobile refuelling network. Under his supervision, Zyphuel is setting new benchmarks for fuel safety, transparency, and consumer convenience.
                </p>
                <div className="founder-quote-box">
                  <i className="fa-solid fa-quote-left quote-icon"></i>
                  <p className="founder-quote-text">
                    "We are bringing technology and efficiency directly to the fueling nozzle. No lines, no delay, and complete digital transparency with every drop delivered."
                  </p>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="https://www.linkedin.com/in/muhammad-daniyal490"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <i className="fa-brands fa-linkedin"></i> CEO LinkedIn Profile
                  </a>
                  <a
                    href="https://www.linkedin.com/company/zyphuel/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <i className="fa-brands fa-linkedin"></i> Zyphuel LinkedIn Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="about-partner section-padding" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <div className="partner-grid fade-in-up">
              <div className="partner-info-col">
                <div className="hero-subtitle-badge" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.2)', color: '#7e22ce' }}>
                  <span>Growth & Tech Partner</span>
                </div>
                <h2 className="section-title" style={{ marginBottom: '16px' }}>Strategic Business Partner</h2>
                <h4 className="partner-company-name">Scale Verse</h4>
                <p className="partner-description">
                  Scale Verse is Zyphuel's primary technology and design alliance. The user interfaces, digital dashboards, logistics platforms, and scaling operations that power our 24/7 delivery services were engineered in collaboration with Scale Verse's executive team.
                </p>

                <div className="partner-meta-box">
                  <div className="partner-meta-item">
                    <span className="partner-meta-label">Website:</span>
                    <a href="https://scaleverse.app" target="_blank" rel="noopener noreferrer" className="partner-website-link">
                      scaleverse.app <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>

                  <div className="partner-founder-profile">
                    <img src="/images/umar.jpeg" alt="Muhammad Umer Farooq - Founder of Scaleverse" className="partner-founder-avatar" />
                    <div className="partner-founder-details">
                      <span className="partner-founder-badge">Scale Verse</span>
                      <h4 className="partner-founder-fullname">Muhammad Umer Farooq</h4>
                      <p className="partner-founder-designation">Founder of Scaleverse</p>
                    </div>
                  </div>
                  <div className="partner-founder-profile">
                    <img src="/images/rauf.jpeg" alt="Abdul Rauf - Co-Founder of Scaleverse" className="partner-founder-avatar" />
                    <div className="partner-founder-details">
                      <span className="partner-founder-badge">Scale Verse</span>
                      <h4 className="partner-founder-fullname">Abdul Rauf</h4>
                      <p className="partner-founder-designation">CO-Founder of Scaleverse</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="partner-preview-col">
                <div className="browser-mockup-frame">
                  <div className="browser-header-bar">
                    <span className="browser-header-dot red"></span>
                    <span className="browser-header-dot yellow"></span>
                    <span className="browser-header-dot green"></span>
                    <span className="browser-address-field">https://scaleverse.app</span>
                  </div>
                  <div className="browser-body-content">
                    <a href="https://scaleverse.app" target="_blank" rel="noopener noreferrer" className="partner-link-block">
                      <img src="/images/scaleverse-preview.jpg" alt="Scaleverse Web Portal Preview" className="partner-mockup-img" />
                      <div className="browser-hover-overlay">
                        <span>Visit scaleverse.app <i className="fa-solid fa-up-right-from-square"></i></span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Carousel */}
        <section className="about-team-section">
          <div className="main-container">
            <div className="carousel-section">
              <div className="carousel-container">
                <button
                  className="nav-arrow up"
                  onClick={() => updateCarousel(currentIndexRef.current - 1)}
                >
                  <img src="https://ik.imagekit.io/gopichakradhar/icons/top.png?updatedAt=1754290522765" alt="Up" />
                </button>

                <div
                  className="carousel-track"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {cardImages.map((src, i) => (
                    <div
                      key={i}
                      className={getCardClass(i)}
                      data-index={i}
                      onClick={() => updateCarousel(i)}
                    >
                      <img
                        src={src}
                        alt={`${teamMembers[i]?.name || 'Team Member'} - ${teamMembers[i]?.role || 'Staff'}`}
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="nav-arrow down"
                  onClick={() => updateCarousel(currentIndexRef.current + 1)}
                >
                  <img
                    src="https://ik.imagekit.io/gopichakradhar/icons/down.png?updatedAt=1754290523249"
                    alt="Down"
                  />
                </button>
              </div>
            </div>

            <div className="controls-section">
              <div className="nav-controls">
                <button
                  className="nav-arrow up"
                  onClick={() => updateCarousel(currentIndexRef.current - 1)}
                >
                  <img src="https://ik.imagekit.io/gopichakradhar/icons/top.png?updatedAt=1754290522765" alt="Up" />
                </button>
                <button
                  className="nav-arrow down"
                  onClick={() => updateCarousel(currentIndexRef.current + 1)}
                >
                  <img src="https://ik.imagekit.io/gopichakradhar/icons/down.png?updatedAt=1754290523249" alt="Down" />
                </button>
              </div>

              <div className="member-info" style={{ opacity: infoOpacity }}>
                <h2 className="member-name">{displayedMember.name}</h2>
                <p className="member-role">{displayedMember.role}</p>
              </div>

              <div className="dots">
                {teamMembers.map((_, i) => (
                  <div
                    key={i}
                    className={`dot${i === currentIndex ? " active" : ""}`}
                    data-index={i}
                    onClick={() => updateCarousel(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {showScrollIndicator && (
            <div className="scroll-indicator">scroll</div>
          )}
        </section>

        {/* Strategic Collaboration Post Section */}
        <section className="about-collaboration section-padding" style={{ backgroundColor: '#faf5ff', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <div className="collaboration-post-container fade-in-up">
              <div className="collaboration-post-header">
                <div className="collab-badge-row">
                  <span className="collab-badge badge-zyphuel">Zyphuel</span>
                  <span className="collab-divider"><i className="fa-solid fa-handshake"></i></span>
                  <span className="collab-badge badge-scaleverse">Scale Verse</span>
                </div>
                <div className="collab-meta">
                  <span className="collab-location"><i className="fa-solid fa-earth-americas"></i> Lahore &amp; London</span>
                  <span className="collab-date"><i className="fa-solid fa-calendar-days"></i> July 2026</span>
                </div>
              </div>

              <div className="collaboration-post-content">
                <h3 className="collab-post-title">
                  Strategic Announcement: Scale Verse × Zyphuel Partner to Accelerate Next-Generation Energy Mobility
                </h3>
                <p className="collab-post-paragraph">
                  <strong>Scale Verse</strong>, a premier global digital engineering and product acceleration firm, today announced a long-term technology partnership with <strong>Zyphuel</strong>, Pakistan's leading digital platform for on-demand fuel and petrol delivery. This strategic alliance focuses on optimizing Zyphuel's smart logistics backbone, real-time routing engines, and consumer telemetry dashboards.
                </p>
                <p className="collab-post-paragraph">
                  Through this alliance, Scale Verse's executive product team will design and engineer scalable web architectures, IoT-calibrated fuel meter integrations, and predictive supply chain dispatch dashboards for Zyphuel. By merging Scale Verse's international software design principles with Zyphuel's hyper-local distribution network in Lahore, the partnership represents a major milestone in modernizing fuel logistics in the region.
                </p>
                <p className="collab-post-paragraph font-italic">
                  "This collaboration is a testament to what happens when local operational expertise meets world-class engineering standards. Scale Verse is proud to assist Zyphuel in scaling its platform and delivering seamless, transparent refueling solutions to thousands of customers."
                  <br />
                  <span className="collab-sign">— Joint Executive Board Statement</span>
                </p>
              </div>

              <div className="collaboration-post-footer">
                <span className="collab-category">Global Expansion Initiative</span>
                <div className="collab-share-info">
                  <span>Official Release</span>
                  <i className="fa-solid fa-circle-check verify-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global AI & Search Engine Directory Index */}
        <BrandAIIndex />

      </main>
    </div>
  );
}