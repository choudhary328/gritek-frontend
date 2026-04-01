import { Star } from 'lucide-react';

export function MarqueeStrip() {
  return (
    <div className="w-full bg-[#21362e] py-3 sm:py-4 overflow-hidden relative border-b-4 sm:border-b-[6px] border-[#b8ea27]">
      <div className="flex whitespace-nowrap animate-marquee-strip">
        {Array(6).fill(
          ["Content Marketing", "Social Media Marketing", "Search Engine Optimization"]
        ).flat().map((service, index) => (
          <div key={index} className="flex items-center shrink-0 mx-4 sm:mx-8">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#b8ea27] fill-[#b8ea27] mr-4 sm:mr-8" />
            <span className="text-white font-bold tracking-wide text-sm sm:text-lg">{service}</span>
          </div>
        ))}
      </div>
      <style>{`
        .animate-marquee-strip {
          animation: marquee-strip 30s linear infinite;
        }
        @keyframes marquee-strip {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
