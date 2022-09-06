module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    //这里的ip和端口是前端项目的;下面为需要跨域访问后端项目
    proxy: {
      '/api': {
        target: 'http://localhost:8080/hospital/api', //这里填入你要请求的接口的前缀
        //ws:true,//代理websocked
        changeOrigin: true, //虚拟的站点需要更管origin
        secure: true, //是否https接口
        pathRewrite: {
          '^/api': '' //重写路径
        }
      }
    }
  }
}
