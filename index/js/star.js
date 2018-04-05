/**
 * Created by xiongfeng on 2018/4/5.
 */
var StarRain = {
    init : function(context){
        this.context = context;
        this.rains = new Array();
        this.rainCount = 20;

        for (var i=0;i<this.rainCount;i++) {
            var rain = new MeteorRain();
            rain.init();
            rain.draw();
            this.rains.push(rain);
        }
    },
    render: function(){
        for (var n = 0; n < this.rainCount; n++){
            var rain = this.rains[n];
            rain.move();
            if(rain.y>window.innerHeight){
                this.context.clearRect(rain.x,rain.y-rain.height,rain.width,rain.height);
                this.rains[n] = new MeteorRain();
                this.rains[n].init();
            }
        }

    }
};

/*流星雨开始*/

var MeteorRain = function(){
    this.x = -1;
    this.y = -1;
    this.length = -1;//长度
    this.angle = 30; //倾斜角度
    this.width = -1;//宽度
    this.height = -1;//高度
    this.speed = 1;//速度
    this.offset_x = -1;//横轴移动偏移量
    this.offset_y = -1;//纵轴移动偏移量
    this.alpha = 1; //透明度
    this.color1 = "";//流星的色彩
    this.color2 = "";  //流星的色彩
    /****************初始化函数********************/
    this.init = function () //初始化
    {
        this.getPos();
        this.alpha = 1;//透明度
        this.getRandomColor();
        //最小长度，最大长度
        var x = Math.random() * 80 + 150;
        this.length = Math.ceil(x);
//                  x = Math.random()*10+30;
        this.angle = 30; //流星倾斜角
        x = Math.random()+0.5;
        this.speed = Math.ceil(x); //流星的速度
        var cos = Math.cos(this.angle*3.14/180);
        var sin = Math.sin(this.angle*3.14/180) ;
        this.width = this.length*cos ;  //流星所占宽度
        this.height = this.length*sin ;//流星所占高度
        this.offset_x = this.speed*cos ;
        this.offset_y = this.speed*sin;
    }

    /**************获取随机颜色函数*****************/
    this.getRandomColor = function (){
        var a = Math.ceil(255-240* Math.random());
        //中段颜色
        this.color1 = "rgba("+a+","+a+","+a+",1)";
        //结束颜色
        this.color2 = "transparent";
    }


    /***************重新计算流星坐标的函数******************/
    this.countPos = function ()//
    {
        //往左下移动,x减少，y增加
        this.x = this.x - this.offset_x;
        this.y = this.y + this.offset_y;
    }

    /*****************获取随机坐标的函数*****************/
    this.getPos = function () //
    {
        //横坐标200--1200

        this.x = Math.random() * window.innerWidth ; //窗口高度
        //纵坐标小于600
        this.y = Math.random() * window.innerHeight / 3;  //窗口宽度
    }
    /****绘制流星***************************/
    this.draw = function () //绘制一个流星的函数
    {
        StarRain.context.save();
        StarRain.context.beginPath();
        StarRain.context.lineWidth = 1; //宽度
        StarRain.context.globalAlpha = this.alpha; //设置透明度
        //创建横向渐变颜色,起点坐标至终点坐标
        var line = StarRain.context.createLinearGradient(this.x, this.y,
            this.x + this.width,
            this.y - this.height);



        //分段设置颜色
        line.addColorStop(0, "white");
        line.addColorStop(0.3, this.color1);
        line.addColorStop(0.6, this.color2);
        StarRain.context.strokeStyle = line;
        //起点
        StarRain.context.moveTo(this.x, this.y);
        //终点
        StarRain.context.lineTo(this.x + this.width, this.y - this.height);
        StarRain.context.closePath();
        StarRain.context.stroke();
        StarRain.context.restore();
    }
    this.move = function(){
        //清空流星像素
        var x = this.x+this.width-this.offset_x;
        var y = this.y-this.height;
        StarRain.context.clearRect(x-3,y-3,this.offset_x+5,this.offset_y+5);

        //重新计算位置，往左下移动
        this.countPos();
        //透明度增加
        this.alpha -= 0.002;
        //重绘
        this.draw();
    }

};