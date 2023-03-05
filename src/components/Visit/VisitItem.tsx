import React, { useState } from "react";
import { Visit, VisitObject } from "../../general/types";
import { extractDoctorDataFromVisit } from "../../general/utils";
import Card from "../UI/Card/Card";
import "./VisitItem.scss";

type Props = {
  visit: VisitObject;
};

function VisitItem({ visit }: Props) {
  const [detailsHidden, setDetailsHidden] = useState(true);

  if (visit === null) return <Card>Visit does not exists.</Card>;

  const toogleVisitDetails = (event: React.MouseEvent | React.KeyboardEvent) => {
    if ("key" in event && !Array.from(["Space", "Enter"]).includes(event.code)) {
      return;
    }
    setDetailsHidden((prev) => !prev);
  };

  const [doctorAvatar, doctorFullName, doctorSpeciality] = extractDoctorDataFromVisit(visit);

  return (
    <section role="contentinfo">
      <Card className="my-4 shadow-sm">
        <div className="row">
          <div className="row text-center">
            <div
              className="d-flex hover-glow"
              onClick={toogleVisitDetails}
              onKeyDown={toogleVisitDetails}
              aria-expanded={detailsHidden}
              role="button"
              tabIndex={0}
            >
              <div className="col-2 px-md-2 px-xl-3 d-none d-lg-block">
                <div className="col-auto rounded-3 bg-white text-dark shadow-sm p-2 border border-2">
                  {(visit.date as string[])[0]}
                  <hr />
                  {(visit.date as string[])[1]}
                </div>
              </div>

              <div className="col-12 col-lg-10 rounded-3 shadow-sm bg-white text-dark ms-3 pb-3 px-4 pt-2 border border-2">
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
                <img src={doctorAvatar} className="m-2 img-thumbnail rounded-4 shadow-sm hover-glow" alt="doctor" />
              </div>
              <div className="col-12 col-lg-10 my-3 pb-3 px-4 pt-2">
                <Card>
                  <div className="col-auto rounded-2 bg-white text-dark p-2 mb-3 shadow-sm d-lg-none hover-glow">
                    <h6>Date</h6>
                    {(visit.date as string[])[0]}
                    <hr />
                    {(visit.date as string[])[1]}
                  </div>

                  <div className="col-auto rounded-2 bg-white text-dark p-2 pt-3 mb-3 shadow-sm hover-glow">
                    <h6>Reason</h6>
                    <p>{visit.reason ?? "visitReason"}</p>
                  </div>

                  <div className="col-auto rounded-2 bg-white text-dark p-2 pt-3 mb-3 shadow-sm hover-glow">
                    <h6>Status</h6>
                    <p>{visit.status ?? "visitStatus"}</p>
                  </div>

                  <div className="col-auto rounded-2 bg-white text-dark p-2 pt-3 mb-3 shadow-sm hover-glow">
                    <h6>VisitSummary(medicalData)</h6>
                    <p>medicalData</p>
                  </div>

                  <div className="col-auto rounded-2 bg-white text-dark p-2 pt-3 mb-3 shadow-sm hover-glow">
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
  //   <div className="row align-items-center">
  //       <div className="row align-items-center text-center">
  //       <div className="col-2 px-3">
  //           <div className="col-auto rounded-3 bg-white text-dark shadow-sm p-2 border border-2 btnx">
  //             {(visit.date as string[])[0]}
  //             <hr />
  //             {(visit.date as string[])[1].slice(0, 5)}
  //           </div>
  //         </div>

  //         <div className="col-10 rounded-3 bg-white text-dark my-3 pb-3 px-4 pt-2 border border-2 btnx">
  //         <div className="row justify-content-between">
  //             <div className="col-6 my-1 fs-3 text-start">
  //               {(visit as Visit).doctor!.user!.firstName} {(visit as Visit).doctor!.user!.lastName}
  //           </div>
  //           <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
  //   Button with data-bs-target
  // </button>
  //             <div
  //               className="col-auto text-capitalize text-decoration-underline"
  //               onClick={() => setOpen(!open)}
  //               aria-controls="example-collapse-text"
  //               aria-expanded={open}
  //               role="button"
  //             >
  //               <div className="fs-5 d-inline px-2">
  //                 <ViewIcon />
  //             </div>
  //             See details
  //             </div>
  //         </div>

  //           <div className="row align-items-start">
  //             <div className="col-2">
  //               <img
  //                 src={
  //                   visit?.doctor?.user?.image
  //                     ? visit?.doctor?.user?.image
  //                     : visit?.doctor?.user?.sex === "MALE"
  //                       ? maleDoctor
  //                       : femaleDoctor
  //               }
  //                 className="img-fluid rounded-circle"
  //                 style={{ height: "100px", width: "100px" }}
  //               alt="doctor"
  //               />
  //           </div>

  //             <div className="col-5 m-1">
  //               <div className="row fs-5">
  //                 {visit?.doctor?.medicalSpecialities[0]}
  //                 <br />
  //                 {visit.online ? <div className="row align-items-start">Online Visit</div> : <MapModal visit={visit} />}
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Rozsuwane */}
  //             <div>
  //               <br />
  //             <hr />
  //               <div id="example-collapse-text">
  //                 <div className="fs-4 m-2">
  //                 Visit reason:
  //                   <br />
  //                   {visit?.reason}
  //                 </div>

  //                 <div>
  //                   <hr />
  //                   <div className="fs-4 m-2">Visit status:</div>
  //                   <div>
  //                     {visit?.status !== "MISSED" ? (
  //                       <div>
  //                         {visit.status !== "PENDING" ? (
  //                           visit.status
  //                         ) : (
  //                           <div
  //                             className="fs-5 text-dark bg-light border border-success
  //                                         border-2 rounded-pill green-shadow mt-1 p-1 px-3 d-inline-flex m-2"
  //                           >
  //                             <div className="fs-2 d-inline pe-1">
  //                               <FiCheck />
  //                             </div>
  //                           Visit confirmed
  //                           </div>
  //                         )}
  //                       </div>
  //                     ) : (
  //                       <div className="text-danger">{visit.status}</div>
  //                     )}
  //                   </div>
  //                 </div>
  //                 {visit.status !== "PENDING" && visit.status !== "MISSED" ? (
  //                 <div>
  //                     <div>
  //                       <hr />
  //                     <div className="fs-4 m-2">Recommendations</div>
  //                       <div>{recommendations}</div>
  //                     </div>
  //                   <div>
  //                       <hr />
  //                       <div className="fs-4 m-2">Prescribed medication:</div>
  //                     <div className=" d-inline-flex m-3 align-content-center">
  //                         <div className="d-flex " role="button">
  //                         <div className="fs-1 d-inline px-3">
  //                             <BsFileEarmarkPdf />
  //                           </div>
  //                         Drugs.pdf
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //               ) : (
  //                   ""
  //                 )}
  //               <div>
  //                   {visit.status === "COMPLETED" ? (
  //                     <div>
  //                       <Link to={`/visit/${visit.visitId}/history`} className="btn btn-dark my-3">
  //                     >
  //                     See chat history
  //                       </Link>
  //                     </div>
  //                   ) : (
  //                     <div />
  //                   )}
  //               </div>

  //                 <div>
  //                   <br />
  //                 <hr />
  //                   <Button
  //                     className="fs-5 text-dark bg-light border border-danger
  //                                         border-2 rounded-pill p-1 green-shadow mt-3 px-3 btnx d-inline-flex"
  //                     onClick={() => {
  //                       cancelVisit(visit?.visitId);
  //                     }}
  //                   >
  //                     <div className="fs-5 d-inline pe-1">
  //                       <CloseIcon />
  //                     </div>
  //                   Cancel Visit
  //                   </Button>
  //                 </div>
  //             </div>
  //             </div>
  //           </Collapse>
  //       </div>
  //       </div>
  //     </div>
  //   );;
}

export default VisitItem;
