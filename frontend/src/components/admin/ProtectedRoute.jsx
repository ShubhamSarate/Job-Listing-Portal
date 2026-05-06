import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else if (user.role !== "recruiter") {
        navigate("/");
      }
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return <Outlet />;
};

export default ProtectedRoute;