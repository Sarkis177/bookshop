const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    }, 
    plugins: [  
        new MiniCssExtractPlugin(),
        new TerserWebpackPlugin(),
        new CssMinimizerPlugin(),
        new ESLintPlugin(),
            ],
            devServer: {
                port: 3007,
              },
            optimization: {
                minimize: true,
                minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
              },
    module: {
        rules:[
            {
           use: [
            {
            loader: MiniCssExtractPlugin.loader,
            options: {
            esModule: true,
            },
          },'css-loader'],
           test: /\.css$/
        },
    ]
    }
}