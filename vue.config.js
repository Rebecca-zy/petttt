module.exports = {
  publicPath: "./", // 修改路径，3.3起已经用publicPath代替了baseUrl
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap

  devServer: {
    port: 8080, //默认的打开端口号
    open: true, //自动打开浏览器
    // host: "0.0.0.0", //本地地址
    host: "localhost",
    proxy: {
      //在此配置跨域
      // '/api' 这里是你需要配置的接口地址域名后跟的后缀，
      // 即为地址后的/api,例如这个地址http://www.xxxxxx.com/api
      "/api": {
        // target: "http://10.10.0.22:8001", //后端的接口地址
        //本地调试用
        target: "http://localhost:8000",
        //服务器部署用
        // target: "http://121.5.79.150:8000",
        changeOrigin: true, //开启跨域
        pathRewrite: {
          "^/api": "" //这里即为重写后的地址，baseURL里的地址要换成这个
        }
      }
    }
  }
};
