export const calculateFare = (timeSeconds, distanceMeters, serviceType, trafficLevel) => {
  const hourlyRate = 20; // £20 per hour
  const distanceRate = 1.5 / 1609.34; // £1.50 per mile converted to meters
  const baseFare = 0; // £0 initial charge

  // Calculate the time rate per second
  const timeRate = hourlyRate / 3600;

  // Service Multiplier based on the type of service
  let serviceMultiplier;
  switch (serviceType) {
    case "basic":
      serviceMultiplier = 1.2;
      break;
    case "7 seater":
      serviceMultiplier = 2;
      break;
    case "premium":
      serviceMultiplier = 1.8;
      break;
    case "lux":
      serviceMultiplier = 2.4;
      break;
    default:
      serviceMultiplier = 1; // Default to 1.0 for unknown service type
  }

  // Traffic Multiplier based on the traffic level
  let trafficMultiplier;
  switch (trafficLevel) {
    case "low":
      trafficMultiplier = 1;
      break;
    case "medium":
      trafficMultiplier = 1.4;
      break;
    case "high":
      trafficMultiplier = 2;
      break;
    default:
      trafficMultiplier = 1; // Default to 1.0 for unknown traffic level
  }

  // Calculate the total fare using the modified formula
  const totalFare = (baseFare + timeRate * timeSeconds) * serviceMultiplier +
    distanceRate * distanceMeters * serviceMultiplier * trafficMultiplier;

  return parseFloat(totalFare.toFixed(2));
};
