<template>
	<div id="app">
		<nav class='main-navigation'>
			<ul>
				<li>
					<router-link to='/'>Main</router-link>
				</li>
				<li>
					<router-link to='/test-creator'>Test editor</router-link>
				</li>
				<li>
					<router-link to='/test-runner'>Test runner</router-link>
				</li>
			</ul>
		</nav>
		<router-view>qwdqwd</router-view>
	</div>
</template>

<script>
module.exports =  {
	store: require('./vuex/store.js')
}
</script>

<style lang="scss">
body {
	background-color: #fff;
	font-family: Arial;
	font-size: 16px;
	box-sizing: border-box;

	* {
		box-sizing: border-box;
	}
}
</style>
