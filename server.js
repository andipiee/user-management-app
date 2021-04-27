const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

var corsOptions = {
    origin: "http:localhost:8081"
}

app.use(cors(corsOptions))

// parse request of content-type - application/json
app.use(bodyparser.json())

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }))

// import the mongodb model
const db = require('./app/models')
const dbConfig = require('./app/config/db.config')
const Role = db.role;

// connect to mongodb database
db.mongoose
    .connect(`mongodb+srv://sadewow:${dbConfig.password}@cluster0.sgcah.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connect to MongoDB')
        initial()
    })
    .catch(err => {
        console.error('Connection error', err)
        process.exit()
    });


const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'user'
            }).save(err => {
                if (err) {
                    console.log('error', err)
                }

                console.log('added user to roles collection')
            })

            new Role({
                name: 'moderator'
            }).save(err => {
                if (err) {
                    console.log('error', err)
                }

                console.log('added moderator to roles collection')
            })

            new Role({
                name: 'admin'
            }).save(err => {
                if (err) {
                    console.log('error', err)
                }

                console.log('added admin to roles collection')
            })
        }
    })
}
// define route
app.get('/', (req, res) => {
    res.json({ message: "welcome to user management app"})
})
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

// set port, listen for request
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})