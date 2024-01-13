import React, { useState } from "react";
import "./CreditManagement.css";
import HeaderTwo from "../../HeaderTwo";

function CreditManagement() {
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
      </div>
    </div>
  );
}

export default CreditManagement;
