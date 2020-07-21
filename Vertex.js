class Vertex{
  constructor(configuration){

    this.x = configuration.getX();
    this.y = configuration.getY();
    this.adjacents = [];
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }

  setX(x){
    this.x = x;
  }

  setY(y){
    this.y = y;
  }

  getAdjecents(){
    return this.adjacents;
  }

  addAdjacent(vertex){
    this.adjacents.push(vertex);
  }

  removeAdjecent(vertex){
    const index = this.adjacents.indexOf(vertex);
    if(index > -1){
      this.adjacents.splice(index, 1);
      return vertex;
    }
  }

}
