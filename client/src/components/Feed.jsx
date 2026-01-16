import { useEffect, useState } from "react";

export default function Feed() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8080/uncluttr-community");
    const data = await response.json();
    setTasks(data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCelebration = async (taskId) => {
    await fetch(`http://localhost:8080/celebrate/${taskId}`, {
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
            <h4> Likes: {task.celebration_count}</h4>

            <button onClick={() => handleCelebration(task.id)}>
              Celebrate
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
