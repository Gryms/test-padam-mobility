import { FC } from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader: FC<{ variant?: string }> = ({ variant }) => {
  return (
    <>
      <Spinner animation="border" role="status" variant={variant}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default Loader;
