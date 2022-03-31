const path = require('path');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'ACPosition',
            type: 'umd',
            export: 'default'
        },
        globalObject: 'this'
        
    },
    module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
    resolve: {
    extensions: ['*', '.js']
    },
};
