import React from "react";

import ResearchLayout from "../templates/ResearchLayout";

import RideSelector from "../organisms/RideSelector";
import { MainInfo } from "../molecules/RidesList";

function ArrivalRidePage() {
  return (
    <div className="App">
      <ResearchLayout>
        <RideSelector
          mainInfo={MainInfo.arrival}
          selectorDefaultText="Arrêt d'arrivé"
        />
      </ResearchLayout>
    </div>
  );
}

export default ArrivalRidePage;
