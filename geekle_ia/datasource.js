require('dotenv').config()
const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    username:  process.env.DATABASE_USER || 'postgres',
    password:  process.env.DATABASE_PASSWORD || 'postgres',
    database:  process.env.DATABASE_NAME || "medusa-G5-S",
    entities: [
        "dist/models/*.js",
    ],
    migrations: [
        "dist/migrations/*.js",
    ],
    synchronize: true,
})

module.exports = {
    datasource: AppDataSource,
}