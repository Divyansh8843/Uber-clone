import React from "react";
import { FaLocationDot } from "react-icons/fa6";
const PanelComponent = ({ setVehicleOpen, setPanelOpen }) => {
  const locations = [
    "ward-03, Kanya Shala Road, Bhind",
    "ward-02, Gnadhi Road, Ambah, Morena (M.P.)",
    "ward-01, Tikoniya Road, Dimani, Morena (M.P.)",
    "ward-01, Baghi Road, Morar, Morena (M.P.)",
  ];
  return (
    <div>
      {/* This is a sample data stored here */}
      {locations.map((location, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 justify-start my-2 border-gray-100 active:border-black  border-2 p-3 rounded-xl"
          onClick={() => {
            setVehicleOpen(true);
            setPanelOpen(false);
          }}
        >
          <h2 className="bg-[#eee] h-8 w-10  flex items-center justify-center rounded-full">
            <FaLocationDot />
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default PanelComponent;
