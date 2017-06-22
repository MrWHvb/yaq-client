<template lang="html">
	<div class="test-results">
		
		<div class="filter">
			<ul>
				<li>
					<label>
						<input type="checkbox" v-model='logs.all'>
						<span>all</span>
					</label>
				</li>
				<li>
					<label>
						<input type="checkbox" v-model='logs.info'>
						<span>info</span>
					</label>
				</li>
				<li>
					<label>
						<input type="checkbox" v-model='logs.warning'>
						<span>warning</span>
					</label>
				</li>
			</ul>
		</div>
		
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
				<!-- {{browser}} -->
				
				<template v-if='!browser.report'>
					Nothing to show.
				</template>
				
				<template v-else>
					<div class="row">
						<template v-for='(block, i) in browser.report'>
							<!-- <pre>{{block}}</pre> -->
							
							<template v-if='logs.all'>
								<result-item :list='browser' :item='block' :iterator='i'></result-item>
							</template>
							
							<template v-if='!logs.all && logs.info && block.level.toLowerCase() == "info"'>
								<result-item :list='browser' :item='block' :iterator='i'></result-item>
							</template>
							
							<template v-if='!logs.all && logs.warning && block.level.toLowerCase() == "warning"'>
								<result-item :list='browser' :item='block' :iterator='i'></result-item>
							</template>
						</template>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {
			logs: {
				all: false,
				info: false,
				warning: true
			},
			results: null
		}
	},

	components: {
		'result-item': require('./items/result-item.vue')
	},

	mounted() {
		this.$options.sockets['yaq.server:show-test-report'] = object => {
			this.results = object;
		}
	},
	
	watch: {
		'logs.all'() {
			if(this.logs.all) {
				this.logs.info = true;
				this.logs.warning = true;
			}
		},
		'logs.info'() {
			if(this.logs.info && this.logs.warning) {
				this.logs.all = true;
			}
			else {
				this.logs.all = false;
			}
		},
		'logs.warning'() {
			if(this.logs.info && this.logs.warning) {
				this.logs.all = true;
			}
			else {
				this.logs.all = false;
			}
		}
	}
}
</script>

<style lang="scss">
@import "../../../scss/wanted";

.test-results {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: auto;
	
	.filter {
		
		ul {
			display: flex;
			
			li {
				margin: 0 10px 10px 0;
				
				label {
					cursor: pointer;
					
					input {
						display: none;
						
						&:checked + span {
							background-color: rgba(red, .5);
						}
					}
					
					span {
						display: block;
						padding: 10px;
						background-color: rgba(red, .1);
						@include single-transition;
						
						&:hover {
							background-color: rgba(red, .2);
						}
					}
				}
			}
		}
	}

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
