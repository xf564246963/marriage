/**
 * Created by xiongfeng on 2018/4/5.
 */
var HEARTS = {
    init:function(context){
        this.context = context;
        this.precision = 100;
        this.heartNum = 6;
        this.hearts = [];
        for(var i = 0; i < this.heartNum; i++ ){
            this.hearts.push(new Heart());
        }
    },
    render: function (a) {
        //this.hearts.push(new Heart())
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (var i = 0; i < this.hearts.length; i++) {
            this.hearts[i].draw();
            if (this.hearts[i].size <= 0) {
                this.hearts.splice(i, 1);
                i--;
                this.hearts.push(new Heart());
            }
        }
    }
}

var Heart = function(x,y){
    this.x = x || Math.random()*window.innerWidth;
    this.y = y || Math.random()*window.innerHeight;
    this.size = Math.random()*2 + 1;
    this.shadowBlur = Math.random() * 10;
    this.speedX = (Math.random()+0.2-0.6) * 8;
    this.speedY = (Math.random()+0.2-0.6) * 8;
    this.speedSize = Math.random()*0.05 + 0.01;
    this.opacity = 1;
    this.vertices = [];
    for (var i = 0; i < HEARTS.precision; i++) {
        var step = (i / HEARTS.precision - 0.5) * (Math.PI * 2);
        var vector = {
            x : (15 * Math.pow(Math.sin(step), 3)),
            y : -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
        }
        this.vertices.push(vector);
    }
}

Heart.prototype.draw = function(){
    this.size -= this.speedSize;
    this.x += this.speedX;
    this.y += this.speedY;
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.scale(this.size, this.size);
    ctx.fillStyle = "rgba(220,90,111,0.8)";
    ctx.beginPath();
    for (var i = 0; i < HEARTS.precision; i++) {
        var vector = this.vertices[i];
        ctx.lineTo(vector.x, vector.y);
    }
    ctx.globalAlpha = this.size;
    //ctx.shadowBlur = Math.round((3 - this.size) * 10);
    //ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
    //ctx.shadowOffsetX = 0;
    //ctx.globalCompositeOperation = "screen"
    ctx.closePath();
    ctx.fill()
    ctx.restore();
};
