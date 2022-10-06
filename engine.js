
/*

 <CANVAS!> JavaScript 2D Engine
 
 Version: 0.1alpha
 Website: https://tsky.ga/root/canvas/
 Copyright (C) zzyYesimola 2022

*/
/*
   Test Script:
   createSprite("https://dcs.conac.cn/image/red.png","test",0)
   addSpriteFrame("https://www.gov.cn/govweb/xhtml/2016gov/images/public/logo.jpg","test",1)
   ctrlSprite("test",0,1,1)

*/

//load now

console.log("[Initialization] <CANVAS!> JavaScript 2D Engine\n[Initialization] Engine Version = 0.1alpha\n[Initialization] Website = https://tsky.ga/root/canvas\n[Initialization] Copyright (C) zzyYesimola 2022\n[Initialization] Copyright (C) zzyYesimola 2022\n[Initialization] Load now.");

console.log("[Initialization] Loading Modules")

	var canvas = document.getElementById("canvas-engine");
	var context = canvas.getContext("2d");

function text(text,font,color,txt_x,txt_y) {	
	context.font = font
	context.fillStyle = color
	context.fillText(text,txt_x,txt_y)
}

function img(img_url,x,y) {
	var load_img = new Image()
	load_img.src = img_url
	context.drawImage(load_img,x,y)
}

function clearAll() {
	context.clearRect(0, 0, canvas.width, canvas.height)
}

function clear(start_x,start_y,end_x,end_y) {
	context.clearRect(start_x,start_y,end_x,end_y)
}

function createSprite(img_url,sprite_id,frame_id) {
	var load_img = new Image()
	load_img.src = img_url
	var fid = "f_" + frame_id
	window[sprite_id] = {
		[fid]:[img_url]
	}
}

function addSpriteFrame(img_url,sprite_id,frame_id) {
	var load_img = new Image()
	load_img.src = img_url
	var processed_fid = "f_" + frame_id
	window[sprite_id][processed_fid] = img_url
}

function ctrlSprite(sprite_id,frame_id,x,y){
	var fid = "f_" + frame_id
	img(window[sprite_id][fid],x,y)
	window[sprite_id].latest_x = x
	window[sprite_id].latest_y = y
}

// moveSprite README
//   direction: U & D & L & R ; U = Up , D = Down , L = Left , R = Right
//   is_allwo_sprite_move_out_canvas_true_or_false: true & false ; if this value is "true", the sprite can move out the canvas, maybe it will make your browser crash.
//   speed: <num> ; distance to move in the specified direction (px)
function moveSprite(sprite_id,frame_id,direction,speed,is_allow_sprite_move_out_canvas_true_or_false) {
	var l_x = window[sprite_id].latest_x
	var l_y = window[sprite_id].latest_y
	
	if (is_allow_sprite_move_out_canvas_true_or_false != null && is_allow_sprite_move_out_canvas_true_or_false) {
		switch (direction) {
			case "U" :
				l_y = l_y - speed
				ctrlSprite(sprite_id,frame_id,l_x,l_y)
				break;
			case "D" :
				l_y = l_y + speed
				ctrlSprite(sprite_id,frame_id,l_x,l_y)
				break;
			case "L" :
				l_x = l_x - speed
				ctrlSprite(sprite_id,frame_id,l_x,l_y)
				break;
			case "R" :
				l_x = l_x + speed
				ctrlSprite(sprite_id,frame_id,l_x,l_y)
				break;
		}
	} else {
		switch (direction) {
			case "U" :
				l_y = l_y - speed
				if (l_y < 0) {l_y = 0}
				ctrlSprite(sprite_id,frame_id,l_x,l_y)
				break;
			case "D" :
				l_y = l_y + speed
				if (l_y > canvas.height) {l_y = canvas.height}
				ctrlSprite(sprite_id,frame_id,l_x,l_y)
				break;
			case "L" :
				l_x = l_x - speed
				if (l_x < 0) {l_x = 0}
				ctrlSprite(sprite_id,frame_id,l_x,l_y)
				break;
			case "R" :
				l_x = l_x + speed
				if (l_x > canvas.width) {l_x = canvas.width}
				ctrlSprite(sprite_id,frame_id,l_x,l_y)
				break;
		}
	}
}

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                     -=-=-=代码问题标识=-=-=-
          ##         
     ##   ##   ##    标签: 安全问题 + 依赖的功能可能被弃用 
       ## ## ##      等级: 关键
   ################  描述: Singal功能使用eval()实现,如果找不到方法代替eval(),则Singal功能将随着eval()被弃用(可能)而不再正常工作.
       ## ## ##           已知安全性问题: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
     ##   ##   ##         不当使用可能导致出现严重安全问题或者浏览器崩溃
          ##         时间: 2022-10-06
   -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-  */
function createSingal(singal_name,on_singal_execute) {
	window[singal_name] = {
		"execute":[on_singal_execute]
	}
}

function sendSingal(singal_name) {
	eval(window[singal_name].execute.toString())
}

