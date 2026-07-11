import React, { useState, useEffect, useRef, useCallback } from 'react';
import { birds, birdTexts, birdTitles, slideTimeout } from '../data/birdsData';

// ==========================================
// Isolated Sub-component: Geometrical Birds
// ==========================================
export default function GeometricalBirds() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathRefs = useRef([]);
  const timeoutRef = useRef(null);

  const animateToBird = useCallback((targetIndex, withDelay = false) => {
    const anime = window.anime;
    if (!anime) return;

    const targetPaths = birds[targetIndex];
    if (!targetPaths) return;

    targetPaths.forEach((path, i) => {
      const delay = withDelay ? 10 * i : 0;
      if (pathRefs.current[i]) {
        anime({
          targets: pathRefs.current[i],
          d: path.d,
          fill: path.fill,
          duration: 1000,
          easing: 'easeInOutQuad',
          delay,
        });
      }
    });
  }, []);

  // Update SVG paths when currentIndex changes
  useEffect(() => {
    animateToBird(currentIndex, false);

    // Auto-advance slideshow
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % birds.length);
    }, slideTimeout);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, animateToBird]);

  // Keyboard navigation listener (guarded for input elements)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Guard: do not change slides if typing in inputs, textareas, or contentEditable components
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.keyCode >= 49 && e.keyCode <= 49 + birds.length - 1) {
        setCurrentIndex(e.keyCode - 49);
      } else if (e.keyCode === 37) {
        setCurrentIndex((prev) => (prev - 1 + birds.length) % birds.length);
      } else if (e.keyCode === 39) {
        setCurrentIndex((prev) => (prev + 1) % birds.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const initialPaths = birds[0];

  return (
    <>
      <style>
        {`
          .birds-showcase-wrapper {
            font-family: Inconsolata, sans-serif;
            font-size: 18px;
            width: 100%;
          }
          .birds-header {
            margin: 0 0 30px 0;
          }
          .birds-header__title {
            display: inline-block;
            font-weight: bold;
            margin-right: 20px;
          }
          .birds-header__tagline {
            display: inline-block;
          }
          .birds-keys {
            bottom: 20px;
            position: absolute;
            right: 20px;
          }
          @media all and (max-width: 768px) {
            .birds-keys {
              display: none;
            }
          }
          .birds-interactive-container {
            align-items: center;
            display: flex;
            margin: 0 auto;
            max-width: 960px;
            width: 100%;
          }
          @media all and (max-width: 768px) {
            .birds-interactive-container {
              flex-direction: column;
            }
          }
          .birds-canvas {
            flex-shrink: 1;
            height: auto;
            max-width: 600px;
            width: 100%;
          }
          .birds-canvas circle {
            fill: #cbd5e1;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .birds-canvas path {
            pointer-events: none;
          }
          .birds-showcase-wrapper .bird-text {
            box-sizing: border-box;
            flex-shrink: 0;
            line-height: 1.44;
            padding: 0 20px;
            width: 320px;
          }
          @media all and (max-width: 768px) {
            .birds-showcase-wrapper .bird-text {
              max-width: 600px;
              width: 100%;
              padding: 20px;
            }
          }
          .birds-showcase-wrapper .bird-text__title {
            font-size: 50px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          @media all and (max-width: 768px) {
            .birds-showcase-wrapper .bird-text__title {
              font-size: 32px;
            }
          }
          .birds-nav-box {
            fill: transparent;
            cursor: pointer;
          }
        `}
      </style>

      <div className="birds-showcase-wrapper">
        <div className="birds-header">
          <div className="birds-header__title">Geometrical Birds</div>
          <div className="birds-header__tagline">Slideshow</div>
        </div>

        <div className="birds-interactive-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="600"
            height="500"
            viewBox="0 0 600 500"
            preserveAspectRatio="xMinYMin"
            className="birds-canvas"
          >
            {birds.map((_, i) => (
              <React.Fragment key={i}>
                {/* Clickable hit box overlay */}
                <rect
                  onClick={() => setCurrentIndex(i)}
                  className="birds-nav-box"
                  x={45 + i * 30}
                  y="15"
                  width="30"
                  height="30"
                />
                {/* Render dot under the rect */}
                <circle
                  cx={60 + i * 30}
                  cy="30"
                  r={i === currentIndex ? 7 : 4}
                  style={{
                    fill: i === currentIndex ? 'var(--accent-color, #0ea5e9)' : '#cbd5e1',
                  }}
                />
              </React.Fragment>
            ))}

            {initialPaths.map((path, i) => (
              <path
                key={path.id}
                ref={(el) => (pathRefs.current[i] = el)}
                id={path.id}
                d={path.d}
                style={{ fill: path.fill }}
              />
            ))}
          </svg>

          {/* Managed purely via React state (highly robust, no DOM querying) */}
          <div className="bird-text">
            <div className="bird-text__title">{birdTitles[currentIndex]}</div>
            <div
              className="bird-text__body"
              dangerouslySetInnerHTML={{ __html: birdTexts[currentIndex] }}
            />
          </div>
        </div>

        <svg className="birds-keys" width="182" height="35" viewBox="0 0 104 20">
          <path
            d="M3.5.5h13c1.662 0 3 1.338 3 3v13c0 1.662-1.338 3-3 3h-13c-1.662 0-3-1.338-3-3v-13c0-1.662 1.338-3 3-3z"
            fill="none"
            stroke="#364e59"
          />
          <path
            fill="#364e59"
            stroke="#364e59"
            strokeWidth=".2"
            d="M9.82 7.61v.695h.695V7.61H9.82zm.645-2.392V3.843H9.87v1.375l.157 1.943h.28l.158-1.942zM10.656 16.118v-4.432h-.407q-.044.25-.163.413-.12.16-.294.255-.17.094-.38.13-.214.033-.44.033v.425h1.15v3.175h.533z"
          />
          <path
            d="M39.5.5h13c1.662 0 3 1.338 3 3v13c0 1.662-1.338 3-3 3h-13c-1.662 0-3-1.338-3-3v-13c0-1.662 1.338-3 3-3z"
            fill="none"
            stroke="#364e59"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fill="#364e59"
            stroke="#364e59"
            strokeWidth=".2"
            d="M44.09 5.13q0-.144.018-.3.018-.162.075-.294.062-.137.168-.225.108-.092.283-.092.18 0 .28.093.107.09.163.226.057.132.07.294.018.156.018.294 0 .144-.02.306-.018.163-.08.3-.056.13-.163.22-.105.086-.286.086-.175 0-.28-.087-.1-.095-.158-.226-.056-.138-.075-.294-.01-.162-.01-.3zm-.47.013q0 .256.05.48.056.226.175.395.12.168.313.268.193.094.475.094.275 0 .462-.106.188-.106.306-.275.126-.176.176-.4.057-.232.057-.476 0-.256-.05-.48-.044-.233-.163-.4-.112-.17-.306-.27-.188-.1-.48-.1-.29 0-.483.106-.192.1-.31.275-.12.175-.17.406-.05.226-.05.483zm3.556 1.987q0-.144.02-.3.018-.162.074-.294.063-.137.17-.225.105-.092.28-.092.18 0 .28.093.108.09.164.226.056.132.07.294.017.156.017.294 0 .144-.017.306-.02.163-.082.3-.055.13-.16.22-.107.086-.29.086-.174 0-.28-.087-.1-.095-.156-.226-.056-.138-.075-.294-.014-.162-.014-.3zm-.468.013q0 .256.05.48.056.226.175.395.118.162.312.262.194.094.475.094.275 0 .463-.1.187-.106.306-.275.124-.176.174-.4.056-.232.056-.476 0-.256-.05-.48-.044-.233-.162-.4-.113-.17-.307-.27-.186-.1-.48-.1-.287 0-.48.106-.195.1-.314.275-.118.175-.168.406-.05.226-.05.483zm.875-3.35L44.22 8.436h.538l3.356-4.643h-.53zM47.368 12.23v-.47H45.18l-.412 2.3.456.026q.157-.187.357-.3.207-.118.47-.118.224 0 .406.075.187.075.318.212.132.13.2.32.075.18.075.4 0 .26-.076.46-.075.195-.206.326-.125.133-.3.2-.17.064-.356.064-.2 0-.37-.056-.16-.063-.286-.17-.12-.112-.194-.255-.07-.15-.08-.32h-.533q.006.3.118.538.113.24.306.4.194.158.444.245.256.08.544.08.387 0 .675-.117.294-.125.487-.332.194-.206.288-.468.1-.27.1-.55 0-.382-.113-.663-.113-.287-.307-.475-.194-.194-.456-.287-.263-.094-.556-.094-.224 0-.456.08-.225.075-.368.238l-.013-.013.238-1.275h1.788z"
          />
          <path fill="#364e59" d="M24 12.666V14h1.334v-1.334H24zM27.333 12.666V14h1.334v-1.334h-1.334zM30.666 12.666V14H32v-1.334h-1.334z" />
          <path
            d="M63.5.5h13c1.662 0 3 1.338 3 3v13c0 1.662-1.338 3-3 3h-13c-1.662 0-3-1.338-3-3v-13c0-1.662 1.338-3 3-3z"
            fill="none"
            stroke="#364e59"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M72.5 10v4l-5-2z" fill="#364e59" fillRule="evenodd" />
          <path
            d="M100.5.5h-13c-1.662 0-3 1.338-3 3v13c0 1.662 1.338 3 3 3h13c1.662 0 3-1.338 3-3v-13c0-1.662-1.338-3-3-3z"
            fill="none"
            stroke="#364e59"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M91.5 10v4l5-2z" fill="#364e59" fillRule="evenodd" />
        </svg>
      </div>
    </>
  );
}
