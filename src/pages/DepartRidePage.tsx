import React from "react";

import ResearchLayout from "../templates/ResearchLayout";
import RideSelector from "../organisms/RideSelector";

function DepartRidePage() {
  return (
    <div className="App">
      <ResearchLayout>
        <RideSelector />
      </ResearchLayout>
    </div>
  );
}

export default DepartRidePage;
