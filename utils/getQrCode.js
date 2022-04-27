// require('dotenv').config({ path: '../.env' });
const puppeteer = require('puppeteer');

async function getQrCode() {
	console.log('execute get qr code');
	console.log('path', process.cwd());
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
	});
	const page = await browser.newPage();
	await page.goto(`https://www.topworld.com.tw/qrlogin?id=${process.env.ID}`);
	await page.waitForSelector("button[class='_1fbEI']");
	await page.click("button[class='_1fbEI']");
	await page.waitForNavigation();
	await page.waitForSelector("a[class='VNb9p']");
	// const QRcode = await page.$('._13Lxq');
	await page.screenshot({
		path: '/app/public/screenshot/screenshot.png',
	});
	await browser.close();
	console.log('function finished executing');
}

module.exports = getQrCode;
