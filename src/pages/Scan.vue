<template>
    <div>
        <div v-if="error" class="alert alert-warning" role="alert">
            <b>Error</b> {{ error }}
        </div>
        <p class="decode-result">Last result: <b>{{ result }}</b></p>
        <qrcode-stream @decode="onDecode" @init="onInit" ></qrcode-stream>
    </div>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'
export default {
    name: 'scan-tab',
    data() {
        return {
            result: '',
            error: ''
        }
    },
    components: {
        QrcodeStream,
        QrcodeCapture
    },
    computed: {
    },
    methods: {
        onDecode (result) {
            this.result = result
        },
        async onInit (promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                this.error = "you need to grant camera access permisson"
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
        }
    },
    mounted() {
    }
}
</script>

