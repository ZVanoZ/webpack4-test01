const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ConcatPlugin = require('webpack-concat-plugin');

// console.log('path_resolve', path.resolve(__dirname, '/frontend'));
// console.log('path_concat_', __dirname + '/frontend');

module.exports = function (env, argv) {
	let config = {
		mode: argv.mode || 'production',
		//context: __dirname,
		//context: path.resolve(__dirname, 'frontend'),
		context: path.resolve(__dirname),
		watch: false,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		entry: {
			'/bundle/App': './frontend/App.js'
		},
		output: {
			//path: path.resolve(__dirname, '/public'),
			path: __dirname + "/public",
			filename: '[name].js'
			//library: "[name]"
		}
	};
	/**
	 * Если не собраны "bundle/Module1.js" и "bundle/Module2.js", то сборка упадет.
	 * Нужно при 1м запуске  выставить "isBuildModuleAll : false".
	 * Далее "isBuildModuleAll : true", и при каждом изменении исходников в папке "frontend" запускать webpack два раза.
	 */
	config = merge(config,
		/**
		 * Это тестовый конфиг для  'webpack-concat-plugin'.
		 * JS-ники собираются, а вот sourceMap не работает.
		 */
		require('./get-config.webpack-concat-plugin.js')({
			isUsed : true,
			isBuildModuleAll : true
		}),
		/**
		 * Это тестовый конфиг для  'webpack-merge-and-include-globally'.
		 * Ведутся эксперименты.
		 */
		require('./get-config.webpack-merge-and-include-globally.js')({
			isUsed : false,
			isBuildModuleAll : false
		})
	);
	// console.log(config);
	return config;
};
