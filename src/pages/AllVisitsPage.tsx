import React, { useEffect, useState } from "react";
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
      {visits.map((visit) => (
        <VisitItem key={visit.visitId} visit={visit} />
      ))}
    </>
  );
}

export default AllVisitsPage;
