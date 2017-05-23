<template lang="html">
	<div id="history">
		<div class="wrapper">
			<div class="left">
				<test-results></test-results>
			</div>

			<div class="right">
				<reports-list></reports-list>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {

		}
	},

	components: {
		'test-results': require('./subcomponents/testResults.vue'),
		'reports-list': require('./subcomponents/reportsList.vue')
	}
}
</script>

<style lang="scss">
#history {
	max-width: 100%;

	.wrapper {
		display: flex;

		.left {
			flex: 1 1 auto;
			padding: 0 20px 0 0;
		}

		.right {
			flex: 0 0 300px;
			background-color: rgba(yellow, .2);
		}
	}
}
</style>
