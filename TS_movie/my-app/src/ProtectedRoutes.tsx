import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const localstorage = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login") || "{}")
    : {
        cartmovie: {
          login: {
            success: false,
            user: "",
          },
        },
      };
  // console.log(233, localstorage.cartmovie.login.success);

  return localstorage.success ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
