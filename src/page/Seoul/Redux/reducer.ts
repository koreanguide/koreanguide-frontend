// reducer.ts
import { SET_RESPONSE_DATA, SetResponseDataAction } from "./actionTypes";

interface ResponseDataState {
  responseData: any; // 여기서도 실제 데이터 타입을 사용해야 합니다.
}

const initialState: ResponseDataState = {
  responseData: {},
};

const reducer = (
  state = initialState,
  action: SetResponseDataAction
): ResponseDataState => {
  switch (action.type) {
    case SET_RESPONSE_DATA:
      return {
        ...state,
        responseData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
