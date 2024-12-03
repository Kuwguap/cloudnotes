const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      watch: {
        ignored: [
          '**/node_modules/**',
          '**/public/service-worker.js',
          '**/dist/**',
          '**/.git/**',
          '**/*.hot-update.*'
        ],
      }
    },
    port: 3001,
    hot: 'only',
    historyApiFallback: true,
    open: true,
    devMiddleware: {
      writeToDisk: false,
    },
    client: {
      overlay: true,
      progress: true,
      reconnect: true,
    },
  },
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: [
      '**/node_modules/**',
      '**/public/service-worker.js',
      '**/dist/**',
      '**/.git/**',
      '**/*.hot-update.*'
    ],
    aggregateTimeout: 1000,
    poll: false,
  },
}; 