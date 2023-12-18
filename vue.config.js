
module.exports = {
    // 关闭eslint校验.
     devServer: {
        overlay: {
          warnings: false, //不显示警告
          errors: false	//不显示错误
        }
      },
      lintOnSave:false //关闭eslint检查
    //   devServer: {
    //     proxy: {
    //         '/': {
    //             target: 'http://localhost:8999',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '/': ''
    //             }
    //         }
    //     }
    // }

}

// configureWebpack:{
//   module: {
//       rules: [
//           {
//               test: /\.mjs$/,
//               include: /node_modules/,
//               type: "javascript/auto"
//           },
//       ]
//   }
// }
