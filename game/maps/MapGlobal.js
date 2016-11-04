"use strict";

var map1 = require('./lesson1.js');
var map2 = require('./lesson2.js');
var gunmap = require('./gunmapdata.js');
var drugmap = require('./drugmapdata.js');
var grenademap = require('./grenademapdata.js');

var MapGlobal = {
    getMapDataByType : function (type){
	if(type == "lesson1"){
	    return map1;
	} else if(type == "lesson2"){
	    return map2;
	} else if(type == "gunmap"){
	    return gunmap;
	} else if(type == "drugmap"){
	    return drugmap;
	} else if(type == "grenademap"){
	    return grenademap;
	}else {
	    return null;
	}
    },

    getMapNameByType : function (type) {
	if(type == "lesson1"){
	    return "基础教学";
	} else if(type == "lesson2") {
	    return "物品教学";
	} else if(type == "gunmap"){
	    return "枪战地图";
	} else if(type == "drugmap"){
	    return "逃生地图";
	} else if(type == "grenademap"){
	    return "手雷地图";
	}else {
	    return type;
	}
    }
    
};

module.exports = MapGlobal;
