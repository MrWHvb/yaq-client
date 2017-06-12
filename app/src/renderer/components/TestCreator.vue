<template lang="html">
	<div id="test-creator">

		<div class="row">
			<div class="cols s_18">
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

				<div class="code-editor">
					<div id="ace"></div>
				</div>

				<label>Overwrite if exists: <input type="checkbox" v-model='overwrite'></label>

				<button @click='saveTest'>Save test</button>
			</div>

			<div class="cols s_6">
				<tests-list :name='name'></tests-list>
			</div>
		</div>
	</div>
</template>

<script>
const ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');
require("brace/ext/language_tools");
// console.log(ace);

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
		var editor = ace.edit("ace");
		editor.$blockScrolling = Infinity;
		
		this.$options.sockets['yaq.server:test-already-exists'] = data => {
			this.saveError = data;
		}

		this.$options.sockets['yaq.server:receive-test-by-name'] = test => {
			// console.log(list);
			this.name = test.name;
			this.code = test.code;
			this.rows = test.code.split('\n').length || 1;
			
			editor.setValue(test.code);
		}

		// console.log(editor);
		editor.setOptions({
			enableBasicAutocompletion: true
		});
		editor.getSession().setMode("ace/mode/javascript");
		editor.setTheme("ace/theme/monokai");

		editor.on('change', (ev, ed) => {
			this.code = ed.getValue();
		})
	}
}
</script>

<style lang="scss">
#test-creator {

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
			display: none;
			width: 100%;
			height: auto;
			resize: none;
			min-height: 200px;
			overflow: visible;
		}
	}

	.code-editor {
		position: relative;
		height: 500px;
		width: 100%;
		background-color: rgba(red, .2);

		#ace {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
	}
}
</style>
