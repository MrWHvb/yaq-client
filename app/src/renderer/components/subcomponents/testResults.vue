<template lang="html">
	<div class="test-results">
		<div class="block-of-test" v-for='(block, i) in results'>
			<div class="block-name">{{block.name}}</div>
			<div class="block-description">{{block.description}}</div>
			<div class="block-results">
				<div class="result" :success='`${result.success}`' v-for='(result, j) in block.results'>
					<div class="action">Action: {{result.action}}</div>
					<div class="success">Success: <b>{{result.success}}</b></div>
					<div class="error" v-if='result.error'>
						<div class="name">Error name: <b>{{result.error.name}}</b></div>
						<div class="message">
							<input type="checkbox" :id='`err-${i}-${j}`'>
							<label :for='`err-${i}-${j}`'>Error message:</label>
							<div class="hidden-message">
								<pre>{{result.error.message}}</pre>
							</div>
						</div>
						<div class="stack">
							<input type="checkbox" :id='`stack-${i}-${j}`'>
							<label :for='`stack-${i}-${j}`'>Error stack:</label>
							<div class="hidden-message">
								<pre>{{result.error.stack}}</pre>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	props: ['results'],

	data() {
		return {

		}
	},
}
</script>

<style lang="scss">
.test-results {

	.block-of-test {
		background-color: rgba(#aaa, .3);
		margin: 0 0 20px;
		padding: 10px;

		.block-name {
			font-weight: 700;
			text-transform: uppercase;
			font-size: 20px;
			margin: 0 0 10px;
		}

		.block-description {
			margin: 0 0 10px;
		}

		.block-results {

			.result {
				padding: 10px 10px 5px;
				margin: 0 0 10px;

				&[success='true'] {
					background-color: rgba(green, .1);
				}

				&[success='false'] {
					background-color: rgba(red, .1);
				}

				.action {
					margin: 0 0 10px;
				}

				.success {
					margin: 0 0 10px;
				}

				.error {

					.name {
						margin: 0 0 10px;
					}

					.message, .stack {
						margin: 0 0 10px;

						input {
							display: none;

							&:checked {
								& ~ label {
									&:after {
										content: '-';
									}
								}

								& ~ .hidden-message {
									display: block;
								}
							}
						}

						label {
							display: flex;
							align-items: center;
							cursor: pointer;

							&:after {
								content: '+';
								display: block;
								font-size: 18px;
								padding: 0 10px;
							}
						}

						.hidden-message {
							display: none;
							max-width: 100%;
							overflow: auto;

							pre {
								display: block;
								width: 100%;
								// white-space: pre-wrap;
							}
						}
					}
				}
			}
		}
	}
}
</style>
