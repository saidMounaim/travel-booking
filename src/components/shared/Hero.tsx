import Image from "next/image";
import Link from "next/link";
import bgHero from "../../../public/bghero.jpg";

const Hero = () => {
  return (
    <section className="relative h-full">
      <Image src={bgHero} className="object-cover -z-20" alt="Bg Hero" fill />

      <div className="absolute inset-0 bg-white/75 sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l -z-10"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-6xl uppercase">
            Journey to
            <strong className="block font-extrabold text-blue-700">
              explore world
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/tours"
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            >
              Tours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
