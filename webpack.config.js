const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function (env, options) {
    let prod = options.mode;
    if (prod  === 'production') {
        config.devtool = false;
    } else {
        config.devtool = 'eval-sourcemap';
    }
    return config;
};

let config = {

    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/main.js',
        // publicPath: 'dist/',
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                //exclude: '/node_modules/'
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'group-css-media-queries-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader:"url-loader",
                        // options:{ limit:1000, name:"[name].[ext]" }
                    },
                    "image-webpack-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new ModernizrWebpackPlugin({
            filename: 'js/modernizr.js'
        }),
        new CopyWebpackPlugin([
            { from: 'src/img', to: 'img', force: true }
        ])

    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }

};