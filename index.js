const server = require("./api/server.js");

const PORT = 5005;
server.listen(PORT, () => {
    console.log(`\n******Running on http://localhost:${PORT}****\n`);
})