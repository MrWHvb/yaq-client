<template lang="html">
	<div id="reports-list">
		<ul>
			<li v-for='report in list' @click='liClick(report)' :class='report == currentReport ? "active" : false'>
				<span class="name">{{report}}</span>
				<span class="date">({{fileDate(report)}})</span>
			</li>
		</ul>
		<!-- <pre>{{list}}</pre> -->
	</div>
</template>

<script>
module.exports = {
	data() {
		return {
			list: null,
			currentReport: ''
		}
	},

	methods: {
		liClick(file) {
			console.log(file);
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

	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;

		li {
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
</style>
