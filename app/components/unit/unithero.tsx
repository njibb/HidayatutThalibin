import Image from 'next/image';

interface UnitHeroProps {
  name: string;
  tagline: string;
  bgImage: string;
  theme?: "emerald" | "blue" | "amber" | "purple" | "warm";
}

export default function UnitHero({ name, tagline, bgImage, theme = "blue" }: UnitHeroProps) {
  const borderColors = {
    emerald: "border-emerald-500",
    blue: "border-blue-500",
    amber: "border-amber-500",
    purple: "border-purple-500",
    warm: "border-[#A47E3B]"
  };

  const accentBorder = borderColors[theme] || "border-blue-500";

  return (
    <section className="relative h-screen w-full flex items-end justify-start px-6 sm:px-12 lg:px-20 pb-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image 
          src={bgImage} 
          alt={name}
          fill
          priority
          className="object-cover object-center brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7 space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
            {name}
          </h1>
        </div>

        <div className="lg:col-span-5 pb-3">
          <p className={`text-gray-200 text-base sm:text-lg leading-relaxed drop-shadow border-l-2 ${accentBorder} pl-4`}>
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}