// import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { inc, addTask, setName, updateList, deleteList } from "./store3/action";

const TodoList3 = (props) => {
  const {
    count,
    incCount,
    addTask,
    taskName,
    setName,
    lists,
    error,
    editTask,
    updateList,
    deleteList,
  } = props;
  return (
    <div>
      <div className="flex justify-center mt-5">
        <input
          className="border-2 border-black h-10 mt-3 mr-8 px-3 w-80 rounded-lg md:font-semibold"
          type="text"
          value={taskName}
          onChange={(e) => setName(e.target.value)}
        />
        {/* {count}
        <button
          className="bg-green-600 text-white mt-3 px-4 py-1 rounded-lg"
          onClick={() => incCount()}
        >
          COUNT
        </button> */}
        <button
          className="bg-green-600 text-white mt-3 px-4 py-1 rounded-lg"
          onClick={() => addTask()}
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
                  onClick={() => updateList(list)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="mr-3 bg-red-600 text-white h-10 px-4 py-1 rounded-lg"
                  onClick={() => deleteList(list.id)}
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
const mapStateToProps = (state) => {
  return {
    count: state.count,
    lists: state.lists,
    taskName: state.taskName,
    error: state.error,
    editTask: state.editTask,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incCount: () => dispatch(inc(4)),
    addTask: () => dispatch(addTask()),
    setName: (val) => dispatch(setName(val)),
    updateList: (val) => dispatch(updateList(val)),
    deleteList: (val) => dispatch(deleteList(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList3);
