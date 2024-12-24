"use client"

import { useState, useRef, useEffect } from "react"
import { MultiLineChart } from "@/components/multi-line-chart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

// import { Card, CardContent } from "@/components/ui/card"
import { BarChart } from "./bar-chart"
import { PieChart } from "./pie-chart"

// type ChartType = "line" | "bar" | "pie"

type ChartDataItem = {
  name: string;
  [key: string]: string | number; // Index signature for dynamic properties
}

type LineChartData = {
  type: "line";
  data: ChartDataItem[];
  title?: string;
  description?: string;
};

type BarChartData = {
  type: "bar";
  data: [string | number, number][];
  title?: string;
  description?: string;
};

type PieChartData = {
  type: "pie";
  data: [string | number, number][];
  title?: string;
  description?: string;
};

type ChartData = LineChartData | BarChartData | PieChartData;



type InteractionItem = {
  type: "message" | "chart"
  content: string | ChartData
}

// Mock API function (replace with actual API call)
const fetchChartData = async (message: string): Promise<ChartData> => {
  // const address = 'http://127.0.0.1:5000/api/insight'
  const token = localStorage.getItem('token')
  const response = await fetch('http://127.0.0.1:5000/api/insight', {
    method: 'POST', // Changed to POST to send data
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const jsonData = await response.json();
  
  return jsonData;
}


export function ChartInteraction() {
  const [interactions, setInteractions] = useState<InteractionItem[]>([])
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [interactions])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setInteractions([...interactions, { type: "message", content: message }])
      setMessage("")
      setIsLoading(true)

      try {
        const newChart = await fetchChartData(message)
        setInteractions(prev => [...prev, { type: "chart", content: newChart }])
      } catch (error) {
        console.error("Error fetching chart data:", error)
        setInteractions(prev => [...prev, { type: "message", content: "Error generating chart. Please try again." }])
      } finally {
        setIsLoading(false)
      }

      // Simulate generating a chart based on the message
      // setTimeout(() => {
      //   const newChart: ChartData = generateRandomChart()
      //   setInteractions(prev => [...prev, { type: "chart", content: newChart }])
      // }, 1000)
    }
  }

  // const generateRandomChart = (): ChartData => {
  //   const chartTypes: ChartType[] = ["line", "bar", "pie"]
  //   const selectedType = chartTypes[Math.floor(Math.random() * chartTypes.length)]
  //   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  //   switch (selectedType) {
  //     case "line":
  //       const lines = ["Sales", "Profit", "Revenue"].map(label => ({ label }))
  //       const lineData: [string, number[], number[]][] = [
  //         ["Months", months.map((_, i) => i + 1), []],
  //         ...lines.map(line => [
  //           line.label,
  //           [],
  //           Array(6).fill(0).map(() => Math.floor(Math.random() * 5000))
  //         ])
  //       ]
  //       return {
  //         type: "line",
  //         data: lineData,
  //         lines,
  //         title: "Generated Line Chart",
  //         description: "Random line chart data"
  //       }
  //     case "bar":
  //       const barData: [string, number][] = months.map(month => [month, Math.floor(Math.random() * 1000)])
  //       return {
  //         type: "bar",
  //         data: barData,
  //         title: "Generated Bar Chart",
  //         description: "Random bar chart data"
  //       }
  //     case "pie":
  //       const pieData: [string, number][] = ["Category A", "Category B", "Category C", "Category D"].map(
  //         category => [category, Math.floor(Math.random() * 100)]
  //       )
  //       return {
  //         type: "pie",
  //         data: pieData,
  //         title: "Generated Pie Chart",
  //         description: "Random pie chart data"
  //       }
  //   }
  // }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto p-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {interactions.map((item, index) => (
            <div key={index}>
              {item.type === "message" ? (
                  <div className="mb-4 rounded-lg p-4 shadow-sm text-right border">
                    <p>{item.content as string}</p>
                  </div>
                  
                ) : (
                  (() => {
                    const chartData = item.content as ChartData
                    switch (chartData.type) {
                      case "line":
                        return <MultiLineChart {...chartData} />
                      case "bar":
                        return <BarChart {...chartData} />
                      case "pie":
                        return <PieChart {...chartData} />
                    }
                  })()
                )}
            </div>
          ))}
          {isLoading && 
            <div>
              <Skeleton className="h-[200px] w-full" />
            </div>
          }
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  )
}

