import React, { useEffect } from "react";
import Header from "../../Header";
import MainFirst from "./MainFirst";
import MainSecond from "./MainSecond";
import MainThird from "./MainThird";
import MainFourth from "./MainFourth";
import MainFifth from "./MainFifth";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainHeaderTop from "../../MainHeaderTop";

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const response = await axios.post(`/v1/kakao?code=${code}`);
          if (response.status === 200) {
            sessionStorage.setItem("access-token", response.data.accessToken);
            sessionStorage.setItem("refresh-token", response.data.refreshToken);
            sessionStorage.setItem("email", response.data.email);
            sessionStorage.setItem("name", response.data.name);
            console.log("로그인 성공");
            navigate("/portal");
          }
        } catch (error) {
          console.error("로그인 실패:", error);
          navigate("/portal/signin");
        }
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <div>
      <MainHeaderTop></MainHeaderTop>
      <Header></Header>
      <MainFirst></MainFirst>
      <MainSecond></MainSecond>
      <MainThird></MainThird>
      <MainFourth></MainFourth>
      <MainFifth></MainFifth>
      <Footer></Footer>
    </div>
  );
}

export default MainPage;
