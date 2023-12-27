import { IoChevronBackOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import { AppContext } from "./App";
import {
  GoogleMap,
  useLoadScript,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import RiderServicesInfo from "./comp/RiderServicesInfo";

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

export function RiderServices() {
  const [mapsLoaded, setMapsLoaded] = useState(true);
  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Dynamically import the Google Maps API
        await import("@react-google-maps/api");

        // Set the loaded state to true
        setMapsLoaded(true);
      } catch (error) {
        console.error("Error loading Google Maps API:", error);
      }
    };

    // Call the function to load Google Maps API
    loadGoogleMaps();
  }, []);

  const nav = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) nav("/");
  }, [user]);

  console.log("loading");
  const { userGPS, fromLocationCoords, toLocationCoords, updateContext } =
    useContext(AppContext);

  const routeTimerCheck = useRef(null);
  const [declaredRoute, setDeclaredRoute] = useState(false);
  const [direction, setDirection] = useState(false);

  const [bounds, setBounds] = useState({
    north: Math.max(fromLocationCoords.lat, toLocationCoords.lat, userGPS.lat || fromLocationCoords.lat),
    south: Math.min(fromLocationCoords.lat, toLocationCoords.lat, userGPS.lat || fromLocationCoords.lat),
    east: Math.max(fromLocationCoords.lng, toLocationCoords.lng, userGPS.lng || toLocationCoords.lng),
    west: Math.min(fromLocationCoords.lng, toLocationCoords.lng, userGPS.lng || toLocationCoords.lng),
  });

  const getLocation = (type) => {
    if (type === "refresh") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          updateContext({
            userGPS: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          return {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
      }
    }
  };

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(mapz) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const boundsz = new window.google.maps.LatLngBounds(bounds);
    mapz.fitBounds(bounds, { zoom: 15 });

    setMap(mapz);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //temp disabled -- to get user gps refreshed
  useEffect(() => {
    // Set up a timer to update the location every two seconds
    const timerId = setInterval(() => {
      getLocation("refresh");
    }, 2000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  const [markers, setMarkers] = useState([
    {
      markerName: "fromLocation",
      // position: fromLocation,
      draggable: true,
      onDrag: (e) => {
        // Handle the drag event
        updateContext({
          fromLocationCoords: {
            lat: parseFloat(String(e.latLng.lat()).substring(0, 10)),
            lng: parseFloat(String(e.latLng.lng()).substring(0, 10)),
          },
        });
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
        updateContext({
          toLocationCoords: {
            lat: parseFloat(String(e.latLng.lat()).substring(0, 10)),
            lng: parseFloat(String(e.latLng.lng()).substring(0, 10)),
          },
        });
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

  const declaredRouteIsNotTheSame = () => {
    if (!declaredRoute) {
      return true;
    }
    return (
      declaredRoute.from.lat !== fromLocationCoords.lat ||
      declaredRoute.from.lng !== fromLocationCoords.lng ||
      declaredRoute.to.lat !== toLocationCoords.lat ||
      declaredRoute.to.lng !== toLocationCoords.lng
    );
  };

  const getRouting = () => {
    // return;
    const walkingToFromDirectionsService =
      new window.google.maps.DirectionsService();
    const drivingDirectionsService = new window.google.maps.DirectionsService();

    // Request for driving directions from fromLocationCoords to toLocationCoords
    drivingDirectionsService.route(
      {
        origin: new window.google.maps.LatLng(fromLocationCoords),
        destination: new window.google.maps.LatLng(toLocationCoords),
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
        optimizeWaypoints: true,
        drivingOptions: {
          departureTime: new Date(Date.now()), // for the time N milliseconds from now.
          trafficModel: "pessimistic",
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      function (drivingResponse, drivingStatus) {
        if (drivingStatus === "OK") {
          console.log("Driving Directions:", drivingResponse);
          if (userGPS) {
            // Request for walking directions from userGPS to fromLocationCoords
            walkingToFromDirectionsService.route(
              {
                origin: new window.google.maps.LatLng(userGPS),
                destination: new window.google.maps.LatLng(fromLocationCoords),
                travelMode: "WALKING",
                unitSystem: google.maps.UnitSystem.IMPERIAL,
              },
              function (walkingToFromResponse, walkingToFromStatus) {
                if (walkingToFromStatus === "OK") {
                  console.log(
                    "Walking Directions (UserGPS to From):",
                    walkingToFromResponse
                  );

                  setDirection([walkingToFromResponse, drivingResponse]);
                  setDeclaredRoute({
                    from: fromLocationCoords,
                    to: toLocationCoords,
                  });
                } else {
                  window.alert(
                    "Walking directions request failed due to " +
                      walkingToFromStatus
                  );
                }
              }
            );
          } else {
            setDirection([false, drivingResponse]);
            setDeclaredRoute({
              from: fromLocationCoords,
              to: toLocationCoords,
            });
          }
        } else {
          window.alert(
            "Driving directions request failed due to " + drivingStatus
          );
        }
      }
    );
  };

  if (fromLocationCoords && toLocationCoords && declaredRouteIsNotTheSame()) {
    clearTimeout(routeTimerCheck.current);
    routeTimerCheck.current = setTimeout(getRouting, 1500);
  }

  let directionsServiceOptions = {
    destination: toLocationCoords,
    origin: fromLocationCoords,
    travelMode: "DRIVING",
  };

  return (
    <>
      <button
        onClick={() => {
          nav("/home");
        }}
        className="absolute top-[10px] left-[10px] bg-white rounded-xl p-[10px] z-10 border-2 border-black"
      >
        <IoChevronBackOutline className="text-3xl" />
      </button>
      {mapsLoaded && (
        <>
          <div className={`grow h-[100%]`}>
            <GoogleMap
              options={options}
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {direction && userGPS && (
                <DirectionsService
                  directions={direction[0]} // Show walking directions from userGPS to fromLocationCoords
                  options={directionsServiceOptions}
                />
              )}

              {direction && userGPS && (
                <DirectionsRenderer
                  directions={direction[0]} // Show walking directions from userGPS to fromLocationCoords
                  options={{
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeOpacity: 0,
                      strokeColor: "#0000ff8c",
                      icons: [
                        {
                          icon: {
                            path: "M 0,-1 0,1",
                            strokeOpacity: 1,
                            scale: 5,
                          },
                          offset: "0",
                          repeat: "26px",
                        },
                      ],
                    },
                  }}
                />
              )}

              {direction && (
                <DirectionsService
                  directions={direction[1]} // Show driving directions from fromLocationCoords to toLocationCoords
                  options={directionsServiceOptions}
                />
              )}

              {direction && (
                <DirectionsRenderer
                  directions={direction[1]} // Show driving directions from fromLocationCoords to toLocationCoords
                  options={{
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeOpacity: 1,
                      strokeColor: "blue", // Set the color to blue
                      strokeWeight: 2, // Adjust the thickness of the line
                    },
                  }}
                />
              )}

              {markers.map((marker, index) => {
                if (
                  marker.markerName === "fromLocation" &&
                  fromLocationCoords
                ) {
                  return (
                    <Marker
                      key={index}
                      draggable={marker.draggable}
                      position={fromLocationCoords}
                      onDrag={marker.onDrag}
                      onLoad={(markerInstance) => marker.onLoad(markerInstance)}
                    />
                  );
                } else if (
                  marker.markerName === "toLocation" &&
                  toLocationCoords
                ) {
                  return (
                    <Marker
                      key={index}
                      draggable={marker.draggable}
                      position={toLocationCoords}
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
          {direction && <RiderServicesInfo direction={direction} />}
        </>
      )}
    </>
  );
}
