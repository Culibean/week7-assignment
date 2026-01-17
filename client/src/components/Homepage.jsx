import { useState } from "react";

//TODO: create a simple form for users to add their username in the database

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const response = await fetch("http://localhost:8080/new-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();

    //add in if statements to show message that user already exists
    if (data.request === "fail") {
      setError(
        "You're already part of Uncluttr! You can go to your dashboard.",
      );
    } else {
      setSuccess("Welcome to Uncluttr! Happy sorting");
    }
  };

  return (
    <>
      <div>
        <h2>Welcome to Uncluttr</h2>
        <p className="Intro">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem iusto
          vitae minima minus, vel quisquam vero neque obcaecati earum, animi non
          quas iste facere, unde illo officiis. Eligendi, cumque nesciunt?
        </p>
      </div>

      <div>
        <h2>
          Enter your username to see of you're already part of Uncluttr. If
          you're new here, you will be added to our database and can enjoy
          Uncluttr for free!
        </h2>

        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <button type="submit">Uncluttr</button>
        </form>

        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </div>
    </>
  );
}
