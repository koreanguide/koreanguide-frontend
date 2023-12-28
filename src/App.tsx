import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./page/Main/MainPage";
import AfterLoginPage from "./page/AfterLogin/AfterLoginPage";
import LoginPage from "./page/Login/Login";
import SignUpStepTwo from "./page/SignUp/SignUpStepTwo";
import ChatPage from "./page/ChatPage/ChatPage";
import HeaderTwo from "./HeaderTwo";
import Footer from "./page/Footer/Footer";
import SignUpStepThree from "./page/SignUp/SignUpStepThree";
import SignUpLastStep from "./page/SignUp/SignUpLastStep";
import SignUp from "./page/SignUp/SignUpStepOne";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/AfterLogin" element={<AfterLoginPage />} />
          <Route path="/portal/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/SignUp/StepTwo" element={<SignUpStepTwo />} />
          <Route path="/SignUp/StepThree" element={<SignUpStepThree />} />
          <Route path="/portal/chat" element={<ChatPage />} />
          <Route path="/HeaderTwo" element={<HeaderTwo />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/SignUp/Last" element={<SignUpLastStep />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
