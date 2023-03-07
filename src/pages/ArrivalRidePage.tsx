import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import ResearchLayout from "../templates/ResearchLayout";
import { useAppDispatch } from "../app/store";
import {
  ApiCallStatus,
  fetchAllRides,
  Ride,
  selectorAllRides,
  selectorAllRidesStatus,
  selectorAvailableDepartureStops,
  selectorAvailableRides,
  selectorAvailableRidesStatus,
  selectorBooked,
  selectorBookRideStatus,
  selectorError,
  selectorSelectedDepartureStop,
  selectorSelectedRide,
  setAvailableDepartureStops,
} from "../features/ride/rideSlice";

import ArrivalRideSelector from "../organisms/ArrivalRideSelector";

function ArrivalRidePage() {
  const availableDepartureStops = useSelector(selectorAvailableDepartureStops);
  const dispatch = useAppDispatch();
  const availableRides = useSelector(selectorAvailableRides);
  const allRides = useSelector(selectorAllRides);
  const selectedDepartureStop = useSelector(selectorSelectedDepartureStop);
  const selectedRide = useSelector(selectorSelectedRide);
  const allRidesStatus = useSelector(selectorAllRidesStatus);
  const bookRideStatus = useSelector(selectorBookRideStatus);
  const error = useSelector(selectorError);
  const booked = useSelector(selectorBooked);

  useEffect(() => {
    const fetchAvailableDepartureStops = async () => {
      if (allRidesStatus === ApiCallStatus.idle) {
        await dispatch(fetchAllRides());
      }
    };
    fetchAvailableDepartureStops();
    const arrayUniqueByKey = [
      ...new Map(allRides.map((item) => [item["arrivalStop"], item])).values(),
    ];
    dispatch(
      setAvailableDepartureStops(
        arrayUniqueByKey.map((ride: Ride) => ride.arrivalStop)
      )
    );
  }, [allRides, allRidesStatus, dispatch]);

  return (
    <div className="App">
      <ResearchLayout>
        <ArrivalRideSelector
          selectorDefaultText="Où souhaitez-vous arriver ?"
          availableDepartureStops={availableDepartureStops}
          availableRides={availableRides}
          allRides={allRides}
          selectedDepartureStop={selectedDepartureStop}
          selectedRide={selectedRide}
          allRidesStatus={allRidesStatus}
          bookRideStatus={bookRideStatus}
          error={error}
          booked={booked}
        />
      </ResearchLayout>
    </div>
  );
}

export default ArrivalRidePage;
