import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const admin = localStorage.getItem("token");
  const teacher = localStorage.getItem("teacher");

  if (!admin && !teacher) {
    return <Navigate to="/" />;
  }

  return children;
}