<template>
	<div>
		<form @click.stop.prevent="generate" class="mb-4">
			<div class="form-group">
				<label for="InputUrl">URL</label>
				<input v-model="qriousConfig.value" type="url" class="form-control" id="InputUrl" placeholder="https://winwu.github.io">
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
				<label for="InputBackground">Background</label>
				<input v-model="qriousConfig.background" type="text" class="form-control" id="InputBackground" placeholder="#000">
				<small class="form-text text-muted">Background color</small>
				</div>
				<div class="form-group col-md-6">
				<label for="InputForeground">Foreground</label>
				<input v-model="qriousConfig.foreground" type="text" class="form-control" id="InputForeground" placeholder="#000">
				<small class="form-text text-muted">Foreground color</small>
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
				<label for="InputSize">Size</label>
				<input v-model="qriousConfig.size" type="text" class="form-control" id="InputSize" placeholder="100" min="50" max="500">
				<small class="form-text text-muted">result size*size</small>
				</div>
				<div class="form-group col-md-6">
				<label for="selectPadding">Padding</label>
				<select v-model="qriousConfig.padding"  name="padding" id="selectPadding" class="form-control">
					<option value="">default</option>
					<option v-for="n in 100" :value="n" :key="n">{{ n }}</option>
				</select>
				<small class="form-text text-muted">Padding for the QR code (pixels)</small>
				</div>
			</div>
			<button type="submit" class="btn btn-primary btn-block">Generate</button>
			<template v-if="qrResult && typeof qrResult.toDataURL === 'function'">
				<a @click="downloadImage($event)" class="text-primary download-link mt-2 mb-2 d-inline-block" :download="downloadFileName">Download</a>
			</template>
		</form>
		<canvas id="qr"></canvas>
	</div>
</template>

<script>
import QRious from 'qrious';
export default {
  name: 'generate-tab',
  data() {
    return {
      qrResult: null,
      $qr: null,
      qriousConfig: {
        background: 'transparent',
        foreground: 'black',
        padding: '',
        size: 100,
        level: 'L',
        value: 'https://winwu.github.io'
      }
    }
  },
  computed: {
    downloadFileName() {
      if (this.qriousConfig.value) {
        // https://winwu.github.io to winwu_github_io
        return new URL(this.qriousConfig.value).hostname.split('.').join('_');
      } else {
        return 'no_name';
      }
    }
  },
  methods: {
    generate() {
      this.qrResult = new QRious({
        element: this.$qr,
        ...this.qriousConfig
      });
      console.warn('config', {
        element: this.$qr,
        ...this.qriousConfig
      });
    },
    downloadImage(e) {
      if (event.target) {
        var image = this.qrResult.toDataURL('image/png').replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
        window.open(image);
      }
    }
  },
  mounted() {
    this.$qr = document.getElementById('qr');
    this.generate();
  }
}
</script>

