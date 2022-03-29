exports.base64UrlEncode = function(value) {
    return Buffer.from(value.toString()).toString('base64url');
}

exports.base64UrlDecode = function(value) {
    let buffer = Buffer(value, 'base64url');
    return buffer.toString('ascii');
}


exports.hexToDec = function(hex) {
    return parseInt(hex, 16);
}

exports.decToHex = function(dec) {
    return dec.toString(16);
}


exports.isDungeon = function(lb) {

    
}