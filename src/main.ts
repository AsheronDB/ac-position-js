import { decToHex, hexToDec } from "./utils";
import {
  RADAR_COORDS_REGEXP,
  LOC_STRING_REGEXP,
  CELL_SIDE,
  CELL_LENGTH,
  BLOCK_LENGTH,
} from "./constants";

const isValidLocString = (loc: string) => {
  const result = LOC_STRING_REGEXP.test(loc);
  LOC_STRING_REGEXP.lastIndex = 0;
  return result;
};

const isValidRadarCoords = (radarCoords: string) => {
  const result = RADAR_COORDS_REGEXP.test(radarCoords);
  RADAR_COORDS_REGEXP.lastIndex = 0;
  return result;
};

const toObjCellId = (landblockX: number, landblockY: number, cell: number) => {
  if (!landblockX && !landblockY && !cell)
    throw new Error("Invalid parameters");
  return ((landblockX << 24) | (landblockY << 16) | cell) >>> 0;
};

class ACPosition {
  objCellId: number;
  objCellIdHex: string;
  origin: number[];
  rotation: number[];
  landblock: {
    id: number;
    hex: string;
    x: number;
    y: number;
  };
  cell: {
    id: number;
    hex: string;
    x: number;
    y: number;
    globalX: number;
    globalY: number;
  };
  coordinates: {
    global: {
      x: number;
      y: number;
      z: number;
    };
    radar?:
      | {
          decimal: number[];
          formatted: string;
        }
      | undefined;
  };
  loc: string;
  isOutdoors: boolean;

  constructor(
    objCellId: number,
    originX: number = 0,
    originY: number = 0,
    originZ: number = 0,
    rotationW: number = 1,
    rotationX: number = 0,
    rotationY: number = 0,
    rotationZ: number = 0
  ) {
    if (!objCellId) throw new Error("No objCellId provided");

    this.objCellId = objCellId;
    this.objCellIdHex =
      "0x" + decToHex(this.objCellId).padStart(8, "0").toUpperCase();

    this.origin = [originX, originY, originZ];
    this.rotation = [rotationW, rotationX, rotationY, rotationZ];

    this.landblock = {
      id: this.objCellId >>> 16,
      hex: decToHex(this.objCellId >>> 16)
        .padStart(4, "0")
        .toUpperCase(),
      x: (this.objCellId >>> 24) & 0xff,
      y: (this.objCellId >>> 16) & 0xff,
    };

    this.cell = {
      id: 0,
      hex: "",
      x: Math.trunc(((this.objCellId & 0xffff) - 1) / 8),
      y: Math.trunc(((this.objCellId & 0xffff) - 1) % 8),
      globalX: 0,
      globalY: 0,
    };

    this.cell.id = this.cell.x * CELL_SIDE + this.cell.y + 1;
    this.cell.hex = decToHex(this.cell.id).padStart(4, "0").toUpperCase();
    this.cell.globalX = this.landblock.x * 8 + this.cell.x;
    this.cell.globalY = this.landblock.y * 8 + this.cell.y;

    this.loc = this.toLocString();

    if (this.cell.id >= 256) {
      this.isOutdoors = false;
      this.coordinates = {
        global: this.toGlobal(),
      };
    } else {
      this.isOutdoors = true;

      this.coordinates = {
        global: this.toGlobal(),
        radar: this.toRadar(),
      };
    }

    // --------------------
  }

  private toGlobal() {
    return {
      x: this.landblock.x * 192 + this.origin[0],
      y: this.landblock.y * 192 + this.origin[1],
      z: this.origin[2],
    };
  }

  private toLocString() {
    const landblockIdHex = this.objCellIdHex;
    const positionString = this.origin
      .map((coord) => Number(coord).toFixed(6))
      .join(" ");
    const rotationString = this.rotation
      .map((coord) => Number(coord).toFixed(6))
      .join(" ");
    return `${landblockIdHex} [${positionString}] ${rotationString}`;
  }

  private toRadar() {
    const x1 = (this.cell.globalX - 1024) * 0.1 + 0.5;
    const y1 = (this.cell.globalY - 1024) * 0.1 + 0.5;
    const x2 =
      x1 >= 0 ? Math.abs(x1).toFixed(1) + "E" : Math.abs(x1).toFixed(1) + "W";
    const y2 =
      y1 >= 0 ? Math.abs(y1).toFixed(1) + "N" : Math.abs(y1).toFixed(1) + "S";

    return {
      decimal: [y1, x1],
      formatted: `${y2}, ${x2}`,
    };
  }
}

