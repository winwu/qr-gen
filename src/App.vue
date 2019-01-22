<template>
    <div id="app">
        <div class="jumbotron jumbotron-fluid pb-0">
            <div class="container">
                <div class="max-width-600 m-auto">
                    <h1 class="display-4">QR codes tool</h1>
                    <p class="lead">This webpage help you to generate QR code with options and scan QR code</p>
                    <nav>
                        <div class="nav nav-tabs flex-column flex-sm-row">
                            <router-link active-class="active" :to="{ name: 'generate' }" class="nav-link">
                                Generate
                            </router-link>
                            <router-link active-class="active" :to="{ name: 'scan' }" class="nav-link">
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
