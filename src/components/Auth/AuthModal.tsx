import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../reducers/store";
import { postLogout } from "../../general/dataManager";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { closeModal } from "../../general/utils";

function AuthModal() {
  const navigate = useNavigate();
  const authDispatch = useAppDispatch();

  const signOut = () => {
    postLogout()
      .then(() => {
        authDispatch(logout());
        closeModal();
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

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

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active p-3" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
          <LoginForm />
        </div>

        <div className="tab-pane fade p-3" id="nav-register" role="tabpanel" aria-labelledby="nav-register-tab">
          <RegisterForm />
        </div>
      </div>
      <Button onClick={signOut}>Logout</Button>
    </Modal>
  );
}

AuthModal.defaultProps = {
  onClick: null,
};

export default AuthModal;
