"use strict";
window.requestAnimationFrame = window.requestAnimationFrame ||window.mozRequestAnimationFrame ||window.webkitRequestAnimationFrame ||window.msRequestAnimationFrame;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let id;
let time = Date.now();
let ticks = 0;

class Ball {
    constructor() {
        this.motionX = 0;
        this.motionY = 0;
    }
    
}

class Hitter {
    constructor() {
        this.motionX = 0;
        this.motionY = 0;
        this.x = 0;
        this.y = 0;
    }
}

const params = window.location.href.split("img=");

const ball = new Ball();
const hitter1 = new Hitter();
const hitter2 = new Hitter();

const img = new Image();
const imgcover = new Image();

let url = params.length>1?params[1]:"./bg.jpg";
let url2;

if(url.indexOf(";")>-1){
    url2 = url.split(";")[1];
    url = url.split(";")[0];
}

(async function() {
    await new Promise(r => img.onload=r, img.src=url);
    if(url2){
        await new Promise(r => imgcover.onload=r, imgcover.src=url2)
    }
id = window.requestAnimationFrame(update);
})()
function update() {
    ticks += (Date.now()-time)/50;
    tick();
    time = Date.now();
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over"
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if(url2){
        ctx.drawImage(imgcover,0,0,canvas.width,Math.floor(canvas.width/imgcover.width*imgcover.height))
    }
    ctx.beginPath();
    ctx.globalCompositeOperation = "destination-out";
    ctx.arc(hitter1.x, hitter1.y, 140, 0, 2 * Math.PI);
//ctx.fillStyle = "white";
    ctx.fill();
    /*ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.font = "bold 36px serif";
    ctx.textAlign = "center";
    ctx.strokeText("",150,300)*/
    ctx.beginPath();
    ctx.globalCompositeOperation = "destination-over";
    //ctx.fillStyle = "yellow"
    ctx.drawImage(img,0,0, canvas.width, Math.floor(canvas.width/img.width*img.height));
    //ctx.fillRect(0,0,500,700)
    id = window.requestAnimationFrame(update);
}

async function tick() {
    while(ticks >= 1) {
        ticks--;

    }
}


canvas.addEventListener("mousemove", function (evt) {
	evt.preventDefault();
    const mx = evt.offsetX - hitter1.x;
    const my = evt.offsetY - hitter1.y;
    if((hitter1.motionX > 0 && mx < 0)||(hitter1.motionX<0&&mx>0)) {
        hitter1.motionX = 0;
    }
    if((hitter1.motionY > 0 && my < 0)||(hitter1.motionY<0&&my>0)) {
        hitter1.motionY = 0;
    }
	hitter1.x = evt.offsetX;
    hitter1.y = evt.offsetY;
});
canvas.addEventListener("touchmove", function(evt){
    evt.preventDefault();
    hitter1.x = evt.touches[0].pageX;
    hitter1.y = evt.touches[0].pageY
})
