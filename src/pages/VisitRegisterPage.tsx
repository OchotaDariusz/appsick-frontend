import React, { useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";
import VisitRegisterForm from "../components/Visit/VisitRegisterForm";
import { calendarConfig } from "../general/utils";

const apiCalendar = new ApiCalendar(calendarConfig);
function VisitRegisterPage() {
  useEffect(() => {
    apiCalendar.handleAuthClick();
  }, []);

  return <VisitRegisterForm apiCalendar={apiCalendar} />;
}

export default VisitRegisterPage;
