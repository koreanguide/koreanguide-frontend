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
import MyPage from "./page/MyPage/MyPage";
import LoadPage from "./page/LoadPage/LoadPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Guest */}
          <Route path="/" element={<MainPage />} />

          {/* Portal Auth */}
          <Route path="/portal/signin" element={<Login />} />
          <Route path="/portal/signup" element={<SignUpPage />} />
          <Route path="/portal/reset_password" element={<PasswordReset />} />

          {/* Portal */}
          <Route path="/portal" element={<AfterLoginPage />} />
          <Route path="/portal/chat" element={<ChatPage />} />
          <Route path="/portal/track/new" element={<TrackCreatePage />} />
          <Route path="/portal/credit" element={<CreditManagement />} />
          <Route path="/portal/mypage" element={<MyPage />} />
          <Route path="/portal/load" element={<LoadPage />} />

          {/* Etc */}
          <Route path="/HeaderTwo" element={<HeaderTwo />} />
          <Route path="/Footer" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
