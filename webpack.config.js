const path = require('path');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'acpositionjs',
            type: 'var',
            export: "default"
        },
        globalObject: 'this' // This line was missing
        
    }
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'main.js',
    //     // library: 'ac-position-js',
    //     // libraryTarget: 'umd',
    //     // globalObject: 'this'
    // }
};
