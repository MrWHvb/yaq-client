const webdriver = require('selenium-webdriver');
const selenium = require('selenium-standalone');

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

	run() {
		console.log('test is running');

		// chrome | firefox | internet explorer

		var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
		var URL = 'http://www.google.com.ua';

		var client = new webdriver.Builder()
		.usingServer(SELENIUM_HOST)
		.withCapabilities({ browserName: 'firefox' })
		.build();

		client.get(URL).then(function() {

			client.findElement({ name: 'texweft' }).then(null, err => {
				console.log(typeof err);
			})

			// client.findElement({ name: 'texweft' }).sendKeys('test');
			// client.findElement({ css: '.b-form-button__input' }).click();
			//
			// client.getTitle().then(function(title) {
			// 	assert.ok(title.indexOf('test — Яндекс: нашлось') > -1, 'Ничего не нашлось :(');
			// });

			client.quit();
		});

		return true;
	}
}

module.exports = Tester;
