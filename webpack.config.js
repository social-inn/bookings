const path = require('path');

module.exports = {
  mode: 'production',
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: [/\.js$/, /\.jsx?$/],
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react', '@babel/preset-env'],
      },
    },
    {
      test: /\.(css|less)$/,
      use: [{ loader: 'style-loader' }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[sha1:hash:hex:4]',
        },
      }],
    },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
