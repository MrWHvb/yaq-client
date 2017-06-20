<template lang="html">
	<div id="reports-list">
		<div class="search">
			<input type="text">
		</div>
		
		<div class="list">
			<ul>
				<li v-for="report in orderedList" @click='liClick(report)' :class='report == currentReport ? "active" : false'>
					<span class="name">{{report}}</span>
					<span class="date">({{fileDate(report)}})</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
const _ = require('lodash');

module.exports = { 
	data() {
		return {
			list: null,
			currentReport: ''
		}
	},
	
	computed : {
		orderedList() {
			return this.list ? this.list.reverse() : [];
		}
	},

	methods: {
		liClick(file) {
			// console.log(file);
			this.$socket.emit('yaq.client:get-report-by-name', file);
			this.currentReport = file;
		},

		fileDate(file) {
			// let ms = file.replace('.json', '');
			// console.log(ms);
			let date = new Date(new Number(file.replace('.json', '')));

			let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
			let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
			let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
			let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
			let month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
			let year = date.getFullYear();

			return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
		}
	},

	mounted() {
		this.$socket.emit('yaq.client:get-reports-list');

		this.$options.sockets['yaq.server:show-reports-list'] = list => {
			// console.log(list);
			this.list = list;
		}
	}
}
</script>

<style lang="scss">
#reports-list {
	background-color: rgba(yellow, .2);
	// flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	width: 100%;
	
	.search {
		margin: 0 0 20px;
		flex: 0 0 auto;
		
		input {
			height: 35px;
		}
	}
	
	.list {
		background-color: rgba(red, .1);
		flex: 1 1 auto;
		max-height: 100%;
		position: relative;
		
		ul {
			padding: 0;
			margin: 0;
			list-style-type: none;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			overflow: auto;

			li {
				// display: none;
				padding: 5px;
				cursor: pointer;
				transition: all 300ms ease 0ms;

				&:hover, &.active {
					background-color: rgba(blue, .1);
				}

				.name {
					font-size: 14px;
				}

				.date {
					font-size: 12px;
				}
			}
		}
	}
}
</style>
