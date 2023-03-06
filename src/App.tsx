import React from "react";
import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import useDomReady from "./hooks/useDomReady";
import Card from "./components/UI/Card/Card";
import AuthModal from "./components/Auth/AuthModal";
import Navbar from "./components/UI/Navbar/Navbar";

function App() {
  const isDomReady = useDomReady();

  return (
    <>
      {/* TODO: hide this when logged in and show when logged out(create elemnt must be first before state change) */}
      {isDomReady ? ReactDOM.createPortal(<AuthModal />, document.getElementById("auth-modal") as HTMLElement) : null}
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
