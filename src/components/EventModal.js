
import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { writeEventData, deleteEvent } from "../database";
import AddFile from "./Addfile";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [error, setError] = useState(null);

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((label) => label === selectedEvent.label)
      : labelsClasses[0]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      setError("The title is required.");
    } else {
      setError(null);
      const event = {
        title,
        description,
        label: selectedLabel,
        day: daySelected.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
      };
      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: event });
      } else {
        dispatchCalEvent({ type: "push", payload: event });
      }
      await writeEventData(event);
      setShowEventModal(false);
    }
  }

  return (
    <div className="h-screen w-full fixed left-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  deleteEvent(selectedEvent);
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add Description"
              value={description}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-sm text-white">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <AddFile/>
        <footer className="flex justify-between items-center border-t p-3 mt-5">
          <small className="text-red-500 ml-1">{error ? error : null}</small>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
