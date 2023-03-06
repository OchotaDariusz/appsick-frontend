import { useEffect, useState } from "react";

const useValidateFormEmail = (email: string) => {
  const [emailColor, setEmailColor] = useState("#ced4da");

  useEffect(() => {
    const isEmailOk = setTimeout(() => {
      const PATTERN = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.length === 0) {
        setEmailColor("#ced4da");
      } else if (email.match(PATTERN)) {
        setEmailColor("green");
      } else {
        setEmailColor("red");
      }
    }, 1000);
    return () => {
      clearTimeout(isEmailOk);
    };
  }, [email]);

  return emailColor;
};

export default useValidateFormEmail;
