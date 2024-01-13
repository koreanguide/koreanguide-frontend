import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./page/Main/MainPage";
import AfterLoginPage from "./page/AfterLogin/AfterLoginPage";
import ChatPage from "./page/ChatPage/ChatPage";
import HeaderTwo from "./HeaderTwo";
import Footer from "./page/Footer/Footer";
import Login from "./page/Login/LoginPage";
import SignUpPage from "./page/SignUp/SignUp";
import PasswordReset from "./page/PasswordReset/PasswordReset";
import TrackCreatePage from "./page/Track/TrackCreate";
import CreditManagement from "./page/Credit/CreditManagement";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/AfterLogin" element={<AfterLoginPage />} />
          <Route path="/portal/chat" element={<ChatPage />} />
          <Route path="/HeaderTwo" element={<HeaderTwo />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup/page" element={<SignUpPage />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/track/create" element={<TrackCreatePage />} />
          <Route path="/credit/management" element={<CreditManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
