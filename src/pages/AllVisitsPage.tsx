import React from "react";
import Button from "../components/UI/Button";
import { postLoginData, postLogout } from "../general/dataManager";

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
    })
    .catch((err) => console.error(err));
};

function AllVisitsPage() {
  return (
    <div>
      <Button onClick={login}>TryLogin</Button>
      <Button onClick={logout}>TryLogout</Button>
      All Visits Page<Button darkMode>click</Button>
    </div>
  );
}

export default AllVisitsPage;
