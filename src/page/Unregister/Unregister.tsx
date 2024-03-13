import React, { useState, useEffect } from "react";
import HeaderTwo from "../../HeaderTwo";
import "./Unregister.css";
import axios from "axios";

function UnregisterPage() {
  return (
    <div className="UnregisterPageFrame">
      <HeaderTwo></HeaderTwo>
      <div className="UnregisterPageInner">
        <div className="TextUnregister">회원탈퇴</div>
      </div>
    </div>
  );
}

export default UnregisterPage;
