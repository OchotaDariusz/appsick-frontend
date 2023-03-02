import React from "react";
import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import Card from "./components/UI/Card";
import Navbar from "./components/UI/Navbar";
import "./App.scss";

function App() {
  return (
    <>
      {ReactDOM.createPortal(
        <Navbar />,
        document.getElementById("navbar") as HTMLElement
      )}
      <div className="App">
        <Card className="border-0 shadow-lg">
          <Outlet />
        </Card>
      </div>
    </>
  );
}

export default App;
