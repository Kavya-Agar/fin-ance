import { Link } from 'react-router-dom';

// Fish with animated tail
function AnimatedFish({ color, accent, direction = 'right', style = {} }) {
  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      style={{
        ...style,
        filter: 'blur(2.5px)',
        opacity: 0.55,
        pointerEvents: 'none',
        position: 'absolute',
        transformOrigin: '24px 12px', // center of SVG
      }}
    >
      {/* Body */}
      <ellipse cx="18" cy="12" rx="13" ry="8" fill={color} />
      {/* Tail (animated) */}
      <g style={{ transformOrigin: '31px 12px', animation: `tailWag ${18 + Math.random() * 8}s ease-in-out infinite` }}>
        <polygon points="31,6 46,12 31,18" fill={accent} />
      </g>
      {/* Eye */}
      <ellipse cx="13" cy="11" rx="2" ry="2" fill="#fff" />
      <ellipse cx="13" cy="11" rx="1" ry="1" fill="#222" />
    </svg>
  );
}


// Seaweed SVG
function Seaweed({ x, height = 48, delay = 0, darkMode }) {
  return (
    <svg
      width="24"
      height={height}
      viewBox={`0 0 24 ${height}`}
      style={{
        position: 'absolute',
        left: x,
        bottom: 0,
        filter: 'blur(0.5px)',
        opacity: 0.7,
        animation: `seaweedSway 6s ease-in-out ${delay}s infinite`,
        zIndex: 2,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <path
        d={`M12,${height} Q10,${height - 16} 12,${height - 32} Q14,${height - 40} 12,${height - height + 8}`}
        stroke={darkMode ? "#2e7d32" : "#7ddf64"}
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
}

// Treasure chest SVG with animated lid, scaled up by 1.5x
function TreasureChest({ delay = 0, darkMode }) {
  // Golden colors, darker in darkMode
  const baseFill = darkMode ? "#bfa13a" : "#ffe066";
  const lidFill = darkMode ? "#d6b94d" : "#fff2a8";
  const stroke = darkMode ? "#8a6d1b" : "#c9a227";
  return (
    <svg
      width="96" 
      height="72"
      viewBox="0 0 48 36"
      style={{
        filter: 'blur(0.5px)',
        opacity: 0.85,
        pointerEvents: 'none',
        display: 'block'
      }}
      aria-hidden="true"
    >
      {/* Chest base */}
      <rect x="8" y="18" width="32" height="16" fill={baseFill} stroke={stroke} strokeWidth="2" />
      {/* Chest lid (animated) */}
      <g style={{ transformOrigin: '24px 18px', animation: `chestLid 7s ease-in-out ${delay}s infinite` }}>
        <rect x="8" y="6" width="32" height="12" fill={lidFill} stroke={stroke} strokeWidth="2" />
      </g>
      {/* Gold coins */}
      <ellipse cx="24" cy="28" rx="10" ry="3" fill="#FFD700" opacity="0.8" />
    </svg>
  );
}

// Rocks SVG
function Rocks({ darkMode }) {
  return (
    <svg width="120" height="36" viewBox="0 0 120 36" style={{ position: 'absolute', left: '20%', bottom: 0, zIndex: 22, opacity: 0.6, pointerEvents: 'none' }}>
      <ellipse cx="20" cy="30" rx="20" ry="6" fill={darkMode ? "#444" : "#bbb"} />
      <ellipse cx="60" cy="32" rx="16" ry="4" fill={darkMode ? "#555" : "#ddd"} />
      <ellipse cx="100" cy="28" rx="12" ry="7" fill={darkMode ? "#333" : "#999"} />
    </svg>
  );
}

// Starfish SVG
function Starfish({ darkMode }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" style={{ position: 'absolute', left: '70%', bottom: 10, zIndex: 22, opacity: 0.7, pointerEvents: 'none' }}>
      <polygon
        points="14,2 16,10 24,10 17,15 19,23 14,18 9,23 11,15 4,10 12,10"
        fill={darkMode ? "#fbbf24" : "#f59e42"}
        stroke="#b45309"
        strokeWidth="1"
      />
    </svg>
  );
}

const BUBBLE_COUNT = 30;
function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}
function Bubble({ idx }) {
  const size = randomBetween(1.5, 3.5);
  const left = randomBetween(0, 100);
  const anims = ['animate-moveUp-10s', 'animate-moveUp-12s', 'animate-moveUp-14s', 'animate-moveUp-16s'];
  const animation = anims[Math.floor(Math.random() * anims.length)];
  const delay = randomBetween(0, 8);
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

const fishColors = [
  { color: "#FFA726", accent: "#FB8C00" },
  { color: "#29B6F6", accent: "#0288D1" },
  { color: "#F06292", accent: "#AD1457" },
  { color: "#81C784", accent: "#388E3C" },
  { color: "#FFD54F", accent: "#FFA000" },
  { color: "#BA68C8", accent: "#7B1FA2" },
];

function getRandomFishProps() {
  const top = Math.random() * 70 + 10;
  const duration = Math.random() * 14 + 18;
  const delay = Math.random() * 12;
  const scale = Math.random() * 0.6 + 0.7;
  const direction = Math.random() > 0.5 ? 'left' : 'right';
  const { color, accent } = fishColors[Math.floor(Math.random() * fishColors.length)];
  let style;
  if (direction === 'left') {
    style = {
      top: `${top}vh`,
      left: '100vw',
      transform: `scale(${scale},1)`, // <-- NO FLIP for left
      animation: `swimLeft ${duration}s linear ${delay}s infinite`,
    };
  } else {
    style = {
      top: `${top}vh`,
      left: '-80px',
      transform: `scale(${scale},1) scaleX(-1)`, // <-- FLIP for right
      animation: `swimRight ${duration}s linear ${delay}s infinite`,
    };
  }
  return { color, accent, direction, style };
}

export default function Home({ darkMode }) {
  const fishArray = Array.from({ length: 12 }, getRandomFishProps);
  const seaweedArray = Array.from({ length: 8 }, (_, i) => ({
    x: `${10 + i * 10}%`,
    height: randomBetween(44, 70),
    delay: randomBetween(0, 3),
  }));

  return (
    <div className="fixed inset-0 min-h-screen w-screen flex flex-col items-center justify-center pt-16 overflow-hidden transition-colors duration-500"
      style={{
        background: darkMode
          ? 'linear-gradient(to bottom, #0a2233, #091a2a)'
          : 'linear-gradient(to bottom, #0faaf0, #003366)'
      }}
    >
      {/* Blurry Fish */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {fishArray.map((props, idx) => (
          <AnimatedFish key={idx} {...props} />
        ))}
      </div>
      {/* Ocean Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: BUBBLE_COUNT }).map((_, idx) => (
          <Bubble key={idx} idx={idx} />
        ))}
      </div>
      {/* Seaweed */}
      <div className="absolute bottom-0 left-0 w-full h-24 z-20 pointer-events-none">
        {seaweedArray.map((seaweed, idx) => (
          <Seaweed key={idx} {...seaweed} darkMode={darkMode} />
        ))}
      </div>
      {/* Treasure Chest */}
      <div className="absolute left-[60%] bottom-0 z-25 pointer-events-none">
        <TreasureChest delay={1.5} darkMode={darkMode} />
      </div>
      {/* Rocks and Starfish */}
      <Rocks darkMode={darkMode} />
      <Starfish darkMode={darkMode} />
      {/* Headline */}
      <h1 className="font-pixel text-2xl sm:text-4xl text-white text-center mb-6 drop-shadow-lg z-30">
        Need help sorting out your finances?
      </h1>
      {/* Subheading */}
      <p className="font-pixel text-base sm:text-lg text-blue-100 text-center mb-10 max-w-xl drop-shadow z-30">
        Dive into FishFinance and swim your way to financial freedom!
      </p>
      {/* Get Started Button */}
      <Link
        to="/signup"
        className="font-pixel bg-yellow-300 text-[#0faaf0] px-8 py-4 rounded-xl shadow-lg text-lg sm:text-2xl hover:bg-yellow-400 transition active:scale-95 border-4 border-white z-30"
      >
        Get Started
      </Link>
      {/* Ocean floor */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 z-10"
        style={{
          background: darkMode
            ? 'linear-gradient(to top, #172554, transparent)'
            : 'linear-gradient(to top, #003366, transparent)'
        }}
      ></div>
      {/* Sand */}
      <div
        className="absolute bottom-0 left-0 w-full h-8 z-10"
        style={{
          background: darkMode
            ? 'linear-gradient(to top, #eab30877, transparent)'
            : 'linear-gradient(to top, #fffde4, transparent)'
        }}
      ></div>
    </div>
  );
}
