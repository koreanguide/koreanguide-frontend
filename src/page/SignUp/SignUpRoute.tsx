import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignUpPage from "./SignUp";
import GlobalSignUpPage from "./GlobalSignUp";

function SignUpRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const lang = query.get('lang');
  
  React.useEffect(() => {
    if (!lang) {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      navigate(`/portal/signup${browserLang.startsWith('ko') ? '?lang=ko' : '?lang=en'}`);
    }
  }, [lang, navigate]);
  
  if (lang === 'en') {
    return <GlobalSignUpPage />;
  } else {
    return <SignUpPage />;
  }
}

export default SignUpRoute;