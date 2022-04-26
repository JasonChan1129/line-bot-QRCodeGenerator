// require('dotenv').config();
const express = require('express');
const https = require('https');
const getQrCode = require('./utils/getQrCode');

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
	console.log('hello!');
	res.send('You has reached my server');
});

// when users interact with the bot, the line platform server sends a HTTP POST request to this route
app.post('/webhook', async (req, res) => {
	// if the user sends a message to the bot, reply through sending a POST request to line api endpoint
	if (req.body.events[0].type === 'message') {
		console.log('got qr');
		await getQrCode();
		// define request body
		const dataString = JSON.stringify({
			replyToken: req.body.events[0].replyToken,
			messages: [
				{
					type: 'text',
					text: 'Welcome! Please note that the qr code will be expired in 5 minutes.',
				},
				{
					type: 'image',
					originalContentUrl:
						'https://jasons-line-bot-qr.herokuapp.com/screenshot/screenshot.png',
					previewImageUrl:
						'https://jasons-line-bot-qr.herokuapp.com/screenshot/screenshot.png',
					// originalContentUrl:
					// 	'https://0bf6-114-44-52-13.jp.ngrok.io/screenshot/screenshot.png',
					// previewImageUrl: 'https://0bf6-114-44-52-13.jp.ngrok.io/screenshot/screenshot.png',
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
