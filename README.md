# QR codes tool

This webpage has two main function, one is to generate QR code with options, another on is to scan the QR code.

Use these dependencies:
* Generate function use QRious (https://neocotic.com/qrious/)
* Scan function vue-qrcode-reader (https://github.com/gruhn/vue-qrcode-reader)
* vue-color (https://github.com/xiaokaike/vue-color)


## Project setup

```
npm install
```

and please edit vue.config.js, change publicPath to  'http://localhost:8080/'

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Note

git subtree push --prefix dist origin gh-pages

```
git run build
git branch gh-pages
git checkout gh-pages
git add -f dist
$ git subtree push --prefix dist origin gh-pages
```