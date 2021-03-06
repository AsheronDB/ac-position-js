
// const utils = require('./utils');
// const constants = require('./constants');

import * as utils from './utils';
import * as constants from './constants';

export default class ACPosition {

    constructor(
        objCellId,
        positionX = 0,
        positionY = 0,
        positionZ = 0,
        rotationW = 1,
        rotationX = 0,
        rotationY = 0,
        rotationZ = 0
    ) {
        // Validate objCellId format?
        if (!objCellId) throw new Error("No objCellId provided");

        this.objCellId = Number(objCellId);
        this.position = [positionX, positionY, positionZ];
        this.rotation = [rotationW, rotationX, rotationY, rotationZ];
        this.landblock = this.objCellId >> 16;
        this.cellX = Math.trunc(((this.objCellId & 0xffff) - 1) / 8);
        this.cellY = Math.trunc(((this.objCellId & 0xffff) - 1) % 8);
        this.cell = this.cellX * constants.CELL_SIDE + this.cellY + 1;
        this.landblockX = (this.objCellId >> 24) & 0xff;
        this.landblockY = (this.objCellId >> 16) & 0xff;
        this.globalCellX = this.landblockX * 8 + this.cellX;
        this.globalCellY = this.landblockY * 8 + this.cellY;
        this.objCellIdHex = "0x" + ((utils.decToHex(this.objCellId)).padStart(8, '0')).toUpperCase();
        this.landblockHex = ((utils.decToHex(this.landblock)).padStart(4, '0')).toUpperCase();
        this.cellHex = ((utils.decToHex(this.cell)).padStart(4, '0')).toUpperCase();
    }

    get originZ() {
        return this.position[2];
    }

    set originZ(newOriginZ) {
        this.position[2] = newOriginZ;
    }

    static deserialize(locString) {
        if (!ACPosition.isValidLocString(locString))
            throw new TypeError("Invalid Loc string");
        const matches = constants.LOC_STRING_REGEXP.exec(locString);
        constants.LOC_STRING_REGEXP.lastIndex = 0;
        const objCellId = matches[1];
        const position = [matches[2], matches[3], matches[4]].map(coord =>
            parseFloat(coord, 10)
        );
        const rotation = [
            matches[5],
            matches[6],
            matches[7],
            matches[8]
        ].map(coord => parseFloat(coord, 10));
        return new ACPosition(
            objCellId,
            position[0],
            position[1],
            position[2],
            rotation[0],
            rotation[1],
            rotation[2],
            rotation[3]
        );
    }

    static fromRadar(radarString) {
        if (!ACPosition.isValidRadar(radarString))
            throw new TypeError("Invalid radar coordinates");

        const matches = constants.RADAR_COORDS_REGEXP.exec(radarString);
        constants.RADAR_COORDS_REGEXP.lastIndex = 0;

        let eastWestDec = parseFloat(matches[2]); // Trim this down to 1 decimal
        let northSouthDec = parseFloat(matches[1]); // Trim this down to 1 decimal

        if (matches[2].endsWith("W") || matches[2].endsWith("w"))
            eastWestDec = eastWestDec * -1;
        if (matches[1].endsWith("S") || matches[1].endsWith("s"))
            northSouthDec = northSouthDec * -1;

        // convert from (-101.95, 102.05) to (0, 204)
        const ew = eastWestDec + 101.95;
        const ns = northSouthDec + 101.95;
        const globalX = ew * 240;
        const globalY = ns * 240;
        const blockX = Math.trunc(globalX / constants.BLOCK_LENGTH);
        const blockY = Math.trunc(globalY / constants.BLOCK_LENGTH);
        const originX = globalX % constants.BLOCK_LENGTH;
        const originY = globalY % constants.BLOCK_LENGTH;
        const cellX = Math.trunc(originX / constants.CELL_LENGTH);
        const cellY = Math.trunc(originY / constants.CELL_LENGTH);
        const cell = cellX * constants.CELL_SIDE + cellY + 1;
        const objCellId = ACPosition.toObjCellId(blockX, blockY, cell);
        return new ACPosition(objCellId, originX, originY);
    }

    static fromGlobal(globalX, globalY) {
        if (
            globalX > constants.GLOBAL_COORDS_MAX ||
            globalX < constants.GLOBAL_COORDS_MIN ||
            globalY > constants.GLOBAL_COORDS_MAX ||
            globalY < constants.GLOBAL_COORDS_MIN
        ) {
            throw new RangeError("World coordinates are out of bounds");
        } else {
            const originX = globalX % 192;
            const originY = globalY % 192;
            const cellX = Math.trunc(originX / constants.CELL_LENGTH);
            const cellY = Math.trunc(originY / constants.CELL_LENGTH);
            const cell = cellX * constants.CELL_SIDE + cellY + 1;
            const blockX = Math.trunc(globalX / 192);
            const blockY = Math.trunc(globalY / 192);
            const objCellId = ACPosition.toObjCellId(blockX, blockY, cell);
            return new ACPosition(objCellId, originX, originY);
        }
    }

    static toObjCellId(blockX, blockY, cell) {
        if (!blockX && !blockY && !cell) throw new Error("Invalid parameters");
        return ((blockX << 24) | (blockY << 16) | cell) >>> 0;
    }

    static isValidLocString(locString) {
        const result = constants.LOC_STRING_REGEXP.test(locString);
        LOC_STRING_REGEXP.lastIndex = 0;
        return result;
    }

    static isValidRadar(radarString) {
        const result = constants.RADAR_COORDS_REGEXP.test(radarString);
        constants.RADAR_COORDS_REGEXP.lastIndex = 0;
        return result;
    }

    serialize() {
        const landblockIdHex = this.objCellIdHex;
        const positionString = this.position
            .map(coord => Number(coord).toFixed(6))
            .join(" ");
        const rotationString = this.rotation
            .map(coord => Number(coord).toFixed(6))
            .join(" ");
        return `${landblockIdHex} [${positionString}] ${rotationString}`;
    }

    toRadar(asArray) {
        const x1 = (this.globalCellX - 1024) * 0.1 + 0.5;
        const y1 = (this.globalCellY - 1024) * 0.1 + 0.5;
        const x2 =
            x1 >= 0
                ? Math.abs(x1).toFixed(1) + "E"
                : Math.abs(x1).toFixed(1) + "W";
        const y2 =
            y1 >= 0
                ? Math.abs(y1).toFixed(1) + "N"
                : Math.abs(y1).toFixed(1) + "S";

        let value;

        if (asArray) {
            value = [y2, x2];
        } else {
            value = `${y2}, ${x2}`;
        }

        return value;
    }

    toGlobal() {
        return {
            x: this.landblockX * 192 + this.position[0],
            y: this.landblockY * 192 + this.position[1],
            z: this.position[2]
        };
    }

    // toGeoJson?
}