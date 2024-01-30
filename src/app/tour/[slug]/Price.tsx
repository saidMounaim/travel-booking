import { calculateNights, calculateTotalPrice } from "@/lib/utils";

interface PriceProps {
  pricePerNight: number;
  checkIn: Date;
  checkOut: Date;
}

const Price = ({ pricePerNight, checkIn, checkOut }: PriceProps) => {
  return (
    <>
      <div className="flex items-center justify-between mt-7 text-lg text-muted-foreground">
        <h3>
          ${pricePerNight} x {calculateNights(checkIn, checkOut)} nights
        </h3>
        <h3>${calculateTotalPrice(checkIn, checkOut, pricePerNight)}</h3>
      </div>
      <div className="flex items-center justify-between mt-2 text-lg text-muted-foreground">
        <h3>Service fee</h3>
        <h3>$0</h3>
      </div>
      <div className="flex items-center justify-between mt-5 text-lg text-muted-foreground">
        <h3>Total</h3>
        <h3>${calculateTotalPrice(checkIn, checkOut, pricePerNight)}</h3>
      </div>
    </>
  );
};

export default Price;
