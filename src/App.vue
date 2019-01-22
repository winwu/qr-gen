<template>
  <div id="app">
    <div class="jumbotron jumbotron-fluid pb-0">
      <div class="container">
        <div class="max-width-600 m-auto">
          <h1 class="display-4">QR codes tool</h1>
          <p class="lead">This webpage help you to generate QR code with options and scan QR code</p>
          <nav>
            <div class="nav nav-tabs flex-column flex-sm-row" id="nav-tab" role="tablist">
              <a class="flex-sm-fill text-sm-center nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Generate</a>
              <a class="flex-sm-fill text-sm-center nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Scan</a>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container max-width-600">
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
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
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import QRious from 'qrious';
export default {
  name: 'app',
  data() {
    return {
      qrResult: null,
      $qr: null,
      qriousConfig: {
        background: 'transparent',
        foreground: 'black',
        padding: null,
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
  },
  components: {
    // HelloWorld
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
