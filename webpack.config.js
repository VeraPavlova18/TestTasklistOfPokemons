const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['babel-polyfill', './index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pokemon.bundle.js'
    },
    mode: 'development',
    devtool: 'eval',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
               
            }
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: ['node_modules'],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: `dist/index.css`}),
        new HtmlWebpackPlugin({
            title: 'Pokemons',
            template: "./index.html"
        }),
    ]
};