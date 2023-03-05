import React from "react";
import logo from "../../../assets/logo.svg";
import Button from "../Button/Button";
import "./Navbar.scss";

function Navbar() {
  return (
    <nav role="navigation" className="navbar navbar-expand-lg bg-light shadow-sm rounded-5">
      <div className="container-fluid">
        <a className="navbar-brand w-25" href="/">
          <img className="w-50 h-25" src={logo} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse text-center justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/visit">
                Visits
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/drugs">
                Drugs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            <div className="d-grid gap-2 d-block d-lg-none">
              <li className="nav-item">
                <Button modalTarget="#visitEndModal" className="btn-danger nav-link mx-auto w-100 bg-gradient">
                  End Visit
                </Button>
              </li>
              <li className="nav-item">
                <a href="/visit/new" className="btn btn-primary text-white nav-link bg-gradient">
                  Register New Visit
                </a>
              </li>
              <li className="nav-item">
                <Button
                  id="login-btn-sm"
                  modalTarget="#authModal"
                  className="btn-secondary nav-link mx-auto w-100 bg-gradient"
                >
                  Login | Register
                </Button>
              </li>
            </div>
          </ul>
        </div>
        <span className="navbar-text justify-content-lg-end align-items-lg-baseline d-none d-lg-flex w-25 h-25">
          <Button modalTarget="#visitEndModal" className="btn-danger bg-gradient shadow-sm hover-glow">
            End Visit
          </Button>
          <a href="/visit/new" className="btn btn-primary text-white bg-gradient shadow-sm hover-glow">
            Register New Visit
          </a>
          <Button id="login-btn-lg" modalTarget="#authModal" className="btn-secondary bg-gradient shadow-sm hover-glow">
            Login | Register
          </Button>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
