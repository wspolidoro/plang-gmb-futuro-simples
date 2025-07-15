import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export function isTokenValid(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp && decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
}

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('admin_token');

  if (!isTokenValid(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
  return children;
}