<template>
    <div class="mb-4">
        <div v-if="error" class="alert alert-warning" role="alert">
            <b>Error</b> &nbsp;<span v-html="error"></span>
        </div>
        <div v-if="result" class="alert alert-success" role="alert">
            Go to <a @click.stop="leave" :href="result" target="_blank" class="alert-link" rel="noopener">{{ result }}</a>
        </div>
        <template v-if="isLeave === false">
            <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
        </template>
        <template v-if="isLeave === true">
            <button @click.prevent.stop="reload" class="btn btn-primary mt-3 mb-3">Capture QR code again</button>
        </template>
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
    name: 'scan-page',
    data() {
        return {
            result: '',
            error: '',
            paused: false,
            isLeave: false
        }
    },
    components: {
        QrcodeStream
    },
    methods: {
        onDecode (result) {
            console.warn('result'. result);
            this.paused = true;
            if (result !== '') {
                try {
                    let url = new URL(result);
                    this.result = url.href;
                } catch (e) {
                    this.error = 'Invalid URL';
                    this.leave();
                }
            } else {
                this.leave();
            }
        },
        async onInit (promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = "you need to grant camera access permisson, <a href='https://support.google.com/chrome/answer/2693767'>See more.</a>"
                } else if (error.name === 'NotFoundError') {
                    this.error = "no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "Stream API is not supported in this browser"
                }
            }
        },
        leave() {
            this.isLeave = true;
            this.error = '';
            this.paused = false;
        },
        async reload () {
            await this.$nextTick();
            this.result = '';
            this.isLeave = false;
        }
    }
}
</script>

