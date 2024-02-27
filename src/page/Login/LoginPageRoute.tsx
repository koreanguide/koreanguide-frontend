import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../Login/LoginPage";
import GlobalLogin from "../Login/GlobalLoginPage";

function LoginPageRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const lang = query.get('lang');
  
  React.useEffect(() => {
    if (!lang) {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      navigate(`/portal/signin${browserLang.startsWith('ko') ? '?lang=ko' : '?lang=en'}`);
    }
  }, [lang, navigate]);
  
  if (lang === 'en') {
    return <GlobalLogin />;
  } else {
    return <Login />;
  }
}

export default LoginPageRoute;