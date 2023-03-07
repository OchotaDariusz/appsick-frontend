import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card/Card";
import VisitItem from "../components/Visit/VisitItem";
import { Visit } from "../general/types";
import { formatVisitDate } from "../general/utils";
import visitList from "../mocks/dummyVisit";

function AllVisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  useEffect(() => {
    const visitsToSet = visitList.map((visit) => formatVisitDate(visit) as Visit);
    setVisits(visitsToSet);
  }, [setVisits]);

  return (
    <>
      <Card className="shadow border-0 my-5">
        <div className="text-center fs-2 fw-bold lead">Today</div>
        <hr />
        {visits.map((visit) => (
          <VisitItem key={visit.visitId} visit={visit} />
        ))}
      </Card>

      <nav className="d-flex justify-content-center align-items-center">
        <div className="nav nav-tabs nav-fill" id="nav-visits-tab" role="tablist">
          <button
            className="nav-link d-inline-block active"
            data-bs-toggle="tab"
            id="future-visits-tab"
            data-bs-target="#future-visits"
            type="button"
            role="tab"
            aria-controls="future-visits"
            aria-selected="true"
            value="true"
          >
            Incoming
          </button>

          <button
            className="nav-link d-inline-block"
            data-bs-toggle="tab"
            id="history-visits-tab"
            data-bs-target="#history-visits"
            type="button"
            role="tab"
            aria-controls="history-visits"
            aria-selected="false"
          >
            History
          </button>
        </div>
      </nav>

      <div className="tab-content" id="nav-visits">
        <div
          className="tab-pane fade show active p-3"
          id="future-visits"
          role="tabpanel"
          aria-labelledby="future-visits-tab"
        >
          <Card className="shadow-sm border-0 my-5">
            <div className="text-center fs-3 fw-bold lead text-muted">Incoming</div>
            <hr />
            {visits.map((visit) => (
              <VisitItem key={(visit.visitId as number) * 50} visit={visit} />
            ))}
          </Card>
        </div>

        <div className="tab-pane fade p-3" id="history-visits" role="tabpanel" aria-labelledby="history-visits-tab">
          <Card className="shadow-sm border-0 my-5">
            <div className="text-center fs-3 fw-bold lead text-muted">History</div>
            <hr />
            {visits.map((visit) => (
              <VisitItem key={(visit.visitId as number) * 5} visit={visit} />
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}

export default AllVisitsPage;
