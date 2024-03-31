import React, { useState, useEffect } from "react";
import "./ChatPage.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";
import LoadPage from "../LoadPage/LoadPage";

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
      <div className="ChatMainUserName">{userName}</div>
      <div className="ChatMainLastUse">{time}시간전 활동</div>
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
            "X-AUTH-TOKEN": sessionStorage.getItem("access-token")
          }
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
      <HeaderTwo></HeaderTwo>
      <div className="ChatBox">
        <div className="ChatInfoFrame">
          <div className="ChatInfoHeaderFrame">
            <div className="ChatInfoHeaderFrameBoxOne">
              <div className="TextChat">Chat</div>
              <div className="NewestBox">
                <img className="NewestImg" src="../img/newest.svg" alt=""></img>
                <div className="TestNewest">Newest</div>
              </div>
            </div>
          </div>
          <div className="ChatListFrame">
            {chatList.map((chat) => (
              <ChatListComponent
                key={chat.chatRoomId}
                imgName={chat.profileUrl === "DEFAULT" ? "NormalProfile" : chat.profileUrl}
                userName={chat.name}
                userText={chat.lastMessage}
                date={formatDate(chat.lastTalkedAt)}
              />
            ))}
          </div>
        </div>
        <div className="ChatMainFrame">
          <div className="ChatMainHeader">
            <ChatMainProfile
              imgName="profile2"
              userName="Chanju Kim"
              time="3"
            ></ChatMainProfile>
            <div className="MuteAndInfoBox">
              <div className="MuteBox">
                <img className="MuteImg" src="../img/mute.svg" alt=""></img>
                <div className="TextMute">차단</div>
              </div>
              <div className="InfoBox">
                <img className="InfoImg" src="../img/info.png" alt=""></img>
                <div className="TextInfo">정보</div>
              </div>
            </div>
          </div>
          <div className="ChatTimeInfoFrame">
            <ChatTimeInfoProps></ChatTimeInfoProps>
          </div>
          <div className="MassageTextinfoFrame">
            <div className="MassageTextInputBox">
              <img
                className="plusButtonImg"
                src="../img/plusButton.svg"
                alt=""
              ></img>
              <input
                type="text"
                className="MassageTextInput"
                placeholder="여기에 체팅을 입력하세요!"
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              ></input>
              <img
                className="textButtonImg"
                src="../img/textButton.svg"
                alt=""
                onClick={handleButtonClick}
              ></img>
            </div>
            <div className="MessageHistoryFrame">
              {chatTexts.map((text, index) => (
                <div className="BigMassageTextBox">
                  <div className="MassageTextBoxTimeBox">
                    <div className="MassageTextBoxTime">{timeStr}</div>
                  </div>
                  <div className="MassageTextBox" key={index}>
                    <div className="MassageTextBoxText">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
