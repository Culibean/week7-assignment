import "./Header.css";

export default function Header() {
  return (
    <>
      <header className="header">
        <img src={"/assets/logo.png"} alt="Page logo" className="logo" />
        <h1 className="tagline">UNCLUTTR - Tiny tasks, huge wins </h1>
      </header>
    </>
  );
}
