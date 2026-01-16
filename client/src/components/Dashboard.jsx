import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Dashboard({ userId }) {
  const [openTasks, setOpenTasks] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const response = await fetch(`/your-uncluttr/user/${userId}`);
      const data = await response.json();

      setOpenTasks(data.open);
      setClosedTasks(data.open);
    }
    getTasks();
  }, [userId]);

  return (
    <>
      <div className="dashboard">
        <h1>Uncluttr Box</h1>
        <section className="open_tasks">
          {/* container for all open tasks */}
          <h2>Open Uncluttr</h2>

          {openTasks.length === 0 && (
            <p className="empty">Nothing to declutter! Well done!</p>
          )}

          {openTasks.map((task) => (
            <Link
              key={task.id}
              to={`/task/${task.id}`}
              className="open_task_link"
            >
              <div>
                <h3>{task.task_text}</h3>
                {task.time_estimated && (
                  <p className="time">{task.time_estimated} min</p>
                )}
              </div>
            </Link>
          ))}
        </section>

        {/* Completed Tasks */}

        <section className="completed">
          <h2>Your completed Uncluttr</h2>
          {closedTasks.length === 0 && (
            <p className="empty">
              You haven't completed any Uncluttr tasks yet. Don't worry, there
              is always time!
            </p>
          )}

          {closedTasks.map((task) => (
            <div key={task.id} className="task_completed">
              <h3>{task.task_text}</h3>
              {task.completed_at && (
                <p className="completed_time">
                  Completed at: {new Date(task.completed_at).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
