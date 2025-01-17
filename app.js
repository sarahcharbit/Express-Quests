require("dotenv").config()

const express = require("express")

const app = express()

app.use(express.json())

const port = 5001

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list")
}

app.get("/", welcome)

const movieHandlers = require("./movieHandlers")
const { validateMovie } = require("./validators")
const { validateUser } = require("./validators")

app.get("/api/movies", movieHandlers.getMovies)
app.get("/api/movies/:id", movieHandlers.getMovieById)
app.get("/api/users", movieHandlers.getUser)
app.get("/api/users/:id", movieHandlers.getUserById)
app.post("/api/movies", validateMovie, movieHandlers.postMovie)
app.post("/api/users", validateUser, movieHandlers.postUser)
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie)
app.put("/api/users/:id", validateUser, movieHandlers.updateUser)
app.delete("/api/movies/:id", movieHandlers.deleteMovie)
app.delete("/api/users/:id", movieHandlers.deleteUser)

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened")
  } else {
    console.log(`Server is listening on ${port}`)
  }
})
