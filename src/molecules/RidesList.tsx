import { FC } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { Ride } from "../features/ride/rideSlice";

export enum MainInfo {
  departure = "departure",
  arrival = "arrival",
}

type RidesListProps = {
  availableRides: Ride[];
  currentRide: Ride;
  handleSelectRide: (ride: Ride) => void;
  mainInfo: MainInfo;
};

const RidesList: FC<RidesListProps> = ({
  availableRides,
  currentRide,
  handleSelectRide,
  mainInfo,
}) => {
  const timeOptions = {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  } as const;

  return (
    <ListGroup className="RideSelector-list" variant="flush">
      {availableRides.map((item, index) => (
        <ListGroup.Item
          key={item.id}
          active={item.id === currentRide.id}
          action
          onClick={() => {
            handleSelectRide(item);
          }}
          style={{
            display: "flex",
            borderRadius:
              index === 0
                ? "15px 15px 0 0"
                : index === availableRides.length - 1
                ? "0 0 15px 15px"
                : "0px",
          }}
        >
          <div className="RideSelector-list-time">
            {new Date(item.departureTime).toLocaleString("fr-FR", timeOptions)}{" "}
            - {new Date(item.arrivalTime).toLocaleString("fr-FR", timeOptions)}
          </div>{" "}
          <b className="RideSelector-list-stop">
            {mainInfo === MainInfo.arrival
              ? item.arrivalStop
              : item.departureStop}
          </b>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default RidesList;
