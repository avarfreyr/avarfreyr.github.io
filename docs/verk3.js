const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const radius = 50;
const angle = Math.PI / 180;

document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter") {
        toggleFullScreen();
      }
    },
    false,
  );

function vibrate(){
    navigator.vibrate([500]);
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
toggleFullScreen()
class Start {
    constructor({ position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 100
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0 , 2*Math.PI)
        ctx.lineTo(this.position.x, this.position.y)
        ctx.fillStyle = 'green'
        ctx.fill()
        ctx.closePath()
    }
}

class Stop {
    constructor({ position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 100
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0 , 2*Math.PI)
        ctx.lineTo(this.position.x, this.position.y)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
    }
}

class Hole {
    constructor({ position}) {
        this.position = position
        
        this.radius = 50
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0 , 2*Math.PI)
        ctx.lineTo(this.position.x, this.position.y)
        ctx.fillStyle = 'black'
        ctx.fill()
        ctx.closePath()
    }
}

class Player {
    constructor({ position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 30
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0 , 2*Math.PI)
        ctx.lineTo(this.position.x, this.position.y)
        ctx.fillStyle = 'purple'
        ctx.fill()
        ctx.closePath()
    }

    checkCollisionWithHoles(holes) {
        const playerCenterX = this.position.x;
        const playerCenterY = this.position.y;

        for (let hole of holes) {
            const dx = playerCenterX - hole.position.x;
            const dy = playerCenterY - hole.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < Math.abs(this.radius - hole.radius)) {
                vibrate()
                this.position.x = 35;
                this.position.y = canvas.height / 2;
            }
        }
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
        }
        if (this.position.x + this.radius > canvas.width) {
            this.position.x = canvas.width - this.radius;
        }
        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
        }
        if (this.position.y + this.radius > canvas.height) {
            this.position.y = canvas.height - this.radius;
        }
        this.draw()
    }
}

const player = new Player({
    position: {
        x: 35,
        y: canvas.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const start = new Start({
    position: {
        x: 0,
        y: canvas.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const end = new Stop({
    position: {
        x: canvas.width,
        y: canvas.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

let hole1 = new Hole({
    position: {
        x: 300,
        y: 250
    }
})

let hole2 = new Hole({
    position: {
        x: 600,
        y: 400
    }
})

let hole3 = new Hole({
    position: {
        x: 900,
        y: 200
    }
})

let hole4 = new Hole({
    position: {
        x: 1200,
        y: 400
    }
})

let c = 0
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    start.draw()
    end.draw()

    player.update()
    player.velocity.x = 0
    player.velocity.y = 0
    player.checkCollisionWithHoles([hole1, hole2, hole3, hole4])

    
    if (player.position.x + player.radius >= end.position.x - end.radius) {
        if (c <= 0){
            let winSound = new Audio();
            winSound.src = 'hooray.wav';
            winSound.play();
            c++;
        }
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Leik Lokid!', canvas.width / 2 - 80, canvas.height / 2);
    }

    if (keys.w.pressed && lastKey === 'w') {
        player.velocity.y = -5
    } else if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.s.pressed && lastKey === 's') {
        player.velocity.y = 5
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 5
    }

    hole1.draw()
    hole2.draw()
    hole3.draw()
    hole4.draw()
}

animate()

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
} )

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
    console.log(keys.d.pressed)
    console.log(keys.s.pressed)
} )