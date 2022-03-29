(()=>{var t={279:(t,i)=>{i.GLOBAL_COORDS_MAX=48960,i.GLOBAL_COORDS_MIN=0,i.BLOCK_LENGTH=192,i.CELL_SIDE=8,i.CELL_LENGTH=24,i.DERETH_MAP_TILE_SIZE=256,i.DERETH_MAP_MAX_ZOOM=11,i.DERETH_MAP_MIN_ZOOM=0,i.LOC_STRING_REGEXP=new RegExp(/^(?:Your location is: )?(0[xX][0-9a-fA-F]+) \[([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)\] ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)$/,"g"),i.RADAR_COORDS_REGEXP=new RegExp(/^(\d+(?:\.\d+)?[ns])(?:,\s{0,1}|\s{1})(\d+(?:\.\d+)?[ew])$/,"i")},138:(t,i,e)=>{e(555);const o=e(279);t.exports=class t{static GLOBAL_COORDS_MAX=o.GLOBAL_COORDS_MAX;static GLOBAL_COORDS_MIN=o.GLOBAL_COORDS_MIN;static BLOCK_LENGTH=o.BLOCK_LENGTH;static CELL_SIDE=o.CELL_SIDE;static CELL_LENGTH=o.CELL_LENGTH;constructor(i,e=0,o=0,r=0,s=1,n=0,a=0,l=0){if(!i)throw new Error("No objCellId provided");this.objCellId=i,this.position=[e,o,r],this.rotation=[s,n,a,l],this.landblock=this.ObjCellId>>16,this.cellX=Math.trunc(((65535&i)-1)/8),this.cellY=Math.trunc(((65535&i)-1)%8),this.cell=this.cellX*t.CELL_SIDE+this.cellY+1,this.landblockX=this.objCellId>>24&255,this.landblockY=this.objCellId>>16&255,this.globalCellX=8*this.landblockX+this.cellX,this.globalCellY=8*this.landblockY+this.cellY,this.objCellIdHex="0x"+Number(this.objCellId).toString(16).padStart(8,"0").toUpperCase(),this.landblockHex=this.landblock.toString(16).padStart(4,"0").toUpperCase(),this.cellHex=this.cell.toString(16).padStart(4,"0").toUpperCase()}get originZ(){return this.position[2]}set originZ(t){this.position[2]=t}static deserialize(i){if(!t.isValidLocString(i))throw new TypeError("Invalid Loc string");const e=o.LOC_STRING_REGEXP.exec(i);o.LOC_STRING_REGEXP.lastIndex=0;const r=e[1],s=[e[2],e[3],e[4]].map((t=>parseFloat(t,10))),n=[e[5],e[6],e[7],e[8]].map((t=>parseFloat(t,10)));return new t(r,s[0],s[1],s[2],n[0],n[1],n[2],n[3])}static fromRadar(i){if(!t.isValidRadar(i))throw new TypeError("Invalid radar coordinates");const e=o.RADAR_COORDS_REGEXP.exec(i);o.RADAR_COORDS_REGEXP.lastIndex=0;let r=parseFloat(e[2]),s=parseFloat(e[1]);(e[2].endsWith("W")||e[2].endsWith("w"))&&(r*=-1),(e[1].endsWith("S")||e[1].endsWith("s"))&&(s*=-1);const n=240*(r+101.95),a=240*(s+101.95),l=Math.trunc(n/t.BLOCK_LENGTH),L=Math.trunc(a/t.BLOCK_LENGTH),c=n%t.BLOCK_LENGTH,E=a%t.BLOCK_LENGTH,_=Math.trunc(c/t.CELL_LENGTH),h=Math.trunc(E/t.CELL_LENGTH),d=_*t.CELL_SIDE+h+1,O=t.toObjCellId(l,L,d);return new t(O,c,E)}static fromGlobal(i,e){if(i>this.GLOBAL_COORDS_MAX||i<this.GLOBAL_COORDS_MIN||e>this.GLOBAL_COORDS_MAX||e<this.GLOBAL_COORDS_MIN)throw new RangeError("World coordinates are out of bounds");{const o=i%192,r=e%192,s=Math.trunc(o/t.CELL_LENGTH),n=Math.trunc(r/t.CELL_LENGTH),a=s*t.CELL_SIDE+n+1,l=Math.trunc(i/192),L=Math.trunc(e/192),c=t.toObjCellId(l,L,a);return new t(c,o,r)}}static toObjCellId(t,i,e){if(!t&&!i&&!e)throw new Error("Invalid parameters");return(t<<24|i<<16|e)>>>0}static isValidLocString(t){const i=o.LOC_STRING_REGEXP.test(t);return o.LOC_STRING_REGEXP.lastIndex=0,i}static isValidRadar(t){const i=o.RADAR_COORDS_REGEXP.test(t);return o.RADAR_COORDS_REGEXP.lastIndex=0,i}serialize(){return`${this.objCellIdHex} [${this.position.map((t=>Number(t).toFixed(6))).join(" ")}] ${this.rotation.map((t=>Number(t).toFixed(6))).join(" ")}`}toRadar(t){const i=.1*(this.globalCellX-1024)+.5,e=.1*(this.globalCellY-1024)+.5,o=i>=0?Math.abs(i).toFixed(1)+"E":Math.abs(i).toFixed(1)+"W",r=e>=0?Math.abs(e).toFixed(1)+"N":Math.abs(e).toFixed(1)+"S";let s;return s=t?[r,o]:`${r}, ${o}`,s}toGlobal(){return{x:192*this.landblockX+this.position[0],y:192*this.landblockY+this.position[1],z:this.position[2]}}}},555:(t,i)=>{i.base64UrlEncode=function(t){return Buffer.from(t.toString()).toString("base64url")},i.base64UrlDecode=function(t){return Buffer(t,"base64url").toString("ascii")},i.hexToDec=function(t){return parseInt(t,16)},i.decToHex=function(t){return t.toString(16)},i.isDungeon=function(t){}}},i={};!function e(o){var r=i[o];if(void 0!==r)return r.exports;var s=i[o]={exports:{}};return t[o](s,s.exports,e),s.exports}(138)})();