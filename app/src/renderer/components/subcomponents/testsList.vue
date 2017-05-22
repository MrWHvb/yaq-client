<template lang="html">
	<div id="tests-list">
		<h3>List of available tests</h3>

		<input type="text" v-model='searchText' placeholder='Search'>

		<ul>
			<li 	:file='test'
					v-for='test in filteredTestsList'
					@click.self='loadTest($event)'
					:class='name == test.replace(".code", "") ? "active" : ""'
			>
			{{test.replace('.code', '')}}
		</li>
	</ul>
</div>
</template>

<script>
module.exports = {
	props: ['name'],
	data() {
		return {
			searchText: ''
		}
	},
	computed: {
		listOfTests() {
			return this.$store.state.allAvailableTests;
		},
		filteredTestsList() {
			return this.listOfTests.filter(test => {
				return test.indexOf(this.searchText) !== -1
			})
		}
	},

	methods: {
		loadTest(e) {
			// console.log(e.target);

			let name = e.target.getAttribute('file');

			this.$socket.emit('yaq.client:get-test-by-name', name);
		}
	},

	mounted() {
		this.$socket.emit('yaq.client:get-tests-list');

		this.$options.sockets['yaq.server:show-tests-list'] = list => {
			// console.log(list);
			this.$store.commit('updateTestsList', list);
		}
	}
}
</script>

<style lang="scss">
#tests-list {
	input {
		height: 30px;
		display: block;
		width: 100%;
		padding: 0 10px;
		margin: 0 0 10px;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;

		li {
			padding: 5px;
			background-color: #eee;
			margin: 0 0 5px;
			cursor: pointer;
			transition: all 300ms ease 0ms;

			&:hover {
				background-color: darken(#eee, 7%);
			}

			&.active {
				background-color: darken(#eee, 12%);
			}
		}
	}
}
</style>
