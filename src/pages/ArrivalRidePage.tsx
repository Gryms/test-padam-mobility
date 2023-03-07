import React from "react";

import ResearchLayout from "../templates/ResearchLayout";

import ArrivalRideSelector from "../organisms/ArrivalRideSelector";

function ArrivalRidePage() {
  return (
    <div className="App">
      <ResearchLayout>
        <ArrivalRideSelector selectorDefaultText="Arrêt d'arrivé" />
      </ResearchLayout>
    </div>
  );
}

export default ArrivalRidePage;
