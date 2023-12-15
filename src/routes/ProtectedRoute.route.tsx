import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageNotFound from "../pages/pageNotFound/PageNotFound.page";
import { getDecodedToken, isLoggedIn } from "../utils/TokenUtils";
import IToken from "../interfaces/IToken.interface";

export default function ProtectedRoutes({
  onlyAdmins = false,
}: {
  onlyAdmins?: boolean;
}) {
  const decodedToken: IToken | undefined = getDecodedToken() as
    | IToken
    | undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  if (!isLoggedIn()) {
    return null;
  } else if (onlyAdmins && decodedToken?.userType !== "Admin") {
    return <PageNotFound />;
  } else {
    return <Outlet />;
  }
}
