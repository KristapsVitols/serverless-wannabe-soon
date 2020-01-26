module.exports = {
    publicPath: '/dashboard/',
    devServer: {
        disableHostCheck: true,
        port: 3000,
        public: 'http://localhost:8080/dashboard',
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/scss/main.scss";`
            },
        }
    }
};