const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex);

module.exports = new Vuex.Store({
	state: {
		testCreator: {
			currentTest: {},
			rewriteFlag: false,
			cursorPosition: {
				row: 0,
				column: 0
			}
		},
		
		testRunner: {
			browsers: {
				chrome: false,
				firefox: false,
				'internet explorer': false
			}
		},

		allAvailableTests: []
	},
	
	getters: {
		// test creator
		getRewriteFlag: state => state.testCreator.rewriteFlag,
		getCurrentTest: state => state.testCreator.currentTest,
		getCursorPosition: state => state.testCreator.cursorPosition,
		
		// test runner
		getActiveBrowsers: state => state.testRunner.browsers
	},

	mutations: {
		// test creator
		setCurrentTest(state, payload) {
			// console.log(payload);
			state.testCreator.currentTest = payload;
		},		
		setRewriteFlag(state, payload) {
			// console.log(payload);
			state.testCreator.rewriteFlag = payload;
		},
		setCursorPosition(state, payload) {
			state.testCreator.cursorPosition = payload;
		},
		
		updateTestsList(state, payload) {
			state.allAvailableTests = payload;
		},
		
		
		setActiveBrowsers(state, payload) {
			state.testRunner.browsers = payload;
		}
	}
})
