const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
const dateNames = require("./dateNames");

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
	res.json({ greeting: "hello API" });
});

// TODO
// - Handle timestamp and date parameters

app.get("/api/:date", (req, res) => {
	let date;

	if (req.params.date[4] == "-") date = new Date(req.params.date);
	else date = new Date(req.params.date / 1000);

	if (date.toString() == "Invalid Date") res.json({ error: "Invalid Date" });

	let utc = date.toUTCString();
	let unix = date.getTime() * 1000;

	res.json({
		unix: unix,
		utc: utc,
	});
});

app.get("/api", (req, res) => {
	let date = new Date();

	let utc = date.toUTCString();
	let unix = date.getTime() * 1000;

	res.json({
		unix: unix,
		utc: utc,
	});
});

app.listen(PORT, () => {
	console.log(`Your app is listening on http://localhost:${PORT}`);
});
