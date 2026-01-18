import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <a href="https://uncluttr.onrender.com/">Homepage</a>
      <a href="https://uncluttr.onrender.com/dashboard">Dashboard</a>

      <a href="https://uncluttr.onrender.com/feed">Community</a>

      <a href="https://uncluttr.onrender.com/uncluttr-generator">
        Task Generator
      </a>
      <a href="https://uncluttr.onrender.com/new-unclutter">Submit a task</a>
    </nav>
  );
}
