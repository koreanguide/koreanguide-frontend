// actionTypes.ts
export const SET_RESPONSE_DATA = "SET_RESPONSE_DATA";

// 이 인터페이스는 액션의 타입을 정의합니다.
export interface SetResponseDataAction {
  type: typeof SET_RESPONSE_DATA;
  payload: any; // 여기서는 예시로 any를 사용했지만, 실제 응답 데이터의 타입으로 교체해야 합니다.
}
