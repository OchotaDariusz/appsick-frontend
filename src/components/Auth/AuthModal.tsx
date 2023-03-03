import React from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { postLoginData, postLogout } from "../../general/dataManager";

const login = () => {
  postLoginData({ email: "aaa@aaa", password: "aaa@aaa" })
    .then((data) => {
      console.log(`logged in, data: ${data}`);
      console.log(data);
    })
    .catch((err) => console.error(err));
};

const logout = () => {
  postLogout()
    .then(() => {
      console.log("logged out");
      window.location.reload();
    })
    .catch((err) => console.error(err));
};

function AuthModal() {
  const onClick = () => {
    console.log("onClick");
  };

  return (
    <Modal id="authModal" ariaLabel="authModalLabel" onClick={onClick}>
      <p>AUTH MODAL</p>
      <Button onClick={login}>TryLogin</Button>
      <Button onClick={logout}>TryLogout</Button>
    </Modal>
  );
}

AuthModal.defaultProps = {
  onClick: null,
};

export default AuthModal;
