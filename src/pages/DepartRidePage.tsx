import React from "react";

import ResearchLayout from "../templates/ResearchLayout";

import RideSelector from "../organisms/RideSelector";
import { MainInfo } from "../molecules/RidesList";

function DepartRidePage() {
  return (
    <div className="App">
      <ResearchLayout>
        <RideSelector
          mainInfo={MainInfo.departure}
          selectorDefaultText="Arrêt de départ"
        />
      </ResearchLayout>
    </div>
  );
}

export default DepartRidePage;
