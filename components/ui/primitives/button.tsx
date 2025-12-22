import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            'default': "bg-cyan-600 text-white hover:bg-cyan-700",
            'outline': "border border-slate-700 bg-transparent hover:bg-slate-800",
            'ghost': "hover:bg-slate-800 hover:text-white",
            'link': "text-cyan-400 underline-offset-4 hover:underline",
          }[variant],
          {
            'default': "h-10 px-4 py-2",
            'sm': "h-9 px-3 text-sm",
            'lg': "h-11 px-8",
            'icon': "h-10 w-10",
          }[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
