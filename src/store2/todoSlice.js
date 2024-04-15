import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    //state
    count: 0,
    taskName: "",
    lists: [],
    editTask: null,
    error: "",
    isEdit: null,
  },
  reducers: {
    //action_name: (state, action) => {
    //modify the state
    // }
    addCount: (state, action) => {
      state.count += action.payload;
    },
    taskNameValue: (state, action) => {
      state.taskName = action.payload;
    },
    addTask: (state, action) => {
      console.log("coming");
      if (!state.taskName.trim()) {
        state.error = "Please enter any task. Task should not be empty";
      } else if (state.editTask) {
        if (state.isEdit !== state.taskName) {
          const updatedList = state.lists.map((list) => {
            if (list.id === state.editTask) {
              return { ...list, task: state.taskName };
            }
            return list;
          });
          state.lists = [...updatedList];
          state.editTask = null;
          state.taskName = "";
          state.isEdit = null;
        } else {
          alert("You didn't update anything");
        }
      } else {
        state.error = "";
        const duplicate = state.lists.filter(
          (li) => li.task === state.taskName
        );
        if (!duplicate.length) {
          state.lists.push({
            id: new Date().getTime(),
            task: state.taskName,
          });
          state.taskName = "";
        } else {
          alert("This task is already there, try to add new task");
        }
      }
    },
    updateList: (state, action) => {
      state.isEdit = action.payload.task;
      state.taskName = action.payload.task;
      state.editTask = action.payload.id;
    },
    deleteList: (state, { payload }) => {
      if (state.editTask !== payload) {
        const filteredList = state.lists.filter((list) => {
          return list.id !== payload;
        });
        state.lists = [...filteredList];
      } else {
        alert("You can't delete this task, as it is in edit mode");
      }
    },
  },
});

export const { addCount, taskNameValue, addTask, updateList, deleteList } =
  todoSlice.actions;
export default todoSlice.reducer;
