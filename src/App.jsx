import { createContext, useEffect, useState } from "react";
import Paths from "./comp/Paths";


export const AppContext = createContext();

export default function App() {
  const [contextValues, setContextValues] = useState({
    fromLocationDescription: false,
    toLocationDescription: false,
    fromLocationCoords: false,
    toLocationCoords: false,
    userGPS: false,
  });

  const updateContext = (newValues) => {
    setContextValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };

  if (navigator.geolocation && !contextValues.userGPS) {
    navigator.geolocation.getCurrentPosition((position) => {
      updateContext({
        userGPS: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    });
  }

  return (
    <AppContext.Provider value={{ ...contextValues, updateContext }}>
      <Paths />
    </AppContext.Provider>
  );
}
