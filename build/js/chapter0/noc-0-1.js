"use strict";

var Debugger = function () { };
Debugger.log = function (message) {
    try {
        console.log(message);
    } catch (exception) {
        return;
    }
}

function onWindowLoaded () {
    canvasApp();
}

function canvasApp () {
    if (!Modernizr.canvas) {
        return;
    }

    // DECLARE PROPERTIES

    var Walker,
        walker,
        context,
        canvasWidth,
        canvasHeight,
        canvasBaxCol = "#191919",
        drawCol = "#121212";


    function init() {
        initCanvas();
        drawBackground();
        initWalker();
        drawScreenLoop();
    }



    // DEFINE WALKER

    Walker = function (startX, startY) {
        this.x = startX;
        this.y = startY;
    };

    Walker.prototype.draw = function (context) {
        context.fillStyle = drawCol;
        context.fillRect(this.x, this.y, 1, 1);
    }

    Walker.prototype.walk = function () {
        var choice = Math.random() * 4;
        choice = Math.floor(choice);
        switch (choice){
            case 0 : this.x-=1; break;
            case 1 : this.x+=1; break;
            case 2 : this.y-=1; break;
            case 3 : this.y+=1; break;
        }
    }




    // INIT METHODS

    function initWalker() {
        walker = new Walker(Math.floor(canvasWidth/2), Math.floor(canvasHeight/2));
    }

    function drawBackground() {
        context.fillStyle = canvasBaxCol;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawScreenLoop() {
        walker.walk();
        walker.draw(context);
        window.requestAnimationFrame(drawScreenLoop);
    }

    function initCanvas() {
        var theCanvas = document.getElementById("canvasOne");
        context = theCanvas.getContext("2d");
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight - 80;
        theCanvas.width = canvasWidth;
        theCanvas.height = canvasHeight;
        context.globalCompositeOperation = "lighter";
    }

    init();
}

