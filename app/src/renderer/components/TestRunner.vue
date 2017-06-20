<template lang="html">
	<div id="test-runner">

		<div class="row">
			<div class="cols s_24">
				<div class="wrapper">
					<div class="browsers">
						<div class="header">Choose browsers for testing:</div>
						
						<ul>
							<li>
								<input type="checkbox" @change='checkBrowser($event)' v-model='browsers.chrome' id='chrome'>
								<label for='chrome'>Chrome</label>
							</li>
							<li>
								<input type="checkbox" @change='checkBrowser($event)' v-model='browsers.firefox' id='firefox'>
								<label for='firefox'>Firefox</label>
							</li>
							<!-- <li>
								<label>Opera: <input type="checkbox" v-model='browsers["opera chromium"]'></label>
							</li> -->
							<li>
								<input type="checkbox" @change='checkBrowser($event)' v-model='browsers["internet explorer"]' id='ie'>
								<label for='ie'>IE</label>
							</li>
							<!-- <li>
								<label>Edge: <input type="checkbox" v-model='browsers.edge'></label>
							</li> -->
						</ul>

						<div class="header">
							Choosed test: <b>{{testName}}</b>
						</div>

						<button type="button" @click='runTest'>run test</button>
					</div>

					<div class="tests">
						<tests-list :name='testName'></tests-list>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="cols s_24">
				<test-results></test-results>
			</div>
		</div>
	</div>
</template>

<script>
const Tester = require('../../classes/Tester.js');

module.exports = {
	data() {
		return {
			// browsers: {
			// 	chrome: false,
			// 	firefox: false,
			// 	// 'opera chromium': false,
			// 	'internet explorer': false,
			// 	// edge: false
			// },
			// testName: '',
			// testCode: ''
		}
	},

	components: {
		'tests-list': require('./subcomponents/testsList.vue'),
		'test-results': require('./subcomponents/testResults.vue')
	},
	
	computed: {
		browsers() {
			return this.$store.getters.getActiveBrowsers;
		},
		testName() {
			// console.log(this.$store.getters.getCurrentTest.name);
			return this.$store.getters.getCurrentTest.name;
		},
		
		testCode() {
			return this.$store.getters.getCurrentTest.code;
		},
	},

	methods: {
		checkBrowser(e) {
			let list = this.browsers;
			
			list[e.target.getAttribute('id')] = e.target.checked;
			
			this.$store.commit('setActiveBrowsers', list);
		},
		
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
			
			this.$store.commit('setCurrentTest', {
				name: test.name,
				code: test.code
			})
		}
	}
}
</script>

<style lang="scss">
#test-runner {
	width: 100%;

	.wrapper {
		display: flex;

		.browsers {
			flex: 1 1 auto;
			background-color: rgba(red, .1);
			margin: 0 0 20px;
			
			.header {
				font-weight: 700;
				margin: 0 0 10px;
			}
			
			ul {
				display: flex;
				margin: 0 0 20px;
				
				li {
					margin: 0 10px 10px 0;
					
					input {
						display: none;
						
						&:checked {
							& + label {
								background-color: rgba(blue, .5);
								color: #fff;
							}
						}
					}
					
					label {
						padding: 10px;
						background-color: rgba(blue, .1);
						transition: all 300ms ease 0ms;
						cursor: pointer;
						
						&:hover {
							background-color: rgba(blue, .2);
						}
					}
				}
			}
			
			button {
				width: auto;
				padding: 10px 30px;
			}
		}

		.tests {
			flex: 0 1 300px;
			padding: 0 0 0 20px;
		}
	}
}
</style>
