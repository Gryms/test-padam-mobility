import { FC, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { useSelector } from "react-redux";

import Selector from "../molecules/Selector";
import RidesList, { MainInfo } from "../molecules/RidesList";
import Loader from "../atoms/Loader";
import {
  ApiCallStatus,
  bookRide,
  chooseDepartureStops,
  chooseRide,
  fetchRides,
  Ride,
  wipeState,
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
import { useAppDispatch } from "../app/store";

const DepartureRideSelector: FC<{ selectorDefaultText: string }> = ({
  selectorDefaultText,
}) => {
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

  let content: JSX.Element | null = null;

  const handleSelectRide = (ride: Ride) => {
    dispatch(chooseRide(ride));
  };

  const handleSubmit = () => {
    if (selectedRide?.id) {
      dispatch(bookRide(selectedRide.id.toString()));
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
              defaultToggleText={selectorDefaultText}
              items={availableDepartureStops}
              selectedItem={selectedDepartureStop}
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
                <RidesList
                  mainInfo={MainInfo.arrival}
                  availableRides={availableRides}
                  currentRide={selectedRide}
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

export default DepartureRideSelector;
