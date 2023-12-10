const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry : './src/scripts/app.js',
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                        loader : 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        /* HTML Webpack Plugin */
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
};