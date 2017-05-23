const vm = require('vm');

const webdriver = require('selenium-webdriver');
const selenium = require('selenium-standalone');

const logging = require('selenium-webdriver/lib/logging');
const until = require('selenium-webdriver/lib/until');

console.log(logging);

// console.log(webdriver);

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

	async run(test, browsers, cb) {
		console.log('test is running');

		let report = [];

		async function testInBrowser(browser) {
			let report = new Report();

			// chrome | firefox | internet explorer

			var SELENIUM_HOST = 'http://localhost:4444/wd/hub';

			var client = new webdriver.Builder()
			.usingServer(SELENIUM_HOST)
			.withCapabilities({ browserName: browser })
			.build();

			client.get('http://happy-horse.web1.com.ua/').then(async function() {

				report.newBlock('Головна сторінка', 'Перевірка функціоналу мовних версій');

				await client.findElement({ css: '.yam-langselect-area .yam-lang-en' }).then(async (el) => {
					await el.click().then(() => {
						report.success('Перехід на англійську версію')
					});
				}, err => {
					report.error('Перехід на англійську версію', err)
				});

				await client.wait(until.elementLocated({css: '#loader'}), 10000);

				// await assert.contains('en', client.getCurrentUrl()).then(() => {
				// 	report.success('Перехід на англійську версію здійснений')
				// }, err => {
				// 	report.error('Перехід на англійську версію', err)
				// })


				await client.quit().then(() => {
					// stack = report.testStack();
				});
			});

			client.manage().logs().get(logging.Type.BROWSER).then(function(entries) {
				entries.forEach(function(entry) {
					console.log('[%s] %s', entry.level.name, entry.message);
				});
			});



			// try {
			// 	const script = new vm.Script(test.code);
			//
			// 	const sandbox = {
			// 		console,
			// 		client,
			// 		report,
			// 		stack: null,
			// 		until: webdriver.until,
			// 		assert: webdriver.assert
			// 	}
			//
			// 	const context = new vm.createContext(sandbox)
			//
			// 	// console.log(sandbox);
			//
			// 	await script.runInContext(context);
			//
			// 	// console.log(sandbox);
			//
			// 	return sandbox.stack;
			// }
			// catch(e) {
			// 	await client.quit().then(() => {
			// 		alert(`Error when run user test: "${e}".\nPlease, check test code!`);
			// 	});
			//
			// 	return false;
			// }
		}

		for (var browser in browsers) {
			if (browsers.hasOwnProperty(browser)) {
				// console.log(browser, browsers[browser]);
				if(browsers[browser]) {
					report.push({
						browser,
						testName: test.name,
						report: await testInBrowser(browser)
					})
				}
			}
		}

		cb(report);
	}
}

module.exports = Tester;
