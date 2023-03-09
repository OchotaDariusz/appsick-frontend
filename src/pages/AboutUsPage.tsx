import React from "react";
import Card from "../components/UI/Card/Card";
import github from "../assets/github-mark.png";

function AboutUsPage() {
  return (
    <Card className="rounded-4 border-0 shadow-sm">
      <div className="row justify-content-center d-inline">
        <div className="col fs-1 text-center">Our team of developers</div>
        <br />
        <div className="row">
          <div className="col-4">
            <img
              className="border rounded-5 "
              src="https://avatars.githubusercontent.com/u/62519892?v=4"
              style={{ height: 250 }}
              alt="tracz"
            />
          </div>
          <div className="col-8 fs-2 d-inline">
            <br />
            <div className="m-3">Szymon Tracz</div>
            <div className="d-inline-flex me-3 align-items-center">
              <img className="border rounded-5 m-3" src={github} style={{ height: 40 }} alt="gh" />
              <a href="https://github.com/szopszop">https://github.com/szopszop</a>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div className="row">
          <div className="col-4">
            <img
              className="border rounded-5 "
              src="https://avatars.githubusercontent.com/u/98316845?v=4"
              style={{ height: 250 }}
              alt="tracz"
            />
          </div>
          <div className="col-8 fs-2 d-inline">
            <br />
            <div className="m-3">Dariusz Ochota</div>
            <div className="d-inline-flex me-3 align-items-center">
              <img className="border rounded-5 m-3" src={github} style={{ height: 40 }} alt="gh" />
              <a href="https://github.com/OchotaDariusz">https://github.com/OchotaDariusz</a>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div className="row">
          <div className="col-4">
            <img
              className="border rounded-5 "
              src="https://avatars.githubusercontent.com/u/53392895?v=4"
              style={{ height: 250 }}
              alt="tracz"
            />
          </div>
          <div className="col-8 fs-2 d-inline">
            <br />
            <div className="m-3">Mateusz Kossowski</div>
            <div className="d-inline-flex me-3 align-items-center">
              <img className="border rounded-5 m-3" src={github} style={{ height: 40 }} alt="gh" />
              <a href="https://github.com/mat-kossowski">https://github.com/mat-kossowski</a>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div className="row">
          <div className="col-4">
            <img
              className="border rounded-5 "
              src="https://avatars.githubusercontent.com/u/98315192?v=4"
              style={{ height: 250 }}
              alt="tracz"
            />
          </div>
          <div className="col-8 fs-2 d-inline">
            <br />
            <div className="m-3">Sebastian Dudkowski</div>
            <div className="d-inline-flex me-3 align-items-center">
              <img className="border rounded-5 m-3" src={github} style={{ height: 40 }} alt="gh" />
              <a href="https://github.com/Sebastian-Dudkowski">https://github.com/Sebastian-Dudkowski</a>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div className="row">
          <div className="col-4">
            <img
              className="border rounded-5 "
              src="https://avatars.githubusercontent.com/u/98315478?v=4"
              style={{ height: 250 }}
              alt="tracz"
            />
          </div>
          <div className="col-8 fs-2 d-inline">
            <br />
            <div className="m-3">Wojciech Prusaczyk</div>
            <div className="d-inline-flex me-3 align-items-center">
              <img className="border rounded-5 m-3" src={github} style={{ height: 40 }} alt="gh" />
              <a href="https://github.com/PrWojciech">https://github.com/PrWojciech</a>
            </div>
          </div>
        </div>

        <br />
        <br />
      </div>
    </Card>
  );
}

export default AboutUsPage;
