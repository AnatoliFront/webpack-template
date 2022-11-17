const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    assets: "assets/"
  };

module.exports = {
    mode: mode,
    devtool: 'source-map',
    devServer: {
        hot: true,
        watchFiles: ['src/**/**/*', 'dist/**/**/*'],
    },
    output: {
        clean: true,
        filename: `${PATHS.assets}js/[name].[hash].js`,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/style/[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    mode === 'development' ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            //options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: mode === 'development' ? 'asset/inline' : 'asset/resource',
                generator : mode === 'development' ? {} : {filename : 'assets/images/[name][ext][query]'},
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator : {
                    filename : 'assets/fonts/[name][ext][query]',
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
}