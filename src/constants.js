exports.GLOBAL_COORDS_MAX = 48960;
exports.GLOBAL_COORDS_MIN = 0;
exports.BLOCK_LENGTH = 192;
exports.CELL_SIDE = 8;
exports.CELL_LENGTH = 24;
exports.DERETH_MAP_TILE_SIZE = 256;
exports.DERETH_MAP_MAX_ZOOM = 11;
exports.DERETH_MAP_MIN_ZOOM = 0;

exports.LOC_STRING_REGEXP = new RegExp(/^(?:Your location is: )?(0[xX][0-9a-fA-F]+) \[([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)\] ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)$/, 'g');
exports.RADAR_COORDS_REGEXP = new RegExp(/^(\d+(?:\.\d+)?[ns])(?:,\s{0,1}|\s{1})(\d+(?:\.\d+)?[ew])$/, 'i');