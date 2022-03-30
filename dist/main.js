var acpositionjs;(()=>{"use strict";var t={d:(e,i)=>{for(var o in i)t.o(i,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:i[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>l});const i=function(t){return t.toString(16)},o=101.95,s=new RegExp(/^(?:Your location is: )?(0[xX][0-9a-fA-F]+) \[([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)\] ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+) ([+-]?[0-9]+\.?[0-9]*|\.[0-9]+)$/,"g"),a=new RegExp(/^(\d+(?:\.\d+)?[ns])(?:,\s{0,1}|\s{1})(\d+(?:\.\d+)?[ew])$/,"i");class r{static GLOBAL_COORDS_MAX=48960;static GLOBAL_COORDS_MIN=0;static BLOCK_LENGTH=192;static CELL_SIDE=8;static CELL_LENGTH=24;constructor(t,e=0,o=0,s=0,a=1,l=0,n=0,d=0){if(!t)throw new Error("No objCellId provided");this.objCellId=Number(t),this.position=[e,o,s],this.rotation=[a,l,n,d],this.landblock=this.ObjCellId>>16,this.cellX=Math.trunc(((65535&t)-1)/8),this.cellY=Math.trunc(((65535&t)-1)%8),this.cell=this.cellX*r.CELL_SIDE+this.cellY+1,this.landblockX=this.objCellId>>24&255,this.landblockY=this.objCellId>>16&255,this.globalCellX=8*this.landblockX+this.cellX,this.globalCellY=8*this.landblockY+this.cellY,this.objCellIdHex="0x"+i(this.objCellId).padStart(8,"0").toUpperCase(),this.landblockHex=i(this.landblock).padStart(4,"0").toUpperCase(),this.cellHex=this.decToHex(this.cell).padStart(4,"0").toUpperCase()}get originZ(){return this.position[2]}set originZ(t){this.position[2]=t}static deserialize(t){if(!r.isValidLocString(t))throw new TypeError("Invalid Loc string");const e=s.exec(t);s.lastIndex=0;const i=e[1],o=[e[2],e[3],e[4]].map((t=>parseFloat(t,10))),a=[e[5],e[6],e[7],e[8]].map((t=>parseFloat(t,10)));return new r(i,o[0],o[1],o[2],a[0],a[1],a[2],a[3])}static fromRadar(t){if(!r.isValidRadar(t))throw new TypeError("Invalid radar coordinates");const e=a.exec(t);a.lastIndex=0;let i=parseFloat(e[2]),s=parseFloat(e[1]);(e[2].endsWith("W")||e[2].endsWith("w"))&&(i*=-1),(e[1].endsWith("S")||e[1].endsWith("s"))&&(s*=-1);const l=240*(i+o),n=240*(s+o),d=Math.trunc(l/r.BLOCK_LENGTH),c=Math.trunc(n/r.BLOCK_LENGTH),h=l%r.BLOCK_LENGTH,L=n%r.BLOCK_LENGTH,b=Math.trunc(h/r.CELL_LENGTH),p=Math.trunc(L/r.CELL_LENGTH),C=b*r.CELL_SIDE+p+1,u=r.toObjCellId(d,c,C);return new r(u,h,L)}static fromGlobal(t,e){if(t>this.GLOBAL_COORDS_MAX||t<this.GLOBAL_COORDS_MIN||e>this.GLOBAL_COORDS_MAX||e<this.GLOBAL_COORDS_MIN)throw new RangeError("World coordinates are out of bounds");{const i=t%192,o=e%192,s=Math.trunc(i/r.CELL_LENGTH),a=Math.trunc(o/r.CELL_LENGTH),l=s*r.CELL_SIDE+a+1,n=Math.trunc(t/192),d=Math.trunc(e/192),c=r.toObjCellId(n,d,l);return new r(c,i,o)}}static toObjCellId(t,e,i){if(!t&&!e&&!i)throw new Error("Invalid parameters");return(t<<24|e<<16|i)>>>0}static isValidLocString(t){const e=s.test(t);return s.lastIndex=0,e}static isValidRadar(t){const e=a.test(t);return a.lastIndex=0,e}serialize(){return`${this.objCellIdHex} [${this.position.map((t=>Number(t).toFixed(6))).join(" ")}] ${this.rotation.map((t=>Number(t).toFixed(6))).join(" ")}`}toRadar(t){const e=.1*(this.globalCellX-1024)+.5,i=.1*(this.globalCellY-1024)+.5,o=e>=0?Math.abs(e).toFixed(1)+"E":Math.abs(e).toFixed(1)+"W",s=i>=0?Math.abs(i).toFixed(1)+"N":Math.abs(i).toFixed(1)+"S";let a;return a=t?[s,o]:`${s}, ${o}`,a}toGlobal(){return{x:192*this.landblockX+this.position[0],y:192*this.landblockY+this.position[1],z:this.position[2]}}}const l=r;acpositionjs=e})();