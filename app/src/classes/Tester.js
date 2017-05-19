const webdriver = require('selenium-webdriver');
const selenium = require('selenium-standalone');

const Report = require('./Report.js');

class Tester {
	constructor() {

	}

	// запускаєм локальний сервер для керування браузерами
	runTestServer() {
		selenium.install({
			logger: message => {
				console.log(`Logger: ${message}`);
			},
			processCb: (totalLength, progressLength, chunkLength) => {
				console.log(`Total length: ${totalLength}`);
				console.log(`Progress length: ${progressLength}`);
				console.log(`Chunk length: ${chunkLength}`);
			}
		}, err => {
			console.log(`Install callback, err: ${err}`);

			selenium.start({
				javaArgs: ''
			}, (err, child) => {
				if(err) {
					console.log(err);
				}
				else {
					// console.log(child);
				}
			});
		});
	}

	run(cb) {
		console.log('test is running');

		let report = new Report();

		// chrome | firefox | internet explorer

		var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
		var URL = 'http://www.google.com.ua';

		var client = new webdriver.Builder()
		.usingServer(SELENIUM_HOST)
		.withCapabilities({ browserName: 'chrome' })
		.build();

		client.get(URL).then(async function() {

			report.newBlock('block1', 'test description 1');

			await client.findElement({ name: 'texweft' }).then(null, err => {
				// console.log(1);
				report.error('click on button 1', err)
				// console.log(2);
			});

			// console.log(3);
			//
			report.newBlock('block2', 'test description 2');
			await client.findElement({ name: 'sdvfwe' }).then(null, err => {
				// console.log(4);
				report.error('click on button 2', err)
				// console.log(5);
			});

			// console.log(6);
			//
			report.newBlock('block3', 'test description 3');
			await client.findElement({ name: 'tex234523weft' }).then(null, err => {
				// console.log(7);
				report.error('click on button 3', err)
				// console.log(8);
			});

			// console.log(9);
			await client.quit().then(() => {
				// console.log('Browser are successfully closed');
				// console.log(10);
				console.log(report.testStack());
				// cb(report.results())
				cb(report.testStack());
			});
		});
	}
}

module.exports = Tester;
