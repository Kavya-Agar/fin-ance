import { Link } from 'react-router-dom';

// A few cute, colored fish SVGs
const fishTypes = [
  // Orange fish
  ({ color = "#FFA726", accent = "#FB8C00", ...props }) => (
    <svg width="48" height="24" viewBox="0 0 48 24" {...props}>
      <ellipse cx="18" cy="12" rx="13" ry="8" fill={color} />
      <polygon points="31,6 46,12 31,18" fill={accent} />
      <ellipse cx="13" cy="11" rx="2" ry="2" fill="#fff" />
      <ellipse cx="13" cy="11" rx="1" ry="1" fill="#222" />
    </svg>
  ),
  // Blue fish
  ({ color = "#29B6F6", accent = "#0288D1", ...props }) => (
    <svg width="48" height="24" viewBox="0 0 48 24" {...props}>
      <ellipse cx="18" cy="12" rx="13" ry="8" fill={color} />
      <polygon points="31,6 46,12 31,18" fill={accent} />
      <ellipse cx="13" cy="11" rx="2" ry="2" fill="#fff" />
      <ellipse cx="13" cy="11" rx="1" ry="1" fill="#222" />
    </svg>
  ),
  // Pink fish
  ({ color = "#F06292", accent = "#AD1457", ...props }) => (
    <svg width="48" height="24" viewBox="0 0 48 24" {...props}>
      <ellipse cx="18" cy="12" rx="13" ry="8" fill={color} />
      <polygon points="31,6 46,12 31,18" fill={accent} />
      <ellipse cx="13" cy="11" rx="2" ry="2" fill="#fff" />
      <ellipse cx="13" cy="11" rx="1" ry="1" fill="#222" />
    </svg>
  ),
  // Green fish
  ({ color = "#81C784", accent = "#388E3C", ...props }) => (
    <svg width="48" height="24" viewBox="0 0 48 24" {...props}>
      <ellipse cx="18" cy="12" rx="13" ry="8" fill={color} />
      <polygon points="31,6 46,12 31,18" fill={accent} />
      <ellipse cx="13" cy="11" rx="2" ry="2" fill="#fff" />
      <ellipse cx="13" cy="11" rx="1" ry="1" fill="#222" />
    </svg>
  ),
];

// Generate random fish properties
function getRandomFishProps() {
  const top = Math.random() * 70 + 10; // 10vh to 80vh
  const duration = Math.random() * 14 + 18; // 18s to 32s
  const delay = Math.random() * 12; // 0s to 12s
  const scale = Math.random() * 0.6 + 0.7; // 0.7 to 1.3
  const direction = Math.random() > 0.5 ? 'left' : 'right';
  const FishSvg = fishTypes[Math.floor(Math.random() * fishTypes.length)];
  let style;
  if (direction === 'left') {
    style = {
      top: `${top}vh`,
      left: '100vw',
      transform: `scale(${scale},1) scaleX(-1)`,
      animation: `swimLeft ${duration}s linear ${delay}s infinite`,
      filter: 'blur(2.5px)',
      opacity: 0.55,
      zIndex: 1,
      pointerEvents: 'none',
      position: 'absolute',
    };
  } else {
    style = {
      top: `${top}vh`,
      left: '-80px',
      transform: `scale(${scale},1)`,
      animation: `swimRight ${duration}s linear ${delay}s infinite`,
      filter: 'blur(2.5px)',
      opacity: 0.55,
      zIndex: 1,
      pointerEvents: 'none',
      position: 'absolute',
    };
  }
  return { FishSvg, style };
}

// Bubble generator (as before)
const BUBBLE_COUNT = 30;
function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}
function Bubble({ idx }) {
  const size = randomBetween(1.5, 3.5); // rem
  const left = randomBetween(0, 100); // vw
  const anims = ['animate-moveUp-10s', 'animate-moveUp-12s', 'animate-moveUp-14s', 'animate-moveUp-16s'];
  const animation = anims[Math.floor(Math.random() * anims.length)];
  const delay = randomBetween(0, 8); // seconds
  return (
    <div
      className={`
        absolute
        bottom-0
        rounded-full
        bg-white/30
        blur-sm
        ${animation}
      `}
      style={{
        left: `${left}vw`,
        width: `${size}rem`,
        height: `${size}rem`,
        animationDelay: `${delay}s`,
        zIndex: 2,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

export default function Home({ darkMode }) {
  // Generate fish only once per mount for consistency
  const fishArray = Array.from({ length: 10 }, getRandomFishProps);

  return (
    <div
      className={
        `fixed inset-0 min-h-screen w-screen flex flex-col items-center justify-center pt-16 overflow-hidden
        ${darkMode
          ? 'bg-gradient-to-b from-gray-900 to-blue-950'
          : 'bg-gradient-to-b from-[#0faaf0] to-[#003366]'
        }`
      }
    >
      {/* Blurry Fish */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {fishArray.map(({ FishSvg, style }, idx) => (
          <FishSvg key={idx} style={style} />
        ))}
      </div>
      {/* Ocean Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: BUBBLE_COUNT }).map((_, idx) => (
          <Bubble key={idx} idx={idx} />
        ))}
      </div>
      {/* Headline */}
      <h1 className="font-pixel text-2xl sm:text-4xl text-white text-center mb-6 drop-shadow-lg z-20">
        Need help sorting out your finances?
      </h1>
      {/* Subheading */}
      <p className="font-pixel text-base sm:text-lg text-blue-100 text-center mb-10 max-w-xl drop-shadow z-20">
        Dive into FIN-ance and swim your way to financial freedom!
      </p>
    {/* Get Started Button */}
    <Link
        to="/signup"
        className="font-pixel bg-yellow-300 text-[#0faaf0] px-6 py-3 rounded-lg shadow-lg text-base sm:text-xl hover:bg-yellow-400 transition active:scale-95 border-4 border-white z-20"
    >
        Get Started
    </Link>
    {/* Ocean floor */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-800 to-transparent z-10"></div>
    </div>
  );
}
