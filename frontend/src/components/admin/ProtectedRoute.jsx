import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;