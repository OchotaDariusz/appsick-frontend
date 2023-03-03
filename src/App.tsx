import React from "react";
import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import Card from "./components/UI/Card";
import AuthModal from "./components/Auth/AuthModal";
import VisitRegisterModal from "./components/Visit/VisitRegisterModal";
import VisitEndModal from "./components/Visit/VisitEndModal";
import Navbar from "./components/UI/Navbar";
import "./App.scss";

function App() {
  return (
    <>
      {
        ReactDOM.createPortal(
          <AuthModal />,
          document.getElementById("auth-modal") as HTMLElement
        ) /* TODO: hide this when logged in and show when logged out(create elemnt must be first before state change) */
      }
      {
        ReactDOM.createPortal(
          <VisitRegisterModal />,
          document.getElementById("visit-register-modal") as HTMLElement
        ) /* TODO: hide this when NOT logged in */
      }
      {
        ReactDOM.createPortal(
          <VisitEndModal />,
          document.getElementById("visit-end-modal") as HTMLElement
        ) /* TODO: hide this when NOT logged in */
      }
      {ReactDOM.createPortal(<Navbar />, document.getElementById("navbar") as HTMLElement)}
      <div className="App">
        <Card className="border-0 shadow-lg rounded-4">
          <Outlet />
        </Card>
      </div>
    </>
  );
}

export default App;
