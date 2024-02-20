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
import CreditManagement from "./page/Credit/CreditManagement";
import MyPage from "./page/MyPage/MyPage";
import LoadPage from "./page/LoadPage/LoadPage";
import NewTrackpage from "./page/Track/NewTrack";
import MyTrack from "./page/Track/MyTrack";

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
          <Route path="/portal/track_new" element={<NewTrackpage />} />
          <Route path="/portal/track" element={<MyTrack />} />
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
