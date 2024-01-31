import Image from "next/image";
import defaultUser from "../../../public/defaultuser.png";

interface ReviewCardProps {
  rating: number;
  name: string;
  comment: string;
}

const ReviewCard = ({ rating, name, comment }: ReviewCardProps) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={defaultUser}
        alt="Default user"
        className="object-cover cursor-pointer"
        width={50}
        height={50}
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center">
          {Array.from({ length: rating }, (_, index) => index + 1).map(
            (review) => (
              <small key={review}>⭐</small>
            )
          )}
        </div>
        <h3 className="font-medium">{name}</h3>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
