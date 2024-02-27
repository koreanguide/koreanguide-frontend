import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalPasswordReset from "./GlobalPasswordReset";
import PasswordReset from "./PasswordReset";

function PasswordResetRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const lang = query.get('lang');
  
  React.useEffect(() => {
    if (!lang) {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      navigate(`/portal/reset_password${browserLang.startsWith('ko') ? '?lang=ko' : '?lang=en'}`);
    }
  }, [lang, navigate]);
  
  if (lang === 'en') {
    return <GlobalPasswordReset />;
  } else {
    return <PasswordReset />;
  }
}

export default PasswordResetRoute;