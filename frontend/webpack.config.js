const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true
              }
            }
          })
        ]
    },
    entry: './src/index.js',
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'bundle.js',
        publicPath:'/'
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    module:{
        rules:[
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: { name: 'assets/[hash].[ext]' },
                  }
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                }
            },
            {
                test:/\.html$/,
                use:{
                    loader:'html-loader',
                }
            },
            {
                test:/\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Creates `style` nodes from JS strings
                    //"style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                  ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            favicon:'./public/favicon.png'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].css'
        }),
        new Dotenv()
    ],
    devServer:{
        static:path.join(__dirname, 'dist'),
        compress:true,
        port:3050,
        host: 'localhost',
        historyApiFallback:true,
        open:true
    }
}//host: "192.168.1.14",
//host: 'localhost',