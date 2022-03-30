export const base64UrlEncode = function(value) {
    return Buffer.from(value.toString()).toString('base64url');
}

export const base64UrlDecode = function(value) {
    let buffer = Buffer(value, 'base64url');
    return buffer.toString('ascii');
}


export const hexToDec = function(hex) {
    return parseInt(hex, 16);
}

export const decToHex = function(dec) {
    return dec.toString(16);
}


export const isDungeon = function(lb) {

    
}