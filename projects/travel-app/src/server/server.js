const app = require('./app.js')

// checking if a port is available in the environment variable

const port = process.env.PORT || 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
})
