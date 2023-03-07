import React from "react";
import { Visit } from "../../general/types";
import Card from "../UI/Card/Card";
import VisitItem from "./VisitItem";

type Props = {
  visits: Visit[];
};

function VisitsListIncoming({ visits }: Props) {
  return (
    <Card className="shadow-sm border-0 my-5">
      <div className="text-center fs-3 fw-bold lead text-muted">Incoming</div>
      <hr />
      {visits.map((visit) => (
        <VisitItem key={crypto.randomUUID()} visit={visit} />
      ))}
    </Card>
  );
}

export default VisitsListIncoming;
