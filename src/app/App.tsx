import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

import ArrivalRidePage from "../pages/ArrivalRidePage";
import DepartRidePage from "../pages/DepartRidePage";

import "./App.css";

type RouteError = {
  status: number;
  statusText: string;
  data: string;
};

const ErrorBoundary = () => {
  const error = useRouteError() as RouteError;
  return (
    <>
      <h1>{error.status}</h1>
      <h3>{error.statusText}</h3>
      <p>{error.data}</p>
    </>
  );
};

const router = createBrowserRouter([
  { path: "/", element: <DepartRidePage />, errorElement: <ErrorBoundary /> },
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
