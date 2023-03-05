import React, { useEffect } from "react";
import VisitRegisterForm from "../components/Visit/VisitRegisterForm";
import { apiCalendar } from "../general/utils";

function VisitRegisterPage() {
  useEffect(() => {
    apiCalendar.handleAuthClick();
  }, []);

  return <VisitRegisterForm />;
}

export default VisitRegisterPage;
