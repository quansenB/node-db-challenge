const express = require("express");
const knex = require("knex");
const db = knex(require("./knexfile").development);

const server = express();
server.use(express.json());

function getAllProjects() {
  return db("projects");
}

function getAllActions() {
  return db("actions");
}

function getProjectById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function getActionsByProjectId(id) {
  return db("actions").where({ projectId: id });
}

function getActionById(id) {
  return db("actions")
    .where({ id })
    .first();
}

function insertProject(newProject) {
  return db("projects").insert(newProject);
}

function insertAction(newAction) {
  return db("actions").insert(newAction);
}

server.get("/projects", async (req, res) => {
  try {
    const projects = await getAllProjects();
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
    const actions = await getAllActions();
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
    const project = await getProjectById(req.params.id);
    const actions = await getActionsByProjectId(req.params.id);
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
    const id = await insertProject(req.body);
    if (id.length > 0) {
      const project = await getProjectById(id[0]);
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
    const id = await insertAction(req.body);
    if (id.length > 0) {
      const action = await getActionById(id[0]);
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
