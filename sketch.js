var bullet, wall,weight,speed;
var thickness;
function setup() {
    console.log(thickness)
    createCanvas(1600, 400);
    bullet = createSprite(100, 200, 50, 15);
    wall = createSprite(1500, 200, 70, height/2);
}

var carMoving = false;
var carCrashed = false;
var once = false

function draw() {
    background(0);
    if (carCrashed && once) {
        bullet.velocityX = 0;
        bullet.x = 100
        bullet.y = 200
        carCrashed = false
        carMoving = false;
        once = false;
    }
    thickness=Math.round(random(223, 321));
    // thickness=70
    wall.width =thickness
    $("#r").on("click", function () {

        if (!carMoving && !carCrashed) {
            speed = Math.round(random(223, 321));
            $("#s").prop("value", `${speed}`)
            weight = Math.round(random(30, 52));
            $("#w").prop("value", `${weight}`)
            bullet.velocityX = speed;
            carMoving = true;
        }
    })
    $("#su").on("click", () => {
        if (carCrashed) {
            bullet.x = 100
            bullet.y = 200
            carCrashed = false
            carMoving = false;
            once = false;
        }
        if (!carMoving && !carCrashed) {
            speed = parseInt($("#s").val());
            weight = parseInt($("#w").val());
                bullet.velocityX = speed;
                carMoving = true;
        }
    })
    collide(bullet, wall, function () {
        if (!once) {
            bullet.velocityX = 0;
            var result = (((0.5 * weight * (speed ** 2)) / thickness**3));
            console.log("speed: " + speed+"weight:"+weight+" result:"+result+" thickness:"+thickness)
            console.log(result)
            carMoving = false;
            carCrashed = true;
            if (result > 10) {
                bullet.shapeColor="red"
            } else if (result <10) {
                bullet.shapeColor = "green"
            }
            console.log(result)
            $("#res").prop("value", `${result}`)
            once = true;
        }
    });
    drawSprites();
}

function collide(sprite1, sprite2, func) {
    // if (sprite1.x - sprite2.x < sprite1.width / 2 + sprite2.width / 2 && sprite2.x - sprite1.x < sprite1.width / 2 + sprite2.width / 2 && sprite1.y - sprite2.y < sprite1.height / 2 + sprite2.height / 2 && sprite2.y - sprite1.y < sprite1.height / 2 + sprite2.height / 2) {
    //     func()
    // }
    if(sprite1.x>sprite2.x-10){
        func()
    }
}