import React from "react";
import doc1 from "../assets/doc1.png";
import doc2 from "../assets/doc2.png";
import rocket1 from "../assets/rocket1.png";
import Card from "./UI/Card/Card";

function MainBody() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" />
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" />
      </div>
      <div className="carousel-inner text-center">
        <div className="carousel-item active">
          <img src={doc1} className="d-block w-25 m-auto" alt="..." />
          <div className="carousel-caption d-none d-md-block text-muted lead">
            <Card className="border-0 rounded-4 shadow-sm">
              <h2>Welcome to App Sick</h2>
              <h3>where you can make your doctor appointments quickly and safely..</h3>
            </Card>
          </div>
        </div>
        <div className="carousel-item">
          <img src={rocket1} className="d-block w-25 m-auto" alt="..." />
          <div className="carousel-caption d-none d-md-block text-muted lead">
            <Card className="border-0 rounded-4 shadow-sm">
              <h2>Healthcare</h2>
              <h3>Our application is aimed at coordination of private healthcare companies..</h3>
            </Card>
          </div>
        </div>
        <div className="carousel-item">
          <img src={doc2} className="d-block w-25 m-auto" alt="..." />
          <div className="carousel-caption d-none d-md-block text-muted lead">
            <Card className="border-0 rounded-4 shadow-sm">
              <h2>Online Visits</h2>
              <h3>
                We offer management systems for both digital & local <br />
                consultations between a patient and a doctor.
              </h3>
            </Card>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default MainBody;
