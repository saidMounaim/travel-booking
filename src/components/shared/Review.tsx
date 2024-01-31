"use client";

import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import FormSubmitButton from "./FormSubmitButton";
import { useToast } from "../ui/use-toast";

function getRating(rating: number) {
  switch (rating) {
    case 1:
      return "Poor";
    case 2:
      return "Nothing special";
    case 3:
      return "Average";
    case 4:
      return "Very good";
    case 5:
      return "Excellent";
    default:
      return "None";
  }
}

const Review = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(3);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [comment, setComment] = useState("");

  const handleComment = () => {
    try {
      if (!rating || comment === "") {
        toast({
          className: "bg-red-600 text-white font-semiBold",
          description: "Rating & Comment are required",
        });
      } else {
      }
    } catch (error) {
      toast({
        className: "bg-red-600 text-white font-semiBold",
        description: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <div
      className="flex flex-col gap-2"
      style={{ maxWidth: 180, width: "100%" }}
    >
      <Rating
        value={rating}
        onChange={setRating}
        onHoverChange={setHoveredRating}
      />
      <div className="flex flex-col">
        <div>{`${getRating(rating)}`}</div>
        <div>{`${getRating(hoveredRating)}`}</div>
      </div>

      <form onSubmit={handleComment} className="flex flex-col mt-4 w-96 gap-2">
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          className="block p-2.5 pb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your thoughts here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <FormSubmitButton className="w-fit">Add Review</FormSubmitButton>
      </form>
    </div>
  );
};

export default Review;
