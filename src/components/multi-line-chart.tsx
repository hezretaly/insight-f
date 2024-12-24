"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


type ChartDataItem = {
  name: string;
  [key: string]: string | number; // Index signature for dynamic properties
}

interface MultiLineChartProps {
  data: ChartDataItem[]
  title?: string
  description?: string
}

const colors = [
  "hsl(var(--primary))",
  "hsl(0, 0%, 20%)",
  "hsl(0, 0%, 35%)",
  "hsl(0, 0%, 50%)",
  "hsl(0, 0%, 60%)",
  "hsl(0, 0%, 70%)",   // Red
  "hsl(120, 100%, 25%)", // Dark Green
  "hsl(240, 100%, 50%)", // Blue
  "hsl(60, 100%, 50%)",  // Yellow
  "hsl(300, 100%, 25%)", // Purple
  "hsl(180, 100%, 25%)", // Teal
  "hsl(30, 100%, 50%)",  // Orange
  "hsl(330, 100%, 50%)", // Pink
  "hsl(90, 100%, 25%)",  // Lime
  "hsl(210, 100%, 50%)", // Sky Blue
  "hsl(0, 0%, 0%)",      // Black
  "hsl(0, 0%, 75%)",     // Light Gray
  "hsl(45, 100%, 50%)",  // Gold
  "hsl(270, 100%, 50%)", // Indigo
  "hsl(15, 100%, 50%)",  // Vermilion
]

export function MultiLineChart({ data, title, description }: MultiLineChartProps) {
  // Get all unique keys (excluding 'name') from the data
  const allKeys = new Set<string>();
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'name') {
        allKeys.add(key);
        item[key] = Number(item[key]) // if the data is not number convert it to number
      }
    });
  });
  const keys = Array.from(allKeys);

  title = "Multi Line Chart"
  description = "This is a multi-line chart with dynamic labels and colors."

  // const formattedData = data[0][1].map((_, index) => {
  //   const obj: { [key: string]: string | number } = { xAxis: data[0][1][index] }
  //   lines.forEach((line, lineIndex) => {
  //     obj[line.label] = data[lineIndex + 1][2][index]
  //   })
  //   return obj
  // })

  // const config = lines.reduce((acc, line, index) => {
  //   acc[line.label] = {
  //     label: line.label,
  //     color: colors[index % colors.length],
  //   }
  //   return acc
  // }, {} as Record<string, { label: string; color: string }>)

  // Create the config object using allKeys
  const config = keys.reduce((acc, key, index) => {
    acc[key] = {
      label: key, // Use the key as the label
      color: colors[index % colors.length], // Assign colors cyclically
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="w-full" style={{ aspectRatio: '3/2' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
            data={data} 
            margin={{ top: 10, right: 10, left: 13, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: 'hsl(var(--foreground))' }}
                width={40}
                tickFormatter={(value) => {
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}T`;
                  } else if (value >= 1000) {
                    return `${(value / 1000).toFixed(1)}B`;
                  }
                  return `${value}M`;
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              {keys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  // dot={{ fill: colors[index % colors.length], strokeWidth: 2 }}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
// replaced the below with data than the lines
// {lines.map((line, index) => (
//   <Line
//     key={line.label}
//     type="monotone"
//     dataKey={line.label}
//     stroke={colors[index % colors.length]}
//     strokeWidth={2}
//     // dot={{ fill: colors[index % colors.length], strokeWidth: 2 }}
//     dot={false}
//   />
// ))}