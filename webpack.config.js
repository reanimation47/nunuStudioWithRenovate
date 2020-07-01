const Path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const context = Path.resolve(__dirname, ".");
const source = context + "/source";
const output = context + "/dist";

module.exports = {
	context: source,
	entry: [source + "/editor/Main.js"],
	target: "web",
	devtool: "inline-source-map",
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: source + "/files",
					to: output + "/files",
					force: true
				}
			],
			options: {
				concurrency: 100,
			}
		}),
		new HtmlWebpackPlugin({template: source + "/editor/index.html", filename: "index.html"}),
		new Webpack.ProgressPlugin(),
		new Webpack.ProvidePlugin({
			THREE: "three",
			"window.THREE": "three"
		})
	],
	resolve: {
		modules: [source, "node_modules"],
		extensions: [".js"]
	},
	module: {
		/*rules: [
			{test: /\.css$/, use: "css-loader"},
			{test: /\.ts$/, use: "ts-loader"}
		], */
		loaders: [
			{
				test: /.*spine-threejs.*/,
				loader: "@shoutem/webpack-prepend-append",
				query: {
					prepend: "",
					append: "\n\nexport { spine };"
				}
			}
		]
	},
	output: {
		filename: "bundle.js",
		path: output
	},
	module: {}
};
