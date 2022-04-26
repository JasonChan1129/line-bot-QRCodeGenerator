require('dotenv').config();
const express = require('express');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.LINE_ACCESS_TOKEN;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/', (req, res) => {
	res.send('You has reached my server');
});

app.post('/webhook', (req, res) => {
	if (req.body.events[0].type === 'message') {
		const dataString = JSON.stringify({
			replyToken: req.body.events[0].replyToken,
			messages: [
				{
					type: 'text',
					text: 'Hello, user',
				},
				{
					type: 'text',
					text: 'May I help you?',
				},
			],
		});

		// Request header
		const headers = {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + TOKEN,
		};

		// Options to pass into the request
		const webhookOptions = {
			hostname: 'api.line.me',
			path: '/v2/bot/message/reply',
			method: 'POST',
			headers: headers,
			body: dataString,
		};

		// Define request
		const request = https.request(webhookOptions, res => {
			res.on('data', d => {
				process.stdout.write(d);
			});
		});

		// Handle error
		request.on('error', err => {
			console.error(err);
		});

		// Send data
		request.write(dataString);
		request.end();
	}
	res.send('HTTP POST request sent to the webhook URL!');
});

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
