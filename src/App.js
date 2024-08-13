import React, { useState, useEffect } from "react";
import Mapcomponent from "./components/Mapcomponent";

const App = () => {
  const [vehiclePosition, setVehiclePosition] = useState({ lat: 51.505, lng: -0.09 });
  const [route, setRoute] = useState([{ lat: 51.505, lng: -0.09 }]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehiclePosition((prev) => {
        const newPosition = {
          lat: prev.lat + 0.001,
          lng: prev.lng + 0.001,
        };
        setRoute((prevRoute) => [...prevRoute, newPosition]);
        return newPosition;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return <Mapcomponent vehiclePosition={vehiclePosition} route={route} />;
};

export default App;
