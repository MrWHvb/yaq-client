const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex);

module.exports = new Vuex.Store({
	state: {
		testCreator: {

		},

		allAvailableTests: []
	},

	mutations: {
		updateTestsList(state, payload) {
			state.allAvailableTests = payload;
		}
	}
})
