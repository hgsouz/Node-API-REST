import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transaction", (table) => {
    table.uuid("id").primary(); // Universal unique ID
    table.text("title").nullable();
    table.decimal("amount", 10, 2).nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transaction");
}
