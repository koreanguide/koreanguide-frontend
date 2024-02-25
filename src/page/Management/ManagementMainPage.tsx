import React, { useEffect, useState } from "react";
import "./ManagementMainPage.css";
import { Helmet } from "react-helmet";

interface User {
  id: number;
  email: string;
  nickname: string;
  createdAt: string;
  accessedAt: string;
}

function ManagementMainPage() {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    fetch("/v1/admin")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);
  return (
    <div className="kgAdminBody">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" />
      </Helmet>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="/admin">
            KOREAN GUIDE 관리자
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/admin">
                사용자 관리
              </a>
              <a className="nav-link active" aria-disabled="true" href="/admin/track">
                등록 트랙  관리
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <br />
        <div className="alert alert-warning text-start" role="alert">
          직접적인 삭제, 수정 기능을 아직 사용할 수 없음
        </div>
        <div className="py-5">
          <h1 className="text-start">사용자 관리</h1>
          <p className="text-start">가입된 사용자를 확인하거나 수정합니다.</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">이메일 주소</th>
              <th scope="col">닉네임</th>
              <th scope="col">가입일</th>
              <th scope="col">최근 접속일</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <th scope="row">{user.id}</th>
                <td>{user.email}</td>
                <td>{user.nickname}</td>
                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "불러올 수 없음"}
                </td>
                <td>
                  {user.accessedAt
                    ? new Date(user.accessedAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "불러올 수 없음"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagementMainPage;
