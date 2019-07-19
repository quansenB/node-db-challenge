const knex = require("knex");
const db = knex(require("../knexfile").development);

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

module.exports = {
  getAllProjects,
  getAllActions,
  insertProject,
  insertAction,
  getProjectById,
  getActionById,
  getActionsByProjectId
};
