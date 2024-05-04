import Header from "../../Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Terms.css";
import MainHeaderTop from "../../MainHeaderTop";

function Terms() {
  const navigate = useNavigate();

  return (
    <div>
      <MainHeaderTop></MainHeaderTop>
      <Header></Header>
      <div className="TermsFrame">
        <div className="TermsInner">
          <h1>서비스 이용 약관</h1>
        </div>
      </div>
      <div className="TermsContents">
        <div className="TermsInner">
          <h1>
            이용약관 준비 중입니다.
          </h1>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Terms;
