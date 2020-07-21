class Graph{
    constructor(copy = null){
        this.graph =  new Map(copy);
    }


  add_vertex(configuration){

    // check if graph already exists
    if(this.graph.has(configuration)){
      return this.graph.get(configuration);
    } else {
      const vertex = new Vertex(configuration);
      this.graph.set(configuration, vertex);
      return vertex;
    }
  }

  // adds both vertexes and the edge as the connection of the linked graph structure to the graph
  addEdge(source, destination){
    const sourceNode = this.add_vertex(source);
    const destinationNode = this.add_vertex(destination);

    // undirected graphs have edges in both directions
    sourceNode.addAdjacent(destinationNode);
    destinationNode.addAdjacent(sourceNode);

    return [sourceNode, destinationNode];
  }

  removeVertex(configuration){
    const current = this.graph.get(configuration);

    // remove all the references to the node
    if(current){
      for(const vertex of this.graph.values()){
        vertex.removeAdjecent(current);
      }
    }

    // remove vertex
    return this.graph.delete(configuration);
  }

  removeEdge(source, destination){
    const sourceNode = this.graph.get(source);
    const destinationNode = this.graph.get(destination);

    if(sourceNode && destinationNode){
      // both directions because undirected graph
      sourceNode.removeAdjacent(destinationNode);
      destinationNode.removeAdjacent(sourceNode);
    }

    return [sourceNode, destinationNode];
  }

  sampleRandomConfiguration(area_offset){
    let width_to_use = width * area_offset;
    let height_to_use = height * area_offset;
    let new_point = new Configuration(
      (width_to_use * Math.random()) - (width_to_use/2),
      (height_to_use * Math.random()) - (height_to_use/2)
    );
    return new_point;
  }

  // searches graph for nearest vertex to @param_1
  // uses euclidean distance metric
  nearest_vertex(configuration){
    let lowest_distance = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
    let q_lowest_distance = new Configuration(0,0);
    let tmp;

    for (let [key, value] of this.graph){
      // console.log(key, " = ", value);
      tmp = Math.sqrt(
        Math.pow(
          configuration.getX() - key.x, 2) +
        Math.pow(
          configuration.getY() - key.y, 2));
      // console.log("distance = ", tmp);
      if (tmp < lowest_distance){
        lowest_distance = tmp;
        q_lowest_distance.setX(key.x);
        q_lowest_distance.setY(key.y);
      }
    }
    return q_lowest_distance;
  }

    nearestVertices(configuration, N){
        let candidates = [];

        // put values of graph into array

        let graphArray =  [];
        let distanceArray =  [];

        for(let [key, values] of this.graph){
            // console.log("key: ", key);
            // console.log("configuration: ", configuration);

        if(key != configuration){
                graphArray.push(key);
                distanceArray.push(this.getDistance(configuration, key));
            }
        }

        // sort the values for distance ascendingly

        var len = distanceArray.length;

        for (var i = 0; i < len ; i++) {
            for(var j = 0 ; j < len - i - 1; j++){ 
                if (distanceArray[j] > distanceArray[j + 1]) {
                    // swap
                    var distanceArrayTMP = distanceArray[j];
                    var graphArrayTMP = graphArray[j];

                    distanceArray[j] = distanceArray[j+1];
                    graphArray[j] = graphArray[j+1];

                    distanceArray[j + 1] = distanceArrayTMP;
                    graphArray[j + 1] = graphArrayTMP;
                }
            }
        }
        
        console.log("distances: ", distanceArray);

        // only return the values that

        candidates = graphArray.slice(0, N)
        
        console.log("candidates: ", candidates);


        return candidates;
  }


  getDistance(first, second){
      return Math.sqrt(
        Math.pow(
          first.getX() - second.getX(), 2) +
        Math.pow(
          first.getY() - second.getY(), 2));
  }

  show(){
      for (let [key, value] of this.graph){
        for(let i = 0; i < value.getAdjecents().length; i++){
          this.printEdge(key.x, key.y, value.getAdjecents()[i].getX(), value.getAdjecents()[i].getY());
        }
          this.printPoint(key.x, key.y);
      }

      // print init point
      this.printInitPoint(this.q_init.getX(), this.q_init.getY());
  }

  *test(){
    let visited = new Map();
    let queue = new Queue();

    queue.enqueue(this.graph.get(this.q_init));

    while(queue.getLength() != 0){
      let node = queue.dequeue();
      if(node && !visited.has(node)){
        yield node;
        visited.set(node);
        this.graph.get(node).getAdjecents().forEach(adj => queue.enqueue(adj));
      }
    }
  }

  printPoint(x,y){
    fill(0, 255, 180);
    noStroke();
    ellipse(x,y, 5, 5);
  }

  printInitPoint(x,y){
    fill(0, 180, 255);
    noStroke();
    ellipse(x,y, 7, 7);
  }

  printEdge(s_x, s_y, d_x, d_y){
    stroke(255, 255, 255);
    strokeWeight(1);
    line(s_x, s_y, d_x, d_y);
  }

}