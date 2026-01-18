import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router";
import TaskForm from "./components/TaskForm";
import SingleTask from "./components/SingleTask";
import Feed from "./components/Feed";
import Generator from "./components/Generator";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <NavBar />
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
      <Footer />
    </>
  );
}
