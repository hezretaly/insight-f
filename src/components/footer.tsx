import { MapPinned } from 'lucide-react';

const Footer = () => {
  return (
    <section className="py-10">
      <div className="container">
        <footer>
          <div className="flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>© 2024 Eranatus. All rights reserved.</p>
            <div className='flex gap-2'>
              <MapPinned className='size-6' />
              <p>San Francisco, CA</p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
