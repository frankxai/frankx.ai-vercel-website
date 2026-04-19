'use client'
export default function LiquidGradient({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) {
  return <div {...props}>{children}</div>
}
