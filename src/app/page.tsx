import Image from "next/image";
import Starfield from "react-starfield";
import { dbConnect } from "./lib/db/db";

export async function dbinit(){
  await dbConnect();
};

export default function Home() {
  dbinit();
  return (
    <div className="relative h-screen w-screen overflow-hidden justify-center items-center bg-black font-sans">
      <div style={{ width: '100%', height: '100%', position: 'absolute', opacity: '100%' }}>
        <Starfield 
          starCount={1000}
          starColor={[255,255,255]}
          speedFactor={0.005}
          backgroundColor="black"
        />
      </div>

      <div className={"absolute z-5 w-screen h-screen animate-satellite"}>
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
