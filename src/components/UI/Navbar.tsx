import React from "react";
import { Link, redirect } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm rounded-5">
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-lg-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Visits
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/drugs">
                Drugs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-block d-lg-none" href="#">
                Login | Register
              </a>
            </li>
          </ul>
        </div>
        <span className="navbar-text justify-content-lg-end align-items-lg-baseline d-none d-lg-flex w-25 h-25">
          <Button onClick={() => redirect("/visit/new")}>
            Register New Visit
          </Button>
          Login | Register
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
