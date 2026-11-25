/* Shared paint fills keep the animated SVG doodles in one colour system. */
export default function ThemePaint() {
  return (
    <svg className="theme-paint" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="paint-emerald" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--teal)" />
          <stop offset=".48" stopColor="var(--emerald)" />
          <stop offset="1" stopColor="var(--emerald-deep)" />
        </linearGradient>
        <linearGradient id="paint-lime" x1="0" y1="0" x2=".85" y2="1">
          <stop stopColor="var(--lime)" />
          <stop offset=".42" stopColor="var(--lime)" />
          <stop offset="1" stopColor="var(--emerald)" />
        </linearGradient>
        <linearGradient id="paint-teal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--mint)" />
          <stop offset=".48" stopColor="var(--teal)" />
          <stop offset="1" stopColor="var(--emerald)" />
        </linearGradient>
        <linearGradient id="paint-mint" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--mint)" />
          <stop offset="1" stopColor="var(--background-secondary)" />
        </linearGradient>
        <linearGradient id="paint-wash" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--mint)" stopOpacity=".65" />
          <stop offset=".6" stopColor="var(--background-secondary)" />
          <stop offset="1" stopColor="var(--background)" />
        </linearGradient>
        <linearGradient id="paint-gold" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffe16b" />
          <stop offset="1" stopColor="#f0b416" />
        </linearGradient>
        <filter id="paint-grain" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".035 .16" numOctaves="2" seed="12" result="grain" />
          <feColorMatrix in="grain" type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".12" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" mode="soft-light" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        {/* Balance the sequence's warm paper, then enrich its existing colour. */}
        <filter id="hero-colour" colorInterpolationFilters="sRGB">
          <feComponentTransfer result="balanced">
            <feFuncR type="linear" slope="1.04508" />
            <feFuncG type="linear" slope="1.04938" />
            <feFuncB type="linear" slope="1.07595" />
          </feComponentTransfer>
          <feColorMatrix in="balanced" type="saturate" values="1.12" result="paper" />
          <feColorMatrix in="balanced" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -3 4 -1 0 -.08" result="greens" />
          <feColorMatrix in="balanced" type="hueRotate" values="28" />
          <feColorMatrix type="saturate" values="2.1" result="pigment" />
          <feComposite in="pigment" in2="greens" operator="in" result="greenPaint" />
          <feComposite in="paper" in2="greens" operator="out" result="untouched" />
          <feComposite in="untouched" in2="greenPaint" operator="arithmetic" k2="1" k3="1" result="painted" />
          <feColorMatrix in="balanced" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -4 -4 -4 0 12" result="paperMask" />
          <feComposite in="painted" in2="paperMask" operator="in" />
        </filter>
      </defs>
    </svg>
  )
}
