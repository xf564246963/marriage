/**
 * Created by xiongfeng on 2018/4/8.
 */
var LIGHTS = {
    init: function(context){
        this.context = context;
        this.lights = {};
        this.particleIndex = 0;
        this.settings = {
            height: canvas.height / 2 * 3,
            density: 100,
            maxAlpha: 1
        }
    },
    render: function(){
        var length = 20;

        if ( Object.keys(this.lights).length > length ) {
            this.settings.density = 0;
        }

        for ( var i = 0; i < this.settings.density; i++ ) {
            if ( Math.random() > 0.97 ) {
                new Light();
            }
        }

        for ( var i in this.lights ) {
            this.lights[i].draw(this.context);
        }
    },
    getMinRandom: function () {
        var rand = Math.random();

        var step = Math.ceil(1 / (1 - rand));
        var arr = [];
        for (var i = 0; i < step; i++) {
            arr.push(Math.random());
        }

        return Math.min.apply(null, arr);
    }
}

function Light() {
    this.x = Math.floor(Math.random() * canvas.width);

    this.y = Math.random()*window.innerHeight/3;

    this.particleSize = 4;
    LIGHTS.particleIndex++;
    LIGHTS.lights[LIGHTS.particleIndex] = this;
    this.alpha = parseFloat(Math.random().toFixed(3));
    this.maxAlpha = 1;
    this.alphaAction = Math.random()>0.5?1:-1;
}

Light.prototype.draw = function(context) {

    if (this.alphaAction == 1) {
        if (this.alpha < this.maxAlpha ) {
            this.alpha += 0.005;
        } else {
            this.alphaAction = -1;
        }
    } else {
        if (this.alpha > 0.1 ) {
            this.alpha -= 0.005;
        } else {
            this.alphaAction = 1;
        }
    }

    context.beginPath();
    context.fillStyle="rgba(246,230,191,1)";
    context.arc(this.x, this.y, this.particleSize, 0, Math.PI*2, true);
    context.shadowBlur = this.particleSize*2;
    context.shadowColor = "rgba(246,230,191,1)";
    context.closePath();
    context.fill();
}