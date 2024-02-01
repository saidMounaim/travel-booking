import { Tour } from "@prisma/client";
import TourCard, { TourCardProps } from "./TourCard";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function getTours() {
  const tours = await prisma.tour.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      feauturedImage: true,
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });
  return tours;
}

const FeaturedTours = async () => {
  const tours = await getTours();

  return (
    <section className="flex flex-col mt-11">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col mb-6">
          <h2 className="font-bold text-2xl uppercase text-gray-900">
            Featured Tours
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {tours.slice(0, 4).map((tour: TourCardProps["tour"]) => (
            <Link href={`/tour/${tour.slug}`} key={tour.id}>
              <TourCard tour={tour} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
