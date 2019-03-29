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
/*
			new MergeIntoSingle({
				files: [{
					src: [
						'./frontend/Module1/script1.js',
						'./frontend/Module1/script2.js',
						// 'frontend/Module1/script1.js',
						// 'frontend/Module1/script2.js',
					],
					dest: (code) => {
						console.log('code', code);
						const min = uglifyJS.minify(code, {
							sourceMap: {
								filename: './bundle/Module1.js',
								url: './bundle/Module1.js.map'
							}
						});
						console.log('code-after', min);
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
			}, (filesMap) => {
				console.log('CALLBACK', filesMap);
			})
			*/

			new MergeIntoSingle({
				files: {
					'/bundle/script1.js': [
						'./frontend/Module1/script1.js',
						'./frontend/Module1/script2.js',
					],
					'/bundle/script2.js': [
						'./frontend/Module2/script1.js',
						'./frontend/Module2/script2.js',
					]
					// ,
					// 'style.css': [
					// 	'*.css',
					// ]
				},
				transform: {
					'/bundle/script1.js': (val) => {
						let result = val;
						console.log('transform: ', val);

						// let result = `${val.toLowerCase()}`;
						// console.log('transform/result: ', result);
						result = uglifyJS.minify({
							// 'fileAAA.js' : val
							'fileAAA.js' : "var a = function() {};"
						},{
							sourceMap: {
								filename: "out.js",
								url: "out.js.map"
							}
						});
						console.log('transform/result: ', result);
						result = result.code;

						return result;
					},
				},
			}, (filesMap) => {
				console.log('CALLBACK', filesMap);
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
