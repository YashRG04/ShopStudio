import React from "react";
import { Rating } from "@material-ui/lab";
import profilePng from "../../images/profile-icon.png";

const ReviewCard = ({ review }) => {
  const options = {
    size: "small",
    readOnly: true,
    value: review.rating,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
