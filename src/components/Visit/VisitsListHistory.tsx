import React from "react";
import { Visit } from "../../general/types";
import VISIT_TIME from "../../general/visitTime";
import Card from "../UI/Card/Card";
import Spinner from "../UI/Spinner/Spinner";
import VisitItem from "./VisitItem";

type Props = {
  isLoading: boolean;
  visits: Visit[];
};

function VisitsListHistory({ isLoading, visits }: Props) {
  return (
    <Card className="shadow-sm border-0 my-5">
      <div className="text-center fs-3 fw-bold lead text-muted">History</div>
      <hr />
      {visits.map((visit) => (
        <VisitItem key={crypto.randomUUID()} visit={visit} type={VISIT_TIME.PAST} />
      ))}
      {isLoading && <Spinner />}
    </Card>
  );
}

export default VisitsListHistory;
