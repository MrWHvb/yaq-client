<template lang="html">
	<div class="test-results">
		<div class="browser" v-for='(browser, k) in results'>
			<input type="checkbox" :id='`browser-${k}`'>
			<div class="name">
				<label :for='`browser-${k}`'>
					<div>
						Browser: <b>{{browser.browser}}</b>
						<span class="test-name" v-if='browser.testName'>Test name: <b>{{browser.testName}}</b></span>
					</div>
				</label>
			</div>

			<div class="report">
				<div class="block-of-test" :tpl='block.level.toLowerCase()' v-for='(block, i) in browser.report'>
					<div class="timestamp">
						{{time1(block.timestamp)}}
						<b>({{time2(block.timestamp)}})</b>
					</div>
					<div class="level">Level: {{block.level}}</div>
					<div class="message"><pre>{{block.message}}</pre></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const moment = require('moment');

module.exports = {
	data() {
		return {
			results: null
		}
	},

	methods: {
		time1(ms) {
			return moment(ms).format('HH:mm:ss');
		},
		time2(ms) {
			return moment(ms).format('dddd, DD.MM.YYYY');
		}
	},

	mounted() {
		this.$options.sockets['yaq.server:show-test-report'] = link => {
			console.log(link);

			// this.status = 'free';

			this.$http.get(`http://193.70.37.135:506/${link}`).then(response => {
				console.log(response);
				this.results = response.body;
			}, err => {
				console.log(err);
				// this.messages = err
			})
		}
	}
}
</script>

<style lang="scss">
.test-results {

	.browser {

		> input {
			display: none;

			&:checked {

				& ~ .name {
					label {
						&:after {
							content: '-';
						}
					}
				}

				& ~ .report {
					display: block;
				}
			}
		}

		> .name {
			font-size: 20px;
			padding: 10px;
			background-color: rgba(blue, .1);
			margin: 0 0 5px;

			label {
				display: flex;
				justify-content: space-between;
				width: 100%;
				align-items: center;
				cursor: pointer;

				b {
					display: inline-block;
					padding: 0 5px;
				}

				&:after {
					content: '+';
				}
			}

			b {
				text-transform: uppercase;
			}
		}


		.report {
			display: none;

			.block-of-test {
				margin: 0 0 20px;
				padding: 10px;

				&[tpl='info'] {
					background-color: rgba(#aaa, .3);
				}

				&[tpl='warning'] {
					background-color: rgba(red, .3);
				}

				.timestamp {
					margin: 0 0 10px;

					b {
						font-size: 12px;
					}
				}

				.level {

				}

				.message {

					pre {
						white-space: pre-wrap;
					}
				}
			}
		}
	}
}
</style>
