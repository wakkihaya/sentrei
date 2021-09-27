import BlueHandImage from "@public/www-mosh-lol/BlueHand.png";
import LogoImage from "@public/www-mosh-lol/Logo.png";
import PurpleHandImage from "@public/www-mosh-lol/PurpleHand.png";
import RedWaveImage from "@public/www-mosh-lol/RedWave.png";
import SunshineImage from "@public/www-mosh-lol/Sunshine.png";
import { useModalWindow } from "@sentrei/hooks";
import { GlowLogo } from "@sentrei/molecules";
import {
  MoshButtonCTA,
  FooterLogo,
  CountdownClock,
  MoshModalWindow,
} from "@sentrei/organisms";
import clsx from "clsx";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";

const Canvas = dynamic(async () => {
  const m = await import("@react-three/fiber");
  return m.Canvas;
});

const Grid = dynamic(async () => {
  const m = await import("@sentrei/organisms");
  return m.VaporGrid;
});

export const LandingMoshScreen = () => {
  const [isModalOpen] = useModalWindow();

  return (
    <div
      className={clsx(
        "w-full min-h-screen bg-gradient-to-b from-pink-400 via-blue-200 to-sky-400 transition-colors duration-1000",
        isModalOpen &&
          "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
      )}
    >
      <div className="absolute inset-x-0 top-0 w-32 md:w-64 h-32 md:h-64">
        <Image
          className="opacity-10 transition-opacity animate-pulse aspect-w-12 aspect-h-6"
          height={30}
          width={30}
          placeholder="blur"
          src={SunshineImage}
          alt="Sunshine"
          layout="responsive"
        />
      </div>
      <div className="absolute inset-y-1/2 w-32 md:w-64 h-32 md:h-64">
        <Image
          className="opacity-10 transition-opacity animate-pulse aspect-w-12 aspect-h-6"
          height={30}
          width={30}
          placeholder="blur"
          alt="PurpleHand"
          src={PurpleHandImage}
          layout="responsive"
        />
      </div>
      <div className="overflow-hidden absolute inset-x-1/2 sm:inset-x-2/3 lg:inset-x-3/5 xl:inset-x-3/4 top-0 right-0 w-32 md:w-64 h-16 md:h-32">
        <Image
          className="opacity-10 transition-opacity animate-pulse rotate-180 aspect-w-2 aspect-h-1"
          layout="fill"
          placeholder="blur"
          objectFit="cover"
          objectPosition="right"
          alt="BlueHand"
          src={BlueHandImage}
        />
      </div>
      <div className="absolute right-0 bottom-0 w-32 md:w-64 h-32 md:h-64">
        <Image
          className="opacity-10 transition-opacity animate-pulse aspect-w-12 aspect-h-6"
          height={30}
          width={30}
          placeholder="blur"
          alt="RedWave"
          src={RedWaveImage}
          layout="responsive"
        />
      </div>
      <Image
        className="opacity-10 transition-opacity animate-pulse aspect-w-12 aspect-h-6"
        alt="Logo"
        src={LogoImage}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <MoshModalWindow />
      <body>
        <div className="flex overflow-visible absolute inset-x-0 top-0 justify-center items-center h-2/3 sm:h-3/5">
          <div className="flex-col mt-12 sm:mt-16 md:mt-24 xl:mt-36">
            <GlowLogo src={LogoImage} />
            <CountdownClock
              date={moment(process.env.NEXT_PUBLIC_LAUNCH)}
              onComplete={() => {}}
            />
            <MoshButtonCTA />
            <FooterLogo
              discord="https://discord.gg/SsF2QejwvZ"
              github="https://github.com/sentrei/sentrei"
              twitter="https://twitter.com/MoshDAO"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 sm:h-2/5">
          <Canvas className="w-full h-full ">
            <Grid />
          </Canvas>
        </div>
      </body>
    </div>
  );
};
