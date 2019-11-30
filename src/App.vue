<template>
    <div id="app">
        <div class="jumbotron jumbotron-fluid pb-0">
            <div class="container">
                <div class="max-width-600 m-auto">
                    <h1 class="display-4 site-title">QR codes tool</h1>
                    <p class="lead">This webpage help you to generate QR code with options and scan QR code</p>
                    <div class="text-right">
                        <a class="github-button" href="https://github.com/winwu/qr-gen/issues" aria-label="Issue winwu/qr-gen on GitHub">Issue</a>
                    </div>
                    <nav>
                        <div class="nav nav-tabs">
                            <router-link :to="{ name: 'generate' }" class="nav-link">
                                Generate
                            </router-link>
                            <router-link :to="{ name: 'scan' }" class="nav-link">
                                Scan
                            </router-link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <div class="container max-width-600">
            <div class="tab-content" id="nav-tabContent">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {}
    },
    methods: {},
    mounted() {}
}
</script>

<style lang="scss">
#app {
    font-family: 'Noto Sans', sans-serif;
    color: #2c3e50;
    .site-title {
        @media (max-width: 767px) {
            font-size: 40px;
        }
    }
    .max-width-600 {
        max-width: 600px;
    }
    .download-link {
        cursor: pointer;
    }
    .result-url {
        word-break: break-all;
    }
}
</style>
