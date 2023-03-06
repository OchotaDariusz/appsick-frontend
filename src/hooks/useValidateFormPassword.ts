import { useEffect, useState } from "react";

const useValidateFormPassword = (password: string, passwordConfirmation: string) => {
  const [confirmationColor, setConfirmationColor] = useState("#ced4da");

  useEffect(() => {
    const isConfirmationOk = setTimeout(() => {
      if (password.length === 0 || passwordConfirmation.length === 0) {
        setConfirmationColor("#ced4da");
      } else if (passwordConfirmation === password) {
        setConfirmationColor("green");
      } else {
        setConfirmationColor("salmon");
      }
    }, 1000);
    return () => {
      clearTimeout(isConfirmationOk);
    };
  }, [passwordConfirmation, password]);

  return [confirmationColor, password === passwordConfirmation];
};

export default useValidateFormPassword;