// Public

const radarToPos = (radarCoords: string) => {
  if (!isValidRadarCoords(radarCoords))
    throw new TypeError("Invalid radar coordinates");

  const matches = RADAR_COORDS_REGEXP.exec(radarCoords) || [];
  RADAR_COORDS_REGEXP.lastIndex = 0;

  let eastWest: number = parseFloat(matches[2]); // Trim this down to 1 decimal
  let northSouth: number = parseFloat(matches[1]); // Trim this down to 1 decimal

  if (matches[2].endsWith("W") || matches[2].endsWith("w"))
    eastWest = eastWest * -1;
  if (matches[1].endsWith("S") || matches[1].endsWith("s"))
    northSouth = northSouth * -1;

  // convert from (-101.95, 102.05) to (0, 204)
  const ew = eastWest + 101.95;
  const ns = northSouth + 101.95;
  const globalX = ew * 240;
  const globalY = ns * 240;
  const blockX = Math.trunc(globalX / BLOCK_LENGTH);
  const blockY = Math.trunc(globalY / BLOCK_LENGTH);
  const originX = globalX % BLOCK_LENGTH;
  const originY = globalY % BLOCK_LENGTH;
  const cellX = Math.trunc(originX / CELL_LENGTH);
  const cellY = Math.trunc(originY / CELL_LENGTH);
  const cell = cellX * CELL_SIDE + cellY + 1;
  const objCellId = toObjCellId(blockX, blockY, cell);
  return new ACPosition(objCellId, originX, originY);
};

const locToPos = (loc: string) => {
  if (!isValidLocString(loc)) throw new TypeError("Invalid Loc string");
  const matches = LOC_STRING_REGEXP.exec(loc) || [];
  LOC_STRING_REGEXP.lastIndex = 0;
  const objCellId: number = hexToDec(matches[1]);
  const position: number[] = [matches[2], matches[3], matches[4]].map((coord) =>
    parseFloat(coord)
  );
  const rotation: number[] = [
    matches[5],
    matches[6],
    matches[7],
    matches[8],
  ].map((coord) => parseFloat(coord));

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
};

const globalToPos = (globalX: number, globalY: number) => {
  // This only works for outdoor locations, figure out different handler for indoor global coords

//   if (
//     globalX > GLOBAL_COORDS_MAX ||
//     globalX < GLOBAL_COORDS_MIN ||
//     globalY > GLOBAL_COORDS_MAX ||
//     globalY < GLOBAL_COORDS_MIN
//   ) {
//     throw new RangeError("World coordinates are out of bounds");
  
    const originX = globalX % 192;
    const originY = globalY % 192;
    const cellX = Math.trunc(originX / CELL_LENGTH);
    const cellY = Math.trunc(originY / CELL_LENGTH);
    const cell = cellX * CELL_SIDE + cellY + 1;
    const blockX = Math.trunc(globalX / 192);
    const blockY = Math.trunc(globalY / 192);
    const objCellId = toObjCellId(blockX, blockY, cell);
    return new ACPosition(objCellId, originX, originY);
  
};

export {
  ACPosition,
  radarToPos,
  locToPos,
  globalToPos,
  isValidLocString,
  isValidRadarCoords,
};

// toLoc() {
//     const landblockIdHex = this.objCellIdHex;
//     const positionString = this.origin
//       .map((coord) => Number(coord).toFixed(6))
//       .join(" ");
//     const rotationString = this.rotation
//       .map((coord) => Number(coord).toFixed(6))
//       .join(" ");
//     return `${landblockIdHex} [${positionString}] ${rotationString}`;
//   }

//   toRadar(asArray: boolean) {
//     const x1 = (this.globalCellX - 1024) * 0.1 + 0.5;
//     const y1 = (this.globalCellY - 1024) * 0.1 + 0.5;
//     const x2 =
//       x1 >= 0 ? Math.abs(x1).toFixed(1) + "E" : Math.abs(x1).toFixed(1) + "W";
//     const y2 =
//       y1 >= 0 ? Math.abs(y1).toFixed(1) + "N" : Math.abs(y1).toFixed(1) + "S";

//     let value;

//     if (asArray) {
//       value = [y2, x2];
//     } else {
//       value = `${y2}, ${x2}`;
//     }

//     return value;
//   }

//   public toGlobal() {
//     return {
//       x: this.landblockX * 192 + this.origin[0],
//       y: this.landblockY * 192 + this.origin[1],
//       z: this.origin[2],
//     };
//   }
