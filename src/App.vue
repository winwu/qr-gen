<template>
	<div id="app">
		<div class="jumbotron jumbotron-fluid pb-0">
			<div class="container">
				<div class="max-width-600 m-auto">
					<h1 class="display-4">QR codes tool</h1>
					<p class="lead">This webpage help you to generate QR code with options and scan QR code</p>
					<nav>
						<div class="nav nav-tabs flex-column flex-sm-row" id="nav-tab" role="tablist">
							<a class="flex-sm-fill text-sm-center nav-link active" id="nav-generate-tab" data-toggle="tab" href="#nav-generate" role="tab" aria-controls="nav-generate" aria-selected="true">Generate</a>
							<a class="flex-sm-fill text-sm-center nav-link" id="nav-scan-tab" data-toggle="tab" href="#nav-scan" role="tab" aria-controls="nav-scan" aria-selected="false">Scan</a>
						</div>
					</nav>
				</div>
			</div>
		</div>
		<div class="container max-width-600">
			<div class="tab-content" id="nav-tabContent">
				<div class="tab-pane fade show active" id="nav-generate" role="tabpanel" aria-labelledby="nav-generate-tab">
					<generate-tab></generate-tab>
				</div>
				<div class="tab-pane fade" id="nav-scan" role="tabpanel" aria-labelledby="nav-scan-tab">...</div>
			</div>
		</div>
	</div>
</template>

<script>
import GenerateTab from '@/components/GenerateTab.vue'
export default {
	name: 'app',
	components: {
		GenerateTab
	},
	data() {
		return {
		}
	},
	methods: {
	},
	mounted() {
	}
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2c3e50;
	.max-width-600 {
		max-width: 600px;
	}
	.download-link {
		cursor: pointer;
	}
}
</style>
