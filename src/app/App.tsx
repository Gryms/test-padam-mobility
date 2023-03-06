import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DepartRidePage from "../pages/DepartRidePage";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <DepartRidePage /> },
  { path: "/arrival", element: <DepartRidePage /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
