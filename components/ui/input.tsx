import * as React from "react"
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <input ref={ref} className={className} {...props} />)
Input.displayName = "Input"
