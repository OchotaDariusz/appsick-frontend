import React from "react";
import ReactDOM from "react-dom";
import { Outlet, Routes, Route } from "react-router-dom";
import useDomReady from "./hooks/useDomReady";
import Card from "./components/UI/Card/Card";
import AuthModal from "./components/Auth/AuthModal";
import Navbar from "./components/UI/Navbar/Navbar";
import MainBody from "./components/MainBody";

function Video() {
  return (
    <>
      <MainBody />
      <div className="m-5 fs-1 lead d-none d-lg-block">First frontend</div>
      <iframe
        className="d-none d-lg-block mx-auto"
        style={{ maxWidth: 560, maxHeight: 315 }}
        width="560"
        height="315"
        src="https://www.youtube.com/embed/lisbaJT8LfU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </>
  );
}

function App() {
  const isDomReady = useDomReady();

  return (
    <>
      {isDomReady ? ReactDOM.createPortal(<AuthModal />, document.getElementById("auth-modal") as HTMLElement) : null}
      {isDomReady ? ReactDOM.createPortal(<Navbar />, document.getElementById("navbar") as HTMLElement) : null}
      <div className="container-fluid p-3 p-lg-5 mt-2">
        <main>
          <Card className="border-0 shadow-lg rounded-4 text-center">
            <Routes>
              <Route path="/" element={<Video />} />
            </Routes>
            <Outlet />
          </Card>
        </main>
      </div>
    </>
  );
}

export default App;
