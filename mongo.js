const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log(
		`Please provide a password as an argument : node mongo.js <password>`
	);
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.obrth.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const notSchema = new mongoose.Schema({
	content: String,
	date: Date,
	import: Boolean,
});

const Note = mongoose.model("Note", notSchema);

Note.find({}).then((result) => {
	// console.log(result);
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});

// const note = new Note({
// 	content: "HTML is easy",
// 	date: new Date(),
// 	important: true,
// });

// note.save().then((result) => {
// 	console.log("Note saved");
// 	mongoose.connection.close();
// });
