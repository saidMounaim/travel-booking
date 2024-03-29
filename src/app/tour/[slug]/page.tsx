import Markdown from "@/components/shared/Markdown";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { AlertTriangle, CalendarDays, UserRound } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Places from "./Places";
import Price from "./Price";
import Review from "@/components/shared/Review";
import ReviewCard from "@/components/shared/ReviewCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BookTourForm from "./BookTourForm";

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
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return tour;
}

const TourDetails = async ({ params }: TourDetailsProps) => {
  const session = await getServerSession(authOptions);

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
          <Places gallery={tour.gallery} />
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
            <Price
              pricePerNight={tour.pricePerNight}
              checkIn={tour.checkIn}
              checkOut={tour.checkOut}
            />
            {session ? (
              <div className="block mt-11 p-4 bg-gray-100 rounded-md">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">Book Tour</h2>
                </div>

                <BookTourForm tourId={tour.id} />
              </div>
            ) : (
              <Alert className="w-full mt-5" variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Please sign in to book a tour.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-11">
        <h2 className="text-2xl font-bold text-muted-foreground">
          Customer Reviews
        </h2>

        {tour?.reviews.length > 0 && (
          <>
            <div className="flex flex-col mt-11 gap-8">
              {tour?.reviews.map((review) => (
                <ReviewCard
                  reviewId={review.id}
                  key={review.id}
                  rating={review.rating}
                  name={review.user.name}
                  comment={review.comment}
                  userId={review.user.id}
                  currentUserId={session?.user?.id}
                />
              ))}
            </div>
          </>
        )}

        <div className="flex flex-col mt-11">
          {session ? (
            <Review tourId={tour.id} />
          ) : (
            <Alert className="w-96" variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please sign in to post a review.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </main>
  );
};

export default TourDetails;
