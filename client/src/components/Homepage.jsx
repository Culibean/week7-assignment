import { useState } from "react";
import "./Homepage.css";

//TODO: create a simple form for users to add their username in the database

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const response = await fetch(
      "https://uncluttr-server.onrender.com/new-user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      },
    );

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
          Uncluttr is a minimalist decluttering app designed to make tidying
          feel achievable. Instead of long checklists, you get short,
          time‑friendly tasks you can complete in just a few minutes. Track your
          progress, celebrate your wins, and get inspired by a community of
          people making small, meaningful changes in their homes and lives.
        </p>

        <div>
          <h2>
            Enter your username to see of you're already part of Uncluttr.
          </h2>
          <h3>
            If you're new here, you will be added to our database and can enjoy
            Uncluttr for free!
          </h3>

          <form className="userform" onSubmit={handleSubmit}>
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
        <h3>How it works</h3>

        <ul>
          <li>
            Submit your own task (maybe something you have put off for ages),
            schedule it or start right away. Need a surprise in your life? Use
            our generator to randomly give you a short quick task (Coming soon!)
          </li>
          <li>
            Once you started the task, it's down to you if you can beat the
            timer. That's it! A mini mission, a quest or challenge. Whatever
            drives you, but we know you can do it. Or can you?
          </li>
          <li>
            Swoop in, clear a corner, rescue a surface, banish a dust bunny.
            Whatever the task says.
          </li>
          <li>
            Done? Then hit that button! Celebreate yourself, dance in that clean
            kitchen! Or get a cuppa, we don't judge!
          </li>
          <li>
            Want to show off? Your completed task appears in our community feed.
            Let others applaud you, because yes! Sorting that pile of laundry is
            something we celebrate here! 🥳
          </li>
          <li>
            Can't get enough? Hop on your dashboard and see open and completed
            tasks!
          </li>
        </ul>
      </div>
    </>
  );
}
