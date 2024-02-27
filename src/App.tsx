import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./page/Main/MainPage";
import AfterLoginPage from "./page/AfterLogin/AfterLoginPage";
import ChatPage from "./page/ChatPage/ChatPage";
import HeaderTwo from "./HeaderTwo";
import Footer from "./page/Footer/Footer";
import GlobalLogin from "./page/Login/GlobalLoginPage";
import SignUpPage from "./page/SignUp/SignUp";
import CreditManagement from "./page/Credit/CreditManagement";
import MyPage from "./page/MyPage/MyPage";
import LoadPage from "./page/LoadPage/LoadPage";
import ManagementMainPage from "./page/Management/ManagementMainPage";
import ManagementTrackPage from "./page/Management/ManagementTrackPage";
import NewTrackpage from "./page/Track/NewTrack";
import MyTrack from "./page/Track/MyTrack";
import { CheckToken } from "./page/LogOut/CheckToken";
import LoginPageRoute from "./page/Login/LoginPageRoute";
import PasswordResetRoute from "./page/PasswordReset/PasswordResetRoute";
import SignUpRoute from "./page/SignUp/SignUpRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Guest */}
          <Route path="/" element={<MainPage />} />

          {/* ManagementMainPage */}
          <Route path="/admin" element={<ManagementMainPage />} />
          <Route path="/admin/track" element={<ManagementTrackPage />} />

          {/* Portal Auth */}
          <Route path="/portal/signin" element={<LoginPageRoute />} />
          <Route path="/portal/signup" element={<SignUpRoute />} />
          <Route path="/portal/reset_password" element={<PasswordResetRoute />} />

          {/* Portal */}
          <Route
            path="/portal"
            element={
              <CheckToken>
                <AfterLoginPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/chat"
            element={
              <CheckToken>
                <ChatPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/track_new"
            element={
              <CheckToken>
                <NewTrackpage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/track"
            element={
              <CheckToken>
                <MyTrack />
              </CheckToken>
            }
          />
          <Route
            path="/portal/credit"
            element={
              <CheckToken>
                <CreditManagement />
              </CheckToken>
            }
          />
          <Route
            path="/portal/mypage"
            element={
              <CheckToken>
                <MyPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/load"
            element={
              <CheckToken>
                <LoadPage />
              </CheckToken>
            }
          />

          {/* Etc */}
          <Route path="/HeaderTwo" element={<HeaderTwo />} />
          <Route path="/Footer" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
