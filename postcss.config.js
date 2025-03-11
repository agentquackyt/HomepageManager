module.exports = {
    plugins: [
        require('postcss-import'),  // This plugin resolves @import statements
        require('cssnano')({
            preset: ['advanced', {
                discardComments: {
                    removeAll: true,
                },
            }]
        }),
    ],
};