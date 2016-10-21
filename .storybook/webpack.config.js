const path = require('path');
const SvgStore = require('webpack-svgstore-plugin');

const ICON_PATH = path.resolve(__dirname, '../icons', '**/*.svg');
const SCSS_PATH = path.resolve(__dirname, '../assets', 'scss');
const CSS_PATH = path.resolve(__dirname, '../assets', 'css');
const SRC_PATH = path.resolve(__dirname, '../components');

module.exports = {
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loader: 'eslint-loader?{fix:true}',
				include: SRC_PATH
			}
		],
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: CSS_PATH
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass'],
				include: SCSS_PATH
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: SRC_PATH
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new SvgStore(
			[ICON_PATH], // input path
			'svg',       // output path
			{
				name: '[hash].sprite.svg',
				chunk: 'preview',
				prefix: 'icon-',
				svgoOptions: {
					plugins: [
						{ removeTitle: true }
					]
				}
			}
		)
	]
};

