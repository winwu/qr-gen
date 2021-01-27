<template>
    <div>
        <form @click.stop.prevent="submit" class="mb-4">
            <div class="form-group">
                <label for="InputUrl">URL</label>
                <input
                    v-validate="'required|url:require_protocol'"
                    v-model="qriousConfig.value"
                    v-bind:class="{
                        'is-invalid': errors.has('url')
                    }"
                    name="url" type="url" class="form-control" id="InputUrl" placeholder="https://winwu.github.io">
                <div v-if="errors.has('url')" class="invalid-feedback">
                    {{ errors.first('url') }}
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-6">
                    <label for="InputBackground">Background</label>
                    <chrome-picker class="w-100" :value="qriousConfig.background" :disableAlpha="true" @input="updateColorValue($event, 'background')"></chrome-picker>
                </div>
                <div class="form-group col-6">
                    <label for="InputForeground">Foreground</label>
                    <chrome-picker class="w-100" :value="qriousConfig.foreground" :disableAlpha="true" @input="updateColorValue($event, 'foreground')"></chrome-picker>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-6">
                    <label for="InputSize">Size</label>
                    <input
                        v-validate="'required|min_value:50|max_value:500'"
                        v-model="qriousConfig.size"
                        v-bind:class="{
                            'is-invalid': errors.has('size')
                        }"
                        name="size" type="text" class="form-control" id="InputSize" placeholder="100">
                    <small class="form-text text-muted">result size*size</small>
                    <div v-if="errors.has('size')" class="invalid-feedback">
                        {{ errors.first('size') }}
                    </div>
                </div>
                <div class="form-group col-6">
                    <label for="selectPadding">Padding</label>
                    <select v-model="qriousConfig.padding"  name="padding" id="selectPadding" class="form-control">
                        <option value="">default</option>
                        <option v-for="n in 100" :value="n" :key="n">{{ n }}</option>
                    </select>
                    <small class="form-text text-muted">Padding for the QR code (pixels)</small>
                </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Generate</button>
        </form>
        <template v-if="hasError === false">
            <template v-if="qrResult && typeof qrResult.toDataURL === 'function'">
                <div>
                    <a @click="downloadImage($event)" class="text-primary download-link mt-2 mb-2 d-inline-block">Download</a>
                </div>
            </template>
        </template>
        <canvas v-show="qriousConfig.value && hasError === false" id="qr"></canvas>
    </div>
</template>

<script>
import QRious from 'qrious';
import { Chrome } from 'vue-color';

export default {
    name: 'generate-page',
    data() {
        return {
            hasError: false,
            qrResult: null,
            $qr: null,
            qriousConfig: {
                background: '#ffffff',
                foreground: '#333333',
                padding: '',
                size: 100,
                level: 'L',
                value: ''
            }
        }
    },
    components: {
        'chrome-picker': Chrome
    },
    computed: {
        bgc () {
            console.log(this.qriousConfig.background);
            return this.qriousConfig.background;
        },
        fgc () {
            console.log(this.qriousConfig.foreground);
            return this.qriousConfig.foreground;
        },
        /*downloadFileName() {
            if (this.qriousConfig.value) {
                // https://winwu.github.io to winwu_github_io
                this.$validator.validate().then(result => {
                    if (result) {
                        return new URL(this.qriousConfig.value).hostname.split('.').join('_');
                    } else {
                        return '';
                    }
                });
            } else {
                return 'no_name';
            }
        }*/
    },
    methods: {
        async submit() {
            const isValid = await this.$validator.validateAll();
            if (isValid) {
                this.hasError = false;
                this.generate();
            } else {
                this.hasError = true;
            }
        },
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
            if (e.target) {
                var image = this.qrResult.toDataURL('image/png').replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
                window.open(image);
            }
        },
        updateColorValue($event, whichColor) {
            // console.log('$event', $event);
            // console.log('set which', whichColor);
            this.$set(this.qriousConfig, whichColor, $event.hex)
        }
        
    },
    mounted() {
        this.$qr = document.getElementById('qr');
    }
}
</script>

