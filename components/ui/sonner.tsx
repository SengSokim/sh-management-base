"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-onyx group-[.toaster]:text-cloud group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-cloud",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-cloud",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-cloud",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
