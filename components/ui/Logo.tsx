interface LogoProps {
  variant?: 'default' | 'white'
  className?: string
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  const stroke = variant === 'white' ? '#FFFFFF' : '#8B4513'
  const text = variant === 'white' ? '#FFFFFF' : '#1A1A1A'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 48"
      fill="none"
      className={`h-10 w-auto ${className}`}
      aria-label="Refazendo — empresa de remodelações em Lisboa"
      role="img"
    >
      <path d="M8 32 L24 16 L40 32" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="12" y="32" width="24" height="14" rx="1" stroke={stroke} strokeWidth="2" />
      <line x1="20" y1="32" x2="28" y2="46" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="38" width="8" height="8" rx="1" stroke={stroke} strokeWidth="1.5" />
      <text
        x="54"
        y="35"
        fontFamily="DM Sans, system-ui, sans-serif"
        fontSize="15"
        fontWeight="300"
        letterSpacing="5"
        fill={text}
      >
        REFAZENDO
      </text>
    </svg>
  )
}
