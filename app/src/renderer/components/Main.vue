<template lang="html">
	<div id="main-page">
		<div>Status: {{status}}</div>
		<button @click='emulate'>emulate</button>
		<button @click='emulate2'>enulate 2</button>

		<div class="tests-list">
			<select v-model='testName'>
				<option value='-1'>Choose name of test</option>
				<option v-for='test in testsList' :value='test'>{{test}}</option>
			</select>
		</div>

		<div class="messages">
			Messages:
			<div class="message" v-for='message in messages'>
				<div class="header">{{message.header}}</div>
				<div class="text">{{message.text}}</div>
			</div>
		</div>

		<test-results :results='testResults'></test-results>
	</div>
</template>

<script>
const Tester = require('../../classes/Tester.js');

module.exports =  {
	data() {
		return {
			status: 'free',
			test_options: {
				repo: null,
				user: null,
				site: null
			},
			messages: [],
			testResults: null,
			testsList: [],
			testName: ''
		}
	},

	components: {
		'test-results': require('./subcomponents/testResults.vue')
	},

	methods: {
		emulate() {
			this.$socket.emit('yaq.client:emulate-test', {
				repo: 'repo name',
				user: 'user name',
				site: 'site url'
			})
		},

		emulate2() {
			this.$http.get(`http://193.70.37.135:506/logs/reports/1495435444252.json`).then(response => {
				console.log(response);
				this.testResults = response.body;
			}, err => {
				console.log(err);
				this.messages = err
			})
		}
	},
	mounted() {
		let tester = new Tester();

		this.$options.sockets['yaq.server:run-test'] = data => {
			console.log(data);
			this.status = 'busy';

			tester.run(testreport => {
				this.$socket.emit('yaq.client:finished-test', testreport);
				console.log('Send test report... Done.');
			});
		}

		this.$options.sockets['yaq.server:saved-test'] = link => {
			console.log(link);

			this.status = 'free';

			this.$http.get(`http://193.70.37.135:506/${link}`).then(response => {
				console.log(response);
				this.testResults = response.body;
			}, err => {
				console.log(err);
				this.messages = err
			})
		}

		// get list of available tests
		this.$socket.emit('yaq.client:get-tests-list');
		this.$options.sockets['yaq.server:show-tests-list'] = list => {
			console.log(list);
			this.testsList = list;
		}
	}
}
</script>

<style lang="scss">

</style>
