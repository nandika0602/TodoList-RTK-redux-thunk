// import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCount,
  taskNameValue,
  addTask,
  updateList,
  deleteList,
} from "./store2/todoSlice";

const TodoList2 = () => {
  const count = useSelector((store) => {
    return store.todo.count;
  });

  const storeValues = useSelector((store) => store.todo);
  const { taskName, lists, editTask, error } = storeValues;

  const dispatch = useDispatch();
  const incCount = () => {
    dispatch(addCount(5));
  };

  //ADDING A TASK TO LIST
  const addList = () => {
    dispatch(addTask());
  };

  return (
    <div>
      <div className="flex justify-center mt-5">
        <input
          className="border-2 border-black h-10 mt-3 mr-8 px-3 w-80 rounded-lg md:font-semibold"
          type="text"
          value={taskName}
          onChange={(e) => dispatch(taskNameValue(e.target.value))}
        />
        <button
          className="bg-green-600 text-white mt-3 px-4 py-1 rounded-lg"
          onClick={() => addList()}
        >
          {editTask ? (
            <FontAwesomeIcon icon={faEdit} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
        {/* <button className="bg-green-600 text-white mt-3 px-4 py-1 rounded-lg" onClick={() => incCount()}>COUNT</button> */}
      </div>
      {error && (
        <p className="text-red-500 text-xl text-center mt-2">{error}</p>
      )}
      <div className="mt-10">
        {lists.length ? (
          <p className="text-xl md:font-semibold text-center mt-2">
            You have {lists.length} {lists.length === 1 ? "task" : "tasks"} to
            complete
          </p>
        ) : (
          <p className="text-3xl md:font-bold text-yellow-500 text-center mt-2">
            You don't have any task
          </p>
        )}
        <ul>
          {lists.map((list) => {
            return (
              <div
                className="flex justify-center place-content-between list-none py-3"
                key={list.id}
              >
                <li className="border-2 border-black p-2 w-80 overflow-x-auto rounded-lg text-left ml-20 mr-8 bg-slate-200 text-blue-950 md:font-medium text-xl">
                  {list.task}
                </li>
                <button
                  className="mr-3 bg-blue-400 text-white h-10 px-4 py-1 rounded-lg"
                  onClick={() => dispatch(updateList(list))}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="mr-3 bg-red-600 text-white h-10 px-4 py-1 rounded-lg"
                  onClick={() => dispatch(deleteList(list.id))}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList2;
