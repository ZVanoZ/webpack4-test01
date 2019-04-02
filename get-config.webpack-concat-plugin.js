const merge = require('webpack-merge');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = function (options) {
	console.log('=====get-config.webpack-concat-plugin.js=====');
	if (!options.isUsed) {
		return {}
	}
	let config = {
		plugins: [
			new ConcatPlugin({
				sourceMap: true,
				uglify: false,
				name: 'Module1',
				fileName: '[name].js',
				outputPath: '/bundle/',
				filesToConcat: [
					'./frontend/Module1/script1.js',
					'./frontend/Module1/script2.js',
				]
			}),
			new ConcatPlugin({
				sourceMap: true,
				uglify: true,
				name: 'Module2',
				fileName: '[name].js',
				outputPath: '/bundle/',
				filesToConcat: [
					'./frontend/Module2/script1.js',
					'./frontend/Module2/script2.js',
				]
			})
		]
	};
	if (options.isBuildModuleAll) {
		config = merge(config, {
			plugins: [
				new ConcatPlugin({
					sourceMap: true,
					uglify: true,
					name: 'module-all',
					fileName: '[name].js',
					outputPath: '/bundle/',
					filesToConcat: [
						'./public/bundle/Module1.js',
						'./public/bundle/Module2.js',
					]
				})
			]
		});
	}
	return config;
};
