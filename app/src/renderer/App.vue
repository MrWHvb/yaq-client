<template>
	<div id="body">
		<div id="top-wrapper">
			<div class="row">
				<div class="cols s_24">
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
							<li>
								<router-link to='/history'>Test history</router-link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>

		<div id="middle-wrapper">
			<div class="row">
				<div class="cols s_24">
					<router-view>qwdqwd</router-view>
				</div>
			</div>
		</div>

		<div id="bottom-wrapper">
			<div class="row">
				<div class="cols s_24">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
require('../scss/grid.scss');
require('../scss/text.scss');
require('../scss/fonts.scss');
require('../scss/awesome.scss');

module.exports =  {
	store: require('./vuex/store.js'),
	
	components: {
		statusbar: require('./components/Statusbar.vue')
	}
}
</script>

<style lang="scss">
	#top-wrapper {

		nav.main-navigation {

			ul {
				display: flex;

				li {

					a {
						display: block;
						text-decoration: none;
						color: #000;
						padding: 5px 10px;
						background-color: rgba(red, .1);

						&.router-link-exact-active {
							font-weight: 700;
							background-color: rgba(red, .2);
						}
					}
				}
			}
		}
	}
</style>
