import React from "react";
import Card from "../components/UI/Card/Card";

function ContactPage() {
  return (
    <Card className="border-0 rounded-4 shadow-sm">
      <form>
        <div className="form-group">
          <label htmlFor="contact-form__email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="contact-form__email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            Your email.
          </small>
        </div>
        <div className="mt-3 form-group">
          <label htmlFor="contact-form__message">Message</label>
          <input type="text" className="form-control" id="contact-form__message" placeholder="Password" />
        </div>
        <button type="submit" className="mt-5 btn text-white btn-primary disabled bg-gradient shadow-sm">
          Submit
        </button>
      </form>
    </Card>
  );
}

export default ContactPage;
