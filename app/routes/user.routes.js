const { authJwt } = require("../middlewares")
const controller = require("../controllers/user.controller")

// Routes for Authorization
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    // route for public access
    app.get('/api/test/all', controller.allAccess)

    // route for user
    app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard)

    // route for moderator
    app.get(
        '/api/test/mod',
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    )

    // route for admin
    app.get(
        '/api/test/admin',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    )
}