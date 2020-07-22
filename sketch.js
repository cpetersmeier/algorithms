const rrt = new RRT();
const rrtstar = new RRTStar();
const prm = new PRM();

let testObject;

function setup() {
  createCanvas(1000, 1000);
  let start = new Configuration(250,250);
  let goal = new Configuration(-250,-250);
  
  // rrt.generate(10000, 3, start, goal);
  rrtstar.generate(10000, 3, start, goal);
  // prm.generate(200, 10, start, goal);
 
  
  frameRate(1);
}

function draw() {
  noLoop();
  background(51);
  translate(width/2,height/2);

  // rrt.show(vertices = false, edges = true, start = true, goal = true);
  rrtstar.show(vertices = false, edges = true, start = true, goal = true);
  // prm.show();
}
