import { lazy } from "react";

// import Login from "../../views/auth/Login";
const Login = lazy(()=> import('../../views/auth/Login'));
const Register = lazy(()=> import('../../views/auth/Register'));
// import Register from "../../views/auth/Register";


const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default publicRoutes;