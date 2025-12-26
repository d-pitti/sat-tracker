import Image from "next/image";
import Starfield from "react-starfield";
import { AccordionClient } from "../components/accordionClient";
import { dbInitalize } from "./lib/seed/seed";


export default async function Home() {
  await dbInitalize();

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
     
      {/* <div className="relative flex z-5 w-2/3 h-3/4  rounded-xl items-center align-middle justify-center justify-self-center m-50 bg-zinc-300">
        <ul className="relative flex w-full h-full overflow-y-scroll p-3 justify-center items-center rounded-xl">
          <li className="w-2/3 h-full justify-center items-center ">
            <AccordionComponent />
          </li>
        </ul>
      </div> */}

      <div className="relative flex z-10 w-2/3 h-3/4 overflow-y-scroll items-center justify-center justify-self-center m-40 p-5 bg-zinc-300">
        <AccordionClient />
      </div>
    </div>
  );
}
