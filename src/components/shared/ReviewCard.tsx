"use client";

import Image from "next/image";
import defaultUser from "../../../public/defaultuser.png";
import FormSubmitButton from "./FormSubmitButton";
import { useToast } from "../ui/use-toast";
import { deleteReview } from "@/app/tour/actions";
import { usePathname } from "next/navigation";

interface ReviewCardProps {
  reviewId: number;
  rating: number;
  name: string;
  comment: string;
  userId: number;
  currentUserId?: number;
}

const ReviewCard = ({
  reviewId,
  rating,
  name,
  comment,
  userId,
  currentUserId,
}: ReviewCardProps) => {
  const { toast } = useToast();
  const path = usePathname();

  const handleDeleteReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (confirm("Are u sure ?")) {
        await deleteReview({ userId, reviewId, path });
        toast({
          className: "bg-green-600 text-white font-semiBold",
          description: "Review deleted successfully.",
        });
      }
    } catch (error) {
      toast({
        className: "bg-red-600 text-white font-semiBold",
        description: "Something went wrong, please try again.",
      });
    }
  };

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
            <form onSubmit={handleDeleteReview}>
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
