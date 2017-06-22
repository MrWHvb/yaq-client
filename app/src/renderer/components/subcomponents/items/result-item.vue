<template lang="html">
	<div :class='className(list.report[iterator], list.report[iterator - 1])'>
		<div class="block-of-test" :tpl='item.level.toLowerCase()'>
			<div class="timestamp"> 
				{{time1(item.timestamp)}}
				<b>({{time2(item.timestamp)}})</b>
			</div>
			<div class="type">Level: {{item.level}}</div>
			<div class="message"><pre>{{item.message}}</pre></div>
		</div>
	</div>
</template>

<script>
const moment = require('moment');

module.exports = {
	props: ['list', 'item', 'iterator'],
	
	methods: {
		time1(ms) {
			return moment(ms).format('HH:mm:ss');
		},
		time2(ms) {
			return moment(ms).format('dddd, DD.MM.YYYY');
		},
		
		className(block1, block2) {
			if(block2) {
				// console.log(block);
				if(block1.level == "WARNING" && block2.level == "WARNING") return "cols s_24";
				else return "cols s_12"
			}
			return "cols s_12"
			// (browser.report[i-1] ? browser.report[i-1].level : false) == "WARNING" ? "cols s_24" : "cols s_12"
		}
	}
}
</script>

<style lang="scss">
	
</style>
