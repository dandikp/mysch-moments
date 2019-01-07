module.exports = {
    develop: {
        scss: './src/scss/*',
        js: './src/js/main.js',
        images: './src/images/**/*'
    },
    pre_build: {
        css: './dist/css/*',
        js: './dist/css/main.js',
        images: './dist/images/**/*'
    },
    build: {
        css: './dist/css/*.min.css',
        js: './dist/css/main.min.js',
    }
}