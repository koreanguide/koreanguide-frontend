import React from "react";
import Header from "../../Header";
import MainFirst from "./MainFirst";
import MainSecond from "./MainSecond";
import MainThird from "./MainThird";
import MainFourth from "./MainFourth";
import MainFifth from "./MainFifth";
import Footer from "../Footer/Footer";

function MainPage() {
  return (
    <div>
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
