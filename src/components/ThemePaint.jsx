/* Shared paint fills keep the animated SVG doodles in one colour system. */
export default function ThemePaint() {
  return (
    <svg className="theme-paint" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="pigment-emerald" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--teal-bright)" />
          <stop offset=".48" stopColor="var(--emerald-bright)" />
          <stop offset="1" stopColor="var(--emerald)" />
        </linearGradient>
        <linearGradient id="pigment-lime" x1="0" y1="0" x2=".85" y2="1">
          <stop stopColor="var(--lime-bright)" />
          <stop offset=".42" stopColor="var(--lime)" />
          <stop offset="1" stopColor="#30C453" />
        </linearGradient>
        <linearGradient id="pigment-teal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--teal-bright)" />
          <stop offset=".48" stopColor="var(--teal)" />
          <stop offset="1" stopColor="var(--emerald)" />
        </linearGradient>
        <linearGradient id="pigment-mint" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--mint)" />
          <stop offset="1" stopColor="#70EFC9" />
        </linearGradient>
        <linearGradient id="pigment-wash" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--mint)" />
          <stop offset=".6" stopColor="#D4FFE4" />
          <stop offset="1" stopColor="var(--background)" />
        </linearGradient>
        <linearGradient id="pigment-gold" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFE65A" />
          <stop offset="1" stopColor="#FFBE19" />
        </linearGradient>
        <filter id="paint-bristles" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".025 .32" numOctaves="2" seed="8" result="fibres" />
          <feDisplacementMap in="SourceGraphic" in2="fibres" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Tapered, overlapping pigment strokes scale inside each original
            silhouette. No extra filters on animated shapes or altered paths. */}
        {['emerald', 'lime', 'teal', 'mint', 'wash', 'gold'].map((tone) => (
          <pattern key={tone} id={`paint-${tone}`} width="1" height="1"
            patternContentUnits="objectBoundingBox" viewBox="0 0 200 200" preserveAspectRatio="none">
            <rect width="200" height="200" fill={`url(#pigment-${tone})`} />
            <g fill="#FFFFFF" filter="url(#paint-bristles)">
              <path opacity=".19" d="M-15 42Q62 2 218 13L207 25Q79 13-15 58Z" />
              <path opacity=".12" d="M-12 77Q95 29 215 45L209 49Q74 42-12 88Z" />
              <path opacity=".22" d="M-8 118Q77 70 217 73L208 82Q95 78-8 127Z" />
              <path opacity=".13" d="M-9 164Q94 108 214 115L213 120Q99 119-9 174Z" />
              <path opacity=".18" d="M0 198Q102 149 214 154L205 164Q90 163 0 207Z" />
            </g>
            <g fill="none" stroke="#006B46" strokeWidth="1" opacity=".08" filter="url(#paint-bristles)">
              <path d="M-10 65Q87 18 215 35M-15 140Q101 87 215 96M-10 188Q95 132 215 139" />
            </g>
            <g fill="none" stroke="#FFFFFF" strokeWidth=".8" opacity=".24">
              <path d="M-10 56Q93 10 205 29M-5 101Q90 54 214 62M-10 154Q98 98 212 107M-5 184Q103 135 208 147" />
            </g>
          </pattern>
        ))}
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
          <feColorMatrix type="saturate" values="2.1" />
          <feComponentTransfer result="pigment">
            <feFuncR type="linear" slope="1.04" />
            <feFuncG type="linear" slope="1.14" />
            <feFuncB type="linear" slope="1.12" />
          </feComponentTransfer>
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
