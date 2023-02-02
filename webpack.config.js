const path = require('path');
const pkg = require('./package.json')

let config = {
  entry: {
    [pkg.name]: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    library: {
      name: pkg.name,
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
  ],
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: true,
            },
          },
        ],
      }
    ]
  }
}

module.exports = (env, argv) => {

  config = {
    ...config,
    output: {
      ...config.output,
      filename: argv.mode === 'production' ? '[name].min.js' : '[name].js',
    }
  }

  if (argv.mode === 'production') {
    config = {
      ...config,
    }
  }

  if (argv.mode === 'development') {
    config = {
      ...config,
      devtool: 'inline-source-map',
      devServer: {
        port: 3000,
        hot: true,
        open: true,
        liveReload: true,
        static: './example'
      }
    }
  }
  return config
}