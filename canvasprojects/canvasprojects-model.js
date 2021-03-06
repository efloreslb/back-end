const db = require('../database/dbConfig.js');

module.exports = {
   getAll,
   getAllPublished,
   getById,
   getTagsByProjectId,
   insert,
   remove,
   update,
   insertTag,
};

function getAll() {
   return db('canvasprojects')
      // .join("tags", "canvasprojects.id", "=", "tags.project_id")
      // .then((projects, key) => {
      //    return db('tags')
      //    .where({project_id: 1})
      //    .select("tags.name as tag")
      //    .then(tags => {
      //       const result = { ...projects[0], tags: tags };
      //       return result;
      //    })
      // })
}

function getAllPublished() {
   return db('canvasprojects')
      .where({ p_published: true })
}

function getById(projectId) {
   return db('canvasprojects')
      .where({ id: projectId })
      .select("canvasprojects.*")
      .then(projects => {
         return db('tags')
         .where({project_id: projectId})
         .select("tags.name as tag")
         .then(tags => {
            const result = { ...projects[0], tags: tags };
            return result;
         })
      })
}

function getTagsByProjectId(projectId) {
   return db('tags')
      .where({ project_id: projectId })
      .select("tags.name", "tags.project_id")
}

function insert(project) {
   return db('canvasprojects')
      .returning('*')
      .insert(project)
}

function remove(projectId) {
   return db('canvasprojects')
      .where({ id: projectId })
      .returning("*")
      .del();
}

function update(projectId, changes) {
   return db('canvasprojects')
      .where({ id: projectId })
      .returning("*")
      .update(changes);
}

function insertTag(tag) {
   return db('tags')
      .insert(tag);
}
