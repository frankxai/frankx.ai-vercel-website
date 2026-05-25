'use client'
export default function FloatingStatCard({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) {
  return <div {...props}>{children}</div>
}
