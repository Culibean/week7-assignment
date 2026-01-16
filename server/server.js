import express from "express";
import cors from "cors";
import { db } from "./dbconnection.js";

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 8080;
app.listen(PORT, () => {
  console.info(`Server API is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server API. GET comfy!" });
});

//==================================post route to add in new task==============================
//TODO: Careful, users should not be able to change last 4 inputs, as this is decided later after the task is submitted and completed.

app.post("/new-uncluttr", async (req, res) => {
  try {
    const newUncluttr = req.body.formValues;
    console.log(newUncluttr);
    const query = await db.query(
      `INSERT INTO uncluttrtasks (user_id, task_text, room, task_type, time_available, scheduled_day, is_completed, completed_at, shared_to_community, celebration_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        newUncluttr.user_id,
        newUncluttr.task_text,
        newUncluttr.room,
        newUncluttr.task_type,
        newUncluttr.time_available,
        newUncluttr.scheduled_day,
        false,
        null,
        true,
        0,
      ]
    );
    res.status(200).json({ request: "success" });
  } catch (error) {
    console.error(error, "Request failed. Nothing to Uncluttr");
    res.status(500).json({ request: "fail" });
  }
});

//=====================================Personal Dashboard Tasks GET Route - DYNAMIC!!===============================================

app.get("/open-uncluttr/user/:id", async (req, res) => {
  try {
    const idParams = req.params.id;
    const query = await db.query(
      `SELECT * FROM uncluttrtasks WHERE user_id = $1 AND is_completed = FALSE ORDER BY created_at DESC;`,
      [idParams]
    );
    console.log(query.rows);
    res.status(200).json({ request: "success", tasks: query.rows }); //error was thrown, as can't send two requests, combined both responses in success (query and rows)
  } catch (error) {
    console.error(error, "Request failed. Nothing to Uncluttr");
    res.status(500).json({ request: "fail" });
  }
});

//==================================POST/GET ROUTE: Community Feed with completed tasks and celebrations================================

//TODO: Create a GET route to show all completed tasks in the feed

app.get("/uncluttr-community", async (req, res) => {
  try {
    const query = await db.query(
      `SELECT * FROM uncluttrtasks WHERE is_completed = TRUE AND shared_to_community = TRUE ORDER BY completed_at DESC;`
    );
    console.log(query.rows);
    res.status(200).json({ request: "success", tasks: query.rows });
  } catch (error) {
    console.error(error, "Request failed. You need to Uncluttr first");
    res.status(500).json({ request: "fail" });
  }
});

app.post("/celebrate/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const query = await db.query(
      `SELECT * FROM uncluttrtasks WHERE is_completed = TRUE AND shared_to_community = TRUE ORDER BY completed_at DESC;`
    );
    console.log(query.rows);
    res.status(200).json({ request: "success", tasks: query.rows });
  } catch (error) {
    console.error(error, "Request failed. Uncluttr first, celebrate later");
    res.status(500).json({ request: "fail" });
  }
});
