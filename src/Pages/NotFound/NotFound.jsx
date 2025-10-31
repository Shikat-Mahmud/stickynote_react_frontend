import { Link } from 'react-router-dom';
import './css/style.css';

function NotFound() {
    return (
        <main class="page" role="main" aria-labelledby="title">
    <div class="card" role="region" aria-label="404 error">
      <h1 id="title" class="code">404</h1>
      <p class="message">দুঃখিত! উক্ত পেজটি খুঁজে পাওয়া যায়নি!</p>
      <p class="sub">পেজটি হয়তো স্থানান্তরিত বা মুছে ফেলা হয়েছে। হোমপেজে ফিরে যাওয়ার চেষ্টা করুন।</p>
    </div>

    <div class="illustration" aria-hidden="true">
      <svg viewBox="0 0 1200 360" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="skyGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#dff8fb"/>
            <stop offset="1" stop-color="#d9f8fb"/>
          </linearGradient>

          <linearGradient id="waterGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stop-color="#4aa7a5" stop-opacity="1"/>
            <stop offset="1" stop-color="#3f8f8d" stop-opacity="1"/>
          </linearGradient>

          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        <rect width="1200" height="360" fill="url(#skyGrad)"/>

        <circle cx="950" cy="70" r="42" fill="#ffd84d" />

        <g fill="#fff" opacity="0.95">
          <ellipse cx="300" cy="60" rx="60" ry="16"/>
          <ellipse cx="345" cy="62" rx="28" ry="12"/>
          <ellipse cx="245" cy="62" rx="22" ry="10"/>

          <ellipse cx="700" cy="54" rx="44" ry="14"/>
          <ellipse cx="740" cy="58" rx="28" ry="12"/>
        </g>

        <g transform="translate(80,70)">
          <path d="M0 200 C60 175, 220 170, 400 200 C520 220, 720 220, 1120 200 L1120 260 L0 260 Z" fill="#f3d6bf" stroke="#d6b89d" stroke-width="2"/>

          <g transform="translate(40,10)" stroke="#6b4b36" stroke-width="2">
            <polygon points="40,180 80,68 120,180" fill="#d29a79"/>
            <polygon points="100,180 160,40 220,180" fill="#c37e62"/>
            <polygon points="240,180 300,66 340,180" fill="#e0b49a"/>
            <polygon points="420,180 480,80 520,180" fill="#c36c46"/>
            <circle cx="70" cy="142" r="8" fill="#7fbf8c" stroke="#4a7a64" stroke-width="1"/>
            <circle cx="210" cy="150" r="8" fill="#7fbf8c" stroke="#4a7a64" stroke-width="1"/>
            <circle cx="480" cy="154" r="8" fill="#7fbf8c" stroke="#4a7a64" stroke-width="1"/>
          </g>

          <g transform="translate(30,0)" stroke="#4a7a64" stroke-width="2">
            <g transform="translate(20,150)">
              <rect x="-4" y="0" width="8" height="28" rx="2" fill="#8b5a44"/>
              <circle cx="0" cy="-8" r="18" fill="#8ed088"/>
            </g>
            <g transform="translate(120,150)">
              <rect x="-4" y="0" width="8" height="28" rx="2" fill="#8b5a44"/>
              <circle cx="0" cy="-8" r="18" fill="#8ed088"/>
            </g>
            <g transform="translate(320,150)">
              <rect x="-4" y="0" width="8" height="28" rx="2" fill="#8b5a44"/>
              <circle cx="0" cy="-8" r="18" fill="#8ed088"/>
            </g>
          </g>
        </g>

        <rect x="0" y="260" width="1200" height="100" fill="url(#waterGrad)"/>
        <g opacity="0.95" stroke="#ffffff80" stroke-linecap="round" stroke-width="2">
          <path d="M80 300 q40 -6 80 0" fill="none"/>
          <path d="M380 320 q40 -6 80 0" fill="none"/>
          <path d="M930 305 q30 -5 60 0" fill="none"/>
        </g>

        <g transform="translate(540,270)">
          <path d="M-18 28 q18 -12 36 0 z" fill="#ffffff" stroke="#2d6d6a" stroke-width="1.5"/>
          <rect x="-2" y="-18" width="4" height="28" fill="#6b4b36"/>
          <path d="M2 -18 L20 6 L2 6 z" fill="#ffffff" stroke="#2d6d6a" stroke-width="1"/>
        </g>

        <g stroke="#2d2d2d60" stroke-width="3" stroke-linecap="round">
          <line x1="520" y1="36" x2="560" y2="36"/>
          <line x1="180" y1="26" x2="200" y2="26"/>
          <line x1="870" y1="76" x2="900" y2="76"/>
        </g>
      </svg>
    </div>

    <div class="overlay-gradient" aria-hidden="true"></div>
  </main>
    );
}

export default NotFound;