const path = require('path')
const slsw = require('serverless-webpack')
const nodeExt = require('webpack-node-externals')

const stage = slsw.lib.serverless
  ? slsw.lib.serverless.processedInput.options.stage
  : 'dev'

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
      exclude: /node_modules|\.spec\.js$/,
    }]
  }

  return []
}

module.exports = {
  mode: stage === 'dev' ? 'development' : 'production',
  stats: stage === 'dev' ? 'verbose' : 'errors-only',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.js',
      '.json'
    ],
    alias: {
      "@errors": srcPath("errors"),
      "@utils": srcPath("utils"),
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
      { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules)/ }
    ]
  },
  plugins: [],
  optimization: {
    removeAvailableModules: true,
    occurrenceOrder: true
  },
  externals: [ nodeExt() ]
};
