import { SET_RESPONSE_DATA, SetResponseDataAction } from "./actionTypes";

export const setResponseData = (data: any): SetResponseDataAction => ({
  type: SET_RESPONSE_DATA,
  payload: data,
});
