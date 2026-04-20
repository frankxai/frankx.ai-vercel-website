"use client"
import * as React from "react"
export const Accordion = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { type?: string; collapsible?: boolean }) => <div {...props}>{children}</div>
export const AccordionItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />)
AccordionItem.displayName = "AccordionItem"
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => <button ref={ref} className={className} {...props}>{children}</button>)
AccordionTrigger.displayName = "AccordionTrigger"
export const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />)
AccordionContent.displayName = "AccordionContent"
