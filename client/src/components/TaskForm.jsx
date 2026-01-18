import { useState } from "react";

//TODO: create form for users to add new task

export default function TaskForm() {
  const [username, setUsername] = useState("");
  const [taskText, setTaskText] = useState("");
  const [room, setRoom] = useState("");
  const [taskType, setTaskType] = useState("");
  const [timeAvailable, setTimeAvailable] = useState("");
  const [scheduledDay, setScheduledDay] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const formValues = {
      username: username,
      task_text: taskText,
      room: room,
      task_type: taskType,
      time_available: timeAvailable,
      scheduled_day: scheduledDay,
    };

    const response = await fetch(
      "https://uncluttr-server.onrender.com/new-uncluttr",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formValues }),
      },
    );

    const data = await response.json();

    if (data.request === "success") {
      setMessage("Your Uncluttr task has been added");

      setUsername("");
      setTaskText("");
      setRoom("");
      setTaskType("");
      setTimeAvailable("");
      setScheduledDay("");
    } else {
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <>
      <div className="taskform">
        <h1>Add a new Uncluttr Task</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label>
            Task
            <input
              type="text"
              value={taskText}
              onChange={(event) => setTaskText(event.target.value)}
              required
            />
          </label>

          <label>
            Room
            <select
              value={room}
              onChange={(event) => setRoom(event.target.value)}
              required
            >
              <option value="">Select room</option>
              <option value="kitchen">Kitchen</option>
              <option value="bedroom">Bedroom</option>
              <option value="bathroom">Bathroom</option>
              <option value="livingroom">Living Room</option>
              <option value="hallway">Hallway</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Task Type
            <select
              value={taskType}
              onChange={(event) => setTaskType(event.target.value)}
              required
            >
              <option value="">Select type</option>
              <option value="clean">Clean</option>
              <option value="sort">Sort</option>
              <option value="tidy">Tidy</option>
              <option value="throw away">Throw away</option>
              <option value="vinted">Vinted</option>
            </select>
          </label>

          <label>
            Time available
            <select
              value={timeAvailable}
              onChange={(event) => setTimeAvailable(event.target.value)}
              required
            >
              <option value="">How much time do you have?</option>
              <option value="10">10min</option>
              <option value="15">15min</option>
              <option value="20">20min</option>
              <option value="30">30min</option>
              <option value="60">60min</option>
            </select>
          </label>

          <label>
            Scheduled Day
            <input
              type="date"
              value={scheduledDay}
              onChange={(event) => setScheduledDay(event.target.value)}
              required
            />
          </label>

          <button type="submit">Add Uncluttr</button>
        </form>
        {/* want to add message that shows task has been added */}
        {message && <p className="success_message">{message}</p>}
      </div>
    </>
  );
}
