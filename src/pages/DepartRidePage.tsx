import React from "react";

import ResearchLayout from "../templates/ResearchLayout";

import DepartureRideSelector from "../organisms/DepartureRideSelector";

function DepartRidePage() {
  return (
    <div className="App">
      <ResearchLayout>
        <DepartureRideSelector
          selectorDefaultText="Arrêt de départ"
        />
      </ResearchLayout>
    </div>
  );
}

export default DepartRidePage;
