// const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
	
	publicPath: './',
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		
	
		//让前后端http请求都转到node的3000端口，而不是前端的8080端口
		// proxy: {
		//   '/': {
			// ws:false,
			// target: 'http://39.105.145.102:3000/'
			// target: 'http://localhost:3000/'
			// target: 'http://127.0.0.1:3000/'


		//   }
		// }
	  },
	  
	
	//设置图标的
	pwa: {
		iconPath: {
		  favicon32: './favicon.png',
		  favicon16: './favicon.png',
		  appleTouchIcon: './favicon.png',
		  maskIcon: './favicon.png',
		  msTileImage: './favicon.png'
		}
	},

	// configureWebpack: config => {
	// 	if (process.env.NODE_ENV === 'production') {
	// 		return {
	// 			plugins: [
	// 				new CompressionPlugin({
	// 					test: /\.js$|\.html$|\.css/,
	// 					threshold: 10240,
	// 					deleteOriginalAssets: false
	// 				})
	// 			]
	// 		}
	// 	}
	// },
	// configureWebpack: {
	// 	devtool: 'source-map'
	//   },

	// pages: {
	// 	index: {
	// 		// page 的入口
	// 		entry: 'src/main.js',
	// 		// 模板来源
	// 		template: 'public/index.html',
	// 		// 在 dist/index.html 的输出
	// 		filename: 'index.html',
	// 		// 当使用 title 选项时，
	// 		// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
	// 		title: 'Index Page',
	// 		// 在这个页面中包含的块，默认情况下会包含
	// 		// 提取出来的通用 chunk 和 vendor chunk。
	// 		chunks: ['chunk-vendors', 'chunk-common', 'index']
	// 	},
	// 	// 当使用只有入口的字符串格式时，
	// 	// 模板会被推导为 `public/subpage.html`
	// 	// 并且如果找不到的话，就回退到 `public/index.html`。
	// 	// 输出文件名会被推导为 `subpage.html`。
	// 	singleFile: 'src/subpage/main.js'
	// }
}
