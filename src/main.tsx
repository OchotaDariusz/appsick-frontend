import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import loader from "./general/loader";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import AllVisitsPage from "./pages/AllVisitsPage";
import VisitPage from "./pages/VisitPage";
import VisitChatHistoryPage from "./pages/VisitChatHistoryPage";
import VisitRegisterPage from "./pages/VisitRegisterPage";
import PatientVisitsHistoryPage from "./pages/PatientVisitsHistoryPage";
import UserProfilePage from "./pages/UserProfilePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "visit",
        loader,
        element: <AllVisitsPage />,
      },
      {
        path: "visit/:visitId",
        loader,
        element: <VisitPage />,
      },
      {
        path: "visit/:visitId/history",
        loader,
        element: <VisitChatHistoryPage />,
      },
      {
        path: "visit/new",
        element: <VisitRegisterPage />,
      },
      {
        path: "patient/:patientId/visits",
        loader,
        element: <PatientVisitsHistoryPage />,
      },
      {
        path: "profile",
        loader,
        element: <UserProfilePage />,
      },
      {
        path: "about",
        element: <AboutUsPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
