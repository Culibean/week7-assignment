import { useEffect, useState } from "react";

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
          <div key={task.id}>
            <h3>{task.task_text}</h3>
            <h4>Uncluttred by {task.username}</h4>
            <h4>Room: {task.room}</h4>
            <h4> Celebrations: {task.celebration_count}🥳</h4>

            <button onClick={() => handleCelebration(task.id)}>
              Celebrate
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
