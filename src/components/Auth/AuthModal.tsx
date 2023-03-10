import React from "react";
import Modal from "../UI/Modal/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import googleLogo from "../../assets/google.svg";

function AuthModal() {
  return (
    <Modal id="authModal" ariaLabel="authModalLabel">
      <nav className="d-flex justify-content-center align-items-center">
        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
          <button
            className="nav-link d-inline-block active"
            data-bs-toggle="tab"
            id="nav-login-tab"
            data-bs-target="#nav-login"
            type="button"
            role="tab"
            aria-controls="nav-login"
            aria-selected="true"
            value="true"
          >
            Login
          </button>

          <button
            className="nav-link d-inline-block"
            data-bs-toggle="tab"
            id="nav-register-tab"
            data-bs-target="#nav-register"
            type="button"
            role="tab"
            aria-controls="nav-register"
            aria-selected="false"
          >
            Register
          </button>
        </div>
      </nav>

      <hr />

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active p-3" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
          <LoginForm />
        </div>

        <div className="tab-pane fade p-3" id="nav-register" role="tabpanel" aria-labelledby="nav-register-tab">
          <RegisterForm />
        </div>
      </div>
      <div className="d-grid gap-2">
        <a
          className="btn rounded-pill btn-primary text-white mx-1 bg-gradient shadow-sm"
          href={`${import.meta.env.VITE_BACKEND_HOST}/oauth2/authorization/google`}
        >
          <img src={googleLogo} width="18px" height="18px" alt="googleSignIn" /> Sign in with Google
        </a>
      </div>
    </Modal>
  );
}

AuthModal.defaultProps = {
  onClick: null,
};

export default AuthModal;
