class EST extends Graph{

  constructor(){
    super();
    this.q_init;
    this.q_goal;
  }

  generate(){

 }

  new_conf(q_near, q_rand, delta_q){
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

    return new Configuration(x_new, y_new);
  }
}
