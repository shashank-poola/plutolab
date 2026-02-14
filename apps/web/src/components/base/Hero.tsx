"use client";

import Grainient from "./Gradient";

interface HeroProps {
  className?: string;
}

export function Hero({ className = "" }: HeroProps) {
  return (
    <div className={`relative min-h-screen w-full overflow-hidden ${className}`.trim()}>
      {/* Gradient Background */}
      <div className="absolute inset-0 w-full h-full">
        <Grainient
          color1="#0f0c29"
          color2="#302b63"
          color3="#8e8bff"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <h1 className="text-center">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-white leading-tight">
            built lovable like apps
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-white leading-tight mt-2">
            with just one prompt
          </span>
        </h1>
      </div>
    </div>
  );
}
