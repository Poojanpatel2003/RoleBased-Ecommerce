import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const ProtectedRoute = ({ children, roles }) => {


  const { user } = useContext(AuthContext);



  // User login nathi karyo
  if (!user) {

    return <Navigate to="/login" />;

  }



  // Role check (Admin/Sales)
  if (roles && !roles.includes(user.role)) {

    return <Navigate to="/" />;

  }



  // Access allowed
  return children;


};


export default ProtectedRoute;