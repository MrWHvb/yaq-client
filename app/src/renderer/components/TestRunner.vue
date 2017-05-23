<template lang="html">
	<div id="test-runner">
		<h1>Test runner</h1>

		<div class="wrapper">
			<div class="browsers">
				Choose browsers for testing:
				<ul>
					<li>
						<label>Chrome: <input type="checkbox" v-model='browsers.chrome'></label>
					</li>
					<li>
						<label>Firefox: <input type="checkbox" v-model='browsers.firefox'></label>
					</li>
					<!-- <li>
						<label>Opera: <input type="checkbox" v-model='browsers["opera chromium"]'></label>
					</li> -->
					<li>
						<label>IE: <input type="checkbox" v-model='browsers["internet explorer"]'></label>
					</li>
					<!-- <li>
						<label>Edge: <input type="checkbox" v-model='browsers.edge'></label>
					</li> -->
				</ul>

				Choosed test: <b>{{testName}}</b>

				<button type="button" @click='runTest'>run test</button>
			</div>

			<div class="tests">
				<tests-list :name='testName'></tests-list>
			</div>
		</div>

		<test-results></test-results>
	</div>
</template>

<script>
const Tester = require('../../classes/Tester.js');

module.exports = {
	data() {
		return {
			browsers: {
				chrome: false,
				firefox: false,
				// 'opera chromium': false,
				'internet explorer': false,
				// edge: false
			},
			testName: '',
			testCode: ''
		}
	},

	components: {
		'tests-list': require('./subcomponents/testsList.vue'),
		'test-results': require('./subcomponents/testResults.vue')
	},

	methods: {
		runTest() {
			if(
				!this.browsers.chrome && !this.browsers.firefox /*&& !this.browsers['opera chromium']*/
				&& !this.browsers['internet explorer'] /*&& !this.browsers.edge*/
			) {
				alert('Please, choose at least one browser for test!')
			}
			else {
				if(this.testName == '') {
					alert('Please, choose test name from list!')
				}
				else {
					let test = new Tester();

					test.run({name: this.testName, code: this.testCode}, this.browsers, testreport => {
						this.$socket.emit('yaq.client:finished-test', testreport);
						console.log('Send test report... Done.');
					});
				}
			}
		}
	},

	mounted() {
		this.$options.sockets['yaq.server:receive-test-by-name'] = test => {
			this.testName = test.name;
			this.testCode = test.code;
		}
	}
}
</script>

<style lang="scss">
#test-runner {

	.wrapper {
		display: flex;

		.browsers {
			flex: 1 1 auto;
			background-color: rgba(red, .1);
		}

		.tests {
			flex: 0 1 300px;
			padding: 0 0 0 20px;
		}
	}
}
</style>
