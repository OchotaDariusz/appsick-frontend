import { useEffect } from "react";
import { getDoctorsBySpeciality } from "../general/dataManager";
import { DoctorObject, DoctorSpeciality, VisitRegisterRequest } from "../general/types";

const useGetDoctorsBySpeciality = (
  setAvailableDoctors: React.Dispatch<React.SetStateAction<DoctorObject[]>>,
  selectedSpeciality: string,
  [doctorSpecialities, formState]: [DoctorSpeciality[], VisitRegisterRequest]
) => {
  useEffect(() => {
    if (selectedSpeciality === formState.doctorSpeciality) {
      getDoctorsBySpeciality(formState.doctorSpeciality)
        .then((doctors) => {
          if (Array.isArray(doctors)) {
            setAvailableDoctors(doctors);
          }
        })
        .catch((err) => console.error(err.message));
    }
  }, [setAvailableDoctors, selectedSpeciality, doctorSpecialities, formState.doctorSpeciality]);
  return formState.doctorSpeciality;
};

export default useGetDoctorsBySpeciality;
