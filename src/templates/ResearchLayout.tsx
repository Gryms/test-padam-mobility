import { FC, PropsWithChildren } from "react";

import Header from "../organisms/Header";

const ResearchLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="Research">
        <div className="Research-box">{children}</div>
      </div>
    </>
  );
};

export default ResearchLayout;
