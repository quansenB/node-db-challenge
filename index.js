const express = require('express');
const knex = require('knex');
const db = knex(require('./knexfile').development);

const server = express();
server.use(express.json());

function getAllProjects(){
    return db("projects")
}

function getAllActions(){
    return db("actions")
}

function 


server.listen(4000, () => {
    console.log('listening on 4000');
  });