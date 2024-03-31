import { useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

interface CheckTokenProps {
  children: ReactNode;
}

interface TokenData {
  refreshToken: string;
}

export const CheckToken = ({ children }: CheckTokenProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("access-token");
  const refreshToken = sessionStorage.getItem("refresh-token");

  useEffect(() => {
    (async () => {
      // Access Token 또는 Refresh Token 미발견
      if (!token && !refreshToken) {
        navigate("/portal/signin?lang=ko", { replace: true });
        return;
      }

      try {
        const data: TokenData = {
          refreshToken: token ?? ""
        };
        
        // Access Token 유효성 검사
        const response = await axios.post("/v1/token", data);

        // Access Token이 무효하거나, 사용할 수 없을 때
        if (response.status !== 200) {
          const refreshData: TokenData = {
            refreshToken: refreshToken ?? ""
          };

          // Refresh Token으로 Access Token 재발급
          const reissueTokenRespone = await axios.post("/v1/refresh", refreshData);

          // 재발급 성공 시
          if(reissueTokenRespone.status === 200) {
            sessionStorage.setItem("access-token", reissueTokenRespone.data.accessToken);
            sessionStorage.setItem("refresh-token", reissueTokenRespone.data.refreshToken);
            return;
          } else {
            // Refresh Token을 사용할 수 없을 때
            navigate("/portal/signin?lang=ko", { replace: true });
          }
        }
      } catch (error) {
        // API 호출 에러 시
        navigate("/portal/signin?lang=ko", { replace: true });
      }
    })();
  }, [navigate, location]);

  return <>{children}</>;
};
