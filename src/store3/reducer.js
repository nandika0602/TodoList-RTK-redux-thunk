import {
  ADD_TASK,
  SET_NAME,
  INC_COUNT,
  UPDATE_LIST,
  DELETE_LIST,
} from "./type";

const initialState = {
  count: 0,
  taskName: "",
  lists: [],
  editTask: null,
  error: "",
  isEdit: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === INC_COUNT) {
    return { ...state, count: state.count + action.value };
  }

  if (action.type === SET_NAME) {
    return { ...state, taskName: action.payload };
  }

  if (action.type === ADD_TASK) {
    if (!state.taskName.trim()) {
      return {
        ...state,
        error: "Please enter any task. Task should not be empty",
      };
    } else if (state.editTask) {
      if (state.isEdit !== state.taskName) {
        const updatedList = state.lists.map((list) => {
          if (list.id === state.editTask) {
            return { ...list, task: state.taskName };
          }
          return list;
        });
        return {
          ...state,
          lists: [...updatedList],
          editTask: null,
          taskName: "",
          isEdit: null,
        };
      } else {
        alert("You didn't update anything");
      }
    } else {
      state.error = "";
      const duplicate = state.lists.filter((li) => li.task === state.taskName);
      if (!duplicate.length) {
        return {
          ...state,
          lists: [
            ...state.lists,
            { id: new Date().getTime(), task: state.taskName },
          ],
          taskName: "",
        };
      } else {
        alert("This task is already there, try to add new task");
      }
    }
  }

  if (action.type === UPDATE_LIST) {
    return {
      ...state,
      isEdit: action.payload.task,
      taskName: action.payload.task,
      editTask: action.payload.id,
    };
  }

  if (action.type === DELETE_LIST) {
    if (state.editTask !== action.payload) {
      const filteredList = state.lists.filter((list) => {
        return list.id !== action.payload;
      });
      return { ...state, lists: [...filteredList] };
    } else {
      alert("You can't delete this task, as it is in edit mode");
    }
  }
  return state;
};

export default reducer;
