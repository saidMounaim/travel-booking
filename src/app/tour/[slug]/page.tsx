import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface TourDetailsProps {
  params: {
    slug: string;
  };
}

async function getTour(slug: string) {
  const tour = await prisma.tour.findFirst({ where: { slug } });
  return tour;
}

const TourDetails = async ({ params }: TourDetailsProps) => {
  const tour = await getTour(params.slug);

  if (!tour) {
    notFound();
  }

  return <div>{tour.title}</div>;
};

export default TourDetails;
