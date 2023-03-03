import React from "react";
import { useRouteError } from "react-router-dom";

interface ErrorStatus {
  statusText?: string;
  message?: string;
}

function ErrorPage(): JSX.Element {
  const error: ErrorStatus | unknown = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as ErrorStatus).statusText || (error as ErrorStatus).message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
