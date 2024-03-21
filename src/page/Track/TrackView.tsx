import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderTwo from "../../HeaderTwo";
import "./TrackView.css";
import { useParams, useNavigate } from "react-router-dom";

function TrackViewPage() {
  const { trackId } = useParams();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("access-token");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState("");
  const [primaryImage, setPrimaryImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [content, setContent] = useState("");
  const [like, setLike] = useState("");
  const [view, setView] = useState("");

  const maxAdditionalImages = 5;
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (token === null) {
      console.log("세션 스토리지에 토큰이 없습니다.");
      return;
    } else {
      console.log("토큰", token);
    }

    const MainInfo = async () => {
      try {
        const response = await axios.get("/v1/track/detail", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
          params: {
            trackId: trackId, // 여기를 수정
          },
        });
        const data = response.data;
        setTitle(data.title);
        setTags(data.tags);
        setPreview(data.preview);
        setPrimaryImage(data.primaryImage);
        setAdditionalImages(data.additionalImage);
        setContent(data.content);
        setLike(data.like);
        setView(data.view);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    MainInfo();
  }, [token, trackId]);

  const getBigImageSrc = () => {
    if (!selectedImage) {
      return primaryImage;
    }
    return selectedImage;
  };

  const BackToMyPage = () => {
    navigate("/portal/track");
    window.scrollTo(0, 0);
  };

  return (
    <div className="TrackViewPageFrame">
      <HeaderTwo></HeaderTwo>
      <div className="TrackViewPageInner">
        <div className="GoToMyPageButton" onClick={BackToMyPage}>
          <div className="GoToMyPageText">내 트랙 페이지로 돌아가기</div>
          <img className="" src="/img/ViewArrow.svg" alt=""></img>
        </div>
        <div className="TrackViewPageTrackTitleBox">
          <div className="TrackViewPageTrackTitle">{title}</div>
          <div className="TrackViewPageTrackTitleBoxTwo">
            <div className="TrackViewPageLikeBox">
              <img
                className="ViewHeart"
                src="/img/MyTrackHeart.svg"
                alt=""
              ></img>
              <div className="TrackViewPageLikeNum">{like}</div>
            </div>
            <div className="TrackViewPageLViewNumBox">
              <img className="ViewEye" src="/img/eye.svg" alt=""></img>
              <div className="TrackViewPageLViewNum">{view}</div>
            </div>
            <div className="TrackViewPageSettingBox">
              <img
                src="/img/ViewSetting.svg"
                className="ViewSetting"
                alt="Setting Icon"
              ></img>
              <div className="TrackViewPageTextSetting">관리</div>
            </div>
          </div>
        </div>
        <div className="PreviewBox">{preview}</div>
        <div className="ViewPageTagsContainer">
          {tags.map((tag, index) => (
            <div key={index} className="ViewPageTag">
              #{tag}
            </div>
          ))}
        </div>
        <div className="ViewPageImageContainer">
          <div className="ViewPageBigImageBox">
            <img
              className="ViewPageBigImage"
              src={getBigImageSrc()}
              alt=""
            ></img>
          </div>
          <div className="ViewPageSmallImageContainer">
            <div
              className={`ViewPageSmallImageBox ${
                !selectedImage ? "selected" : ""
              }`}
              onClick={() => setSelectedImage(primaryImage)}
            >
              <img
                className="ViewPagePrimaryImage"
                src={primaryImage}
                alt=""
              ></img>
            </div>
            {[...Array(maxAdditionalImages - 1)].map((_, index) => {
              return (
                <div className="ViewPageSmallImageBox" key={index}>
                  {additionalImages[index] ? (
                    <img
                      className={`ViewPageAdditionalImages ${
                        selectedImage === additionalImages[index]
                          ? "selected"
                          : ""
                      }`}
                      src={additionalImages[index]}
                      alt=""
                      onClick={() => setSelectedImage(additionalImages[index])}
                    />
                  ) : (
                    <div className="ViewPageNoneImgText">이미지 미존재</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="ViewPageContentContainer">{content}</div>
      </div>
    </div>
  );
}

export default TrackViewPage;
