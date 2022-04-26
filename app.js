const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/', (req, res) => {
	res.send('You has reached my server!');
});

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
