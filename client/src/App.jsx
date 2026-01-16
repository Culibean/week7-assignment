import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router";
import TaskForm from "./components/TaskForm";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route element={<Dashboard />} path={"/dashboard"} />
          <Route element={<TaskForm />} path={"/new-unclutter"} />
        </Routes>
      </main>
    </>
  );
}
