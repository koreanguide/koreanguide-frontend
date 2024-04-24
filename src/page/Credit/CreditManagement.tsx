import React, { useState, useEffect } from "react";
import "./CreditManagement.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";
import cx from "classnames";
import LoadPage from "../LoadPage/LoadPage";
import SeoulHeader from "../../SeoulHeader";

function CreditManagement() {
  const token = sessionStorage.getItem("access-token");

  const [isLoading, setIsLoading] = useState(true);
  const [Amount, setAmount] = useState(0);
  const [creditData, setCreditData] = React.useState<any[]>([]);
  const [selectedTransactionType, setSelectedTransactionType] =
    React.useState<string>("전체");
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const [CreditManagementAlertShow, setCreditManagementAlertShow] =
    useState<boolean>(false);
  const [CreditManagementAmountShortfall, setCreditManagementAmountShortfall] =
    useState<boolean>(false);
  const [AccountRegisteredComponent, setAccountRegisteredComponent] =
    useState<boolean>(false);
  const [NoneAccountRegisteredComponent, setNoneAccountRegisteredComponent] =
    useState<boolean>(true);
  const [CancellationButton, setCancellationButton] = useState<boolean>(false);
  const [NoneTransactionData, setNoneTransactionData] =
    useState<boolean>(false);
  const [NoneTransactionDataShow, setNoneTransactionDataShow] =
    useState<boolean>(true);
  const [bankAccountNumber, setbankAccountNumber] =
    useState<string>("계좌번호를 입력해주세요");
  const [bankAccountProvider, setbankAccountProvider] =
    useState<string>("은행을 기입해주세요");
  const [name, setname] = useState<string>("");
  const [selectedBankShow, setselectedBankShow] = useState<Bank | null>(null);
  const [BankListBoxClick, setBankListBoxClick] = useState<boolean>(false);
  const [SelectedBank, setSelectedBank] = useState<boolean>(false);
  const [EarlySelectedBankState, setEarlySelectedBankState] =
    useState<boolean>(true);

  const [accountProvider, setAccountProvider] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountHolderName, setAccountHolderName] = useState<string>("");

  const [ShowSelectTransactionTypeBox, setShowSelectTransactionTypeBox] =
    useState<boolean>(false);
  const [RecentData, setRecentData] = useState<string>("");
  const [ShowUserCreditUsedHistory, setShowUserCreditUsedHistory] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const response = await axios.post(
          "/v1/credit/balance",
          {},
          {
            headers: {
              "X-AUTH-TOKEN": token,
            },
          }
        );
        setAmount(response.data.amount);
      } catch (error) {
        console.error("잔액 조회 오류: " + error);
      }
    };

    const LastProvision = async () => {
      try {
        const response = await axios.get("/v1/credit/refund", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });

        if (response.data.length === 0) {
          setNoneTransactionDataShow(true);
          setNoneTransactionData(false);
        } else {
          setNoneTransactionDataShow(false);
          setNoneTransactionData(true);
          setCreditData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const UsedHistory = async (): Promise<HistoryData[]> => {
      try {
        const response = await axios.get<HistoryData[]>("/v1/credit/history", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        if (response.data.length === 0) {
          setShowUserCreditUsedHistory(true);
        } else {
          setShowUserCreditUsedHistory(false);
        }
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const fetchHistory = async () => {
      const data = await UsedHistory();
      setHistoryData(data);
    };

    fetchHistory();

    const PaymentWay = async () => {
      try {
        const response = await axios.get("/v1/credit/bank", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        setAccountProvider(response.data.accountProvider);
        setAccountNumber(response.data.accountNumber);
        setAccountHolderName(response.data.accountHolderName);
        setNoneAccountRegisteredComponent(false);
        setAccountRegisteredComponent(true);
      } catch (error) {
        console.error(error);
        setNoneAccountRegisteredComponent(true);
        setAccountRegisteredComponent(false);
      }
    };

    const LastTransactionRequest = async () => {
      try {
        const response = await axios.get("/v1/credit/refund/recent", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        setRecentData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    Promise.all([
      fetchAmount(),
      LastProvision(),
      fetchHistory(),
      PaymentWay(),
      LastTransactionRequest(),
    ]).then(() => setIsLoading(false));
  }, [token]);

  if (isLoading) {
    return <LoadPage />;
  }

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

  interface RecentPaymentProps {
    data: {
      requestDate: string;
      amount: number;
      returningStatus: string;
    };
  }

  const RecentPayment: React.FC<RecentPaymentProps> = ({ data }) => {
    const date = new Date(data.requestDate);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    return (
      <div className="RecentPaymentFrame">
        <div className="RecentPaymentDate">{formattedDate}</div>
        <div className="RecentPaymentAmount">{data.amount}</div>
        <div className="RecentPaymentState">{data.returningStatus}</div>
      </div>
    );
  };

  type HistoryData = {
    amount: string;
    content: string;
    date: string;
    transactionType: string;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTransactionType(event.target.value);
  };

  let filteredData = historyData;
  if (selectedTransactionType !== "전체") {
    filteredData = historyData.filter(
      (data) => data.transactionType === selectedTransactionType
    );
  }

  type UseredHistoryInfoProps = {
    data: HistoryData;
    index: number;
  };

  const UseredHistoryInfo: React.FC<UseredHistoryInfoProps> = ({
    data,
    index,
  }) => {
    const isDeposit = data.transactionType === "입금";

    const date = new Date(data.date);
    const formattedDate = date.toISOString().split("T")[0];

    return (
      <div className="UseredHistoryInfoFrame">
        <div className="UseredHistoryInfoInner">
          <div className="UseredHistoryInfoNum">{index + 1}</div>
          <div
            className={cx("UseredHistoryInfoAmount", {
              "UseredHistoryInfoAcount-positive": isDeposit,
              "UseredHistoryInfoAcount-negative": !isDeposit,
            })}
          >
            {data.amount}
          </div>
          <div className="UseredHistoryInfoAcount">{data.content}</div>
          <div className="UseredHistoryInfoDate">{formattedDate}</div>
        </div>
        <div
          className={cx("TransactionType", {
            "TransactionType-deposit": isDeposit,
            "TransactionType-withdraw": !isDeposit,
          })}
        >
          {data.transactionType}
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

  const RegisterButtonClick = () => {
    setCancellationButton(true);
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };

  const CancellationButtonOnClick = () => {
    setCancellationButton(false);
    document.body.style.overflow = "auto";
  };

  const AccountDelete = async () => {
    setNoneAccountRegisteredComponent(true);
    setAccountRegisteredComponent(false);
    try {
      const response = await axios.delete("/v1/credit/bank", {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });
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

  const RealRegisterButtonClick = async () => {
    window.location.reload();

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
    } catch (error) {
      console.error("계좌등록 실패:", error);
    }
  };

  const BankItem: React.FC<Bank> = ({ name, value, img }) => {
    const handleClick = () => {
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

  type Bank = {
    name: string;
    value: string;
    img: string;
  };

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

  const BankList: React.FC = () => {
    return (
      <div>
        {banks.map((bank, index) => (
          <BankItem key={index} {...bank} />
        ))}
      </div>
    );
  };

  const BankLogoImg: React.FC = () => {
    const bank = banks.find((bank: Bank) => bank.value === accountProvider);
    const logo = bank ? bank.img : null;

    return logo ? (
      <img className="BankLogo" src={`../img/${logo}.svg`} alt="오류" />
    ) : null;
  };

  const TextBackName: React.FC = () => {
    const bank = banks.find((bank: Bank) => bank.value === accountProvider);
    const Massage = bank ? bank.name : null;

    return Massage ? <div className="textBackName">{Massage}</div> : null;
  };

  const TextSelectBankAgentClick = () => {
    setBankListBoxClick(true);
  };

  const UseredHistoryAllBoxClick = () => {
    if (ShowSelectTransactionTypeBox === true) {
      setShowSelectTransactionTypeBox(false);
    } else {
      setShowSelectTransactionTypeBox(true);
    }
  };

  return (
    <div className="creditManagementMainFrame">
      <SeoulHeader></SeoulHeader>
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
              <div className="lastPaymentText">{RecentData}</div>
            </div>
          </div>
          <div className="creditManagementFirstContainerInnerTwo">
            <div className="myIncomeAccount">{Amount.toLocaleString()}원</div>
          </div>
        </div>
        <div className="CreditManagementThridContainer">
          <div className="">
            <div className="CreditManagementThridContainerAlert">
              <div className="NonNotionBox">
                <img
                  className="NonNotion"
                  src="../img/nonNotion.svg"
                  alt="오류"
                />
                <div className="NonNotionText">등록된 공지사항이 없습니다.</div>
              </div>
            </div>
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
                      <BankLogoImg></BankLogoImg>
                      <TextBackName></TextBackName>
                      <div className="UserAccountText">
                        {accountNumber} {accountHolderName}
                      </div>
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
                  {creditData.map((data, index) => (
                    <RecentPayment key={index} data={data} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="CreditManagementFourContainer">
          <div className="UseredHistoryTextBox">
            <div className="TextUseredHistory">사용 내역</div>
            <div
              className="UseredHistoryAllBox"
              onClick={UseredHistoryAllBoxClick}
            >
              <select
                className="UseredHistoryAllText"
                onChange={handleSelectChange}
              >
                <option className="AllTransaction">전체</option>
                <option className="IncomeTransaction">입금</option>
                <option className="OutcomeTransaction">출금</option>
              </select>
            </div>
          </div>
          <div className="NoneUseredHistory">
            {filteredData.map((data, index) => (
              <UseredHistoryInfo key={index} data={data} index={index} />
            ))}
            {ShowUserCreditUsedHistory && (
              <div className="NoneUsedHistoryTextBox">
                <div className="NoneUsedHistoryText">
                  계좌 사용 내역이 존재하지 않습니다.
                </div>
              </div>
            )}
          </div>
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
