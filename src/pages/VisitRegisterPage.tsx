import React, { useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";
import VisitRegisterForm from "../components/Visit/VisitRegisterForm";
import { calendarConfig } from "../general/utils";

let apiCalendar: ApiCalendar;
function VisitRegisterPage() {
  useEffect(() => {
    apiCalendar = new ApiCalendar(calendarConfig);
    apiCalendar.handleAuthClick();
  }, []);

  return <VisitRegisterForm apiCalendar={apiCalendar} />;
}

export default VisitRegisterPage;
