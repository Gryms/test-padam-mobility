import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ArrivalRidePage from "../pages/ArrivalRidePage";
import DepartRidePage from "../pages/DepartRidePage";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <DepartRidePage /> },
  { path: "/arrival", element: <ArrivalRidePage /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
