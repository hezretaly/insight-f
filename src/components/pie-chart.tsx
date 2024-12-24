"use client"

import { Pie, PieChart as RechartsPieChart, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PieChartProps {
  data: [string | number, number][]
  title: string
  description?: string
}

export function PieChart({ data, title, description }: PieChartProps) {
  const formattedData = data.map(([name, value]) => ({ name, value }))

  const colors = [
    "hsl(var(--primary))",
    "hsl(0, 0%, 20%)",
    "hsl(0, 0%, 35%)",
    "hsl(0, 0%, 50%)",
    "hsl(0, 0%, 60%)",
    "hsl(0, 0%, 70%)", 
    // below are all the same color (appears)
    // "hsl(var(--secondary))",
    // "hsl(var(--accent))",
    // "hsl(var(--muted))",
    // "hsl(var(--card))",
  ]

  const config = data.reduce((acc, [name], index) => {
    acc[name] = {
      label: String(name),
      color: colors[index % colors.length],
    }
    return acc
  }, {} as Record<string, { label: string; color: string }>)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="w-full" style={{ aspectRatio: '3/2' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={formattedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label={(entry) => entry.name}
              >
                {formattedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

