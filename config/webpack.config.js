module.exports = {
  node: {
    fs: 'empty',
    child_process: 'empty',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {},
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['@babel/preset-env', '@babel/react', '@babel/preset-stage-3'],
          plugins: ['syntax-trailing-function-commas', 'import-glob', 'transform-decorators-legacy'],
          env: {
            test: {
              plugins: ['istanbul'],
            },
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: [/images/],
        options: {
          name: '[path][name].[ext]',
        },
        loader: 'file-loader',
      },
      {
        test: /\.(png|svg)$/,
        exclude: [/fonts/],
        loader: 'url-loader',
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
    ],
  },
};
