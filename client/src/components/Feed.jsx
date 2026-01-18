import { useEffect, useState } from "react";
import "./Feed.css";

export default function Feed() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch(
      "https://uncluttr-server.onrender.com/uncluttr-community",
    );
    const data = await response.json();
    setTasks(data.tasks);
  };

  useEffect(() => {
    fetchTasks();

    //TODO: add polling

    const pollingInterval = setInterval(fetchTasks, 5000);
    return () => clearInterval(pollingInterval);
  }, []);

  const handleCelebration = async (taskId) => {
    await fetch(`https://uncluttr-server.onrender.com/celebrate/${taskId}`, {
      method: "POST",
    });
    fetchTasks();
  };

  return (
    <>
      <div>
        <h1>Uncluttr Feed</h1>

        {tasks.length === 0 && <p>No completed tasks yet</p>}
        {tasks.map((task) => (
          <div key={task.id} className="feed_card">
            <h3 className="task">{task.task_text}</h3>
            <h4 className="user">Uncluttred by {task.username}</h4>
            <h4 className="room">Room: {task.room}</h4>
            <h4 className="celebration">
              Celebrations: {task.celebration_count}🥳
            </h4>

            <button
              className="celebrate"
              onClick={() => handleCelebration(task.id)}
            >
              Celebrate
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
