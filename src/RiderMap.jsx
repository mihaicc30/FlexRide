import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import AddressAutocomplete from "./comp/AddressAutocomplete";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const options = {
  disableDefaultUI: true,
  gestureHandling: "greedy",
  zoomControl: true,
  mapTypeControl: false,
};
const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center2 = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

export function RiderMap() {
  let DirectionsService;
  const [userGPS, setUserGPS] = useState(null);
  const [routeTimer, setRouteTimer] = useState(false);
  const nav = useNavigate();
  const [user] = useAuthState(auth);
  const [center, setCenter] = useState(center2);
  const [direction, setDirection] = useState(false);
  const [declaredRoute, setDeclaredRoute] = useState(false);

  const [markers, setMarkers] = useState([
    {
      markerName: "fromLocation",
      // position: fromLocation,
      draggable: true,
      onDrag: (e) => {
        // Handle the drag event
        setMarkers((prevMarkers) => {
          const updatedMarkers = [...prevMarkers];
          const index = updatedMarkers.findIndex(
            (marker) => marker.markerName === "fromLocation"
          );
          updatedMarkers[index].position = {
            lat: parseFloat(String(e.latLng.lat()).substring(0, 10)),
            lng: parseFloat(String(e.latLng.lng()).substring(0, 10)),
          };
          return updatedMarkers;
        });
        checkIfRoute();
      },
      onLoad: (markerInstance) => {
        const customIcon = (opts) =>
          Object.assign(
            {
              path: "M2,1C9.38,1,4,6.38,4,13c0,6.42,10.83,17.25,11.3,17.71C15.49,30.9,15.75,31,16,31s0.51-0.1,0.7-0.29 C17.17,30.25,28,19.42,28,13C28,6.38,22.62,1,16,1z",
              fillColor: "#3498db", // Change the fill color as needed
              fillOpacity: 1,
              strokeColor: "#000",
              strokeWeight: 1,
              scale: 1,
              anchor: new window.google.maps.Point(16, 32),
            },
            opts
          );
        markerInstance.setIcon(
          customIcon({
            fillColor: "blue",
            strokeColor: "white",
          })
        );
      },
      // Add more properties as needed
    },
    {
      markerName: "toLocation",
      // position: toLocation,
      draggable: true,
      onDrag: (e) => {
        // Handle the drag event
        setMarkers((prevMarkers) => {
          const updatedMarkers = [...prevMarkers];
          const index = updatedMarkers.findIndex(
            (marker) => marker.markerName === "toLocation"
          );
          updatedMarkers[index].position = {
            lat: parseFloat(String(e.latLng.lat()).substring(0, 10)),
            lng: parseFloat(String(e.latLng.lng()).substring(0, 10)),
          };
          return updatedMarkers;
        });
        checkIfRoute();
      },
      onLoad: (markerInstance) => {
        const customIcon = (opts) =>
          Object.assign(
            {
              path: "M2,1C9.38,1,4,6.38,4,13c0,6.42,10.83,17.25,11.3,17.71C15.49,30.9,15.75,31,16,31s0.51-0.1,0.7-0.29 C17.17,30.25,28,19.42,28,13C28,6.38,22.62,1,16,1z",
              fillColor: "#FFF", // Set the background color (white)
              fillOpacity: 1,
              strokeColor: "#000000", // Set the border color (black)
              strokeWeight: 1,
              scale: 1,
              anchor: new window.google.maps.Point(16, 32),
            },
            opts
          );
        markerInstance.setIcon(
          customIcon({
            fillColor: "green",
            strokeColor: "white",
          })
        );
      },
      // Add more properties as needed
    },
    {
      markerName: "userGPS",
      // position: userGPS,
      draggable: false,
      onDrag: (e) => {
        return;
      },
      onLoad: (markerInstance) => {
        const customIcon = (opts) =>
          Object.assign(
            {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#3498db", // Change the fill color as needed
              fillOpacity: 1,
              strokeColor: "#000",
              strokeWeight: 1,
              scale: 8,
            },
            opts
          );
        markerInstance.setIcon(
          customIcon({
            fillColor: "green",
            strokeColor: "red",
          })
        );
      },
    },
    // Add more markers if needed
  ]);

  const checkIfRoute = () => {
    console.log("checkIfRoute", fromLocation, toLocation);
    if (
      declaredRoute &&
      fromLocation.lat == declaredRoute?.from.lat &&
      fromLocation.lng == declaredRoute?.from.lng &&
      toLocation.lat == declaredRoute?.to.lat &&
      toLocation.lng == declaredRoute?.to.lng
    ) {
      console.log("NOT CHANGING ROUTE. ITS THE SAME");
    } else {
      console.log("CHANGING ROUTE");
      setDeclaredRoute({ from: fromLocation, to: toLocation });
      DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(fromLocation),
          destination: new window.google.maps.LatLng(toLocation),
          // waypoints: [
          //   { location: new window.google.maps.LatLng(-1.3762847, -48.4239654) }
          // ],
          travelMode: "DRIVING",
          provideRouteAlternatives: true,
          optimizeWaypoints: true,
          drivingOptions: {
            departureTime: new Date(Date.now()), // for the time N milliseconds from now.
            trafficModel: "optimistic",
          },
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        function (response, status) {
          if (status === "OK") {
            setDirection(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  };

  useEffect(() => {
    getLocation("initial");
    checkIfRoute();
  }, []);

  useEffect(() => {
    const routeTimer = setTimeout(checkIfRoute, 1500);
    return () => clearTimeout(routeTimer);
  }, [fromLocation, toLocation]);

  const getLocation = (type) => {
    if (type === "initial") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
        checkIfRoute();
      }
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserGPS({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    }
  };

  useEffect(() => {
    // Set up a timer to update the location every two seconds
    const timerId = setInterval(() => {
      getLocation("refresh");
    }, 2000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  const handlePlaceChanged = (place) => {
    setLocation(place.formatted_address);
    setCenter({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  useEffect(() => {
    if (!user) nav("/");
  }, [user]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_G_API,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  console.log(">>");

  return (
    <>
      <div className="flex flex-col absolute top-0 z-20 left-0 right-0">
        <div className="grid grid-cols-[1fr_10px_1fr] gap-4 m-2 max-h-[32px]">
          <AddressAutocomplete point={"from"} setLocation={setFromLocation} />
          <span className="m-auto">▶</span>
          <AddressAutocomplete point={"to"} setLocation={setToLocation} />
        </div>
      </div>
      <div className={`grow h-[100%]`}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
          options={options}
        >
          {direction && (
            <DirectionsRenderer
              directions={direction}
              options={{
                suppressMarkers: true,
              }}
            />
          )}
          {markers.map((marker, index) => {
            if (marker.markerName === "fromLocation" && fromLocation) {
              return (
                <Marker
                  key={index}
                  draggable={marker.draggable}
                  position={fromLocation}
                  onDrag={marker.onDrag}
                  onLoad={(markerInstance) => marker.onLoad(markerInstance)}
                />
              );
            } else if (marker.markerName === "toLocation" && toLocation) {
              return (
                <Marker
                  key={index}
                  draggable={marker.draggable}
                  position={toLocation}
                  onDrag={marker.onDrag}
                  onLoad={(markerInstance) => marker.onLoad(markerInstance)}
                />
              );
            } else if (marker.markerName === "userGPS" && userGPS) {
              return (
                <Marker
                  key={index}
                  draggable={marker.draggable}
                  position={userGPS}
                  onDrag={marker.onDrag}
                  onLoad={(markerInstance) => marker.onLoad(markerInstance)}
                />
              );
            } else {
              return (
                <Marker
                  key={index}
                  draggable={marker.draggable}
                  position={marker.position}
                  onDrag={marker.onDrag}
                  onLoad={(markerInstance) => marker.onLoad(markerInstance)}
                />
              );
            }
          })}
        </GoogleMap>
      </div>
    </>
  );
}
