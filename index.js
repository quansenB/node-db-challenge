const express = require("express");

const server = express();
server.use(express.json());

const db = require("./data/dbHelpers");

server.get("/projects", async (req, res) => {
  try {
    const projects = await db.getAllProjects();
    if (projects.length > 0) {
      return res.status(200).json(projects);
    } else {
      return res.status(404).json({ message: "No projects found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

server.get("/actions", async (req, res) => {
  try {
    const actions = await db.getAllActions();
    if (actions.length > 0) {
      return res.status(200).json(actions);
    } else {
      return res.status(404).json({ message: "No actions found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

server.get("/projects/:id", async (req, res) => {
  try {
    const project = await db.getProjectById(req.params.id);
    const actions = await db.getActionsByProjectId(req.params.id);
    if (project) {
      if (actions.length === 0) {
        return res.status(200).json({
          project,
          actions: "No actions found for this project"
        });
      } else {
        return res.status(200).json({ project, actions });
      }
    } else {
      return res.status(404).json({ message: "Found no project with this ID" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

server.post("/projects", async (req, res) => {
  try {
    const id = await db.insertProject(req.body);
    if (id.length > 0) {
      const project = await db.getProjectById(id[0]);
      return res.status(200).json(project);
    } else {
      return res.status(400).json({ message: "Project could not be inserted" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

server.post("/actions", async (req, res) => {
  try {
    const id = await db.insertAction(req.body);
    if (id.length > 0) {
      const action = await db.getActionById(id[0]);
      return res.status(200).json(action);
    } else {
      return res.status(400).json({ message: "Action could not be inserted" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

server.listen(4000, () => {
  console.log("listening on 4000");
});
