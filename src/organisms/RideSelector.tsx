import { FC, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../app/store";
import {
  ApiCallStatus,
  bookRide,
  chooseDepartureStops,
  chooseRide,
  fetchDepartureStops,
  Ride,
  selectorAvailableDepartureStopsStatus,
  selectorAvailableDepartureStops,
  selectorAvailableRides,
  selectorSelectedDepartureStop,
  selectorSelectedRide,
  selectorError,
  fetchRides,
  selectorAvailableRidesStatus,
  selectorBooked,
  selectorBookRideStatus,
  wipeState,
} from "../features/ride/rideSlice";

import Selector from "../molecules/Selector";
import List from "../molecules/RidesList";
import Loader from "../atoms/Loader";

const RideSelector: FC = () => {
  const dispatch = useAppDispatch();
  const availableDepartureStops = useSelector(selectorAvailableDepartureStops);
  const availableRides = useSelector(selectorAvailableRides);
  const currentDepartureStop = useSelector(selectorSelectedDepartureStop);
  const currentRide = useSelector(selectorSelectedRide);
  const availableDepartureStopsStatus = useSelector(
    selectorAvailableDepartureStopsStatus
  );
  const availableRidesStatus = useSelector(selectorAvailableRidesStatus);
  const bookRideStatus = useSelector(selectorBookRideStatus);
  const error = useSelector(selectorError);
  const booked = useSelector(selectorBooked);
  let content: JSX.Element | null = null;

  useEffect(() => {
    if (availableDepartureStopsStatus === ApiCallStatus.idle) {
      dispatch(fetchDepartureStops());
    }
  }, [availableDepartureStopsStatus, dispatch]);

  const handleSelectRide = (ride: Ride) => {
    dispatch(chooseRide(ride));
  };

  const handleSubmit = () => {
    if (currentRide?.id) {
      dispatch(bookRide(currentRide.id.toString()));
    }
  };

  if (
    availableDepartureStopsStatus === ApiCallStatus.loading ||
    bookRideStatus === ApiCallStatus.loading
  ) {
    content = <Loader variant="light" />;
  } else if (availableDepartureStopsStatus === ApiCallStatus.error) {
    content = <div>{error}</div>;
  } else if (availableDepartureStopsStatus === ApiCallStatus.success) {
    content = (
      <div className="RideSelector">
        {!booked ? (
          <>
            <Selector
              defaultToggleText="D'où souhaitez-vous partir ?"
              items={availableDepartureStops}
              selectedItem={currentDepartureStop}
              setSelectedItem={(selectedItem) => {
                dispatch(chooseDepartureStops(selectedItem));
                dispatch(fetchRides(selectedItem));
              }}
            />
            <Collapse
              in={
                ![ApiCallStatus.loading, ApiCallStatus.idle].includes(
                  availableRidesStatus
                )
              }
            >
              <div id="collapseList">
                <List
                  availableRides={availableRides}
                  currentRide={currentRide}
                  handleSelectRide={handleSelectRide}
                />
                <Button onClick={handleSubmit}>Réserver mon trajet</Button>
              </div>
            </Collapse>
          </>
        ) : (
          <div className="RideSelector-confirmation">
            <b className="RideSelector-confirmation-text">
              Nous avons bien enregistré votre réservation.
              <br />
              Merci de votre confiance et à bientôt !
            </b>
            <Button onClick={() => dispatch(wipeState())}>
              Réserver un autre trajet
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <section>{content}</section>
    </>
  );
};

export default RideSelector;
