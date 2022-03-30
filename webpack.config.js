const path = require('path');

module.exports = {
    mode: "production",

    output: {
        library: {
            name: 'acpositionjs',
            type: 'umd'
        }
        
    }
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'main.js',
    //     // library: 'ac-position-js',
    //     // libraryTarget: 'umd',
    //     // globalObject: 'this'
    // }
};
