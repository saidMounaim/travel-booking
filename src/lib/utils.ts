import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function formatDate(dateString: any) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];

  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${formattedDay} ${month}`;
}

export function calculateNights(checkInDate: any, checkOutDate: any) {
  const oneDay = 24 * 60 * 60 * 1000;
  const checkInTime = new Date(checkInDate).getTime();
  const checkOutTime = new Date(checkOutDate).getTime();

  const differenceDays = Math.round(
    Math.abs((checkOutTime - checkInTime) / oneDay)
  );

  return differenceDays;
}

export function calculateTotalPrice(
  checkInDate: any,
  checkOutDate: any,
  nightlyRate: any
) {
  const oneDay = 24 * 60 * 60 * 1000;
  const checkInTime = new Date(checkInDate).getTime();
  const checkOutTime = new Date(checkOutDate).getTime();

  const differenceDays = Math.round(
    Math.abs((checkOutTime - checkInTime) / oneDay)
  );
  const totalPrice = differenceDays * nightlyRate;

  return totalPrice;
}

export function calculateAverageRating(ratings: any) {
  if (ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((total: any, r: any) => total + r.rating, 0);
  const average = sum / ratings.length;

  return average;
}
