function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <svg
        className="brand-logo-svg"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brandOrbA" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="brandOrbB" x1="4" y1="24" x2="44" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a5b4fc" stopOpacity="0.35" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="9" stroke="url(#brandOrbA)" strokeWidth="2.25" />
        <circle cx="24" cy="24" r="3.5" fill="url(#brandOrbA)" />
        <ellipse
          cx="24"
          cy="24"
          rx="19"
          ry="10"
          stroke="url(#brandOrbB)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          transform="rotate(-28 24 24)"
        />
        <circle cx="38" cy="18" r="3" fill="#22d3ee" stroke="#0f172a" strokeWidth="1" />
      </svg>
    </span>
  );
}

export default BrandLogo;
