import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./page/Main/MainPage";
import AfterLoginPage from "./page/AfterLogin/AfterLoginPage";
import ChatPage from "./page/ChatPage/ChatPage";
import HeaderTwo from "./HeaderTwo";
import Footer from "./page/Footer/Footer";
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
import GuideMyPage from "./page/MyPage/GuideMyPage";
import UnregisterPage from "./page/Unregister/Unregister";
import TrackViewPage from "./page/Track/TrackView";
import TrackEdit from "./page/Track/TrackEdit";
import TrackDeletePage from "./page/Track/TrackDelete";
import PlanPage from "./page/PlanPage/PlanPage";
import SeoulHeader from "./SeoulHeader";
import SeoulMain from "./page/Seoul/SeoulMain";
import SeoulLocationPage from "./page/Seoul/SeoulLocation";
import SeoulCategoryPage from "./page/Seoul/SeoulCategory";
import SeoulBasketPage from "./page/Seoul/SeoulBasket";
import SeoulShopPage from "./page/Seoul/Shop/SeoulShop";
import SeoulTrackCreatePage from "./page/Seoul/Track/SeoulTrack";
import SeoulSightsPage from "./page/Seoul/Tourist Attractions/TouristAttractions";
import SeoulHanRiverPage from "./page/Seoul/HanRiver/HanRiver";
import SeoulCyclePage from "./page/Seoul/Cycle/SeoulCycle";
import SeoulRestaurantPage from "./page/Seoul/Restaurant/SeoulRestaurant";
import SeoulKaraokePage from "./page/Seoul/Karaoke/SeoulKaraoke";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* ===Guest=== */}
          <Route path="/" element={<MainPage />} />

          {/* ===ManagementMainPage=== */}
          <Route path="/admin" element={<ManagementMainPage />} />
          <Route path="/admin/track" element={<ManagementTrackPage />} />

          {/* ===Portal Auth=== */}
          <Route path="/portal/signin" element={<LoginPageRoute />} />
          <Route path="/portal/signup" element={<SignUpRoute />} />
          <Route
            path="/portal/reset_password"
            element={<PasswordResetRoute />}
          />

          {/*===Load===*/}
          <Route
            path="/portal/load"
            element={
              <CheckToken>
                <LoadPage />
              </CheckToken>
            }
          />

          {/* ===Portal=== */}

          {/*Loading usefull*/}
          {/*Checked*/}
          <Route
            path="/portal"
            element={
              <CheckToken>
                <AfterLoginPage />
              </CheckToken>
            }
          />

          {/*Loading usefull*/}
          {/*Checked*/}
          <Route
            path="/portal/chat"
            element={
              <CheckToken>
                <ChatPage />
              </CheckToken>
            }
          />

          {/*Loading useless*/}
          {/*Checked*/}
          <Route
            path="/portal/track/new"
            element={
              <CheckToken>
                <NewTrackpage />
              </CheckToken>
            }
          />

          {/*Loading usefull*/}
          {/*Checked*/}
          <Route
            path="/portal/track"
            element={
              <CheckToken>
                <MyTrack />
              </CheckToken>
            }
          />

          {/*Loading usefull*/}
          {/*Checked*/}
          <Route
            path="/portal/credit"
            element={
              <CheckToken>
                <CreditManagement />
              </CheckToken>
            }
          />

          {/*Loading usefull*/}
          {/*Checked*/}
          <Route
            path="/portal/profile"
            element={
              <CheckToken>
                <MyPage />
              </CheckToken>
            }
          />

          {/*Loading usefull*/}
          {/*Checked*/}
          <Route
            path="/portal/mypage"
            element={
              <CheckToken>
                <GuideMyPage />
              </CheckToken>
            }
          />

          {/* *** 보류 *** */}
          <Route
            path="/portal/unregister"
            element={
              <CheckToken>
                <UnregisterPage />
              </CheckToken>
            }
          />

          {/*Loading usefull*/}
          {/*Checked*/}
          <Route
            path="/portal/track/view/:trackId"
            element={
              <CheckToken>
                <TrackViewPage />
              </CheckToken>
            }
          />
          <Route path="/portal/track/edit/:trackId" element={<TrackEdit />} />
          <Route path="/portal/track/delete" element={<TrackDeletePage />} />
          <Route path="/portal/plan" element={<PlanPage />} />

          {/* Etc */}
          <Route path="/HeaderTwo" element={<HeaderTwo />} />
          <Route path="/Footer" element={<Footer />} />
          {/* seoul */}
          <Route path="/seoul/header" element={<SeoulHeader />} />
          <Route path="/portal/seoul" element={<SeoulMain />} />
          <Route
            path="/portal/seoul/location"
            element={<SeoulLocationPage />}
          />
          <Route path="/portal/seoul/select" element={<SeoulCategoryPage />} />
          <Route path="/portal/seoul/saved" element={<SeoulBasketPage />} />
          <Route path="/portal/seoul/Shop" element={<SeoulShopPage />} />
          <Route path="/portal/seoul/sights" element={<SeoulSightsPage />} />
          <Route
            path="/portal/seoul/track"
            element={<SeoulTrackCreatePage />}
          />
          <Route path="/portal/seoul/river" element={<SeoulHanRiverPage />} />
          <Route path="/portal/seoul/cycle" element={<SeoulCyclePage />} />
          <Route
            path="/portal/seoul/restaurant"
            element={<SeoulRestaurantPage />}
          />
          <Route path="/portal/seoul/karaoke" element={<SeoulKaraokePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
