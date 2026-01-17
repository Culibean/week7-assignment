import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router";
import TaskForm from "./components/TaskForm";
import SingleTask from "./components/SingleTask";
import Feed from "./components/Feed";
import Generator from "./components/Generator";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route element={<Homepage />} path={"/"} />
          <Route element={<Dashboard />} path={"/dashboard"} />
          <Route element={<TaskForm />} path={"/new-unclutter"} />
          <Route element={<SingleTask />} path={"/task/:taskId"} />
          <Route element={<Feed />} path={"/feed"} />
          <Route element={<Generator />} path={"/uncluttr-generator"} />
        </Routes>
      </main>
    </>
  );
}
