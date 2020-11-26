const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    plugins: [
        new HtmlWebPackPlugin({
            title: "Layout",
            template: "./src/index.html"
        }),
    ],

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [{loader: "style-loader"}, {loader: "css-loader"}]
            },
            { test: /\.png$/, use: 'file-loader' }
        ]
    },
};