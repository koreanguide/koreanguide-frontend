import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./page/Main/MainPage";
import Portal from "./page/Portal/Portal";
import ChatPage from "./page/ChatPage/ChatPage";
import HeaderTwo from "./HeaderTwo";
import Footer from "./page/Footer/Footer";
import CreditManagement from "./page/Credit/CreditManagement";
import MyPage from "./page/MyPage/MyPage";
import LoadPage from "./page/LoadPage/LoadPage";
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
import SeoulHanRiverDetailPage from "./page/Seoul/HanRiver/HanRiverDetail";
import PrivacyPolicy from "./page/Terms/PrivacyPolicy";
import Terms from "./page/Terms/Terms";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* ===Guest=== */}
          <Route path="/" element={<MainPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

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
                <Portal />
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

          {/*Loading usefull*/}
          {/* error */}
          <Route
            path="/portal/track/edit/:trackId"
            element={
              <CheckToken>
                <TrackEdit />
              </CheckToken>
            }
          />

          {/* *** 보류 *** */}
          <Route
            path="/portal/track/delete"
            element={
              <CheckToken>
                <TrackDeletePage />
              </CheckToken>
            }
          />

          {/* *** 보류 *** */}
          <Route path="/portal/plan" element={<PlanPage />} />

          {/* Etc */}
          <Route path="/HeaderTwo" element={<HeaderTwo />} />
          <Route path="/Footer" element={<Footer />} />
          {/* seoul */}
          <Route path="/seoul/header" element={<SeoulHeader />} />
          <Route
            path="/portal/seoul"
            element={
              <CheckToken>
                <SeoulMain />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/location"
            element={
              <CheckToken>
                <SeoulLocationPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/select"
            element={
              <CheckToken>
                <SeoulCategoryPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/saved"
            element={
              <CheckToken>
                <SeoulBasketPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/shop"
            element={
              <CheckToken>
                <SeoulShopPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/sights"
            element={
              <CheckToken>
                <SeoulSightsPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/track"
            element={
              <CheckToken>
                <SeoulTrackCreatePage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/river"
            element={
              <CheckToken>
                <SeoulHanRiverPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/cycle"
            element={
              <CheckToken>
                <SeoulCyclePage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/restaurant"
            element={
              <CheckToken>
                <SeoulRestaurantPage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/karaoke"
            element={
              <CheckToken>
                <SeoulKaraokePage />
              </CheckToken>
            }
          />
          <Route
            path="/portal/seoul/detail"
            element={
              <CheckToken>
                <SeoulHanRiverDetailPage />
              </CheckToken>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
