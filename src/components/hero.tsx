import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';


const Hero = () => {
  return (
    <section className="py-32">
      <div className="overflow-hidden border-b border-muted">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 items-center text-center">
              <h1 className="mb-8 text-pretty text-4xl font-medium lg:text-8xl">
                Unlock Data Insights, Without Sharing Your Data
              </h1>
              <p className="mx-auto max-w-screen-md text-muted-foreground lg:text-xl">
                Leverage the power of AI to uncover hidden patterns directly from your database schema – securely and effortlessly.
              </p>
              <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                <Link to={"/line-chart"}>
                <Button>
                  Get started now
                  <ChevronRight className="ml-2 h-4" />
                </Button>
                </Link>
                <Link to={"/ch1"}>
                  <Button>
                    Learn more
                    <ChevronRight className="ml-2 h-4" />
                  </Button>
                </Link>
                
              </div>
            </div>
          </div>
          <img
            src=""
            alt="here should be a youtube video"
            className="mx-auto mt-24 max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
