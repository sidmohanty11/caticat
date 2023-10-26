import React from "react";

const ColorMeter = ({ rating }: { rating: number }) => {
  const bgColorBasedOnRating = (rating: number) => {
    if (rating <= 2) {
      return "bg-red-300";
    } else if (rating <= 3) {
      return "bg-yellow-300";
    } else if (rating <= 5) {
      return "bg-green-300";
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="w-20 h-4 bg-gray-200 rounded-full">
          <div
            className={`h-4 rounded-full ${bgColorBasedOnRating(rating)}`}
            style={{ width: `${rating * 20}%` }}
          ></div>
        </div>
        <span className="ml-2 text-gray-700 text-sm">{rating}</span>
      </div>
    </div>
  );
};

export default ColorMeter;
