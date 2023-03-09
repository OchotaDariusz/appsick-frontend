import React, { useEffect, useState } from "react";
import VisitsListHistory from "../components/Visit/VisitsListHistory";
import VisitsListIncoming from "../components/Visit/VisitsListIncoming";
import VisitsListToday from "../components/Visit/VisitsListToday";
import { getPatientVisitsForToday, getPatientVisitsFromPast, getPatientVisitsInFuture } from "../general/dataManager";
import { Visit } from "../general/types";
import { formatVisitDate, isToday } from "../general/utils";

// const page = 1;
function AllVisitsPage() {
  const [todayVisits, setTodayVisits] = useState<Visit[]>([]);
  const [isTodayVisitsLoading, setIsTodayVisitsLoading] = useState(false);

  const [futureVisits, setFutureVisits] = useState<Visit[]>([]);
  const [isFutureVisitsLoading, setIsFutureVisitsLoading] = useState(false);

  const [pastVisits, setPastVisits] = useState<Visit[]>([]);
  const [isPastVisitsLoading, setIsPastVisitsLoading] = useState(false);
  // const [pageNumber, setPageNumber] = useState(1);

  // // eslint-disable-next-line consistent-return
  // useEffect(() => {
  //   if (pastVisits.length > 0) {
  //     const nextPageDelay = setTimeout(() => {
  //       setPageNumber((prev) => prev + 1);
  //     });
  //     return () => clearTimeout(nextPageDelay);
  //   }
  // }, [pastVisits.length]);

  // useEffect(() => {
  //   const visitsToSet = visitList.map((visit) => formatVisitDate(visit) as Visit);
  //   setVisits(visitsToSet);
  // }, [setVisits]);

  useEffect(() => {
    setIsTodayVisitsLoading(true);
    getPatientVisitsForToday()
      .then((visitsForToday) => {
        const filtered = (visitsForToday as Visit[]).filter(
          (todayVisit) => todayVisit.status === "PENDING" && isToday(todayVisit)
        );
        setTodayVisits(filtered.map(formatVisitDate) as Visit[]);
        setIsTodayVisitsLoading(false);
      })
      .catch((err) => {
        console.warn(err.message);
        setIsTodayVisitsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsFutureVisitsLoading(true);
    getPatientVisitsInFuture()
      .then((visitsIncoming) => {
        const filtered = (visitsIncoming as Visit[]).filter((incomingVisit) => !isToday(incomingVisit));
        setFutureVisits(filtered.map(formatVisitDate) as Visit[]);
        setIsFutureVisitsLoading(false);
      })
      .catch((err) => {
        console.warn(err.message);
        setIsFutureVisitsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsPastVisitsLoading(true);
    getPatientVisitsFromPast()
      .then((visitsFromPast) => {
        setPastVisits((visitsFromPast as Visit[]).map(formatVisitDate) as Visit[]);
        setIsPastVisitsLoading(false);
      })
      .catch((err) => {
        console.warn(err.message);
        setIsPastVisitsLoading(false);
      });
  }, []);

  return (
    <>
      <VisitsListToday isLoading={isTodayVisitsLoading} visits={todayVisits} />

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
          <VisitsListIncoming isLoading={isFutureVisitsLoading} visits={futureVisits} />
        </div>

        <div className="tab-pane fade p-3" id="history-visits" role="tabpanel" aria-labelledby="history-visits-tab">
          <VisitsListHistory isLoading={isPastVisitsLoading} visits={pastVisits} />
        </div>
      </div>
    </>
  );
}

export default AllVisitsPage;
