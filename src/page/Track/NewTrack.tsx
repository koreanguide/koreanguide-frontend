import React, { useState, useEffect } from "react";
import "./NewTrack.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";

function NewTrackpage() {
  const token = sessionStorage.getItem("access-token");

  const [ShowNotificationFirst, setShowNotificationFirst] =
    useState<boolean>(true);
  const [ShowNotificationSecond, setShowNotificationSecond] =
    useState<boolean>(true);
  const [FirstCheck, setFirstCheck] = useState<boolean>(false);
  const [SecondCheck, setSecondCheck] = useState<boolean>(false);
  const [ThirdCheck, setThirdCheck] = useState<boolean>(false);
  const [FirstCheckImg, setFirstCheckImg] = useState<string>(
    "../img/purpleCircle.svg"
  );
  const [SecondCheckImg, setSecondCheckImg] = useState<string>(
    "../img/purpleCircle.svg"
  );
  const [ThirdCheckImg, setThirdCheckImg] = useState<string>(
    "../img/purpleCircle.svg"
  );
  const [images, setImages] = useState<Image[]>([{ imageUrl: "images" }]);
  const [primaryImageUrl, setPrimaryImageUrl] = useState<string>("images");
  const [tags, setTags] = useState<Tag[]>([{ tagName: "tag1" }]);
  const [trackContent, setTrackContent] = useState<string>("images");
  const [trackPreview, setTrackPreview] = useState<string>("images");
  const [trackTitle, setTrackTitle] = useState<string>("images");
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
  }

  const uploadImage = async (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/v1/file/", formData, {
        headers: {
          "X-AUTH-TOKEN": token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    }

    return null;
  };

  const TrackCreateSubmitClick = async () => {
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
      agreePrivacyPolicy: FirstCheck,
      agreePublicTerms: SecondCheck,
      agreeTerms: ThirdCheck,
      images: images,
      primaryImageUrl: primaryImageUrl,
      tags: tags,
      trackContent: trackContent,
      trackPreview: trackPreview,
      trackTitle: trackTitle,
    };

    try {
      const response = await axios.post("/v1/track/", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("트랙 생성 반환:", response.data);
      }
    } catch (error) {
      console.error("트랙 생성 반환 실패:", error);
    }
  };

  const FirstCheckBoxCheck = () => {
    setFirstCheck(!FirstCheck);
  };

  const SecondCheckBoxCheck = () => {
    setSecondCheck(!SecondCheck);
  };

  const ThirdCheckBoxCheck = () => {
    setThirdCheck(!ThirdCheck);
  };

  useEffect(() => {
    if (FirstCheck) {
      setFirstCheckImg("../img/purpleCircleCheck.svg");
    } else {
      setFirstCheckImg("../img/purpleCircle.svg");
    }

    if (SecondCheck) {
      setSecondCheckImg("../img/purpleCircleCheck.svg");
    } else {
      setSecondCheckImg("../img/purpleCircle.svg");
    }

    if (ThirdCheck) {
      setThirdCheckImg("../img/purpleCircleCheck.svg");
    } else {
      setThirdCheckImg("../img/purpleCircle.svg");
    }

    if (FirstCheck && SecondCheck && ThirdCheck) {
      setShowNotificationFirst(false);
    } else {
      setShowNotificationFirst(true);
    }
  }, [FirstCheck, SecondCheck, ThirdCheck]);

  interface NewTrackContainerPropsOneI {
    Title: string;
    TitleSub: string;
    children: any;
  }
  const NewTrackContainerPropsOne: React.FC<NewTrackContainerPropsOneI> = ({
    Title,
    children,
    TitleSub,
  }) => {
    return (
      <div className="NewTrackContainerPropsOne">
        <div className="NewTrackContainerTitleBox">
          <div className="NewTrackContainerTitle">{Title}</div>
          {children}
        </div>
        <div className="NewTrackContainerTitleSupplementBox">{TitleSub}</div>
      </div>
    );
  };

  interface NewTrackImageComponentProps {
    text: string;
  }

  const NewTrackImageComponent: React.FC<NewTrackImageComponentProps> = ({
    text,
  }) => {
    return (
      <div className="NewTrackImageComponentFrame">
        <img className="plusImg" src="../img/plusImg.svg" alt="오류"></img>
        <div className="NewTrackImageComponentText">{text}</div>
      </div>
    );
  };

  // 대표 이미지

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setShowNotificationSecond(false);
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

  //추가 이미지

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

  return (
    <div>
      <HeaderTwo></HeaderTwo>
      <div className="NewTrackpage">
        <div className="NewTrackpageInner">
          <div className="TextAddNewTrack">새 트랙 추가</div>
          <div className="NewTrackContainerOne">
            <div className="NewTrackContainerOneInner">
              <NewTrackContainerPropsOne
                Title="이용약관에 동의해 주세요"
                TitleSub="새 트랙을 추가를 시작하기 전, 아래 내용을 반드시 동의해야 합니다."
              >
                {ShowNotificationFirst && (
                  <div className="NewTrackContainerNotificationBox">
                    <img
                      className="RedNotificationImg"
                      src="../img/RedNotification.svg"
                      alt="오류"
                    ></img>
                    <div className="RedNotificationText">
                      모든 이용약관에 동의해야 합니다
                    </div>
                  </div>
                )}
              </NewTrackContainerPropsOne>
              <div className="NewTrackCheckBoxContainer">
                <div className="NewTrackCheckBox" onClick={FirstCheckBoxCheck}>
                  <img
                    className="purpleCircleImg"
                    src={FirstCheckImg}
                    alt="오류"
                  ></img>
                  <div className="NewTrackCheckBoxText">
                    <span className="NewTrackCheckBoxTextSpan">
                      서비스 이용약관
                    </span>
                    에 동의합니다.
                  </div>
                </div>
                <div className="NewTrackCheckBox" onClick={SecondCheckBoxCheck}>
                  <img
                    className="purpleCircleImg"
                    src={SecondCheckImg}
                    alt="오류"
                  ></img>
                  <div className="NewTrackCheckBoxText">
                    <span className="NewTrackCheckBoxTextSpan">
                      개인정보 처리방침
                    </span>
                    에 동의합니다.
                  </div>
                </div>
                <div className="NewTrackCheckBox" onClick={ThirdCheckBoxCheck}>
                  <img
                    className="purpleCircleImg"
                    src={ThirdCheckImg}
                    alt="오류"
                  ></img>
                  <div className="NewTrackCheckBoxText">
                    <span className="NewTrackCheckBoxTextSpan">
                      트랙 서비스 이용약관
                    </span>
                    에 동의합니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="NewTrackContainerTwo">
            <div className="NewTrackContainerTwoInner">
              <NewTrackContainerPropsOne
                Title="트랙을 잘 소개할 수 있는 이미지를 선택해 주세요."
                TitleSub="트랙의 이미지를 첨부해 주세요. 대표 이미지는 반드시 업로드가 필요합니다."
              >
                {ShowNotificationSecond && (
                  <div className="NewTrackContainerNotificationBox">
                    <img
                      className="RedNotificationImg"
                      src="../img/RedNotification.svg"
                      alt="오류"
                    ></img>
                    <div className="RedNotificationText">
                      대표 이미지가 첨부되지 않았습니다
                    </div>
                  </div>
                )}
              </NewTrackContainerPropsOne>
              <div className="ImageSelectTextBox">
                <div className="MainImageText">대표 이미지</div>
                <div className="SubImageText">추가 이미지</div>
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
                      <NewTrackImageComponent text="새 대표 이미지 추가" />
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
                      <NewTrackImageComponent text="새 이미지 추가" />
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
                      <NewTrackImageComponent text="새 이미지 추가" />
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
                      <NewTrackImageComponent text="새 이미지 추가" />
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
                      <NewTrackImageComponent text="새 이미지 추가" />
                    )}
                    <input
                      id="imageInputFour"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageFourChange}
                    />
                  </div>

                  {/* <div className="NewTrackAddImageBoxOne">
                    <NewTrackImageComponent text="새 이미지 추가" />
                  </div>
                  <div className="NewTrackAddImageBoxOne">
                    <NewTrackImageComponent text="새 이미지 추가" />
                  </div>
                  <div className="NewTrackAddImageBoxOne">
                    <NewTrackImageComponent text="새 이미지 추가" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <button onClick={TrackCreateSubmitClick}>버튼</button>
        </div>
      </div>
    </div>
  );
}

export default NewTrackpage;
