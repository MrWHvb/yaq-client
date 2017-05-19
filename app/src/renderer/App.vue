<template lang="html">
	<div id="main-page">
		<div>Status: {{status}}</div>
		<button @click='emulate'>emulate</button>

		<div class="messages">
			Messages:
			<div class="message" v-for='message in messages'>
				<div class="header">{{message.header}}</div>
				<div class="text">{{message.text}}</div>
			</div>
		</div>
	</div>
</template>

<script>
const Tester = require('../classes/Tester.js');

module.exports =  {
	data() {
		return {
			status: 'free',
			test_options: {
				repo: null,
				user: null,
				site: null
			},
			messages: []
		}
	},
	methods: {
		emulate() {
			this.$socket.emit('yaq.client:emulate-test', {
				repo: 'repo name',
				user: 'user name',
				site: 'site url'
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
		}
	}
}
</script>

<style lang="scss">
body {
	background-color: #fff;
}
.hello {
	color: #fff;
}
</style>
