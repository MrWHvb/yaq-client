<template lang="html">
	<div id="test-creator">
		
		<tests-list :name='name'></tests-list>
		
		<div class="row">
			<div class="cols s_24">
				
				<div class="save-error" v-if='saveError'>
					<!-- <pre>{{saveError}}</pre> -->
					<div v-show='saveError.code == "EEXIST"'>
						Test with name <b>"{{name}}"</b> already exists. Enter other name or overwrite test.
					</div>
				</div>
				
				<div class="controls">
					<input type="text" @input='setTestName($event)' v-model='name' placeholder="Test name...">
					
					<input type="checkbox" @change='overwriteFlag($event)' v-model='overwrite' id='overwrite'>
					<label for='overwrite' title='Overwrite current test'></label>
					
					<button @click='saveTest'>Save test</button>
				</div>
				
				<div class="code-editor">
					<div id="ace"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');
require("brace/ext/language_tools");
require("brace/ext/searchbox");
// console.log(ace);

let editor;

module.exports = {
	data() {
		return {
			// code: '',
			// overwrite: false,
			saveError: null,
			searchText: ''
		}
	},
	
	components: {
		'tests-list': require('./subcomponents/testsList.vue')
	},
	
	computed: {
		overwrite() {
			return this.$store.getters.getRewriteFlag;
		},
		name() {
			return this.$store.getters.getCurrentTest.name;
		},
		code() {
			return this.$store.getters.getCurrentTest.code || '';
		},
	},
	
	methods: {
		setTestName(e) {
			this.$store.commit('setCurrentTest', {
				name: e.target.value,
				code: this.code
			})
		},
		overwriteFlag(e) {
			this.$store.commit('setRewriteFlag', e.target.checked);
		},
		
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
			
			this.$store.commit('setCurrentTest', {
				name: this.name,
				code: this.code
			})
		}
	},
	
	beforeRouteLeave(to, from, next) {
		// console.log(to, from, next);
		
		let pos = editor.getCursorPosition();
		// console.log(pos);
		this.$store.commit('setCursorPosition', pos);
		
		next();
	},
	
	mounted() {
		let h = this.$el.clientHeight;
		// console.log(h);
		
		let c = this.$el.querySelector('.controls').clientHeight;
		
		// console.dir(c);
		// console.log(`${h - (c + 40)}px`);
		this.$el.querySelector('.code-editor').style.height = `${h - (c + 20)}px`;
		
		editor = ace.edit("ace");
		
		editor.$blockScrolling = Infinity;
		
		this.$options.sockets['yaq.server:test-already-exists'] = data => {
			this.saveError = data;
		}
		
		this.$options.sockets['yaq.server:receive-test-by-name'] = test => {
			// console.log(list);
			this.name = test.name;
			this.code = test.code;
			
			editor.setValue(test.code);
			
			this.$store.commit('setCurrentTest', {
				name: test.name,
				code: test.code
			})
		}
		
		// console.log(editor);
		editor.setOptions({
			enableBasicAutocompletion: true
		});
		editor.getSession().setMode("ace/mode/javascript");
		editor.setTheme("ace/theme/monokai");
		editor.setFontSize(14);
		
		editor.commands.addCommand({
			name: 'saveFile',
			bindKey: {
				win: 'Ctrl-S',
				mac: 'Command-S',
				sender: 'editor|cli'
			},
			exec: (env, args, request) => {
				this.saveTest();
			}
		});
		
		editor.on('change', (ev, ed) => {
			
			this.$store.commit('setCurrentTest', {
				name: this.name,
				code: ed.getValue()
			})
		})
		
		editor.setValue(this.code);
		
		let coords = this.$store.getters.getCursorPosition;
		// console.log(this);
		
		editor.gotoLine(coords.row + 1, coords.column);
		editor.focus();
	}
}
</script>

<style lang="scss">
@import "../../scss/wanted";

#test-creator {
	width: 100%;
	
	> .row > .cols {
		display: flex;
		flex-direction: column;
		// align-content: stretch;
		
		.controls {
			display: flex;
			margin: 0 0 20px;
			@include flex(0 0 auto);
			
			[type='text'] {
				margin: 0 20px 0 0;
				flex: 1 1 auto;
				padding: 0 10px;
				letter-spacing: 1px;
			}
			
			[type='checkbox'] {
				display: none;
				
				&:checked {
					& + label {
						background-color: rgba(blue, .5);
						color: #fff;
						opacity: 1;
					}
				}
			}
			
			label {
				// padding: 10px 20px;
				background-color: rgba(blue, .2);
				transition: all 300ms ease 0ms;
				cursor: pointer;
				margin: 0 20px 0 0;
				// flex: 0 1 auto;
				width: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				opacity: .5;
				
				&:after {
					@include fa($fa-repeat);
				}
				
				&:hover {
					background-color: rgba(blue, .3);
					opacity: .7;
				}
			}
			
			button {
				width: 150px;
				font-size: 10px;
				text-transform: uppercase;
				letter-spacing: 1px;
				height: 35px;
			}
		}
		
		.code-editor {
			position: relative;
			width: 100%;
			background-color: rgba(red, .2);
			// height: 100%;
			// flex: 1 0 auto;
			// display: flex;
			// align-items: stretch;
			
			#ace {
				// width: 100%;
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				padding: 10px 0;
			}
		}
	}
}
</style>
