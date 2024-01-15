import React, { useState, useEffect } from "react";
import "./CreditManagement.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";

function CreditManagement() {
  const [bankAccountNumber, setbankAccountNumber] =
    useState<string>("000000000000");
  const [bankAccountProvider, setbankAccountProvider] =
    useState<string>("KYONGNAMBANK");
  const [name, setname] = useState<string>("홍길동");

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");

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
      } catch (error) {
        console.error(error);
      }
    };

    const UserAccount = async () => {
      setbankAccountNumber("94160201519981");
      setbankAccountProvider("KYONGNAMBANK");
      setname("김찬주");
      try {
        const response = await axios.post(
          "/v1/credit/bank",
          {
            bankAccountNumber: bankAccountNumber,
            bankAccountProvider: bankAccountProvider,
            name: name,
          },
          {
            headers: {
              "X-AUTH-TOKEN": token,
            },
          }
        );
        console.log("계좌등록", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const UserAccountDelete = async () => {
      try {
        const response = await axios.delete("/v1/credit/bank", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("계좌삭제", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const UserRefundApplication = async () => {
      try {
        const response = await axios.post("/v1/credit/refund", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
          params: {
            amount: 50000,
          },
        });
        console.log("환급신청", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAmount();
    LastProvision();
    UsedHistory();
    UserAccount();
    UserAccountDelete();
    UserRefundApplication();
  }, []);

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
      </div>
    );
  };

  const UseredHistoryInfo = () => {
    return (
      <div className="UseredHistoryInfoFrame">
        <div className="UseredHistoryInfoInner">
          <div className="UseredHistoryInfoNum">5</div>
          <div className="UseredHistoryInfoAmount">-10,000</div>
          <div className="UseredHistoryInfoAcount">계좌로 크레딧 출금</div>
          <div className="UseredHistoryInfoDate">
            2023년 9월 21일 오후 12시 10분
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="creditManagementMainFrame">
      <HeaderTwo></HeaderTwo>
      <div className="creditManagementInner">
        <div className="textCreditManagement">크레딧 관리</div>
        <div className="CreditManagementFirstContainer">
          <div className="CreditManagementFirstContainerInnerOne">
            <div className="textMyIncome">내 수입</div>
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
          <div className="CreditManagementSecondContainer">
            <div className="CreditManagementSecondContainerText">최근 지급</div>
            <div className="CreditManagementSecondInnerContainer">
              <RecentPayment></RecentPayment>
              <RecentPayment></RecentPayment>
              <RecentPayment></RecentPayment>
              <RecentPayment></RecentPayment>
            </div>
          </div>
          <div className="CreditManagementSecondContainer">
            <div className="CreditManagementBankContainerText">지급 방법</div>
            <div className="CreditManagementBankContainer">
              <div className="CreditManagementBankInnerContainer">
                <div className="BankMarkBox">
                  <img
                    className="BankLogo"
                    src="../img/BankLogo.svg"
                    alt="오류"
                  />
                  <div className="textBackName">신한은행</div>
                  <div className="UserAccountText">000000000000 김찬주</div>
                </div>
                <div className="BankIconBox">
                  <img
                    className="BankIcon"
                    src="../img/BankIcon.svg"
                    alt="오류"
                  />
                </div>
              </div>
              <div className="CreditManagementButtonBox">
                <div className="ChangeBUtton">변경</div>
                <div className="RemoveButton">삭제</div>
              </div>
            </div>
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
          <div className=""></div>
          <UseredHistoryInfo></UseredHistoryInfo>
          <UseredHistoryInfo></UseredHistoryInfo>
          <UseredHistoryInfo></UseredHistoryInfo>
          <UseredHistoryInfo></UseredHistoryInfo>
          <UseredHistoryInfo></UseredHistoryInfo>
        </div>
      </div>
    </div>
  );
}

export default CreditManagement;
