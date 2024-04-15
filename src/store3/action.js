import {
  ADD_TASK,
  INC_COUNT,
  SET_NAME,
  UPDATE_LIST,
  DELETE_LIST,
} from "./type";
export const inc = (val) => {
  return { type: INC_COUNT, value: val };
};

export const addTask = () => {
  return { type: ADD_TASK };
};

export const setName = (val) => {
  return { type: SET_NAME, payload: val };
};

export const updateList = (val) => {
  return { type: UPDATE_LIST, payload: val };
};

export const deleteList = (val) => {
  return { type: DELETE_LIST, payload: val };
};
