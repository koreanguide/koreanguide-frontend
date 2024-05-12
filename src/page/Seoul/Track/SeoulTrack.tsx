import React, { useState, useEffect } from "react";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import "./SeoulTrack.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../Footer/Footer";

function SeoulTrackCreatePage() {
  const token = sessionStorage.getItem("access-token");
  const [consent, setConsent] = useState(true);

  const navigate = useNavigate();

  const goToMyTrack = () => {
    navigate("/portal/track");
    window.scrollTo(0, 0);
  };

  const goToSeoulMain = () => {
    navigate("/portal/seoul");
    window.scrollTo(0, 0);
  };

  interface SeoulTrackTextTypeOneProps {
    content: string;
  }
  const SeoulTrackTextOne: React.FC<SeoulTrackTextTypeOneProps> = ({
    content,
  }) => {
    return <div className="SeoulTrackTextTypeOne">{content}</div>;
  };

  const SeoulTrackTextTwo: React.FC<SeoulTrackTextTypeOneProps> = ({
    content,
  }) => {
    return <div className="SeoulTrackTextTypeOne">{content}</div>;
  };

  const location = useLocation();
  var { SeoulTrackGolbalData } = location.state || {};
  const { title, content, preview } = SeoulTrackGolbalData;

  const [trackTitle, setTrackTitle] = useState(title);
  const [trackPreview, setTrackPreview] = useState(preview);
  const [trackContent, setTrackContent] = useState(content);

  const titleLimit = 30;
  const previewLimit = 50;
  const contentLimit = 3000;

  const [titleBorder, setTitleBorder] = useState(false);
  const [previewBorder, setPreviewBorder] = useState(false);
  const [contentBorder, setContentBorder] = useState(false);

  useEffect(() => {
    // 각 입력 필드의 글자 수가 제한을 넘는지 확인
    setTitleBorder(trackTitle.length > titleLimit);
    setPreviewBorder(trackPreview.length > previewLimit);
    setContentBorder(trackContent.length > contentLimit);
  }, [trackTitle, trackPreview, trackContent]); // 입력 값이 변경될 때마다 실행

  const [ShowTagOneBox, setShowTagOneBox] = useState<boolean>(
    window.innerWidth >= 655
  );
  const [ShowTagTwoBox, setShowTagTwoBox] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([{ tagName: "tag1" }]);

  const tagsTwo: string[] = [
    "CLUB",
    "식도락",
    "관광지",
    "맛집",
    "재미",
    "사진",
    "휴양",
    "K-pop",
    "스토어",
    "유흥",
    "핫플",
    "주점",
    "문화",
    "쇼핑",
    "Custom",
    "SNS",
    // "MOOD",
  ];

  const ShowTagBoxChange = () => {
    setShowTagOneBox(false);
    setShowTagTwoBox(true);
  };

  const ShowTagBoxChangeTwo = () => {
    setShowTagOneBox(true);
    setShowTagTwoBox(false);
  };

  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  interface TagChoiceProps {
    tagName: string;
    selected: boolean;
    onClick: () => void;
  }

  const TagChoice: React.FC<TagChoiceProps> = ({
    tagName,
    selected,
    onClick,
  }) => {
    return (
      <div
        className="TagChoiceFrame"
        style={{
          backgroundColor: selected ? "#3876c0" : "",
          color: selected ? "#fff" : "",
        }}
        onClick={onClick}
      >
        <div className="TagChoiceText">{tagName}</div>
      </div>
    );
  };

  useEffect(() => {
    if (selectedTags.length >= 1) {
      setTags(selectedTags.map((tagName) => ({ tagName })));
    } else {
    }
  }, [selectedTags]);

  const [selectedMainImage, setSelectedMainImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImageOne, setSelectedImageOne] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImageTwo, setSelectedImageTwo] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImageThree, setSelectedImageThree] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImageFour, setSelectedImageFour] = useState<
    string | ArrayBuffer | null
  >(null);
  const [imageFileOne, setImageFileOne] = useState<File | null>(null);
  const [imageFileTwo, setImageFileTwo] = useState<File | null>(null);
  const [imageFileThree, setImageFileThree] = useState<File | null>(null);
  const [imageFileFour, setImageFileFour] = useState<File | null>(null);

  const [primaryImageUrl, setPrimaryImageUrl] = useState<string>("");

  interface NewTrackImageComponentProps {
    text: string;
  }

  const NewTrackImageComponent: React.FC<NewTrackImageComponentProps> = ({
    text,
  }) => {
    return (
      <div className="NewTrackImageComponentFrame">
        <img className="plusImg" src="../../img/plusImg.svg" alt="오류"></img>
        <div className="NewTrackImageComponentText">{text}</div>
      </div>
    );
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setSelectedMainImage(reader.result);

        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post("/v1/file/", formData, {
            headers: {
              "X-AUTH-TOKEN": token,
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            const imageUrl = response.data;
            setPrimaryImageUrl(imageUrl);
          }
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageOne(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFileOne(file);
    }
  };

  const handleImageTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageTwo(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFileTwo(file);
    }
  };

  const handleImageThreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageThree(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFileThree(file);
    }
  };

  const handleImageFourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageFour(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFileFour(file);
    }
  };

  interface Image {
    imageUrl: string;
  }

  interface Tag {
    tagName: string;
  }

  interface TrackCreateSubmitData {
    agreePrivacyPolicy: boolean;
    agreePublicTerms: boolean;
    agreeTerms: boolean;
    images: Image[];
    primaryImageUrl: string;
    tags: Tag[];
    trackContent: string;
    trackPreview: string;
    trackTitle: string;
    useAutoTranslate: boolean;
  }

  const uploadImage = async (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/v1/file/", formData, {
          headers: {
            "X-AUTH-TOKEN": token,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }

    return null;
  };

  const TrackCreateSubmitClick = async () => {
    if (consent === false) {
      alert("약관에 동의해주세요.");
      return;
    } else if (titleBorder === true) {
      alert("제목 형식을 확인해주세요.");
      return;
    } else if (previewBorder === true) {
      alert("소개글 형식을 확인해주세요.");
      return;
    } else if (contentBorder === true) {
      alert("본문 형식을 확인해주세요.");
      return;
    } else if (selectedTags.length === 0) {
      alert("태그 형식을 확인해주세요.");
      return;
    } else {
      const imageUrlOne = await uploadImage(imageFileOne);
      const imageUrlTwo = await uploadImage(imageFileTwo);
      const imageUrlThree = await uploadImage(imageFileThree);
      const imageUrlFour = await uploadImage(imageFileFour);
      const images = [
        { imageUrl: imageUrlOne },
        { imageUrl: imageUrlTwo },
        { imageUrl: imageUrlThree },
        { imageUrl: imageUrlFour },
      ].filter((image) => image.imageUrl !== null);

      const data: TrackCreateSubmitData = {
        agreePrivacyPolicy: consent,
        agreePublicTerms: consent,
        agreeTerms: consent,
        images: images,
        primaryImageUrl: primaryImageUrl,
        tags: tags,
        trackContent: trackContent,
        trackPreview: trackPreview,
        trackTitle: trackTitle,
        useAutoTranslate: consent,
      };

      try {
        const response = await axios.post("/v1/track/", data, {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });

        if (response.status === 200) {
          goToMyTrack();
        }
      } catch (error) {
        console.error("트랙 생성 반환 실패:", error);
      }
    }
  };

  return (
    <>
      <div className="TrackViewPageFrame">
        <div className="SeoulMainHeaderBox">
          <SeoulHeader></SeoulHeader>
          <HeaderTwo></HeaderTwo>
        </div>
        <div className="SeoulTrackCreatePageInner">
          <div className="SeoulMainBoxOne">
            <div className="SeoulMainTextBox">
              <div className="SeoulMainTextOne">
                트랙이 성공적으로 생성되었어요!
              </div>
              <div className="SeoulMainTextTwo">
                다 왔어요, 마지막 단계에요!
              </div>
            </div>
            <div className="TrackInitializationButton" onClick={goToSeoulMain}>
              마음에 들지 않아요, 이 트랙을 포기할게요.
            </div>
          </div>
          <div className="SeoulTrackBoxOne">
            <div className="SeoulTrackBoxTwo">
              <div className="SeoulTrackNameBox">
                <div className="SeoulTrackTextNameBox">
                  <SeoulTrackTextOne content="자동으로 생성된 트랙 명이에요. 수정할 수 있어요!" />
                  <SeoulTrackTextTwo
                    content={`${trackTitle.length} 자 / 30 자`}
                  />
                </div>
                <input
                  className={`SeoulTrackNameBoxInput ${
                    titleBorder ? "inputErrorTwo" : ""
                  }`}
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  style={{
                    border: titleBorder ? "1px solid red" : "",
                  }}
                ></input>
              </div>
              <div className="SeoulTrackIntroductionBox">
                <div className="SeoulTrackTextNameBox">
                  <SeoulTrackTextOne content="자동으로 생성된 트랙 소개글이에요. 수정할 수 있어요!" />
                  <SeoulTrackTextTwo
                    content={`${trackPreview.length} 자 / 50 자`}
                  />
                </div>
                <textarea
                  className={`SeoulTrackIntroductionTextArea ${
                    previewBorder ? "inputErrorTwo" : ""
                  }`}
                  value={trackPreview}
                  onChange={(e) => setTrackPreview(e.target.value)}
                  style={{
                    border: previewBorder ? "1px solid red" : "",
                  }}
                ></textarea>
              </div>
            </div>
            <div className="SeoulTrackContentBox">
              <div className="SeoulTrackTextNameBox">
                <SeoulTrackTextOne content="자동으로 생성된 트랙 본문이에요. 수정할 수 있어요!" />
                <SeoulTrackTextTwo
                  content={`${trackContent.length} 자 / 3000 자`}
                />
              </div>
              <textarea
                className={`SeoulTrackContentTextArea ${
                  contentBorder ? "inputErrorTwo" : ""
                }`}
                value={trackContent}
                onChange={(e) => setTrackContent(e.target.value)}
                style={{
                  border: contentBorder ? "1px solid red" : "",
                }}
              ></textarea>
            </div>
          </div>
          {/* 트랙 */}
          <div className="SeoulTrackTagsFrame">
            <SeoulTrackTextOne content="자동으로 생성된 트랙 명이에요. 수정할 수 있어요!" />
            <div className="SeoulTrackTagsInnerFrame">
              <div className="SeoulTrackTagsInnerFrameTwo">
                <div className="NewTrackContainerFiveInputBox">
                  <div className="HashBox">#</div>
                  {ShowTagTwoBox && (
                    <div className="HaskTagSelectFrame">
                      <div
                        className="HaskTagSelectFrameBoxOne"
                        onClick={ShowTagBoxChangeTwo}
                      >
                        <div className="HaskTagSelectButtonBox">
                          <div className="HaskTagSelectButtonText">
                            1개 이상의 태그를 선택해주세요 (최대 3개)
                          </div>
                          <img
                            className="TrackTagImg"
                            src="../../img/TrackTagImg.svg"
                            alt="오류"
                          ></img>
                        </div>
                      </div>
                      <div className="HaskTagSelectFrameBoxTwo">
                        <div className="HaskTagSelectFrameBoxTwoInner">
                          <div className="HaskTagSelectFrameContainerOne">
                            {tagsTwo.map((tagName) => (
                              <TagChoice
                                key={tagName}
                                tagName={tagName}
                                selected={selectedTags.includes(tagName)}
                                onClick={() => handleTagClick(tagName)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {ShowTagOneBox && (
                    <div
                      className="HaskTagSelectButton"
                      onClick={ShowTagBoxChange}
                    >
                      <div
                        className="HaskTagSelectButtonBox"
                        onClick={ShowTagBoxChange}
                      >
                        <div className="HaskTagSelectButtonText">
                          1개 이상의 태그를 선택해주세요 (최대 3개)
                        </div>
                        <img
                          className="TrackTagImg"
                          src="../../img/TrackTagImg.svg"
                          alt="오류"
                        ></img>
                      </div>
                    </div>
                  )}
                </div>
                <div className="TagedItemContainer">
                  {selectedTags.map((tagName) => (
                    <div key={tagName} className="TagedItem">
                      {tagName}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* 트랙 */}
          <div className="SeoulNewTrackContainerTwo">
            <div className="NewTrackContainerTwoInner">
              <div className="SeoulImageSelectTextBox">
                <SeoulTrackTextOne content="트랙에 알맞는 대표 이미지를 등록해 주세요.(필수)" />
                <SeoulTrackTextOne content="트랙에 알맞는 이미지가 더 있나요? 추가해 주세요!" />
              </div>
              <div className="NewTrackImageSelectContainer">
                {
                  <div
                    className="MainImageBox"
                    onClick={() =>
                      document.getElementById("imageInput")?.click()
                    }
                  >
                    {selectedMainImage ? (
                      <img
                        src={selectedMainImage.toString()}
                        alt="오류"
                        className="selectedMainImage"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 대표 이미지 추가" />
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactText">대표 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>
                }
                {/* 추가 이미지1 */}
                <div className="NewTrackAddImageContainer">
                  <div
                    className="NewTrackAddImageBoxOne"
                    onClick={() =>
                      document.getElementById("imageInputOne")?.click()
                    }
                  >
                    {selectedImageOne ? (
                      <img
                        src={selectedImageOne.toString()}
                        alt="오류"
                        className="selectedImageOne"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 이미지 추가" />{" "}
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactTextTwo">추가 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInputOne"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageOneChange}
                    />
                  </div>
                  {/* 추가 이미지2 */}
                  <div
                    className="NewTrackAddImageBoxOne"
                    onClick={() =>
                      document.getElementById("imageInputTwo")?.click()
                    }
                  >
                    {selectedImageTwo ? (
                      <img
                        src={selectedImageTwo.toString()}
                        alt="오류"
                        className="selectedImageTwo"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 이미지 추가" />{" "}
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactTextTwo">추가 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInputTwo"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageTwoChange}
                    />
                  </div>
                  {/* 추가 이미지3 */}
                  <div
                    className="NewTrackAddImageBoxOne"
                    onClick={() =>
                      document.getElementById("imageInputThree")?.click()
                    }
                  >
                    {selectedImageThree ? (
                      <img
                        src={selectedImageThree.toString()}
                        alt="오류"
                        className="selectedImageThree"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 이미지 추가" />{" "}
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactTextTwo">추가 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInputThree"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageThreeChange}
                    />
                  </div>
                  {/* 추가 이미지4 */}
                  <div
                    className="NewTrackAddImageBoxOne"
                    onClick={() =>
                      document.getElementById("imageInputFour")?.click()
                    }
                  >
                    {selectedImageFour ? (
                      <img
                        src={selectedImageFour.toString()}
                        alt="오류"
                        className="selectedImageFour"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 이미지 추가" />{" "}
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactTextTwo">추가 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInputFour"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageFourChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="SeoulTrackConsentButtonFrame">
            <div className="SeoulTrackConsentButtonFrameText">
              서비스 이용약관, 개인정보 처리방침, 트랙 서비스 이용약관
              <span className="SeoulTrackConsentButtonFrameTextTwo">
                에 동의하시나요?
              </span>
            </div>
            <div className="SeoulTrackConsentButtonBoxOne">
              <div
                className="SeoulTrackConsentButtonOne"
                style={{
                  backgroundColor: consent === true ? "#3876c0" : "#f7f7f7",
                }}
                onClick={() => setConsent(true)}
              >
                <div
                  className="SeoulTrackConsentButtonOneText"
                  style={{ color: consent === true ? "#FFF" : "#3876c0" }}
                >
                  네, 동의할게요.
                </div>
              </div>
              <div
                className="SeoulTrackConsentButtonOne"
                style={{
                  backgroundColor: consent === false ? "#3876c0" : "#f7f7f7",
                }}
                onClick={() => setConsent(false)}
              >
                <div
                  className="SeoulTrackConsentButtonOneText"
                  style={{ color: consent === false ? "#FFF" : "#3876c0" }}
                >
                  <p>아니요, 동의하지 않아요.</p>
                  <p>트랙을 생성할 수 없음</p>
                </div>
              </div>
            </div>
          </div>
          <div className="SeoulTrackCreateButtonFrame">
            <div
              className="SeoulNextStepButtonFrame"
              onClick={TrackCreateSubmitClick}
            >
              <div className="SeoulNextStepButtonCircle">
                <img
                  src="/img/SeoulBackIcon.svg"
                  alt="none"
                  className="SeoulNextIcon"
                />
              </div>
              <div className="SeoulNextStepButtonText">트랙 등록하기</div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default SeoulTrackCreatePage;
