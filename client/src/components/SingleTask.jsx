import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Confetti from "react-confetti";

export default function SingleTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(null);
  const [started, setStarted] = useState(null);
  const [done, setDone] = useState(false);

  //TODO: get the tasks from uncluttrtask list by taskid
  //Problem: at the moment, timer starts as soon as the user enters the page.timeLeft as soon as the server has sent the task to the client. I'll need to add an await function so useEffect runs once I add a button (potential interval controlled by user)

  useEffect(() => {
    async function fetchTask() {
      const response = await fetch(
        `http://localhost:8080/your-uncluttr/${taskId}`,
      );
      const data = await response.json();
      setTask(data.task);

      //TODO: need to somehow count backwards from the time chosen in the submit form

      setTimeLeft(data.task.time_available * 60); //converts minutes to seconds for countdown
      setLoading(false);
    }
    fetchTask();
  }, [taskId]);

  //Add countdown to page with effect

  useEffect(() => {
    if (!started) return;
    if (done) return;
    if (timeLeft === null) return;
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [started, timeLeft, done]);

  //function to handle timer once the user pushes the start button

  const handleStart = () => {
    setStarted(true);
  };

  const handleFinish = () => {
    setDone(true);
    fetch(
      `https://uncluttr-server.onrender.com/your-uncluttr/${taskId}/complete`,
      {
        method: "POST",
      },
    );
  };

  if (loading) return <p>Loading Uncluttr...</p>;
  if (!task) return <p>Uncluttr not found</p>;

  const timeUp = timeLeft <= 0 && !done;
  //Issue: Time is in seconds, but want it change to seconds and minutes
  //TODO: find resource on how to do this

  function changeTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}: ${secs.toString().padStart(2, "0")}`;
  }

  return (
    <div>
      {done && <Confetti />}
      <h2>Your Uncluttr Challenge: </h2>
      <h3>{task.task_text}</h3>

      {!started && !done && (
        <button onClick={handleStart}>Start to Uncluttr</button>
      )}

      {started && !done && (
        <>
          <h3>Time left: {changeTime(timeLeft)}</h3>
          {timeUp && <p>Time's up! You have uncluttred!</p>}
          {!timeUp && <button onClick={handleFinish}>Already done!</button>}
          {timeUp && <button onClick={handleFinish}>End Uncluttr</button>}
        </>
      )}
      {done && <p>Super Uncluttr</p>}
      <a className="button" href="/dashboard">
        Back to Dashboard
      </a>
    </div>
  );
}
