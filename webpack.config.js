const path = require('path');

module.exports = {
    mode: "production",

    output: {
        library: {
            name: 'acpositionjs',
            type: 'umd',
            export: "default"
        },
        // globalObject: 'this' // This line was missing
        
    }
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'main.js',
    //     // library: 'ac-position-js',
    //     // libraryTarget: 'umd',
    //     // globalObject: 'this'
    // }
};
