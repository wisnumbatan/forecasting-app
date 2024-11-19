import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface TrendProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number
  showIcon?: boolean
}

export function Trend({ value, showIcon = true, className, ...props }: TrendProps) {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  const isPositive = numericValue > 0
  const isNegative = numericValue < 0
  
  return (
    <div
      className={cn(
        "inline-flex items-center text-sm font-medium",
        isPositive && "text-green-600",
        isNegative && "text-red-600",
        !isPositive && !isNegative && "text-gray-600",
        className
      )}
      {...props}
    >
      {showIcon && (
        isPositive ? (
          <ArrowUpIcon className="w-4 h-4 mr-1" />
        ) : isNegative ? (
          <ArrowDownIcon className="w-4 h-4 mr-1" />
        ) : null
      )}
      <span>{value}</span>
    </div>
  )
}