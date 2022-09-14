import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesLogin = () => {
  const localstorage = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login") || "{}")
    : {
        login: {
          success: false,
          user: "",
        },
      };
  console.log(12, localstorage);

  return localstorage.success ? <Navigate to="/Home" /> : <Outlet />;
};

export default ProtectedRoutesLogin;
