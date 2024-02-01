import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import TableBooking from "./TableBooking";

export async function getMyBooking(userId: number) {
  const booking = await prisma.reservation.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      email: true,
      mobile: true,
      userId: true,
      tour: {
        select: {
          feauturedImage: true,
          title: true,
        },
      },
    },
  });
  return booking;
}

const MyBookingPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const booking = await getMyBooking(session?.user.id);

  return (
    <main className="max-w-5xl mx-auto">
      <div className="flex flex-col mt-11">
        <h1 className="text-2xl font-bold text-muted-foreground">My Booking</h1>
        <div className="flex flex-col gap-1 mt-5">
          <div className="relative overflow-x-auto">
            <TableBooking booking={booking} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyBookingPage;
