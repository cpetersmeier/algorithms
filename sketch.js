const rrt = new RRT();
const prm = new PRM();

let testObject;

function setup() {
  createCanvas(1000, 1000);
  let start = new Configuration(0,0);
  
  // rrt.generate(10000, 3, start);
  prm.generate(200, 10, start);
 
  
  frameRate(1);
}

function draw() {
  noLoop();
  background(51);
  translate(width/2,height/2);

  // rrt.show();
  prm.show();
}
