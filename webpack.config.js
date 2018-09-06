require("json-loader")
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: "production",
    entry: "./usc-conversion-utils.js",
    output: {
        path: __dirname + '/build/lib',
	filename: 'usc-conversion-utils.js',
	libraryTarget: 'var',
	library: 'USCUtils',
	publicPath: "lib/"
    },
    module: {
        rules: [
            { test: /\.css$/, loader: "style!css" },
			//{ test: /\.json$/, loader: "json-loader" }
        ]
    },
	plugins: [
        new CopyWebpackPlugin([
            { from: './index.html', to: '../index.html' },
			{ from: './lib/jquery-3.1.1.min.js' },
			{ from: './usc-helper.js' },
			{ from: './css', to: '../css'},
            { from: './img', to: '../img'}
		])
	]
};
