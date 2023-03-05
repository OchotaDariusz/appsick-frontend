import { useEffect } from "react";
import { getDoctorSpecialities } from "../general/dataManager";

const useGetDoctorSpecialities = (setDoctorSpecialities: React.Dispatch<React.SetStateAction<string[]>>) => {
  useEffect(() => {
    getDoctorSpecialities()
      .then((specialities) => {
        if (Array.isArray(specialities)) {
          setDoctorSpecialities(specialities);
        }
      })
      .catch((err) => console.error(err.message));
  }, [setDoctorSpecialities]);
};

export default useGetDoctorSpecialities;
