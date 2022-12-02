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

app.get("/api/:date?", (req, res) => {
	const date = new Date(
		parseInt(req.params.date * 1, 10) || req.params.date || Date.now()
	);

	if (date.toString() == "Invalid Date") res.json({ error: "Invalid Date" });
	else
		res.json({
			unix: date.getTime(),
			utc: date.toUTCString(),
		});
});

app.listen(PORT, () => {
	console.log(`Your app is listening on port ${PORT}`);
});
