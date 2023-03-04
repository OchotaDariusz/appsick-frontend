import React from "react";
import { postLoginData, postLogout } from "../../general/dataManager";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";

function LoginForm() {
  const login = () => {
    postLoginData({ email: "aaa@aaa", password: "aaa@aaa" })
      .then((data) => {
        console.log(`logged in, data: ${data}`);
        console.log(data);
      })
      .catch((err) => console.error(err));
  };
  return <Button onClick={login}>TryLogin</Button>;
}

function RegisterForm() {
  return <p>register</p>;
}

function AuthModal() {
  const logout = () => {
    postLogout()
      .then(() => {
        console.log("logged out");
        window.location.reload();
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
      <Button onClick={logout}>Logout</Button>
    </Modal>
  );
}

AuthModal.defaultProps = {
  onClick: null,
};

export default AuthModal;
