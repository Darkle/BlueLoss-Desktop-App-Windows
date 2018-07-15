// @ts-nocheck
const path = require('path')

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const StringReplacePlugin = require("string-replace-webpack-plugin")

const projectDir = path.resolve(__dirname)
const appDir = path.join(projectDir, 'app')
const componentsDir = path.join(appDir, 'components')
const mainAppEntryPoint = path.join(appDir, 'appMain.lsc')
const settingsWindowRendererDir = path.join(componentsDir, 'settingsWindow', 'renderer')
const settingsWindowRendererEntryPoint = path.join(settingsWindowRendererDir, 'settingsWindowRendererMain.lsc')
const bluetoothRendererDir = path.join(componentsDir, 'bluetooth', 'renderer')
const bluetoothRendererEntryPoint = path.join(bluetoothRendererDir, 'bluetoothRendererMain.lsc')
const ISDEV = process.env.NODE_ENV !== 'production'

console.log('ISDEV: ', ISDEV)
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

/*****
* We dont want webpack to include polyfills or mocks for various node stuff, which we set with
* the 'node' key https://webpack.js.org/configuration/node/
*
* We also dont want webpack to transpile the stuff in node_modules folder, so we use the
* webpack-node-externals plugin.
*
* Gonna still use DefinePlugin as its a bit shorter than using global.ISDEV.
*
* Ignore types.lsc imports with StringReplacePlugin as that's just flow and we don't need that
* in the compiled code.
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
  devtool: ISDEV ? 'source-map' : 'none',
  context: projectDir,
  module: {
    rules: [
      {
        test: /\.lsc$/,
        exclude: [
          /(node_modules)/
        ],
        enforce: 'pre',
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /import +\{.*\} +from.*\/types\/types\.lsc'/ig,
              replacement: () => ''
            }
          ]
        })
      },
      {
        test: /\.lsc$/,
        exclude: [
          /(node_modules)/
        ],
        loader: 'babel-loader',
        options: {
          sourceMap: ISDEV
        }
      },
    ]
  },
  resolve: {
    extensions: ['.lsc', '.js']
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({ISDEV}),
    new StringReplacePlugin()
  ]
}

const electronMainWebpackOptions = {
  ...commonWebpackOptions,
  target: 'electron-main',
  entry: mainAppEntryPoint,
  output: {
    filename: 'appMain-compiled.js',
    path: appDir
  }
}

const electronSettingsRendererWebpackOptions = {
  ...commonWebpackOptions,
  target: 'electron-renderer',
  entry: settingsWindowRendererEntryPoint,
  output: {
    filename: 'settingsWindowRendererMain-compiled.js',
    path: settingsWindowRendererDir
  }
}

const bluetoothRendererWebpackOptions = {
  ...commonWebpackOptions,
  target: 'electron-renderer',
  entry: bluetoothRendererEntryPoint,
  output: {
    filename: 'bluetoothRendererMain-compiled.js',
    path: bluetoothRendererDir
  }
}

module.exports = [
  electronMainWebpackOptions,
  electronSettingsRendererWebpackOptions,
  bluetoothRendererWebpackOptions,
]
