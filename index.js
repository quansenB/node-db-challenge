const express = require('express');
const knex = require('knex');
const db = knex(require('./knexfile').development);

const server = express();
server.use(express.json());

function getAllProjects(){
    return db("projects");
}

function getAllActions(){
    return db("actions");
}

function getProjectById(id){
    return db("projects").where({id});
}

function getActionById(id){
    return db("actions").where({id});
}

function insertProject(newProject){
    return db("projects").insert(newProject);
}

function insertAction(newAction){
    return db("actions").insert(newAction);
}


server.listen(4000, () => {
    console.log('listening on 4000');
  });