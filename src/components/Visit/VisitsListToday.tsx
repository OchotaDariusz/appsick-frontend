import React from "react";
import { Visit } from "../../general/types";
import Card from "../UI/Card/Card";
import Spinner from "../UI/Spinner/Spinner";
import VisitItem from "./VisitItem";

type Props = {
  isLoading: boolean;
  visits: Visit[];
};

function VisitsListToday({ isLoading, visits }: Props) {
  return (
    <Card className="shadow border-0 my-5">
      <div className="text-center fs-2 fw-bold lead">Today</div>
      <hr />
      {visits.map((visit) => (
        <VisitItem key={crypto.randomUUID()} visit={visit} />
      ))}
      {isLoading && <Spinner />}
    </Card>
  );
}

export default VisitsListToday;
