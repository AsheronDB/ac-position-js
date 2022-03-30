export const GLOBAL_COORDS_MAX = 48960;
export const GLOBAL_COORDS_MIN = 0;
export const BLOCK_LENGTH = 192;
export const CELL_SIDE = 8;
export const CELL_LENGTH = 24;
export const RADAR_SOUTHWEST = 101.95;
export const LOC_STRING_REGEXP = new RegExp(/^(?:Your location is: )?(0[xX][0-9a-fA-F]+) \[([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)\] ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)$/, 'g');
export const RADAR_COORDS_REGEXP = new RegExp(/^(\d+(?:\.\d+)?[ns])(?:,\s{0,1}|\s{1})(\d+(?:\.\d+)?[ew])$/, 'i');