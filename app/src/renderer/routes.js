module.exports = [
	{
		path: '/',
		component: require('./components/Main.vue')
	},
	{
		path: '/test-creator',
		component: require('./components/TestCreator.vue')
	},
	{
		path: '/test-runner',
		component: require('./components/TestRunner.vue')
	},
	{
		path: '/history',
		component: require('./components/History.vue')
	}
]
