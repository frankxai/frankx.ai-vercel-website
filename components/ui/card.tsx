import * as React from "react"
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />)
Card.displayName = "Card"
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />)
CardHeader.displayName = "CardHeader"
export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h3 ref={ref} className={className} {...props} />)
CardTitle.displayName = "CardTitle"
export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={className} {...props} />)
CardDescription.displayName = "CardDescription"
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />)
CardContent.displayName = "CardContent"
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />)
CardFooter.displayName = "CardFooter"
