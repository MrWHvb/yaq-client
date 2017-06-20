<template lang="html">
	<div id="history">
		<div class="row">
			<div class="cols s_18">
				<div class="results">
					<test-results></test-results>
				</div>
			</div>
			
			<div class="cols s_6">
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
	width: 100%;
	display: flex;
	
	> .row > .cols {
		display: flex;
		
		.results {
			background-color: rgba(blue, .1);
			width: 100%;
			position: relative;
		}
	}
}
</style>
