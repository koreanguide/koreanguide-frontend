import { useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface CheckTokenProps {
  children: ReactNode;
}

export const CheckToken = ({ children }: CheckTokenProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");

    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate, location]);

  return <>{children}</>;
};
