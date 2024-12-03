const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

// Get environment variables from window.env in development
const getEnvVars = () => {
  if (!isProd) {
    return {
      'process.env': JSON.stringify(process.env),
      'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:5000/api'),
      'import.meta.env.VITE_SOCKET_URL': JSON.stringify(process.env.VITE_SOCKET_URL || 'http://localhost:5000'),
      'import.meta.env.VITE_CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.VITE_CLOUDINARY_CLOUD_NAME),
      'import.meta.env.VITE_CLOUDINARY_API_KEY': JSON.stringify(process.env.VITE_CLOUDINARY_API_KEY),
    };
  }
  
  // In production, use window.env values
  return {
    'process.env': JSON.stringify(process.env),
    'import.meta.env.VITE_API_URL': 'window.env.VITE_API_URL',
    'import.meta.env.VITE_SOCKET_URL': 'window.env.VITE_SOCKET_URL',
    'import.meta.env.VITE_CLOUDINARY_CLOUD_NAME': 'window.env.VITE_CLOUDINARY_CLOUD_NAME',
    'import.meta.env.VITE_CLOUDINARY_API_KEY': 'window.env.VITE_CLOUDINARY_API_KEY',
  };
};

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
    publicPath: isProd ? '' : '/',
    clean: true
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
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
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
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      "path": false,
      "fs": false
    }
  },
  plugins: [
    new webpack.DefinePlugin(getEnvVars()),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: isProd ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
          globOptions: {
            ignore: ['**/index.html', '**/favicon.ico']
          }
        }
      ]
    }),
    ...(isProd ? [new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })] : [])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 20000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace('@', '')}`;
          },
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: -10
        }
      },
    },
    runtimeChunk: 'single',
    minimize: isProd,
    moduleIds: 'deterministic'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3001,
    hot: true,
    historyApiFallback: true,
    open: true,
    client: {
      overlay: true
    }
  },
  devtool: isProd ? 'source-map' : 'eval-source-map'
}; 