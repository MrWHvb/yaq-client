<template lang="html">
	<div id="test-creator">

		<h1>Test editor</h1>

		<div class="wrapper">
			<div class="left">
				<h3>Editor</h3>
				<div class="save-error" v-if='saveError'>
					<!-- <pre>{{saveError}}</pre> -->
					<div v-show='saveError.code == "EEXIST"'>
						Test with name <b>"{{name}}"</b> already exists. Enter other name or overwrite test.
					</div>
				</div>

				<div class="name">
					<input type="text" v-model='name' placeholder="Test name...">
				</div>

				<div class="code">
					<textarea @keyup='keyUp' v-model='code' :rows='rows' placeholder="Test code..."></textarea>
				</div>

				<label>Overwrite if exists: <input type="checkbox" v-model='overwrite'></label>

				<button @click='saveTest'>Save test</button>
			</div>

			<div class="right">
				<tests-list :name='name'></tests-list>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {
			name: '',
			code: '',
			overwrite: false,
			rows: 1,
			saveError: null,
			searchText: ''
		}
	},

	components: {
		'tests-list': require('./subcomponents/testsList.vue')
	},

	computed: {

	},

	methods: {
		keyUp() {
			this.rows = this.code.split('\n').length || 1
		},

		saveTest() {
			this.saveError = null;

			this.$socket.emit('yaq.client:save-new-test', {
				name: this.name,
				code: this.code,
				overwrite: this.overwrite
			})
		}
	},

	mounted() {
		this.$options.sockets['yaq.server:test-already-exists'] = data => {
			this.saveError = data;
		}

		this.$options.sockets['yaq.server:receive-test-by-name'] = test => {
			// console.log(list);
			this.name = test.name;
			this.code = test.code;
			this.rows = test.code.split('\n').length || 1
		}
	}
}
</script>

<style lang="scss">
#test-creator {

	.wrapper {
		display: flex;

		.left {
			flex: 1 1 auto;
			padding: 0 20px 0 0;

			.name {
				margin: 0 0 10px;

				input {
					display: block;
					width: 100%;
					height: 30px;
					padding: 0 10px;
				}
			}

			.code {
				flex: 1 0 auto;

				textarea {
					display: block;
					width: 100%;
					height: auto;
					resize: none;
					min-height: 200px;
					overflow: visible;
				}
			}
		}

		.right {


		}
	}
}
</style>
