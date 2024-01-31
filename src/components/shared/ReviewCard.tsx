"use client";

import Image from "next/image";
import defaultUser from "../../../public/defaultuser.png";
import FormSubmitButton from "./FormSubmitButton";

interface ReviewCardProps {
  rating: number;
  name: string;
  comment: string;
  userId: number;
  currentUserId?: number;
}

const ReviewCard = ({
  rating,
  name,
  comment,
  userId,
  currentUserId,
}: ReviewCardProps) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={defaultUser}
        alt="Default user"
        className="object-cover cursor-pointer"
        width={50}
        height={50}
      />
      <div className="flex flex-col gap-1  w-96">
        <div className="flex items-center">
          {Array.from({ length: rating }, (_, index) => index + 1).map(
            (review) => (
              <small key={review}>⭐</small>
            )
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="font-medium">{name}</h3>
            <p>{comment}</p>
          </div>
          {userId === currentUserId && (
            <form>
              <FormSubmitButton className="bg-red-600 text-white hover:bg-red-700">
                Delete
              </FormSubmitButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
