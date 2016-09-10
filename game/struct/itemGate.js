"use strict";

var C = require('../../static/js/const.js');

// TODO: 这里可以来一个算法，每次找最稀疏的地方来随机

function parseAxis(map, x, y){
    var result = {x:x, y:y};
    if(x == "random" || y == "random"){
	var existedItemGates = [];
	for(let struct of  map.structs){
	    if(struct.constructor == ItemGate){
		existedItemGates.push({x:struct.x, y:struct.y});
	    }
	}
	for (var i = 0; i < 20; i++) { 
	    var tx = Math.floor(Math.random()*(map.w - 2)) + 1;
	    var ty = Math.floor(Math.random()*(map.h - 2)) + 1;
	    //	    if (map.floor[tx] && map.floor[tx][ty]) {
	    var isTooClosed = false;
	    for(var j = 0; j<existedItemGates.length; j++){
		//var hypot = Math.hypot(existedItemGates[j].x-tx, existedItemGates[j].y-ty);
		//console.info("("+tx + ":"+ ty + ") - (" + existedItemGates[j].x + ":"  + existedItemGates[j].y + ")  " + hypot);
		if(Math.hypot(existedItemGates[j].x-tx, existedItemGates[j].y-ty)<5){
		    isTooClosed = true;
		    break;
		}
	    }
	    if(isTooClosed) continue;
	    result.x = tx;
	    result.y = ty;
	    break;
	    //	    }
	}
	if(isNaN(result.x))result.x = 0;
	if(isNaN(result.y))result.y = 0;
    } else if(x == "max" || y == "max"){
	if(x == "max"){
	    result.x = map.w-1;
	}
	if(y == "max"){
	    result.y = map.h-1;
	}
    }
    return result;
}

var ItemGate = function (game, map, data) {
    this.id = data.id;
    var axis = parseAxis(map, data.x, data.y);
    this.x = axis.x;
    this.y = axis.y;
    this.itemType = data.itemType;  //可以是int或者int型数组
    this.isItemFloat = data.hasOwnProperty('isItemFloat')?data.isItemFloat:false;
    this.game = game;
};

ItemGate.prototype.update = function () {
    if(this.game.users.length>0){
	if (this.itemType !== undefined) {
	    if ((this.game.tick + 120) % 150 == 0 && (!this.targetItem || this.targetItem.dead)) {
		var type = this.itemType;
		if(Array.isArray(type) && type.length>0){
		    type = type[Math.floor(Math.random()*type.length)];
		}
		var item;
		if(!isNaN(parseInt(type))){
		    item = this.game.createItem(type);
		}else{
		    item = this.game.createItem();
		}
		item.x = (this.x + .5) * C.TW;
		item.y = (this.y + .5) * C.TH;
		if(!this.isItemFloat){
		    item.vx = 0;
		    item.vy = 0;
		}
		this.targetItem = item;
	    }
	} else {
	    //生成物品（如果需要）
	    if (this.game.items.length < this.game.users.length && Math.random() * 100 < this.game.users.length) {
		var item = this.game.createItem();
		item.x = (this.x + .5) * C.TW;
		item.y = (this.y + .5) * C.TH;
	    }
	}
    }
};

ItemGate.prototype.getData = function () {
    return {
	id: this.id,
	type: "itemGate",
	x: this.x,
	y: this.y
    };
};

module.exports = ItemGate;
