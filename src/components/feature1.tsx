import { ChartArea, Lock, Pointer } from 'lucide-react';

const Feature1 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
        Beyond Traditional Data Analysis
        </p>
        <h2 className="text-3xl font-medium lg:text-4xl">Unlocking Potential, Securely.</h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Lock className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Secure</h3>
            <p className="leading-7 text-muted-foreground">
              No Data Sharing Required: Keep your sensitive information secure within your environment. Peace of mind and reduced risk.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <ChartArea className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Insights</h3>
            <p className="leading-7 text-muted-foreground">
              AI-Powered Insights: Our intelligent algorithms uncover hidden patterns and relationships. Deeper understanding and better decision-making.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Pointer className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Easy</h3>
            <p className="leading-7 text-muted-foreground">
              Easy to Use Interface: Gain valuable insights without complex technical expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature1;
