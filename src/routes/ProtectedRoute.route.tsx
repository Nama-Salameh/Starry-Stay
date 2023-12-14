import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageNotFound from "../pages/pageNotFound/PageNotFound.page";
import { getDecodedToken, isLoggedIn } from "../utils/TokenUtils";
import { IToken } from "../interfaces/Token.interface";

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
  } else if (onlyAdmins && decodedToken?.userType !== "admin") {
    return <PageNotFound />;
  } else {
    return <Outlet />;
  }
}
