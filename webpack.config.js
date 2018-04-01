const path = require('path')

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const projectDir = path.resolve(__dirname)
const appDir = path.join(projectDir, 'app')
const mainDir = path.join(appDir, 'main')
const mainAppEntryPoint = path.join(mainDir, 'appMain.lsc')
const settingsWindowRendererDir = path.join(appDir, 'settingsWindow', 'renderer')
const settingsWindowRendererEntryPoint = path.join(settingsWindowRendererDir, 'settingsWindowRendererMain.lsc')
const debugWindowRendererDir = path.join(appDir, 'debugWindow', 'renderer')
const debugWindowRendererEntryPoint = path.join(debugWindowRendererDir, 'debugWindowRendererMain.lsc')
const isDev = process.env.NODE_ENV !== 'production'
const debugging = isDev && process.env.nodeDebug === 'true'

/*****
* We dont want webpack to include polyfills or mocks for various node stuff, which we set with
* the 'node' key https://webpack.js.org/configuration/node/
* We also dont want webpack to transpile the stuff in node_modules folder, so we use the
* webpack-node-externals plugin.
*/

const commonWebpackOptions = {
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  mode: process.env.NODE_ENV,
  devtool: debugging ? 'eval-source-map' : 'none',
  context: projectDir,
  module: {
    rules: [
      {
        test: /.lsc/,
        exclude: [
          /(node_modules)/
        ],
        loader: 'babel-loader',
        options: {
          sourceMap: debugging
        }
      },
    ]
  },
  resolve: {
    extensions: ['.lsc', '.js']
  },
  externals: [nodeExternals()],
  optimization: {
    /**
    * Not minimizing for better error messages. Also the js is pretty small. Also,
    * minification could slightly increase the app startup as parsing minified source
    * is a tiny bit slower.
    */
    minimize: false
  },
  performance: {
    hints: isDev ? false: 'error'
  },
  plugins: [
    // Gonna still use DefinePlugin as its a bit shorter than using global.ISDEV.
    new webpack.DefinePlugin({
      ISDEV: (process.env.NODE_ENV !== 'production')
    })
  ]
}

const electronMainWebpackOptions = {
  ...commonWebpackOptions,
  ...{
    target: 'electron-main',
    entry: mainAppEntryPoint,
    output: {
      filename: 'appMain-compiled.js',
      path: mainDir
    }
  }
}

const electronSettingsRendererWebpackOptions = {
  ...commonWebpackOptions,
  ...{
    target: 'electron-renderer',
    entry: settingsWindowRendererEntryPoint,
    output: {
      filename: 'settingsWindowRendererMain-compiled.js',
      path: settingsWindowRendererDir
    }
  }
}

const debugWindowRendererWebpackOptions = {
  ...commonWebpackOptions,
  ...{
    target: 'electron-renderer',
    entry: debugWindowRendererEntryPoint,
    output: {
      filename: 'debugWindowRendererMain-compiled.js',
      path: debugWindowRendererDir
    }
  }
}

module.exports = [
  electronMainWebpackOptions,
  electronSettingsRendererWebpackOptions,
  debugWindowRendererWebpackOptions,
]
