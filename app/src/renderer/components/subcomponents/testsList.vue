<template lang="html">
	<div id="tests-list" :class='opened ? "active" : ""'>
		
		<div class="opener" @click='open'></div>
		
		<div class="shadow" @click='open'></div>
		
		<div class="list">
			<input type="text" v-model='searchText' placeholder='Search'>

			<ul>
				<li 	:file='test'
						v-for='test in filteredTestsList'
						@click.self='loadTest($event)'
						:class='name == test.replace(".code", "") ? "active" : ""'>
					
					<span>{{test.replace('.code', '')}}</span>
					
					<div class="ctrl">
						<div class="remove" @click='removeTest($event)' title="remove"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
module.exports = {
	props: ['name'],
	data() {
		return {
			searchText: '',
			opened: false
		}
	},
	computed: {
		listOfTests() {
			return this.$store.state.allAvailableTests;
		},
		filteredTestsList() {
			return this.listOfTests.filter(test => {
				return test.toLowerCase().indexOf(this.searchText) !== -1
			})
		}
	},

	methods: {
		open() {
			this.opened = !this.opened;
		},
		loadTest(e) {
			// console.log(e.target);

			let name = e.target.getAttribute('file');

			this.$socket.emit('yaq.client:get-test-by-name', name);
		},
		
		removeTest(e) {
			let filename = e.target.parentElement.parentElement.getAttribute('file');
			let testname = filename.replace(/\.code$/, '');
			
			let flag = confirm(`Removing test "${testname}".\nAre you sure?`);
			
			if(flag) {
				console.log(filename);
				this.$socket.emit('yaq.client:remove-test-by-name', filename)
			}
			else {
				console.log('qwdqw');
			}
		}
	},

	mounted() {
		this.$socket.emit('yaq.client:get-tests-list');

		this.$options.sockets['yaq.server:show-tests-list'] = list => {
			// console.log(list);
			this.$store.commit('updateTestsList', list);
		}
		
		this.$options.sockets['yaq.server:test-is-removed'] = name => {
			// console.log(list);
			alert(`Test "${name}" is removed`);
		}
	}
}
</script>

<style lang="scss">
@import "../../../scss/wanted";

#tests-list {
	
	&.active {
		
		.opener {
			transform: translateX(0px) translateY(0px);
			justify-content: center;
			
			&:after {
				@include fa($fa-times);
			}
			
			&:hover {
				transform: translateX(0px) translateY(0px);
			}
		}
		
		.shadow {
			opacity: 1;
			pointer-events: auto;
		}
		
		.list {
			transform: translateX(0px);
			opacity: 1;
		}
	}
	
	.opener {
		width: 35px;
		height: 35px;
		background-color: red;
		position: fixed;
		top: 20px;
		right: 370px;
		z-index: 8;
		@include single-transition;
		transform: translateY(calc(50vh - 17px)) translateX(380px);
		cursor: pointer;
		display: flex;
		align-items: center;
		
		&:after {
			@include fa($fa-chevron-left);
			font-size: 20px;
			color: #fff;
		}
		
		&:hover {
			transform: translateY(calc(50vh - 17px)) translateX(370px)
		}
	}
	
	.shadow {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 7;
		background-color: rgba(#000, .5);
		@include pointer-events(none);
		opacity: 0;
		@include single-transition;
	}
	
	.list {
		background-color: #fff;
		position: fixed;
		top: 10px;
		bottom: 10px;
		right: 10px;
		width: 350px;
		z-index: 8;
		padding: 10px;
		box-shadow: 0 0 10px #aaa;
		display: flex;
		flex-direction: column;
		@include single-transition;
		transform: translateX(350px);
		opacity: 0;
		
		input {
			height: 35px;
			display: block;
			width: 100%;
			padding: 0 10px;
			margin: 0 0 20px;
			flex: 0 0 auto;
		}

		ul {
			list-style-type: none;
			padding: 0 10px 0 0;
			margin: 0;
			flex: 1 1 auto;
			overflow: auto;

			li {
				padding: 10px 20px 10px 10px;
				background-color: #eee;
				margin: 0 0 5px;
				cursor: pointer;
				transition: all 300ms ease 0ms;
				position: relative;

				&:hover {
					background-color: darken(#eee, 7%);
				}

				&.active {
					background-color: darken(#eee, 12%);
				}
				
				span {
					font-size: 12px;
					display: block;
					line-height: 15px;
					pointer-events: none;
				}
				
				.ctrl {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					width: 20px;
					background-color: rgba(red, .1);
					display: flex;
					align-items: center;
					justify-content: center;
					
					&:hover {
						
						.remove {
							opacity: 1;
						}
					}
					
					.remove {
						@include single-transition;
						opacity: 0.1;
						
						&:after {
							@include fa($fa-times);
						}
					}
				}
			}
		}
	}
}
</style>
