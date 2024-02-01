"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { deleteMyBooking } from "./action";
import { usePathname } from "next/navigation";

interface TableBookingProps {
  booking: {
    id: number;
    name: string;
    email: string;
    mobile: string;
    userId: number;
    tour: {
      title: string;
      feauturedImage: string;
    };
  }[];
}

const TableBooking = ({ booking }: TableBookingProps) => {
  const path = usePathname();

  return (
    <>
      {booking.length == 0 && <h1 className="text-center">No Booking Found</h1>}
      {booking.length > 0 && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Featured Image
              </th>
              <th scope="col" className="px-6 py-3">
                Tour Title
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {booking.map((b) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={b.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Image
                    src={b.tour.feauturedImage}
                    alt="Featured Image"
                    width={80}
                    height={80}
                    className="object-cover rounded-md"
                  />
                </th>
                <td className="px-6 py-4">{b.tour.title}</td>
                <td className="px-6 py-4">{b.name}</td>
                <td className="px-6 py-4">{b.email}</td>
                <td className="px-6 py-4">{b.mobile}</td>
                <td className="px-6 py-4">
                  <form action={deleteMyBooking}>
                    <input type="hidden" name="path" value={path} />
                    <input type="hidden" name="userId" value={b.userId} />
                    <input type="hidden" name="bookingId" value={b.id} />
                    <button type="submit">
                      <Trash2 size={20} fill="transparent" stroke="#D04848" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TableBooking;
