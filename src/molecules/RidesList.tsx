import { FC } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { Ride } from "../features/ride/rideSlice";

type RidesListProps = {
  availableRides: Ride[];
  currentRide: Ride;
  handleSelectRide: (ride: Ride) => void;
};

const RidesList: FC<RidesListProps> = ({
  availableRides,
  currentRide,
  handleSelectRide,
}) => {
  const timeOptions = { hour: "2-digit", minute: "2-digit" } as const;

  return (
    <ListGroup className="RideSelector-list">
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
          <div
          className="RideSelector-list-time"
          >
            {new Date(item.departureTime).toLocaleTimeString(
              "fr-FR",
              timeOptions
            )}{" "}
            -{" "}
            {new Date(item.arrivalTime).toLocaleTimeString(
              "fr-FR",
              timeOptions
            )}
          </div>{" "}
          <b
            className="RideSelector-list-stop"
          >
            {item.arrivalStop}
          </b>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default RidesList;
