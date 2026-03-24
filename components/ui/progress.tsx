import * as React from "react"
export const Progress = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value?: number; max?: number }>(({ className, value = 0, max = 100, ...props }, ref) => (
  <div ref={ref} className={className} {...props}><div style={{ width: `${(value / max) * 100}%` }} /></div>
))
Progress.displayName = "Progress"
