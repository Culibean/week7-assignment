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
      <div className="beginning">
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
            Enter your username to see if you're already part of Uncluttr.
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
            Add yourself to the database above. Then go to your dashboard, type
            in your username and find a list of your open and completed tasks.
          </li>
          <li>
            Any open tasks? Click on them and start the time. Once you started
            the task, it's down to you if you can beat the timer. That's it! A
            mini mission, a quest or challenge. Whatever drives you, but we know
            you can do it. Or can you?
          </li>
          <li>
            Finished early or just on time? Celebrate with a bit of confetti
            (don't worry, no need to clean it up after)! Your completed tasks
            will appear in your dashboard and on the community feed.
          </li>
          <li>
            Didn't quite make it in time? No judgement here, just click End
            Uncluttr once you are done. The task will be completed and no one
            will know that you took a little longer.
          </li>
          <li>
            Want to show off? Your completed task appears in our community feed.
            Let others applaud you, because yes! Sorting that pile of laundry is
            something we celebrate here! 🥳
          </li>
          <li>
            Got some time on your hands but no open tasks? The Generator (coming
            soon!) can throw you a random task depending how much time you have.
          </li>
        </ul>
      </div>
    </>
  );
}
