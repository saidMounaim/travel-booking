import Markdown from "@/components/shared/Markdown";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import prisma from "@/lib/prisma";
import { calculateNights, calculateTotalPrice, formatDate } from "@/lib/utils";
import { CalendarDays, UserRound } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface TourDetailsProps {
  params: {
    slug: string;
  };
}

async function getTour(slug: string) {
  const tour = await prisma.tour.findFirst({
    where: { slug },
    select: {
      id: true,
      title: true,
      body: true,
      feauturedImage: true,
      checkIn: true,
      checkOut: true,
      guests: true,
      pricePerNight: true,
      gallery: {
        select: {
          id: true,
          title: true,
          image: true,
        },
      },
    },
  });
  return tour;
}

const TourDetails = async ({ params }: TourDetailsProps) => {
  const tour = await getTour(params.slug);

  if (!tour) {
    notFound();
  }

  return (
    <main className="max-w-[1320px] w-full mx-auto px-5 sm:px-8 md:px-12 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[70%_28%] gap-[2%] mt-11">
        <div className="block">
          <h1 className="text-3xl font-bold text-muted-foreground">
            {tour.title}
          </h1>
          <div className="block relative w-full h-[500px] mt-5">
            <Image
              src={tour.feauturedImage}
              alt="Feautured Image"
              className="object-cover rounded-md"
              fill
            />
          </div>
          <div className="block mt-6">
            <Markdown>{tour.body}</Markdown>
          </div>
          <div className="block w-full h-[1px] bg-slate-800 opacity-15 mt-11"></div>
          <div className="w-full mt-10">
            <h2 className="text-2xl font-bold text-muted-foreground">
              Places You’ll See
            </h2>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full mt-6"
            >
              <CarouselContent>
                {tour.gallery.map((g) => (
                  <>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <div className="h-[280px] relative">
                        <Image
                          src={g.image}
                          alt={g.title}
                          className="object-cover rounded-md"
                          fill
                        />
                      </div>
                      <h3 className="text-muted-foreground font-medium text-1xl mt-2">
                        {g.title}
                      </h3>
                    </CarouselItem>
                  </>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-white p-7 rounded-md border">
            <div className="font-medium">
              <span className="text-2xl">${tour.pricePerNight} </span>
              <small className="text-1xl font-light">/night</small>
            </div>
            <div className="w-full p-4 bg-gray-100 mt-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays size={25} />
                  <div className="flex flex-col">
                    <h3 className="text-md font-medium">
                      {formatDate(tour.checkIn)}
                    </h3>
                    <span className="text-sm">Check In</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={25} />
                  <div className="flex flex-col">
                    <h3 className="text-md font-medium">
                      {formatDate(tour.checkOut)}
                    </h3>
                    <span className="text-sm">Check Out</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UserRound size={25} />
                <div className="flex flex-col">
                  <h3 className="text-md font-medium">{tour.guests} Guests</h3>
                  <span className="text-sm">Guests</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-7 text-lg text-muted-foreground">
              <h3>
                ${tour.pricePerNight} x{" "}
                {calculateNights(tour.checkIn, tour.checkOut)} nights
              </h3>
              <h3>
                $
                {calculateTotalPrice(
                  tour.checkIn,
                  tour.checkOut,
                  tour.pricePerNight
                )}
              </h3>
            </div>
            <div className="flex items-center justify-between mt-2 text-lg text-muted-foreground">
              <h3>Service fee</h3>
              <h3>$0</h3>
            </div>
            <div className="flex items-center justify-between mt-5 text-lg text-muted-foreground">
              <h3>Total</h3>
              <h3>
                $
                {calculateTotalPrice(
                  tour.checkIn,
                  tour.checkOut,
                  tour.pricePerNight
                )}
              </h3>
            </div>
            <div className="block mt-11">
              <Button className="w-full">Book now</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TourDetails;
