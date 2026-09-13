export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian-950">
      <div className="relative flex items-center justify-center">
        {/* Pulsing Gold Outer Ring */}
        <div className="h-28 w-28 rounded-full border border-gold-primary/30 animate-ping" />
        
        {/* Rotating Concentric Ring */}
        <div className="absolute h-20 w-20 rounded-full border-2 border-transparent border-t-gold-primary border-r-gold-light animate-spin" />
        
        {/* Inner Brand Monogram */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="font-serif text-2xl font-bold tracking-widest text-gold-primary">A</span>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="font-serif text-xl tracking-[0.3em] text-champagne">A U R A</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold-primary/70">Haute Gastronomie</p>
      </div>
    </div>
  );
}
