import { redirect } from "react-router-dom";
import { getUser } from "./dataManager";
import { ErrorMessage, UserDetails } from "./types";

// used as a "route/endpoints protector" alike
const loader = async () => {
  const user: string | UserDetails | ErrorMessage = await getUser();
  if (!("id" in (user as UserDetails))) {
    return redirect("/");
  }
  return null;
};

export default loader;
