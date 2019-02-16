const path = require('path')
const slsw = require('serverless-webpack')
const webpack   = require('webpack')
const nodeExt = require('webpack-node-externals')

const stage = slsw.lib.serverless
  ? slsw.lib.serverless.processedInput.options.stage
  : 'dev'

const package = require("./layers/dependencies/nodejs/node8/package.json")

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

function useIstanbulInstrumenterLoader() {
  if (stage === "dev" || stage === "test") {
    return [{
      test: /\.(js)$/,
      use: {
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true }
      },
      enforce: 'post',
      exclude: /node_modules|\.test\.js$/,
    }]
  }

  return []
}

function getDependencies() {
  return Object.keys(package.dependencies)
}

module.exports = {
  mode: stage === 'dev' ? 'development' : 'production',
  stats: stage === 'dev' ? 'verbose' : 'errors-only',
  entry: slsw.lib.entries,
  resolve: {
    descriptionFiles: ["package.json", "layers/dependencies/nodejs/node8/package.json"],
    modules: [
      "layers/dependencies/nodejs/node8/node_modules",
      "node_modules"
    ],
    extensions: [
      '.js',
      '.json'
    ],
    alias: {
      "@errors": srcPath("errors"),
      "@utils": srcPath("utils"),
      "@middlewares": srcPath("middlewares"),
      "@models": srcPath("models"),
      "@requests": srcPath("requests"),
      "@responses": srcPath("responses"),
      "@workers": srcPath("workers"),
      "@validations": srcPath("validations")
    }
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      ...useIstanbulInstrumenterLoader(),
      { test: /\.js$/, loader: 'babel-loader', exclude: [ path.resolve("node_modules"), path.join(__dirname, "layers/dependencies/nodejs/node8/node_modules") ] }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    removeAvailableModules: true,
    usedExports: true,
    occurrenceOrder: true
  },
  externals: [
    nodeExt()
  ]
};
