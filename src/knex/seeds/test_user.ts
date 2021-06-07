import {Knex} from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {id: 'ff6e4778-8382-4fc5-b5a7-f11c41620931', email: 'test@test.com', passwordHash: '1234'}, //
  ]);
}
