module.exports = [
	{
		path: '/',
		component: require('./components/Main.vue'),
		name: 'Main'
	},
	{
		path: '/test-creator',
		component: require('./components/TestCreator.vue'),
		name: 'Editor'
	},
	{
		path: '/test-runner',
		component: require('./components/TestRunner.vue'),
		name: 'Runner'
	},
	{
		path: '/history',
		component: require('./components/History.vue'),
		name: 'History'
	}
]
