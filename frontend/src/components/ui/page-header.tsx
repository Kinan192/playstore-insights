import * as React from "react"

interface PageHeaderProps {
  title: string
  description: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-xl gap-4">
      <div>
        <h1 className="font-h1 text-h1 text-on-surface mb-1">{title}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">{description}</p>
      </div>
      {children && (
        <div className="flex gap-3 items-center flex-wrap">
          {children}
        </div>
      )}
    </div>
  )
}
