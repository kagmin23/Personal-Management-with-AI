import Image from 'next/image'

type Size = 'sm' | 'md' | 'lg'

type Props = {
  /** If true, centers the loader in a tall container suitable for full-page usage. */
  fullScreen?: boolean
  /** Optional accessible label for screen readers */
  label?: string
  /** Predefined size presets to avoid inline styles and keep CSS classes */
  size?: Size
}

const sizeClass: Record<Size, string> = {
  sm: 'w-12 h-12', // 48px
  md: 'w-16 h-16', // 64px
  lg: 'w-20 h-20', // 80px
}

const sizePixels: Record<Size, number> = {
  sm: 32, // logo size
  md: 48,
  lg: 64,
}

export default function LogoLoader({ fullScreen = true, label = 'Đang tải...', size = 'md' }: Props) {
  const wrapperClass = fullScreen
    ? 'flex min-h-[60vh] items-center justify-center'
    : 'inline-flex items-center justify-center'

  const ringBox = sizeClass[size]
  const logoPx = sizePixels[size]

  return (
    <div className={wrapperClass} role="status" aria-label={label} aria-live="polite">
      <div className="flex flex-col items-center">
        <div className={`relative ${ringBox}`}>
          {/* Spinning ring - white for visibility on dark backgrounds */}
          <span className="absolute inset-0 rounded-full border-4 border-white/20 border-t-white animate-spin" />

          {/* Centered logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
            <Image src="/logo.svg" alt="Logo" width={logoPx} height={logoPx} priority draggable={false} />
          </div>
        </div>
  <p className="mt-4 text-sm text-white/90">{label}</p>
      </div>
    </div>
  )
}
