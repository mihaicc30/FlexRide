import React, { useEffect, useContext, Suspense } from "react";
import { CiSearch } from "react-icons/ci";
import { AppContext } from "../App";

import { useLoadScript, useJsApiLoader } from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const AddressAutocomplete = ({ point }) => {
  const {
    fromLocationDescription,
    toLocationDescription,
    fromLocationCoords,
    updateContext,
  } = useContext(AppContext);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 500,
  });

  useEffect(() => {
    if (point === "from" && fromLocationDescription) {
      setValue(fromLocationDescription);
      setTimeout(() => {
        clearSuggestions();
      }, 700);
    } else if (point === "to" && toLocationDescription) {
      setValue(toLocationDescription);
      setTimeout(() => {
        clearSuggestions();
      }, 700);
    }
  }, []);

  useEffect(() => {}, [
    fromLocationDescription,
    toLocationDescription,
    fromLocationCoords,
  ]);

  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
    // setValue("")
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    updateContext({
      [`${point}LocationCoords`]: false,
      [`${point}LocationDescription`]: e.target.value,
    });
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        // const { lat, lng } = getLatLng(results[0]);
        // setLocation({ lat, lng });
        updateContext({
          [`${point}LocationCoords`]: getLatLng(results[0]),
          [`${point}LocationDescription`]: description,
        });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="m-1 p-2"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong>
          <small className="pl-2">{secondary_text}</small>
        </li>
      );
    });

  const showFromInput = () => {
    if (
      point === "to" &&
      (fromLocationDescription === "" || !fromLocationDescription) &&
      !fromLocationCoords.lat
    )
      return false;

    return true;
  };

  return (
    <div
      ref={ref}
      className={`relative ${point === "from" ? "animate-fadeLater" : ""} ${
        showFromInput() ? "animate-fadeLater" : "opacity-[0]"
      } flex flex-col w-[97%]`}
    >
      <CiSearch className={`text-xl absolute left-4 top-[18px]`} />
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={`Enter ${point === "from" ? "pickup" : "dropoff"} point`}
        className={`px-12 max-sm:px-8 py-2 rounded-full w-[100%] bg-gray-100 m-2`}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul className="p-2 bg-gray-100/90 overflow-hidden absolute top-[100%] left-0 right-0">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
