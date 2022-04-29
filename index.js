require("dotenv").config();
const express = require("express");
const Note = require("./models/note");

const cors = require("cors");
const app = express();
app.use(express.static("build"));

const requestLogger = (request, response, next) => {
	console.log("Method :", request.method);
	console.log("Path :", request.path);
	console.log("Body :", request.body);
	next();
};
app.use(cors());
app.use(express.json());

app.use(requestLogger);

// app.get("/", (request, response) => {
// 	response.send("<h1>Hello World</h1>");
// });

app.get("/api/notes/", (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes);
	});
});

app.get("/api/notes/:id", (request, response) => {
	const id = String(request.params.id);
	Note.findById(id).then((note) => {
		response.json(note);
	});
});

app.delete("/api/notes/:id", (request, response) => {
	const id = String(request.params.id);

	Note.findById(id).then((note) => {
		response.json(note);
	});

	response.status(204).end();
});

app.post("/api/notes", (request, response) => {
	const body = request.body;
	if (!body.content) {
		return response.status(400).json({
			error: "Content Missing",
		});
	}
	const note = new Note({
		content: body.content,
		date: new Date(),
		important: body.important || false,
	});

	note.save().then((savedNote) => {
		response.json(savedNote);
	});
});

// const unknownEndpoint = (request, response) => {
// 	response.status(404).send("Unknown endpoint");
// };
// app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on the port ${PORT}`);
});
