import React, { useState } from "react";
import { deleteVisit } from "../../general/dataManager";
import { Visit, VisitObject } from "../../general/types";
import { extractDoctorDataFromVisit } from "../../general/utils";
import VISIT_TIME from "../../general/visitTime";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

type Props = {
  visit: VisitObject;
  type?: VISIT_TIME;
};

function VisitItem({ visit, type }: Props) {
  const [detailsHidden, setDetailsHidden] = useState(true);

  if (visit === null) return <Card>Visit does not exists.</Card>;

  const toogleVisitDetails = (event: React.MouseEvent | React.KeyboardEvent) => {
    if ("key" in event && !Array.from(["Space", "Enter"]).includes(event.code)) {
      return;
    }
    setDetailsHidden((prev) => !prev);
  };

  const [doctorAvatar, doctorFullName, doctorSpeciality] = extractDoctorDataFromVisit(visit);

  const cancelVisit = () => {
    deleteVisit(visit.visitId as number);
  };

  return (
    <section role="contentinfo">
      <Card className="my-4 shadow-sm">
        <div className="row justify-content-center">
          <div className="row text-center">
            <div
              className="d-flex px-0"
              onClick={toogleVisitDetails}
              onKeyDown={toogleVisitDetails}
              aria-expanded={detailsHidden}
              role="button"
              tabIndex={0}
            >
              <div className="col-2 pe-lg-3 d-none d-lg-block">
                <div className="col-auto rounded-3 bg-white text-dark shadow-sm p-2 border border-2">
                  {(visit.date as string[])[0]}
                  <hr />
                  {(visit.date as string[])[1]}
                </div>
              </div>

              <div className="col-12 col-lg-10 rounded-3 shadow-sm bg-white text-dark pb-3 px-2 px-lg-4 pt-2 border border-2">
                <div className="row justify-content-between">
                  <div className="col-auto my-1 fs-3 text-start">{doctorFullName}</div>
                  <div className="col-auto my-1 fs-4 text-end">{doctorSpeciality}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`collapse ${detailsHidden ? "" : "show"}`} id="collapseExample">
            <div className="row text-center">
              <div className="col-2 mt-3 d-none d-lg-block">
                <img src={doctorAvatar} className="m-2 img-thumbnail rounded-4 shadow-sm" alt="doctor" />
              </div>
              <div className="col-12 col-lg-10 my-3 pb-3 px-4 pt-2">
                <Card>
                  <div className="col-auto rounded-2 bg-white text-dark p-2 mb-3 shadow-sm d-lg-none">
                    <h6>Date</h6>
                    {(visit.date as string[])[0]}
                    <hr />
                    {(visit.date as string[])[1]}
                  </div>
                  <div className="col-auto rounded-2 bg-white text-dark p-2 pt-3 mb-3 shadow-sm">
                    <h6>Reason</h6>
                    <p>{visit.reason ?? "visitReason"}</p>
                  </div>
                  <div className="col-auto rounded-2 bg-white text-dark p-2 pt-3 mb-3 shadow-sm">
                    <h6>Status</h6>
                    <p>{visit.status ?? "visitStatus"}</p>
                    <div className="d-grid gap-2">
                      {type === 0 ? (
                        <a
                          href={`visit/${visit.visitId}`}
                          className="btn btn-secondary rounded-pill shadow-sm bg-gradient mx-1"
                        >
                          Go to chat
                        </a>
                      ) : (
                        ""
                      )}
                      {type === 1 ? (
                        <Button className="btn-danger shadow-sm bg-gradient mx-1" onClick={cancelVisit}>
                          Cancel
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {type === 2 ? (
                    <div className="col-auto rounded-2 bg-white text-dark p-2 pt-3 mb-3 shadow-sm">
                      <h6>Visit Summary</h6>
                      <div className="d-grid gap-2">
                        <a
                          href={`visit/${visit.visitId}/medical_data`}
                          className="btn disabled rounded-pill btn-primary shadow-sm bg-gradient mx-1"
                        >
                          Medical Data
                        </a>
                        <a
                          href={`visit/${visit.visitId}/history`}
                          className="btn btn-secondary rounded-pill shadow-sm bg-gradient mx-1"
                        >
                          Chat History
                        </a>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-auto rounded-2 bg-white text-dark p-2 pt-3 mb-3 shadow-sm">
                    <h6>Clinic</h6>
                    <p>{(visit as Visit).clinic?.clinicName ?? "clinicName"}</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

VisitItem.defaultProps = {
  type: VISIT_TIME.TODAY,
};

export default VisitItem;
