/**
 * Created by xiongfeng on 2018/4/5.
 */
var FIREWORKS = {
    sparks: [],
    fireworks: [],
    init: function (canvas, context) {
        this.canvas = canvas;
        this.context = context;
        var i = 20;
        while (i--) {
            this.fireworks.push(
                new Firework(Math.random() * window.innerWidth, window.innerHeight * Math.random())
            )
        }
    },
    render: function () {

        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        this.fireworks.forEach(function (firework, index) {
            if (firework.dead) {
                FIREWORKS.fireworks.splice(index, 1);
                return false;
            }
            firework.move()
        })


        this.sparks.forEach(function (spark, index) {
            if (spark.dead) {
                FIREWORKS.sparks.splice(index, 1);
                return false;
            }
            spark.move()
            spark.draw()
        })

        if (Math.random() < 0.05) {
            FIREWORKS.fireworks.push(new Firework())
        }
    },
    drawCircle: function (x, y, radius, color) {
        color = color || '#FFF'
        this.context.fillStyle = color
        this.context.fillRect(x - radius / 2, y - radius / 2, radius, radius)
    }
}

function Spark(x, y, color) {
    this.x = x
    this.y = y
    this.dir = Math.random() * (Math.PI * 2)
    this.dead = false
    this.color = color
    this.speed = Math.random() * 3 + 3;
    this.walker = new Walker({radius: 20, speed: 0.25})
    this.gravity = 0.25
    this.dur = this.speed / 0.1
    this.move = function () {
        this.dur--
        if (this.dur < 0) this.dead = true

        if (this.speed < 0) return
        if (this.speed > 0) this.speed -= 0.1
        var walk = this.walker.step()
        this.x += Math.cos(this.dir + walk) * this.speed
        this.y += Math.sin(this.dir + walk) * this.speed
        this.y += this.gravity
        this.gravity += 0.05

    }
    this.draw = function () {
        FIREWORKS.drawCircle(this.x, this.y, 3, this.color)
    }
}

function Firework(x, y) {
    this.xmove = new Walker({radius: 10, speed: 0.5})
    this.x = x || Math.random() * FIREWORKS.canvas.width;
    this.y = y || FIREWORKS.canvas.height;
    this.height = Math.random() * FIREWORKS.canvas.height / 5;
    this.dead = false
    this.color = randomColor()

    this.move = function () {
        this.x += this.xmove.step()
        if (this.y > this.height) this.y -= 1;
        else this.burst()

    }
    this.draw = function () {
        //FIREWORKS.drawCircle(this.x, this.y, 1, this.color)
    }
    this.burst = function () {
        this.dead = true
        var i = 100;
        while (i--) FIREWORKS.sparks.push(new Spark(this.x, this.y, this.color))
    }
}

function randomColor() {
    return ['#6ae5ab', '#88e3b2', '#36b89b', '#7bd7ec', '#66cbe1'][Math.floor(Math.random() * 5)];
}

function Walker(options) {
    this.step = function () {
        this.direction = Math.sign(this.target) * this.speed
        this.value += this.direction
        this.target
            ? this.target -= this.direction
            : (this.value)
            ? (this.wander)
            ? this.target = this.newTarget()
            : this.target = -this.value
            : this.target = this.newTarget()
        return this.direction
    }

    this.newTarget = function () {
        return Math.round(Math.random() * (this.radius * 2) - this.radius)
    }

    this.start = 0
    this.value = 0
    this.radius = options.radius
    this.target = this.newTarget()
    this.direction = Math.sign(this.target)
    this.wander = options.wander
    this.speed = options.speed || 1
}
