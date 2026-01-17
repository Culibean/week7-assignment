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

    //realised I don't have usernames in my task table, need to pull usernames from username database

    const query = await db.query(
      `INSERT INTO uncluttrtasks (user_id, task_text, room, task_type, time_available, scheduled_day, is_completed, completed_at, shared_to_community, celebration_count) SELECT uncluttrusers.id, $1, $2, $3, $4, $5, $6, $7, $8, $9 FROM uncluttrusers WHERE uncluttrusers.username = $10 RETURNING *`,
      [
        newUncluttr.task_text,
        newUncluttr.room,
        newUncluttr.task_type,
        newUncluttr.time_available,
        newUncluttr.scheduled_day,
        false,
        null,
        true,
        0,
        newUncluttr.username,
      ],
    );
    res.status(200).json({ request: "success" });
  } catch (error) {
    console.error(error, "Request failed. Nothing to Uncluttr");
    res.status(500).json({ request: "fail" });
  }
});

//=====================================Personal Dashboard Tasks GET Route - DYNAMIC!!===============================================

app.get("/your-uncluttr/user/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const user = await db.query(
      `SELECT id FROM uncluttrusers WHERE username = $1`,
      [username],
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        request: "fail",
        message: "No one with this name has uncluttred yet",
      });
    }

    const idParams = user.rows[0].id;

    const openTasks = await db.query(
      `SELECT * FROM uncluttrtasks WHERE user_id = $1 AND is_completed = FALSE ORDER BY created_at DESC;`,
      [idParams],
    );

    const closedTasks = await db.query(
      `SELECT * from uncluttrtasks WHERE user_id = $1 AND is_completed = TRUE ORDER BY completed_at DESC;`,
      [idParams],
    );
    console.log(openTasks.rows);
    console.log(closedTasks.rows);
    res.status(200).json({
      request: "success",
      open: openTasks.rows,
      closed: closedTasks.rows,
    }); //error was thrown, as can't send two requests, combined both responses in success (query and rows)
  } catch (error) {
    console.error(error, "Request failed. Nothing to Uncluttr");
    res.status(500).json({ request: "fail" });
  }
});

//==================================POST/GET ROUTE: Community Feed with completed tasks and celebrations================================

//TODO: Create a GET route to show all completed tasks in the feed
//TODO: add POST route to change task status to complete once button is pressed in Single Task component

app.post("/your-uncluttr/:taskId/complete", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const update = await db.query(
      `UPDATE uncluttrtasks SET is_completed = TRUE, shared_to_community = TRUE, completed_at=NOW() WHERE id=$1 RETURNING *;`,
      [taskId],
    );
    console.log(update.rows);
    res.status(200).json({ request: "success", task: update.rows[0] });
  } catch (error) {
    console.error(error, "Request failed. You need to Uncluttr first");
    res.status(500).json({ request: "fail" });
  }
});

app.get("/uncluttr-community", async (req, res) => {
  try {
    const query = await db.query(
      `SELECT uncluttrtasks.id, uncluttrtasks.task_text, uncluttrtasks.room, uncluttrtasks.celebration_count, uncluttrtasks.completed_at, uncluttrusers.username FROM uncluttrtasks JOIN uncluttrusers ON uncluttrtasks.user_id = uncluttrusers.id WHERE uncluttrtasks.is_completed = TRUE ORDER BY uncluttrtasks.completed_at DESC;`,
    );
    console.log(query.rows);
    res.status(200).json({ request: "success", tasks: query.rows });
  } catch (error) {
    console.error(error, "Request failed. You need to Uncluttr first");
    res.status(500).json({ request: "fail" });
  }
});

//needs to be amended from original post route: everytime someone celebrates a completed task, the database needs to be updated

app.post("/celebrate/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const update = await db.query(
      `UPDATE uncluttrtasks SET celebration_count = celebration_count + 1 WHERE id=$1 RETURNING *`,
      [taskId],
    );
    console.log(update.rows);
    res.status(200).json({ request: "success", tasks: update.rows[0] });
  } catch (error) {
    console.error(error, "Request failed. Uncluttr first, celebrate later");
    res.status(500).json({ request: "fail" });
  }
});

//===================================GET Route for Task Generator===========================================

app.get("/uncluttr-generator", async (req, res) => {
  try {
    const query = await db.query(
      `SELECT * from uncluttrgenerator ORDER BY time_estimated ASC;`,
    );
    console.log(query.rows);
    res.status(200).json({ request: "success", tasks: query.rows });
  } catch (error) {
    console.error(error, "Request failed. No need to uncluttr today");
    res.status(500).json({ request: "fail" });
  }
});

//================================GET Route for Single Task page - DYNAMIC! ============================================

app.get("/your-uncluttr/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const query = await db.query(`SELECT * FROM uncluttrtasks WHERE id=$1;`, [
      taskId,
    ]);
    console.log(query.rows);
    res.status(200).json({ request: "success", task: query.rows[0] }); //needed to return single task not an array
  } catch (error) {
    console.error(error, "Request failed. No Uncluttr task for you today");
    res.status(500).json({ request: "fail" });
  }
});

// =================================POST ROUTE once a task has been completed - DYNAMIC! ===========================================

app.post("/uncluttr/complete/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const query = await db.query(
      `UPDATE uncluttrtasks SET is_completed = TRUE, completed_at = NOW() WHERE id = $1 returning*;`,
      [taskId],
    );
    console.log(query.rows);
    res.status(200).json({ request: "success", task: query.rows[0] });
  } catch (error) {
    console.error(error, "Request failed. No Uncluttr task for you today");
    res.status(500).json({ request: "fail" });
  }
});

//==========================================STRETCH GOAL: Delete a task========================================================

app.delete("/delete-uncluttr/:id", async (req, res) => {
  try {
    const idParams = req.params.id;
    const query = await db.query(
      `DELETE FROM uncluttrtasks WHERE id = $1 RETURNING*`,
      [idParams],
    );
    res.status(200).json({ request: "success", deleted: query.rows[0] });
  } catch (error) {
    console.error(error, "Request failed. That task still needs uncluttering");
    res.status(500).json({ request: "fail" });
  }
});

//=========================================Adding a username submission form for the homepage=========================

app.post("/new-user", async (req, res) => {
  try {
    const { username } = req.body;

    const query = await db.query(
      `INSERT INTO uncluttrusers (username) VALUES ($1) RETURNING *;`,
      [username],
    );
    res.status(200).json({ request: "success", user: query.rows[0] });
  } catch (error) {
    console.error(error, "Request failed. That user already exists");
    res.status(500).json({ request: "fail" });
  }
});

//received error with above. names were added despite them exisiting. after some research found out that the issue is within supabase the input needs to be amended to be unique, so that no 2 users can appear twice
