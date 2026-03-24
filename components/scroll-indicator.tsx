'use client'
export default function ScrollIndicator({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) {
  return <div {...props}>{children}</div>
}
