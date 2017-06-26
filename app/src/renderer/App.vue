<template>
	<div id="body">
		<div id="top-wrapper">
			<!-- <div class="row">
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
			</div> -->
		</div>

		<div id="middle-wrapper">
			<router-view>qwdqwd</router-view>
		</div>

		<div id="bottom-wrapper">
			<statusbar></statusbar>
		</div>
	</div>
</template>

<script>
require('../scss/grid.scss');
require('../scss/text.scss');
require('../scss/fonts.scss');
require('../scss/awesome.scss');

const ipcRenderer = require('electron').ipcRenderer;

module.exports =  {
	store: require('./vuex/store.js'),
	
	components: {
		statusbar: require('./components/Statusbar.vue')
	},
	
	mounted() {
		ipcRenderer.on('vue-router:goto', (e, payload) => {
			console.log(payload);
			console.log(this);
			
			this.$router.push(payload)
		})
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
						padding: 10px 20px;
						background-color: rgba(red, .1);
						text-transform: uppercase;
						font-size: 12px;
						letter-spacing: 1px;
						transition: all 300ms ease 0ms;
						
						&:hover {
							background-color: rgba(red, .17);
						}

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
