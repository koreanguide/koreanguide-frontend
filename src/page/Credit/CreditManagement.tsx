import React, { useState, useEffect } from "react";
import "./CreditManagement.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";

function CreditManagement() {
  const token = sessionStorage.getItem("access-token");

  useEffect(() => {
    if (token === null) {
      console.log("세션 스토리지에 토큰이 없습니다.");
      return;
    } else {
      console.log("토큰", token);
    }

    const fetchAmount = async () => {
      try {
        const response = await axios.get("/v1/credit/", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("잔액조회", response.data);
        setAmount(response.data.amount);
      } catch (error) {
        console.error(error);
      }
    };

    const LastProvision = async () => {
      try {
        const response = await axios.get("/v1/credit/refund", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("지급조회", response.data);

        if (response.data.length === 0) {
          setNoneTransactionDataShow(true);
          setNoneTransactionData(false);
        } else {
          setNoneTransactionDataShow(false);
          setNoneTransactionData(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const UsedHistory = async () => {
      try {
        const response = await axios.get("/v1/credit/history", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("사용내역", response.data);
        setHistoryAmount(response.data[0].amount);
        setHistoryInfoAcount(response.data[0].content);
        setHistoryInfoDate(response.data[0].date);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAmount();
    LastProvision();
    UsedHistory();
  }, [token]);

  const [Amount, setAmount] = useState(80000);

  interface GaugeBarProps {
    value: number;
  }

  const ShowAmount = Amount > 80000 ? false : true;

  const GaugeBar: React.FC<GaugeBarProps> = ({ value }) => {
    value = Amount >= 100000 ? 100 : value;
    const progress = Amount < 10000 ? "10%" : `${value}%`;
    const progressStyle = {
      width: progress,
    };

    return (
      <div className="GaudeBarFrame">
        <div className="GaugeBarProgress" style={progressStyle}>
          <p>{Amount.toLocaleString()}원</p>
        </div>
      </div>
    );
  };

  const RecentPayment = () => {
    return (
      <div className="RecentPaymentFrame">
        <div className="RecentPaymentDate">2023.09.11 16:18</div>
        <div className="RecentPaymentAmount">150,000원</div>
        <div className="RecentPaymentState">요청</div>
      </div>
    );
  };

  const [HistoryAmount, setHistoryAmount] = useState<string>("");
  const [HistoryInfoAcount, setHistoryInfoAcount] = useState<string>("");
  const [HistoryInfoDate, setHistoryInfoDate] = useState<string>("");

  const UseredHistoryInfo = () => {
    return (
      <div className="UseredHistoryInfoFrame">
        <div className="UseredHistoryInfoInner">
          <div className="UseredHistoryInfoNum">5</div>
          <div className="UseredHistoryInfoAmount">{HistoryAmount}</div>
          <div className="UseredHistoryInfoAcount">{HistoryInfoAcount}</div>
          <div className="UseredHistoryInfoDate">{HistoryInfoDate}</div>
        </div>
      </div>
    );
  };

  interface CreditManagementAlertProps {
    message: string;
  }

  const CreditManagementAlert: React.FC<CreditManagementAlertProps> = (
    props
  ) => {
    return (
      <div className="creditManagementAlert">
        <img
          className="creditManagementAlertImg"
          src="../img/alertImg.svg"
          alt="오류"
        />
        <div className="creditManagementAlertMassage">{props.message}</div>
      </div>
    );
  };

  const [CreditManagementAlertShow, setCreditManagementAlertShow] =
    useState<boolean>(false);
  const [CreditManagementAmountShortfall, setCreditManagementAmountShortfall] =
    useState<boolean>(false);

  const refundApplication = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "/v1/credit/refund",
        headers: {
          "X-AUTH-TOKEN": token,
        },
        params: {
          amount: Amount,
        },
      });
      console.log("크레딧 환급신청 성공", response.data);
      setCreditManagementAlertShow(false);
      setCreditManagementAmountShortfall(false);
    } catch (error) {
      if (Amount < 100000) {
        setCreditManagementAmountShortfall(true);
      } else {
        console.error("크레딧 환급신청 실패", error);
        setCreditManagementAlertShow(true);
      }
    }
  };
  const [AccountRegisteredComponent, setAccountRegisteredComponent] =
    useState<boolean>(true);
  const [NoneAccountRegisteredComponent, setNoneAccountRegisteredComponent] =
    useState<boolean>(false);

  const RegisterButtonClick = () => {
    console.log("등록하기 버튼 클릭");
    setCancellationButton(true);
  };

  const [CancellationButton, setCancellationButton] = useState<boolean>(false);
  const CancellationButtonOnClick = () => {
    setCancellationButton(false);
  };

  const [NoneTransactionData, setNoneTransactionData] =
    useState<boolean>(false);
  const [NoneTransactionDataShow, setNoneTransactionDataShow] =
    useState<boolean>(true);

  const AccountDelete = async () => {
    setNoneAccountRegisteredComponent(true);
    setAccountRegisteredComponent(false);
    try {
      const response = await axios.delete("/v1/credit/bank", {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });
      console.log("계좌삭제 성공", response.data);
      setNoneAccountRegisteredComponent(true);
      setAccountRegisteredComponent(false);
      window.location.reload();
    } catch (error) {
      console.error("계좌삭제 실패:", error);
    }
  };

  interface RegisterData {
    bankAccountNumber: string;
    bankAccountProvider: string;
    name: string;
  }

  const [bankAccountNumber, setbankAccountNumber] =
    useState<string>("94160201519981");
  const [bankAccountProvider, setbankAccountProvider] =
    useState<string>("KOOKMIN");
  const [name, setname] = useState<string>("김찬주");

  const RealRegisterButtonClick = async () => {
    console.log(bankAccountNumber);
    console.log(bankAccountProvider);
    console.log(name);

    const data: RegisterData = {
      bankAccountNumber: bankAccountNumber,
      bankAccountProvider: bankAccountProvider,
      name: name,
    };
    try {
      const response = await axios.post("/v1/credit/bank", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("계좌등록", response.data);
      }
    } catch (error) {
      console.error("계좌등록 실패:", error);
    }
  };

  type Bank = {
    name: string;
    value: string;
    img: string;
  };

  const [selectedBankShow, setselectedBankShow] = useState<Bank | null>(null);

  const BankItem: React.FC<Bank> = ({ name, value, img }) => {
    const handleClick = () => {
      console.log(value);
      setBankListBoxClick(false);
      setbankAccountProvider(value);
      setSelectedBank(true);
      setEarlySelectedBankState(false);
      setselectedBankShow({ name, value, img });
    };

    return (
      <div onClick={handleClick} className="BankNameAndLogoFrame">
        <img className="BankLogo" src={`../img/${img}.svg`} alt={name} />
        <div className="BankCompanyName">{name}</div>
      </div>
    );
  };

  const BankList: React.FC = () => {
    const banks: Bank[] = [
      { name: "경남은행", value: "KYONGNAMBANK", img: "1" },
      { name: "광주은행", value: "GWANGJUBANK", img: "2" },
      { name: "새마을금고", value: "SAEMAUL", img: "3" },
      { name: "산림조합", value: "SANLIM", img: "4" },
      { name: "신한은행", value: "SHINHAN", img: "5" },
      { name: "신협은행", value: "SHINHYEOP", img: "6" },
      { name: "씨티은행", value: "CITI", img: "7" },
      { name: "우리은행", value: "WOORI", img: "8" },
      { name: "우체국예금보험", value: "POST", img: "9" },
      { name: "저축은행중앙회", value: "SAVINGBANK", img: "10" },
      { name: "카카오뱅크", value: "KAKAOBANK", img: "11" },
      { name: "토스뱅크", value: "TOSSBANK", img: "12" },
      { name: "하나은행", value: "HANA", img: "13" },
      { name: "IBK기업은행", value: "IBK", img: "14" },
      { name: "KB국민은행", value: "KOOKMIN", img: "15" },
      { name: "DGB대구은행", value: "DAEGUBANK", img: "16" },
      { name: "KDB산업은행", value: "KDBBANK", img: "17" },
      { name: "NH농협은행", value: "NONGHYEOP", img: "18" },
      { name: "SC제일은행", value: "SC", img: "19" },
      { name: "Sh수협은행", value: "SUHYEOP", img: "20" },
    ];

    return (
      <div>
        {banks.map((bank, index) => (
          <BankItem key={index} {...bank} />
        ))}
      </div>
    );
  };

  const [BankListBoxClick, setBankListBoxClick] = useState<boolean>(false);
  const TextSelectBankAgentClick = () => {
    setBankListBoxClick(true);
  };

  const [SelectedBank, setSelectedBank] = useState<boolean>(false);
  const [EarlySelectedBankState, setEarlySelectedBankState] =
    useState<boolean>(true);

  return (
    <div className="creditManagementMainFrame">
      <HeaderTwo></HeaderTwo>
      <div className="creditManagementInner">
        <div className="textCreditManagement">크레딧 관리</div>
        {CreditManagementAlertShow && (
          <CreditManagementAlert message="환급 요청을 완료할 수 없습니다. 오류가 계속되면 관리자에게 문의하십시오."></CreditManagementAlert>
        )}
        {CreditManagementAmountShortfall && (
          <CreditManagementAlert message="최소 환급 금액에 도달하지 않았습니다. 환급을 요청하려면 100,000원 이상의 크레딧이 필요합니다."></CreditManagementAlert>
        )}
        <div className="CreditManagementFirstContainer">
          <div className="CreditManagementFirstContainerInnerOne">
            <div className="textMyIncomeContainer">
              <div className="textMyIncome">내 수입</div>
              <div className="textMyIncomeContainerLine"></div>
              <div
                className="refundApplicationButton"
                onClick={refundApplication}
              >
                <div className="refundApplicationButtonText">환급요청하기</div>
                <img
                  className="refundImg"
                  src="../img/ref;undApplicationButtonImg.svg"
                  alt="오류"
                />
              </div>
            </div>
            <div className="textMyIncomeSurv">
              100,000원 이상 달성 시 계좌 지급 신청 가능
            </div>
            <GaugeBar value={Amount / 1000}></GaugeBar>
            <div className="amountDisplay">
              <p>0원</p>
              {ShowAmount && <p>100,000원</p>}
            </div>
            <div className="lastPaymentContainer">
              <img className="calImg" src="../img/cal.svg" alt="오류" />
              <div className="lastPaymentText">
                2023년 9월 11일, 오후 4시 18분에 마지막 결제 됨
              </div>
            </div>
          </div>
          <div className="creditManagementFirstContainerInnerTwo">
            <div className="myIncomeAccount">{Amount.toLocaleString()}원</div>
          </div>
        </div>
        <div className="CreditManagementThridContainer">
          <div className="">
            <div className="CreditManagementThridContainerAlert"></div>
            <div className="CreditManagementSecondContainer">
              <div className="CreditManagementBankContainerText">지급 방법</div>
              <div className="CreditManagementBankContainer">
                {NoneAccountRegisteredComponent && (
                  <div className="NoneAcountRegister">
                    <div className="NoneAcountRegisterText">
                      결제 계좌가 아직 등록되지 않았어요. 계좌를 등록해 주세요.
                    </div>
                    <div
                      className="RegisterButton"
                      onClick={RegisterButtonClick}
                    >
                      <div>등록하기</div>
                      <img
                        className="RegisterButtonImg"
                        src="../img/RegisterButton.svg"
                        alt="오류"
                      />
                    </div>
                  </div>
                )}
                {AccountRegisteredComponent && (
                  <div className="CreditManagementBankInnerContainer">
                    <div className="BankIconBox">
                      <img
                        className="BankIcon"
                        src="../img/BankIcon.svg"
                        alt="오류"
                      />
                    </div>
                    <div className="BankMarkBox">
                      <img
                        className="BankLogo"
                        src="../img/BankLogo.svg"
                        alt="오류"
                      />
                      <div className="textBackName">신한은행</div>
                      <div className="UserAccountText">000000000000 김찬주</div>
                      <div className="CreditManagementButtonBox">
                        <div
                          className="ChangeBUtton"
                          onClick={RegisterButtonClick}
                        >
                          변경
                        </div>
                        <div className="RemoveButton" onClick={AccountDelete}>
                          삭제
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="CreditManagementFiveContainer">
            <div className="CreditManagementSecondContainerText">
              크레딧 환급 상태
            </div>
            {NoneTransactionDataShow && (
              <div className="NoneTransactionDataFrame">
                <div className="NoneTransactionDataText">
                  가이드 활동을 진행한 후, 얻은 수익의 결제 내역이 아직 없어요.
                </div>
              </div>
            )}
            {NoneTransactionData && (
              <div className="CreditManagementSecondInnerContainer">
                <div className="CreditManagementStateMenuBox">
                  <p>일시</p>
                  <p>금액</p>
                  <p>상태</p>
                </div>
                <div className="CreditManagementStateBox">
                  <RecentPayment></RecentPayment>
                  <RecentPayment></RecentPayment>
                  <RecentPayment></RecentPayment>
                  <RecentPayment></RecentPayment>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="CreditManagementFourContainer">
          <div className="UseredHistoryTextBox">
            <div className="TextUseredHistory">사용 내역</div>
            <div className="UseredHistoryAllBox">
              <div className="UseredHistoryAllText">전체</div>
              <img className="AllBTN" src="../img/AllBTN.svg" alt="오류" />
            </div>
          </div>
          <div className="NoneUseredHistory"></div>
          <div className=""></div>
          <UseredHistoryInfo></UseredHistoryInfo>
          <UseredHistoryInfo></UseredHistoryInfo>
          <UseredHistoryInfo></UseredHistoryInfo>
          <UseredHistoryInfo></UseredHistoryInfo>
          <UseredHistoryInfo></UseredHistoryInfo>
        </div>
      </div>
      {CancellationButton && (
        <div className="AccountRegisterAndFixFrame">
          <div className="AccountRegisterAndFixFrameInner">
            <div className="TextAddAccountAndFix">결제 계좌 추가 및 변경</div>
            <div className="NotionAddAcountBox">
              <img
                className="AddAccountAlertImg"
                src="../img/AddAccountAlertImg.svg"
                alt="오류"
              />
              <div className="NotionAddAcountBoxText">
                은행사, 계좌번호, 예금주 모두가 일치해야 등록이 가능합니다.
              </div>
            </div>
            <div className="SelectBankFrame">
              <div className="TextBankAgent">
                은행사 <span>*</span>
              </div>
              <div className="SelectBankList">
                {BankListBoxClick && (
                  <div className="BankListBox">
                    <BankList></BankList>
                  </div>
                )}
                {SelectedBank && (
                  <div
                    className="SelectedBankFrame"
                    onClick={TextSelectBankAgentClick}
                  >
                    <img
                      className="BankLogo"
                      src={`../img/${selectedBankShow?.img}.svg`}
                      alt="오류"
                    />
                    <div className="BankCompanyNameFrame">
                      <div className="BankCompanyName">
                        {selectedBankShow?.name}
                      </div>
                    </div>
                    <img
                      onClick={TextSelectBankAgentClick}
                      className="BankAgentReSelectImg"
                      src="../img/BankAgentSelectImg.svg"
                      alt="오류"
                    />
                  </div>
                )}
                {EarlySelectedBankState && (
                  <>
                    <div
                      className="TextSelectBankAgent"
                      onClick={TextSelectBankAgentClick}
                    >
                      은행을 선택해 주세요.
                    </div>
                    <img
                      onClick={TextSelectBankAgentClick}
                      className="BankAgentSelectImg"
                      src="../img/BankAgentSelectImg.svg"
                      alt="오류"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="AddAccountAndHolder">
              <div className="AccountTypeFrame">
                <div className="AccountTypeFrameTextAccount">
                  계좌번호 <span> *</span>
                </div>
                <input
                  className="AccountTypeFrameAccountInput"
                  placeholder="계좌번호를 입력해주세요"
                  onChange={(e) => setbankAccountNumber(e.target.value)}
                ></input>
              </div>
              <div className="AddHolderFrame">
                <div className="AccountTypeFrameTextAccount">
                  예금주 <span> *</span>
                </div>
                <input
                  className="HolderInput"
                  type="text"
                  placeholder="예금주"
                  onChange={(e) => setname(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="AccountRegisterButtonContainer">
              <div
                className="CancellationButton"
                onClick={CancellationButtonOnClick}
              >
                취소
              </div>
              <div
                className="AccountRegisterButton"
                onClick={RealRegisterButtonClick}
              >
                등록
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreditManagement;
