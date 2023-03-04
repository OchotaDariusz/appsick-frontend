import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import useDomReady from "./hooks/useDomReady";
import Card from "./components/UI/Card/Card";
import AuthModal from "./components/Auth/AuthModal";
import VisitRegisterModal from "./components/Visit/VisitRegisterModal";
import VisitEndModal from "./components/Visit/VisitEndModal";
import Navbar from "./components/UI/Navbar/Navbar";
import { apiCalendar } from "./general/utils";

function App() {
  const isDomReady = useDomReady();

  useEffect(() => {
    apiCalendar.handleAuthClick();
  }, []);

  return (
    <>
      {/* TODO: hide this when logged in and show when logged out(create elemnt must be first before state change) */}
      {isDomReady ? ReactDOM.createPortal(<AuthModal />, document.getElementById("auth-modal") as HTMLElement) : null}
      {/* TODO: hide this when NOT logged in */}
      {isDomReady
        ? ReactDOM.createPortal(<VisitRegisterModal />, document.getElementById("visit-register-modal") as HTMLElement)
        : null}
      {/* TODO: hide this when NOT logged in */}
      {isDomReady
        ? ReactDOM.createPortal(<VisitEndModal />, document.getElementById("visit-end-modal") as HTMLElement)
        : null}
      {isDomReady ? ReactDOM.createPortal(<Navbar />, document.getElementById("navbar") as HTMLElement) : null}
      <div className="container-fluid p-3 p-lg-5 mt-2">
        <main>
          <Card className="border-0 shadow-lg rounded-4">
            <Outlet />
          </Card>
        </main>
      </div>
    </>
  );
}

export default App;
