const express = require("express");

const cors = require("cors");
const app = express();
app.use(express.static("build"));

let notes = [
	{
		id: 1,
		content: "HTML is easy",
		date: "2022-05-30T17:30:31.098Z",
		important: true,
	},
	{
		id: 2,
		content: "Browser can execute only Javascript",
		date: "2022-05-30T18:39:34.091Z",
		important: false,
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2022-05-30T19:20:14.298Z",
		important: false,
	},
];
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
	response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
	const id = Number(request.params.id);
	const note = notes.find((note) => note.id === id);
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

app.delete("/api/notes/:id", (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter((note) => note.id !== id);

	response.status(204).end();
});

const generatedId = () => {
	const maxId =
		notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
	return maxId + 1;
};

app.post("/api/notes", (request, response) => {
	const body = request.body;
	console.log(body);

	if (!body.content) {
		return response.status(400).json({
			error: "Content Missing",
		});
	}
	const note = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
		id: generatedId(),
	};
	notes.concat(note);
	console.log(note);
	response.json(note);
});

const unknownEndpoint = (request, response) => {
	response.status(404).send("Unknown endpoint");
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
	console.log(`Server running on the port ${PORT}`);
});
