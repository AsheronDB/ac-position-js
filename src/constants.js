exports.GLOBAL_COORDS_MAX = 48960;
exports.GLOBAL_COORDS_MIN = 0;
exports.BLOCK_LENGTH = 192;
exports.CELL_SIDE = 8;
exports.CELL_LENGTH = 24;
exports.RADAR_SOUTHWEST = 101.95;
exports.LOC_STRING_REGEXP = new RegExp(/^(?:Your location is: )?(0[xX][0-9a-fA-F]+) \[([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)\] ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)$/, 'g');
exports.RADAR_COORDS_REGEXP = new RegExp(/^(\d+(?:\.\d+)?[ns])(?:,\s{0,1}|\s{1})(\d+(?:\.\d+)?[ew])$/, 'i');