/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import VisitRegisterForm from "../components/Visit/VisitRegisterForm";

declare let gapi: any;
declare let tokenClient: any;
declare let google: any;
function VisitRegisterPage() {
  useEffect(() => {
    const handleAuthClick = () => {
      // eslint-disable-next-line no-undef
      if (gapi && tokenClient) {
        // eslint-disable-next-line no-undef
        if (gapi.client.getToken() === null) {
          tokenClient.requestAccessToken({ prompt: "consent" });
        } else {
          tokenClient.requestAccessToken({
            prompt: "",
          });
        }
      } else {
        console.error("Error: gapi not loaded");
      }
    };
    const initGapiClient = () => {
      // eslint-disable-next-line no-undef
      gapi.client
        .init({
          apiKey: import.meta.env.VITE_GOOGLE_APP_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        })
        .then(() => {
          handleAuthClick();
        })
        .catch((e: any) => {
          console.log(e);
        });
    };
    const handleClientLoad = () => {
      const scriptGoogle = document.createElement("script");
      const scriptGapi = document.createElement("script");
      scriptGoogle.src = "https://accounts.google.com/gsi/client";
      scriptGoogle.async = true;
      scriptGoogle.defer = true;
      scriptGapi.src = "https://apis.google.com/js/api.js";
      scriptGapi.async = true;
      scriptGapi.defer = true;
      document.body.appendChild(scriptGapi);
      document.body.appendChild(scriptGoogle);
      scriptGapi.onload = () => {
        // eslint-disable-next-line no-undef
        gapi.load("client", initGapiClient);
      };
      scriptGoogle.onload = async () => {
        // eslint-disable-next-line no-undef
        tokenClient = await google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/calendar",
          callback: () => {},
        });
      };
    };
    handleClientLoad();
  }, []);

  return <VisitRegisterForm />;
}

export default VisitRegisterPage;
