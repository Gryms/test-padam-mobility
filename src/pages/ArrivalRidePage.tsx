import React, { useEffect } from "react";

import ResearchLayout from "../templates/ResearchLayout";
import RideSelector from "../organisms/RideSelector";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import {
  ApiCallStatus,
  fetchDepartureStops,
  selectorAvailableDepartureStops,
  selectorAvailableDepartureStopsStatus,
  selectorAvailableRides,
  selectorAvailableRidesStatus,
  selectorBooked,
  selectorBookRideStatus,
  selectorError,
  selectorSelectedDepartureStop,
  selectorSelectedRide,
} from "../features/ride/rideSlice";

function DepartRidePage() {
  const dispatch = useAppDispatch();
  const availableDepartureStops = useSelector(selectorAvailableDepartureStops);
  const availableRides = useSelector(selectorAvailableRides);
  const selectedDepartureStop = useSelector(selectorSelectedDepartureStop);
  const selectedRide = useSelector(selectorSelectedRide);
  const availableDepartureStopsStatus = useSelector(
    selectorAvailableDepartureStopsStatus
  );
  const availableRidesStatus = useSelector(selectorAvailableRidesStatus);
  const bookRideStatus = useSelector(selectorBookRideStatus);
  const error = useSelector(selectorError);
  const booked = useSelector(selectorBooked);

  useEffect(() => {
    if (availableDepartureStopsStatus === ApiCallStatus.idle) {
      dispatch(fetchDepartureStops());
    }
  }, [availableDepartureStopsStatus, dispatch]);

  return (
    <div className="App">
      <ResearchLayout>
        <RideSelector
          availableDepartureStops={availableDepartureStops}
          availableRides={availableRides}
          selectedDepartureStop={selectedDepartureStop}
          selectedRide={selectedRide}
          availableDepartureStopsStatus={availableDepartureStopsStatus}
          availableRidesStatus={availableRidesStatus}
          bookRideStatus={bookRideStatus}
          error={error}
          booked={booked}
        />
      </ResearchLayout>
    </div>
  );
}

export default DepartRidePage;
