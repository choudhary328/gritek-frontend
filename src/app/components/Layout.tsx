import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { MarqueeStrip } from './MarqueeStrip';

import { Newsletter } from './Newsletter';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Newsletter />
      <MarqueeStrip />
      <Footer />
    </div>
  );
}