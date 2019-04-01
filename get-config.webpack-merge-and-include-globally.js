const merge = require('webpack-merge');
const uglifyJS = require('uglify-js');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const MergeIntoSingle = require('webpack-merge-and-include-globally');
console.log('==================get-config.webpack-merge-and-include-globally.js===============');

module.exports = function (options) {
	let config = {};
	if (!options.isUsed) {
		return config;
	}
	config = {
		plugins: [
			new MergeIntoSingle({
					files: [{
						src: [
							'./frontend/Module1/script1.js',
							'./frontend/Module1/script2.js',
						],
						dest: (code) => {
							//console.log('\n== min/code==\n', code);
							const min = uglifyJS.minify(code, {
								sourceMap: {
									filename: '/bundle/Module1.js',
									url: '/bundle/Module1.js.map'
								}
							});
							//console.log("\n== min/result==\n", min);
							return {
								'/bundle/Module1.js': min.code,
								'/bundle/Module1.js.map': min.map,
							}
						},
					}
					]
				}, (filesMap) => {
					console.log('\n==CALLBACK==\n', filesMap);
				}
			),
			new MergeIntoSingle({
					files: [{
						src: [
							'./frontend/Module2/script1.js',
							'./frontend/Module2/script2.js'
						],
						dest: (code) => {
							//console.log('\n== min/code==\n', code);
							const min = uglifyJS.minify(code, {
								sourceMap: {
									filename: '/bundle/Module2.js',
									url: '/bundle/Module2.js.map'
								}
							});
							//console.log("\n== min/result==\n", min);
							return {
								'/bundle/Module2.js': min.code,
								'/bundle/Module2.js.map': min.map,
							}
						},
					}
					]
				}, (filesMap) => {
					console.log('\n==CALLBACK==\n', filesMap);
				}
			)
		]
	};

	if (options.isBuildModuleAll) {
		config = merge(config, {
			plugins: [
				new MergeIntoSingle({
					files: [{
						src: [
							'./public/bundle/Module1.js',
							'./public/bundle/Module2.js',
						],
						dest: (code) => {
							const min = uglifyJS.minify(code, {
								sourceMap: {
									filename: '/bundle/module-all.js',
									url: '/bundle/module-all.js.map'
								}
							});
							return {
								'/bundle/module-all.js': min.code,
								'/bundle/module-all.js.map': min.map
							}
						}
					}]
				})
			]
		});
	}
	return config;
};
