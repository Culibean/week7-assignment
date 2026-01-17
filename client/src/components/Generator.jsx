// import { useEffect, useState } from "react";

// //TODO: randomise task generator

// export default function Generator() {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState("");
//   const [randomTask, setRandomTask] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const response = await fetch("http://localhost:8080/uncluttr-generator");
//       const data = await response.json();

//       if (data.request === "success") {
//         setTasks(data.tasks);
//       } else {
//         setError("Could not load Uncluttr Generator");
//       }
//     };
//     fetchTasks();
//   }, []);

//   const getRandomTask = () => {
//     if (tasks.length === 0) return;
//     const taskCard = Math.floor(Math.random() * tasks.length);
//     setRandomTask(tasks[taskCard]);
//   };

//for later join generator with user database so their appear in dashboard and can be celebrated

export default function Generator() {
  return (
    <>
      <h4>Coming soon!</h4>
    </>
  );
}
