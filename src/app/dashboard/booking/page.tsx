import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import TableBooking from "@/app/user/mybooking/TableBooking";

async function getBookings() {
  const bookings = await prisma.reservation.findMany({
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
  return bookings;
}

const ManageBookingAdmin = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.isAdmin) {
    redirect("/");
  }

  const bookings = await getBookings();

  return (
    <main className="max-w-5xl mx-auto">
      <div className="flex flex-col mt-11">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Manage Booking
        </h1>
        <div className="flex flex-col gap-1 mt-5">
          <div className="relative overflow-x-auto">
            <TableBooking booking={bookings} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageBookingAdmin;
