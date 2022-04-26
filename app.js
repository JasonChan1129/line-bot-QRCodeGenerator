const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
// for using https
const options = {
	key: fs.readFileSync(`./localhost-key.pem`),
	cert: fs.readFileSync(`./localhost.pem`),
};
const httpsServer = https.createServer(options, app);

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

app.post('/webhook', (req, res) => {
	res.send('HTTP POST request sent to the webhook URL!');
});

httpsServer.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
