import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // @ts-ignore: Unreachable code error
      table.timestamp('created_at').defaultTo(this.schema.raw('NOW'))
      // @ts-ignore: Unreachable code error
      table.timestamp('updated_at').defaultTo(this.schema.raw('NOW'))
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
