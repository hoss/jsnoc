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

    var standardDeviation,
        mean,
        context,
        canvasWidth,
        canvasHeight,
        nDrawsPerFrame = 2,
        canvasBaxCol = "#191919",
        drawCol = "#030303",
        generator = new Utils.Ziggurat();

    function init() {
        initCanvas();
        initVars();
        drawBackground();
        drawScreenLoop();
    }

    // INIT METHODS

    function initVars() {
        mean = Math.round(canvasWidth/2);
        standardDeviation = Math.round(mean/4);
    }

    function drawBackground() {
        context.fillStyle = canvasBaxCol;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawScreenLoop() {
        for(var i = 0; i < nDrawsPerFrame; i++) {
//            var x = zig.nextGaussian() * standardDeviation + mean;
            var x = generator.nextGaussian() * standardDeviation + mean;
            context.fillStyle = drawCol;
            context.fillRect(x, 0, 1, canvasHeight);
        }
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

