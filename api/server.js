const express = require("express");

const postRouter = require("../router/router");


const server = express();
server.use(express.json());


server.get("/", (req, res) => {
    res.status(200).json({"hello":"world"})
})

server.use("/api/posts", postRouter);

module.exports = server;