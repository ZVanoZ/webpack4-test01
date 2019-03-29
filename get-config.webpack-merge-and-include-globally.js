const merge = require('webpack-merge');
const uglifyJS = require('uglify-js');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const MergeIntoSingle = require('webpack-merge-and-include-globally');

module.exports = function (options) {
	if (!options.isUsed) {
		return {}
	}
	let config = {
		plugins: [
			new MergeIntoSingle({
				files: [{
					src: [
						'./frontend/Module1/script1.js',
						'./frontend/Module1/script2.js',
					],
					dest: (code) => {
						const min = uglifyJS.minify(code, {
							sourceMap: {
								filename: 'Module1.js',
								url: 'Module1.js.map'
							}
						});
						return {
							'Module1.js': min.code,
							'Module1.js.map': min.map
						}
					}
					// also possible:
					// ,
					// dest: 'vendor.js'
				}
					// , {
					// 	src: ['./frontend/Module1/Module1.css'],
					// 	dest: 'Module1.css'
					//
					// 	// also possible:
					// 	//
					// 	// dest: code => ({
					// 	//   'style.css':new CleanCSS({}).minify(code).styles
					// 	// })
					// }
				]
			})

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
									filename: 'module-all.js',
									url: './public/bundle/module-all.js.map'
								}
							});
							return {
								'./public/bundle/module-all.js': min.code,
								'./public/bundle/module-all.js.map': min.map
							}
						}
					}]
				})
			]
		});
	}
	return config;
};
