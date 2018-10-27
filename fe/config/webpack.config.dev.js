const PATH = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    // 入口
    entry: {
        main: ['./src/javascripts/app'],
    },
    // 出口
    output: {
        filename: '[name].js',
        // 路径以配置文件为基准的
        path: PATH.resolve(__dirname, '../dev')
    },
    devServer: {
        // 让服务器从这两个目录中响应资源
        // contentBase: [PATH.join(__dirname, "../dev"), PATH.join(__dirname, "../public")],
        contentBase: [PATH.join(__dirname, "../dev")],
        compress: true,
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([{
            from: PATH.resolve(__dirname, '../static'),
            to:  PATH.resolve(__dirname, '../dev/static')
        }])
    ],
    module: {
        rules: [ // 可以设置模块的规则来为这些模块使用loader
            // {
            //     test: /\.css$/,
            //     use: [ // loader从后向前使用
            //         { loader: 'style-loader' },
            //         { loader: 'css-loader' }                    
            //     ]
            // },
            {
                test: /\.(css|scss)$/,
                use: [ // loader从后向前使用
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },                    
                    { loader: 'sass-loader' }                    
                ]
            },
            {
                test: /\.html$/,
                use: [ // loader从后向前使用
                    { loader: 'string-loader' }                
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                  }
                }
            }
        ]
    }
}

// 单入口 单出口： entry： 入口文件的路径 string， output指定输出名字
// 多入口 单出口： entry： [入口文件的路径...] array， output指定输出名字
// 多入口 多出口（一个入口对应一个出口）： entry： { name1: '', name2: ['', '']  } object， output 不能指定名字[name].js