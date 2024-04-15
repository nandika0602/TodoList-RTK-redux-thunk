import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [taskName, setTaskName] = useState("");
  const [lists, setLists] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [error, setError] = useState("");

  //ADDING A TASK TO LIST
  const addTask = () => {
    if (!taskName.trim()) {
      setError("Please enter any task. Task should not be empty");
    } else if (editTask) {
      const updatedList = lists.map((list) => {
        if (list.id === editTask) {
          return { ...list, task: taskName };
        }
        return list;
      });
      setLists(updatedList);
      setEditTask(null);
      setTaskName("");
    } else {
      setError("");
      setLists([
        ...lists,
        {
          id: new Date().getTime(),
          task: taskName,
        },
      ]);
      setTaskName("");
    }
  };

  //DELETE A TASK FROM A LIST
  const deleteList = (id) => {
    const filteredList = lists.filter((list) => {
      console.log(list, id, list.id !== id);
      return list.id !== id;
    });
    setLists(filteredList);
  };

  //UPDATE A TASK
  const updateList = (listToUpdate) => {
    setTaskName(listToUpdate.task);
    setEditTask(listToUpdate.id);
  };
  return (
    <div>
      <div className="flex justify-center mt-5">
        <input
          className="border-2 border-black h-10 mt-3 mr-8 px-3 w-80 rounded-lg md:font-semibold"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
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

export default TodoList;
