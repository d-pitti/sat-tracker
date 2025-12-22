"use client";
import Image from "next/image";
import Galaxy from "@/components/Galaxy";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden justify-center items-center bg-black font-sans">
      <div style={{ width: '100%', height: '100%', position: 'absolute', opacity: '70%' }}>
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.5}
          glowIntensity={0.2}
          saturation={0.9}
          hueShift={100}
          twinkleIntensity={0.1}
          starSpeed={0.1}
          speed={0.2}
          rotationSpeed={0.01}
        />
      </div>

      <div className={"absolute z-5 w-screen animate-satellite"}>
            <Image
                className="invert opacity-15"
                src="/satellite.svg"
                alt="satellite logo"
                width={500}
                height={20}
                priority
            />
      </div>
     
      <div className="relative flex z-10 w-1/2 h-5/8 rounded-xl items-center justify-center justify-self-center m-50 bg-zinc-300">
        <ul>
          <li>
            <p>Testing list</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
