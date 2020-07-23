class RRTStar extends Graph{

  constructor(){
    super();
    this.q_init;
    this.q_goal;
  }

  generate(K, delta_q, q_init, q_goal){
    this.q_init = q_init;
    this.q_goal = q_goal;
    // init
    this.add_vertex(q_init);

    for(let k = 1; k <= K; k++){

      let q_rand = this.sampleRandomConfiguration(0.9);
        // @param: area_offset: [0;1] size of canvas area to use

      // console.log("q_rand(x,y) = ", q_rand.getX(), ", ", q_rand.getY());

      let q_near = this.nearest_vertex(q_rand);

      // determine configuration to add
      let q_new = this.new_conf(q_near, q_rand, delta_q);

      // console.log("q_near(x,y) = ", q_near.getX(), ", ", q_near.getY());
      // console.log("q_new(x,y) = ", q_new.getX(), ", ", q_new.getY());

      this.addEdge(q_near, q_new);
    }

    // add q_goal
    let nearestVertexToQGoal = this.nearest_vertex(this.q_goal);
    this.add_vertex(this.q_goal);
    this.addEdge(this.q_goal, nearestVertexToQGoal);
  }

  new_conf(q_near, q_rand, delta_q, distance){
    let x,y;

    // move incremental distance delta_q from q_near in direction of q_rand

    // directional vector:
    x = q_rand.getX() - q_near.getX();
    y = q_rand.getY() - q_near.getY();

    let norm = Math.sqrt(x*x + y*y)
    let x_e = 1/norm * x;
    let y_e = 1/norm * y;

    let x_new = (delta_q * x_e) + q_near.getX();
    let y_new = (delta_q * y_e) + q_near.getY();

    // find all nodes within a circle

    newConfig = new Configuration(x_new, y_new);

    var candidates = this.nearestVerticesAfterDistance(newConfig, distance);


  }

  smallestTotalCost(newConfig, candidates, goal){

    let i = 0;
    let newIndex;
    let newDistance;
    let newPath;
    for(i = 0; i < candidates.length; i++){
      // the cost is defined as the euclidian distance
      [tmpPath, tmpDistance] = this.DijkstraSearch(candidates[i], this.q_init);
      
      // still need to go from q_new to candidate node
      tmpDistance = tmpDistance + this.getDistance(newConfig, candidates[i]);
      tmpPath.push(newConfig); // maybe this has to be at the other end of the array.

      // Update smallest distance and path  
      if(tmpDistance < newDistance){
        newPath = tmpPath;
        newDistance = tmpDistance
      }
    }
  }
}
