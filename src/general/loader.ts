import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { getPatient, getUser } from "./dataManager";
import { AuthObject, ErrorMessage, Patient, UserDetails } from "./types";

// used as a "route/endpoints protector" alike
const loader = async () => {
  const user: string | UserDetails | ErrorMessage = await getUser();
  if (typeof user === "string" || !("id" in (user as UserDetails))) {
    return redirect("/");
  }
  if (
    !localStorage.getItem("state") ||
    (localStorage.getItem("state") &&
      (user as UserDetails).id !== JSON.parse(localStorage.getItem("state") as string).auth.id)
  ) {
    getPatient()
      .then((patient) => {
        const userDetailsTemplate: AuthObject = {
          id: (user as UserDetails).id,
          email: (user as UserDetails).email,
          firstName: (user as UserDetails).firstName,
          lastName: (user as UserDetails).lastName,
          role: "PATIENT",
          patientId: (patient as Patient).patientId,
          doctorId: null,
        };
        localStorage.setItem("state", JSON.stringify({ auth: { ...userDetailsTemplate } }));
      })
      .catch((err) => console.error(err.message));
  }
  return null;
};

export const visitsLoader = async ({ params }: LoaderFunctionArgs): Promise<Response | null> => {
  const user: string | UserDetails | ErrorMessage = await getUser();
  if (typeof user === "string" || !("id" in (user as UserDetails))) {
    return redirect("/");
  }
  return new Response(JSON.stringify({ visitId: +(params.visitId as string) }));
};

export default loader;
