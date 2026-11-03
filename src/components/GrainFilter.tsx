// Korn nur innerhalb der Form (Logo, Schrift), Schwarz bleibt sauber. Nutzung: className="grain"
export default function GrainFilter() {
  return (
    <svg aria-hidden className="absolute h-0 w-0">
      <filter id="grain" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.38 0.38 0.38 0 -0.46" result="dots" />
        <feComposite in="dots" in2="SourceGraphic" operator="in" result="clipped" />
        <feBlend in="SourceGraphic" in2="clipped" mode="multiply" />
      </filter>
    </svg>
  );
}
