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
				<div class="row">
					<div v-for='(block, i) in browser.report' :class='className(browser.report[i], browser.report[i-1])'>
						<div class="block-of-test" :tpl='block.level.toLowerCase()'>
							<div class="timestamp"> 
								{{time1(block.timestamp)}}
								<b>({{time2(block.timestamp)}})</b>
							</div>
							<div class="type">Level: {{block.level}}</div>
							<div class="message"><pre>{{block.message}}</pre></div>
						</div>
					</div>
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
		},
		
		className(block1, block2) {
			if(block2) {
				// console.log(block);
				if(block1.level == "WARNING" && block2.level == "WARNING") return "cols s_24";
				else return "cols s_12"
			}
			return "cols s_12"
			// (browser.report[i-1] ? browser.report[i-1].level : false) == "WARNING" ? "cols s_24" : "cols s_12"
		}
	},

	mounted() {
		this.$options.sockets['yaq.server:show-test-report'] = object => {
			this.results = object;
		}
	}
}
</script>

<style lang="scss">
.test-results {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: auto;

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
			
			> .row {
				margin: 0;
			}

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

				.type {
					font-size: 14px;
				}

				.message {
					font-size: 14px;

					pre {
						white-space: pre-wrap;
					}
				}
			}
		}
	}
}
</style>
