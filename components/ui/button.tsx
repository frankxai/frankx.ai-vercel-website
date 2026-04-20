import * as React from "react"
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: string; size?: string; asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, ...props }, ref) => (
  <button ref={ref} className={className} {...props}>{children}</button>
))
Button.displayName = "Button"
export function buttonVariants(opts?: { variant?: string; size?: string }) { return "" }
