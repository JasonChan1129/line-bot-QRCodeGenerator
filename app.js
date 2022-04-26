const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('You has reached my server!');
});

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
