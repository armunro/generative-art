class Particle {
    constructor(){
        this.x = random(0,width);
        this.y = random(0,height);
        this.r = random(2,5);
        this.xSpeed = random(1,4);
        this.ySpeed = random(1,4);
        let colorB = color('rgb(255,255,255)');
        let colorA = color('rgb(0,101,255)');
        let colorC = color('rgb(243,51,147)');
        let colorD = color('rgb(38,175,150)');
        
        this.color = lerpColor(colorA, colorB, random(100)/100);
        this.lineColor = lerpColor(colorC, colorD, random(100)/100);
        this.color.setAlpha(random(.1));
        this.lineColor.setAlpha(random(.1));
    }

// creation of a particle.
    createParticle() {
        fill(this.color);
        circle(this.x,this.y,this.r);
    }

// setting the particle in motion.
    moveParticle() {
        if(this.x < 0 || this.x > width || this.y < 0 || this.y > height)
        {
            //this.xSpeed*=-1;
            //this.ySpeed*=-1;
            this.x = random(0,windowWidth);
            this.y = random(0,windowHeight);
            
                
        }
                
        let n = noise(this.x * noiseScale, this.y * noiseScale, frameCount * noiseScale * noiseScale);
        let a = TAU * n ;
        this.x += cos(a) * this.xSpeed
        this.y += sin(a) * this.ySpeed
    }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
    joinParticles(particles) {
        particles.forEach(element =>{
            let dis = dist(this.x,this.y,element.x,element.y);
            if(dis<100) {
                stroke(this.lineColor);
                strokeWeight(2);
                line(this.x,this.y,element.x,element.y);
            }
        });
    }
}

// an array to add multiple particles
let particles = [];
const noiseScale = 0.01/4;
particleCount = 100
function setup() {
    colorMode(HSB);
    createCanvas(windowWidth, windowHeight);
    for(let i = 0;i<particleCount;i++){
        particles.push(new Particle());
    }
}
function mouseReleased() {
    noiseSeed(millis());
}
function draw() {
    //background('#0f0f0f22');
    for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }
}
