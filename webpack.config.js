const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/ts/setup.ts",
	experiments: {
		outputModule: true,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "setup.mjs",
		path: path.resolve(__dirname, "dist"),
		library: {
			type: "module",
		},
		clean: true,
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: "manifest.json", to: "manifest.json" }],
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				exclude: path.resolve("/src/assets"),
				type: "asset/resource",
				generator: {
					publicPath: "img/",
					outputPath: "img/",
					filename: "[name][ext]",
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				exclude: path.resolve("/src"),
				type: "asset/resource",
				generator: {
					publicPath: "assets/",
					outputPath: "assets/",
					filename: "[name][ext]",
				},
			},
		],
	},
};
