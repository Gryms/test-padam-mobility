import { FC } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import Selector from "../molecules/Selector";
import RidesList, { MainInfo } from "../molecules/RidesList";
import Loader from "../atoms/Loader";
import {
  ApiCallStatus,
  bookRide,
  chooseDepartureStops,
  chooseRide,
  Ride,
  setAvailableRides,
  wipeState,
} from "../features/ride/rideSlice";
import { useAppDispatch } from "../app/store";

type ArrivalRideSelectorProps = {
  selectorDefaultText: string;
  availableDepartureStops: string[];
  availableRides: Ride[];
  allRides: Ride[];
  selectedDepartureStop: string;
  selectedRide: Ride;
  allRidesStatus: ApiCallStatus;
  bookRideStatus: ApiCallStatus;
  error: string | null;
  booked: boolean;
};

const ArrivalRideSelector: FC<ArrivalRideSelectorProps> = ({
  selectorDefaultText,
  availableDepartureStops,
  availableRides,
  allRides,
  selectedDepartureStop,
  selectedRide,
  allRidesStatus,
  bookRideStatus,
  error,
  booked,
}) => {
  const dispatch = useAppDispatch();

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
    allRidesStatus === ApiCallStatus.loading ||
    bookRideStatus === ApiCallStatus.loading
  ) {
    content = <Loader variant="light" />;
  } else if (allRidesStatus === ApiCallStatus.error) {
    content = <div>{error}</div>;
  } else if (allRidesStatus === ApiCallStatus.success) {
    content = (
      <div>
        {!booked ? (
          <>
            <Selector
              defaultToggleText={selectorDefaultText}
              items={availableDepartureStops}
              selectedItem={selectedDepartureStop}
              setSelectedItem={(selectedItem) => {
                dispatch(chooseDepartureStops(selectedItem));
                const arrayAvailableRides = allRides.filter(
                  (obj) => obj.arrivalStop === selectedItem
                );
                dispatch(setAvailableRides(arrayAvailableRides));
              }}
            />
            <Collapse in={!!selectedDepartureStop}>
              <div id="collapseList">
                <RidesList
                  mainInfo={MainInfo.departure}
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

export default ArrivalRideSelector;
