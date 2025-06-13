import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
const PanelComponent = ({ setPickup, setDestination, suggestions, active }) => {
  const handleClick = (suggestion) => {
    if (active === "pickup") {
      setPickup(suggestion.description);
    } else if (active === "destination") {
      setDestination(suggestion.description);
    }
  };
  return (
    <div>
      {/* This is a sample data stored here */}
      {suggestions.map((suggestion, idx) => (
        <div
          key={suggestion.place_id || idx}
          className="flex items-center gap-4 justify-start my-2 border-gray-100 active:border-black  border-2 p-3 rounded-xl"
          onClick={() => {
            handleClick(suggestion);
          }}
        >
          <h2 className="bg-[#eee] h-8 w-10  flex items-center justify-center rounded-full">
            <FaLocationDot />
          </h2>
          <h4 className="font-medium">{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default PanelComponent;
