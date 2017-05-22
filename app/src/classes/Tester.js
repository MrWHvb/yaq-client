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

		// TODO: run virtual script with some context
	}
}

module.exports = Tester;
