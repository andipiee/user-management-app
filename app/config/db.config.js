require('dotenv').config()

module.exports = {
    // HOST: process.env.
    // POST: "27017",
    password: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME
}