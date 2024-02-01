import Image from "next/image";
import { StarIcon } from "lucide-react";
import { Tour } from "@prisma/client";
import { calculateAverageRating } from "@/lib/utils";

export interface TourCardProps {
  tour: {
    id: number;
    title: string;
    slug: string;
    feauturedImage: string;
    reviews: {
      rating: number;
    }[];
  };
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <article className="flex flex-col w-[350] gap-3">
      <div className="relative w-full h-[300px] rounded-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-700 opacity-30 z-10"></div>
        <Image
          src={tour.feauturedImage}
          alt="Tour Image"
          className="object-cover"
          fill
        />
      </div>
      <div className="text-muted-foreground font-bold text-1xl">
        {tour.title}
        <span className=" flex items-center gap-1 mt-2 text-sm">
          <StarIcon size={20} fill="#F3B95F" stroke="" />
          {calculateAverageRating(tour.reviews)}
        </span>
      </div>
    </article>
  );
};

export default TourCard;
