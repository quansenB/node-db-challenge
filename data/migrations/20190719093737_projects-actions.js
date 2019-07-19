exports.up = function(knex) {
  return knex.schema
    .createTable("projects", function(table) {
      table.increments();
      table
        .text("name")
        .unique()
        .notNullable();
      table.text("description").notNullable();
      table
        .boolean("completed")
        .defaultTo(false)
        .notNullable();
    })
    .createTable("actions", function(table) {
      table.increments();
      table.text("description").notNullable();
      table.text("notes").notNullable();
      table
        .boolean("completed")
        .defaultTo(false)
        .notNullable();
      table
        .integer("projectID")
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("actions").dropTableIfExists("projects");
};
