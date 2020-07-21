// eslint-disable-next-line @typescript-eslint/no-var-requires
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const title = 'Admin'
const port = 7777

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port
  },
  configureWebpack: {
    name: title
  },
  chainWebpack (config) {
    // 2.添加一个规则icons
    // console.log(config.module.rule('html'))
    // config.module.rule('icons')
    //     .test(/\.svg$/)
    //     .include.add(resolve('src/icons')).end()
    //     .use('svg-sprite-loader')
    //     .loader('svg-sprite-loader')
    //     .options({symbolId: 'icon-[name]'})

  }
}
