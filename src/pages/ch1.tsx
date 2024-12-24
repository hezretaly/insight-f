import { ChartInteraction } from "@/components/chart-interaction"

export default function Page() {
  return (
    <div>
      <section>
      <div className="overflow-hidden py-10">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 items-center text-center">
              <h1 className="mb-8 text-pretty text-4xl font-medium lg:text-8xl">
                Find the insight <b className="text-indigo-200 underline">without sharing</b> data
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
      <div className="h-screen">
        <ChartInteraction />
      </div>
    </div>
    
  )
}

