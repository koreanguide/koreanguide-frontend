import React, { useState, useEffect } from "react";
import "./ChatPage.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";
import LoadPage from "../LoadPage/LoadPage";
import SeoulHeader from "../../SeoulHeader";

interface ChatListProps {
  imgName: string;
  userName: string;
  userText: string;
  date: string;
}

const ChatListComponent: React.FC<ChatListProps> = ({
  imgName,
  userName,
  userText,
  date,
}) => {
  return (
    <div className="ChatListBoxOne">
      <div className="ChatListBoxTwo">
        <div className="PurpleLine"></div>
        <div className="ChatListBoxThree">
          <div className="ChatImgBox">
            <img
              className="ChatProfileImg"
              src={`../img/${imgName}.svg`}
              alt=""
            ></img>
          </div>
          <div className="ChatListUserName">{userName}</div>
          <div className="ChatListUserText">{userText}</div>
          <div className="ChatListDate">{date}</div>
        </div>
      </div>
    </div>
  );
};

interface ChatMainProfileProps {
  imgName: string;
  userName: string;
  time: string;
}

const ChatMainProfile: React.FC<ChatMainProfileProps> = ({
  imgName,
  userName,
  time,
}) => {
  return (
    <div className="ChatMainProfileFrame">
      <div className="ChatMainImgBox">
        <img
          className="ChatMainProfileImg"
          src={`../img/${imgName}.svg`}
          alt=""
        ></img>
      </div>
      <div className="ChatMainUserName">KOREAN GUIDE</div>
      <div className="ChatMainLastUse">현재 활동중</div>
    </div>
  );
};

const ChatTimeInfoProps = () => {
  return (
    <div className="ChatTimeInfoPropsFrame">
      <img
        className="ChatTimeInfoPropsImg"
        src={`../img/night.svg`}
        alt=""
      ></img>
      <div className="TimeAnnouncementText">심야안내</div>
      <div className="TimeExactAnnouncementText">
        상대방의 현지 시간은 오전 2시입니다.
      </div>
    </div>
  );
};

interface ChatList {
  chatRoomId: string;
  profileUrl: string;
  name: string;
  lastMessage: string;
  lastTalkedAt: string;
}

function ChatPage() {
  const [inputText, setInputText] = useState("");
  const [chatTexts, setChatTexts] = useState<string[]>([]);
  const [timeStr, setTimeStr] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatList, setChatList] = useState<ChatList[]>([]);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await axios.get("/v1/chat/list", {
          headers: {
            "X-AUTH-TOKEN": sessionStorage.getItem("access-token"),
          },
        });

        setChatList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChatList();
  }, []);

  if (loading) {
    return <LoadPage />;
  }

  const formatDate = (dateStr: string) => {
    if (dateStr === "알 수 없음") return dateStr;
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleButtonClick = () => {
    if (!inputText) return;
    setChatTexts((prevChatTexts) => [...prevChatTexts, inputText]);
    setInputText("");

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    setTimeStr(`${hours}:${minutes}`);

    console.log(timeStr);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    setTimeStr(`${hours}:${minutes}`);

    console.log(timeStr);
  };

  return (
    <div className="ChatFrame">
      <SeoulHeader></SeoulHeader>
      <HeaderTwo></HeaderTwo>
      <div className="ChatBox">
        <div className="ChatSideBox">
          <div className="ChatSideTopBox">
            <div className="ChatSideTopBoxText">채팅</div>
            <div className="ChatSideTopBoxTwo">
              <img className="CPI-1" src="../img/CPI-1.svg" alt="error"></img>
              <div className="ChatSideTopBoxTwoText">최근 순</div>
            </div>
          </div>
          <div className="ChatSideBoxTwo">
            <div className="ChatSideBoxTwoInner">
              <div className="ChatSideBoxTwoInnerline"></div>
              <div className="ChatSideBoxTwoImgBox">
                <img
                  className="ChatSideBoxTwoImg"
                  src="../img/OnlyWhiteLogoImg.svg"
                  alt="error"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
