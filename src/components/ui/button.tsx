import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.99]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--shadow-signal)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-signal-strong)]",
        hero:
          "bg-primary text-primary-foreground shadow-[var(--shadow-signal)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-signal-strong)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:bg-destructive/90",
        outline:
          "border border-input bg-panel/70 text-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-primary/60 hover:bg-surface-2",
        signalOutline:
          "border border-primary/55 bg-transparent text-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-primary hover:bg-accent",
        secondary:
          "border border-border bg-secondary text-secondary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface-2",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        nav: "bg-transparent text-foreground shadow-none hover:bg-accent hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
