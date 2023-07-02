const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = {
    entry: { 
        main: path.resolve(__dirname, './src/js/index.js'),
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.bundle.js',
    },
    resolve: {
        extensions: ['.js', '.scss', '.css'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({template: '/index.pug'}),
        new CleanWebpackPlugin(),
        new CssMinimizerPlugin(),
        new CopyWebpackPlugin({
            patterns: [
            {
                from: path.resolve(__dirname, 'src/img'),
                to: path.resolve(__dirname, 'dist/img'),
            }
            ]
        }),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /.s?css$/,
                use: [ 
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ]
            },
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
				pretty: true
				}
			},
            {
                test: /.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                }
            },
            {
                test: /.svg$/,
                use: [
                    {
                        loader: 'svg-inline-loader',
                        options: {
                            idPrefix: true,
                            removeSVGTagsAttrs: true,
                            removingTags: [],
                            removingTagAttrs: ['opacity', 'fill', 'width', 'height'],
                        },
            },
        ],
    },
],
},
    optimization: {
        minimizer: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
}



