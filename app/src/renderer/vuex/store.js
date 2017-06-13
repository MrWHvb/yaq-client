const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex);

module.exports = new Vuex.Store({
	state: {
		testCreator: {
			currentTest: {},
			rewriteFlag: false
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
		getRewriteFlag: state => state.testCreator.rewriteFlag,
		getCurrentTest: state => state.testCreator.currentTest,
		getActiveBrowsers: state => state.testRunner.browsers
	},

	mutations: {
		updateTestsList(state, payload) {
			state.allAvailableTests = payload;
		},
		
		setCurrentTest(state, payload) {
			// console.log(payload);
			state.testCreator.currentTest = payload;
		},
		
		setRewriteFlag(state, payload) {
			// console.log(payload);
			state.testCreator.rewriteFlag = payload;
		},
		
		setActiveBrowsers(state, payload) {
			state.testRunner.browsers = payload;
		}
	}
})
