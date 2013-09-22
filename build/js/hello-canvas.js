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

function canvasSupport () {
    return Modernizr.canvas;
}

function canvasApp () {
    if (!canvasSupport()) {
        return;
    }

    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    var canvasWidth = window.innerWidth;
    var canvasHeight = 500;

    theCanvas.width = canvasWidth;
    theCanvas.height = canvasHeight;

    Debugger.log("Drawing canvas, "+canvasWidth+"px wide, "+canvasHeight+"px high.");

    var edge = 0,
        move = 10;

    function drawScreen() {
        //background
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.fillStyle = "#363636";
        context.fillRect(0, 0, canvasWidth-(edge+=move), canvasHeight);
        if (edge >= canvasWidth || edge < 0) {
            move = -move;
        }
        window.requestAnimationFrame(drawScreen);
    }

    drawScreen();
}