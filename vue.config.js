var webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
    // 公共路径(必须有的)
    publicPath: "/",
    // 输出文件目录
    outputDir: "dist",
    // 静态资源存放的文件夹(相对于ouputDir)
    assetsDir: "static",
    // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
    lintOnSave:false,
    // 我用的only，打包后小些
    runtimeCompiler: true,
    productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
    chainWebpack: config => {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')
      config.plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)); //忽略/moment/locale下的所有文件
    },

    configureWebpack:{
      plugins: [
       new CompressionPlugin({
         //匹配文件
         test: /\.js$|\.css$|\.html$/,
         //压缩超过此大小的文件,以字节为单位
         threshold: 10240,
         //删除原始文件只保留压缩后的文件
         deleteOriginalAssets: false
       })
     ]
   },




  
 //打包之前注释掉下面的 webpack配置
    devServer: {
      open: false,  // npm run serve后自动打开页面
      host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
      port: 8080, // 开发服务器运行端口号
      proxy: {
 
        '/api': {
         
            target: 'http://120.27.150.44:3000',
            
            changeOrigin: true,

            ws: true,

            pathRewrite: {
            
            '^/api': '/api' // /prod-api 替换为空
            
            }
         
        },
         
        }
        
    },
    
  }