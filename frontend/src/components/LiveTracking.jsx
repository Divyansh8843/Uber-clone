import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const LiveTracking = () => {
  const [position, setPosition] = useState(null);
  const intervalRef = useRef(null);

  // Load Google Maps JS API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Set your API key in .env
  });

  // Function to fetch current location
  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Update location every 10 seconds
  useEffect(() => {
    fetchLocation(); // Initial fetch
    intervalRef.current = setInterval(fetchLocation, 10000); // Every 10 seconds

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  if (!isLoaded) return <div>Loading Map...</div>;
  if (!position) return <div>Getting your location...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={16}>
      <Marker position={position} />
    </GoogleMap>
  );
};

export default LiveTracking;
