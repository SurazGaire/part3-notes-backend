<<<<<<< Updated upstream
// require("dotenv").config();
const express = require("express");
const Note = require("./models/note");
=======
const app = require("./app"); // the actual Express application
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
>>>>>>> Stashed changes

const server = http.createServer(app);

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});
