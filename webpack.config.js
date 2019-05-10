'use strict'

const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const SocialTags = require('social-tags-webpack-plugin');
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;

const config = require('./src/config.js');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    /*
    hot: true,
    watchOptions: {
      poll: true
    }
    */
    contentBase: path.join(__dirname, 'dist'),
    
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: { loader: 'vue-loader',
          options: {
          transformToRequire: {
            iframe: 'src',
          },
        }},
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      },
      {
        test: /\.(wav|ogg|mp3)$/,
        use: 'file-loader'
      },
      {
        test: /(map|sklik)\.html$/,
        use: 'file-loader'
      },
      {
        test: /\.ico$/, use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    //new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs',
      favicon: 'assets/favicon.ico',
      title: config.title,
      lang: config.lang,
      meta: config.meta,
      inject: true
    }),
    new SocialTags(config.social)
  ].concat(process.env.NODE_ENV === 'development' ? [] : 
    [new PrerenderSpaPlugin({
      // Path to compiled app
      staticDir: path.join(__dirname, 'dist'),
      // List of endpoints you wish to prerender
      routes: config.routesToPrerender,
      // Optional minification.
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      },

      renderer: new Renderer({
        renderAfterDocumentEvent: 'render-event',
        headless: true,
      })
    }),
  ])
};