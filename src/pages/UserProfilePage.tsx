import React from "react";
import { useLoaderData } from "react-router-dom";
import Card from "../components/UI/Card/Card";
import { Patient } from "../general/types";
import male from "../assets/male.svg";

function UserProfilePage() {
  const patient: Patient = JSON.parse(useLoaderData() as string);

  return (
    <Card className="shadow-sm border-0 rounded-4">
      <div className="d-flex justify-content-center">
        <Card className="align-items-start flex-column">
          <img
            src={patient.user?.image || male}
            className="m-2 img-thumbnail rounded-4 shadow-sm"
            style={{ width: 150, height: 150 }}
            alt="doctor"
          />
          <div className="mt-2 fs-5 lead form-control text-start">
            <strong className="fw-bold opacity-75 text-muted lead">Name: </strong>
            {`${patient.user?.firstName} ${patient.user?.lastName}`}
          </div>
          <div className="mt-2 fs-5 lead form-control text-start">
            <strong className="fw-bold opacity-75 text-muted lead">Email: </strong>
            {`${patient.user?.email}`}
          </div>
        </Card>
      </div>
    </Card>
  );
}

export default UserProfilePage;
