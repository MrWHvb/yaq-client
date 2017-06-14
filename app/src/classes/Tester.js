const vm = require('vm');

const webdriver = require('selenium-webdriver');
const selenium = require('selenium-standalone');


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
                if (err) {
                    console.log(err);
                } else {
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


            try {
                const script = new vm.Script(test.code);

                const sandbox = {
                    console,
                    client,
                    webdriver,
                    // report,
                    stack: null,
                    logging: require('selenium-webdriver/lib/logging'),
                    until: require('selenium-webdriver/lib/until'),
                    WebElementPromise: webdriver.WebElementPromise,
                    Sleep: {
                        sleep: function(time) {
                            var setTime = new Date().getTime();
                            for (var i = 0; i < 1e7; i++) {
                                if ((new Date().getTime() - setTime) > time) {
                                    break;
                                }
                            }
                        }
                    },
                    Tab: {
                        openInNewTab: function(url) {
                            // var win = window.open(url);
                            let a = document.createElement('a');
                            a.href = url;
                            a.target = '_blank';
                            a.click();
                            //window.focus();

                        }
                    }
                }



                const context = new vm.createContext(sandbox)

                // console.log(sandbox);

                await script.runInContext(context);

                // console.log(sandbox);

                return sandbox.stack;
            } catch (e) {
                await client.quit().then(() => {
                    alert(`Error when run user test: "${e}".\nPlease, check test code!`);
                });

                return false;
            }
        }

        for (var browser in browsers) {
            if (browsers.hasOwnProperty(browser)) {
                // console.log(browser, browsers[browser]);
                if (browsers[browser]) {
                    report.push({
                        browser,
                        testName: test.name,
                        report: await testInBrowser(browser)
                    })
                }
            }
        }

        cb(report);
        console.log(`Report: ${report}`);
    }
}

module.exports = Tester;