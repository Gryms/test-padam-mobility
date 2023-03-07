import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import {
  ApiCallStatus,
  bookRide,
  chooseDepartureStops,
  chooseRide,
  Ride,
  setAvailableRides,
  wipeState,
  fetchAllRides,
  selectorAllRides,
  selectorAllRidesStatus,
  selectorAvailableDepartureStops,
  selectorAvailableRides,
  selectorBooked,
  selectorBookRideStatus,
  selectorError,
  selectorSelectedDepartureStop,
  selectorSelectedRide,
  setAvailableDepartureStops,
  fetchRides,
  fetchDepartureStops,
  selectorAvailableDepartureStopsStatus,
} from "../features/ride/rideSlice";
import { useAppDispatch } from "../app/store";

import Selector from "../molecules/Selector";
import RidesList, { MainInfo } from "../molecules/RidesList";
import Loader from "../atoms/Loader";

const RideSelector: FC<{
  selectorDefaultText: string;
  mainInfo: MainInfo;
}> = ({ selectorDefaultText, mainInfo }) => {
  const dispatch = useAppDispatch();
  const availableDepartureStops = useSelector(selectorAvailableDepartureStops);
  const availableRides = useSelector(selectorAvailableRides);
  const allRides: Ride[] = useSelector(selectorAllRides);
  const selectedDepartureStop = useSelector(selectorSelectedDepartureStop);
  const selectedRide = useSelector(selectorSelectedRide);
  const availableDepartureStopsStatus = useSelector(
    selectorAvailableDepartureStopsStatus
  );
  const allRidesStatus = useSelector(selectorAllRidesStatus);
  const bookRideStatus = useSelector(selectorBookRideStatus);
  const error = useSelector(selectorError);
  const booked = useSelector(selectorBooked);

  useEffect(() => {
    if (mainInfo === MainInfo.arrival) {
      const fetchAvailableDepartureStops = async () => {
        if (allRidesStatus === ApiCallStatus.idle) {
          await dispatch(fetchAllRides());
        }
      };
      fetchAvailableDepartureStops();
      const arrayUniqueByKey = [
        ...new Map(
          allRides.map((item) => [item["arrivalStop"], item])
        ).values(),
      ];
      dispatch(
        setAvailableDepartureStops(
          arrayUniqueByKey.map((ride: Ride) => ride.arrivalStop)
        )
      );
    } else if (
      mainInfo === MainInfo.departure &&
      availableDepartureStopsStatus === ApiCallStatus.idle
    ) {
      dispatch(fetchDepartureStops());
    }
  }, [
    allRides,
    allRidesStatus,
    availableDepartureStopsStatus,
    dispatch,
    mainInfo,
  ]);

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
  } else if (
    allRidesStatus === ApiCallStatus.error ||
    availableDepartureStopsStatus === ApiCallStatus.error
  ) {
    content = <div>{error}</div>;
  } else if (
    allRidesStatus === ApiCallStatus.success ||
    availableDepartureStopsStatus === ApiCallStatus.success
  ) {
    content = (
      <div>
        {!booked ? (
          <>
            <Selector
              defaultToggleText={selectorDefaultText}
              items={availableDepartureStops}
              selectedItem={selectedDepartureStop}
              setSelectedItem={(selectedItem) => {
                if (mainInfo === MainInfo.arrival) {
                  dispatch(chooseDepartureStops(selectedItem));
                  const arrayAvailableRides = allRides.filter(
                    (obj) => obj.arrivalStop === selectedItem
                  );
                  dispatch(setAvailableRides(arrayAvailableRides));
                } else {
                  dispatch(chooseDepartureStops(selectedItem));
                  dispatch(fetchRides(selectedItem));
                }
              }}
            />
            <Collapse in={!!selectedDepartureStop}>
              <div id="collapseList">
                <RidesList
                  mainInfo={mainInfo}
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

export default RideSelector;
