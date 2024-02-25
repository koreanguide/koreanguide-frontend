import React, { useEffect, useState } from "react";
import "./ManagementMainPage.css";
import { Helmet } from "react-helmet";

interface Track {
  id: number;
  user: number;
  title: string;
  preview: string;
  content: string;
  tag: string;
  primaryImage: string;
  addedImage: string;
  autoTranslate: boolean;
  createdAt: string;
  updatedAt: string;
}

function ManagementTrackPage() {
  const [trackData, setTrackData] = useState<Track[]>([]);

  useEffect(() => {
    fetch("/v1/admin/track")
      .then((response) => response.json())
      .then((data) => setTrackData(data));
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
              <a
                className="nav-link active"
                aria-disabled="true"
                href="/admin/track"
              >
                등록 트랙 관리
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
          <h1 className="text-start">등록 트랙 관리</h1>
          <p className="text-start">등록된 트랙을 확인하거나 수정합니다.</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">소유자 ID</th>
              <th scope="col">트랙명</th>
              <th scope="col">간단 소개</th>
              <th scope="col">본문</th>
              <th scope="col">태그</th>
              <th scope="col">대표 이미지</th>
              <th scope="col">추가 이미지</th>
              <th scope="col">자동 번역 사용</th>
              <th scope="col">생성일</th>
              <th scope="col">수정일</th>
            </tr>
          </thead>
          <tbody>
            {trackData.map((track, index) => (
              <tr key={index}>
                <th scope="row">{track.id}</th>
                <td>{track.user}</td>
                <td>{track.title}</td>
                <td>{track.preview}</td>
                <td>{track.content}</td>
                <td>{track.tag}</td>
                <td>{track.primaryImage}</td>
                <td>{track.addedImage}</td>
                <td>{track.autoTranslate ? "예" : "아니오"}</td>
                <td>
                  {track.createdAt
                    ? new Date(track.createdAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "불러올 수 없음"}
                </td>
                <td>
                  {track.updatedAt
                    ? new Date(track.updatedAt).toLocaleString("ko-KR", {
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

export default ManagementTrackPage;
